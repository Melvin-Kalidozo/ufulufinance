/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { optimizeImage } from "@/lib/image-upload";
import { uploadBufferToCloudinary, deleteCloudinaryAsset, publicIdFromUrl } from "@/lib/cloudinary";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "boolean"
  | "image"
  | "json-array"
  | "json-object"
  | "datetime";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  help?: string;
  folder?: string;
  min?: number;
  max?: number;
  rows?: number;
  /** when set, json-array/json-object input is wrapped in { [jsonWrapper]: value } */
  jsonWrapper?: string;
  /** step label used to group fields into a multi-step form; omit for single-step forms */
  step?: string;
};

export type ResourceDef = {
  model: keyof typeof prisma;
  title: string;
  singular: string;
  fields: FieldDef[];
  searchFields?: string[];
  addLabel?: string;
  folderPrefix?: string;
  defaultOrderBy?: Record<string, "asc" | "desc">;
  /** when set, a unique slug is generated from this field's value on create */
  slugFrom?: string;
};

/** Converts a title/name into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Returns a slug that is unique for the model, suffixing -2, -3, … on collision. */
export async function uniqueSlug(
  delegate: any,
  base: string,
  excludeId?: number
): Promise<string> {
  const root = base || "item";
  let candidate = root;
  let n = 2;
  for (;;) {
    const existing = await delegate.findFirst({
      where: excludeId ? { slug: candidate, id: { not: excludeId } } : { slug: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${root}-${n++}`;
  }
}

function asDelegate(model: keyof typeof prisma): any {
  return (prisma as any)[model];
}

export function listParams(url: URL) {
  const sp = url.searchParams;
  const page = Math.max(1, Number(sp.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(sp.get("limit")) || 10));
  return { page, limit, skip: (page - 1) * limit, q: (sp.get("q") ?? "").trim().toLowerCase() };
}

export async function handleList(def: ResourceDef, url: URL) {
  const { page, limit, skip, q } = listParams(url);
  const where: any = {};
  if (q && def.searchFields?.length) {
    where.OR = def.searchFields.map((f) => ({ [f]: { contains: q, mode: "insensitive" } }));
  }
  const delegate = asDelegate(def.model);
  const [rows, total] = await Promise.all([
    delegate.findMany({ where, orderBy: def.defaultOrderBy ?? { createdAt: "desc" }, skip, take: limit }),
    delegate.count({ where }),
  ]);
  return NextResponse.json({
    data: rows,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}

type Parsed = { values: Record<string, unknown>; imageFiles: { field: FieldDef; file: File }[] };

async function parseForm(def: ResourceDef, req: Request): Promise<{ parsed?: Parsed; error?: string }> {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return { error: "Invalid request. Send the form as multipart data." };
  }

  const values: Record<string, unknown> = {};
  const imageFiles: { field: FieldDef; file: File }[] = [];

  for (const field of def.fields) {
    const name = field.name;
    if (field.type === "image") {
      const file = form.get(name);
      const removeFlag = form.get(`remove-${name}`);
      if (removeFlag === "1") values[name] = null;
      if (file instanceof File && file.size > 0) {
        imageFiles.push({ field, file });
      }
      continue;
    }

    const raw = form.get(name);
    const value = raw === null ? null : String(raw);
    if (field.required && (value === null || value.trim() === "")) {
      return { error: `${field.label} is required.` };
    }
    if (value === null || value === "") {
      values[name] = null;
      continue;
    }
    switch (field.type) {
      case "number": {
        const n = Number(value);
        if (Number.isNaN(n)) return { error: `${field.label} must be a number.` };
        if (field.min !== undefined && n < field.min) return { error: `${field.label} must be at least ${field.min}.` };
        if (field.max !== undefined && n > field.max) return { error: `${field.label} must be at most ${field.max}.` };
        values[name] = n;
        break;
      }
      case "boolean":
        values[name] = value === "true" || value === "1";
        break;
      case "datetime": {
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return { error: `${field.label} is not a valid date.` };
        values[name] = d;
        break;
      }
      case "json-array":
      case "json-object": {
        const parsed = parseStructured(value, field.type === "json-array");
        if (parsed === null) return { error: `${field.label} is not valid JSON.` };
        values[name] = field.jsonWrapper ? { [field.jsonWrapper]: parsed } : parsed;
        break;
      }
      case "select": {
        if (field.options && !field.options.includes(value)) {
          return { error: `${field.label} has an invalid option.` };
        }
        values[name] = value;
        break;
      }
      default:
        values[name] = value;
    }
  }
  return { parsed: { values, imageFiles } };
}

function parseStructured(value: string, isArray: boolean): unknown {
  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch {
    // Fallback: treat as newline-separated lines
    const lines = value
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length) return isArray ? lines : null;
    return null;
  }
}

async function uploadImageFile(field: FieldDef, file: File, def: ResourceDef) {
  const optimized = await optimizeImage(file);
  const asset = await uploadBufferToCloudinary(
    optimized.buffer,
    field.folder ?? def.folderPrefix ?? "media"
  );
  return { url: asset.secureUrl, publicId: asset.publicId };
}

export async function handleCreate(def: ResourceDef, req: Request) {
  const { parsed, error } = await parseForm(def, req);
  if (error) return NextResponse.json({ message: error }, { status: 400 });
  if (!parsed) return NextResponse.json({ message: "Nothing to create." }, { status: 400 });

  const values = { ...parsed.values };
  try {
    for (const { field, file } of parsed.imageFiles) {
      const { url, publicId } = await uploadImageFile(field, file, def);
      values[field.name] = url;
    }
    const delegate = asDelegate(def.model);
    if (def.slugFrom) {
      const base = slugify(String(values[def.slugFrom] ?? ""));
      values.slug = await uniqueSlug(delegate, base);
    }
    const row = await delegate.create({ data: values });
    revalidateTag("cms", { expire: 0 });
    return NextResponse.json({ data: row }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message?.includes("Unique") ? "A record with that identifier already exists." : "Could not create the record." },
      { status: 400 }
    );
  }
}

export async function handleUpdate(def: ResourceDef, req: Request, id: number) {
  const delegate = asDelegate(def.model);
  const existing = await delegate.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ message: "Record not found." }, { status: 404 });

  const { parsed, error } = await parseForm(def, req);
  if (error) return NextResponse.json({ message: error }, { status: 400 });
  if (!parsed) return NextResponse.json({ message: "Nothing to update." }, { status: 400 });

  const values = { ...parsed.values };
  try {
    for (const { field, file } of parsed.imageFiles) {
      const { url, publicId } = await uploadImageFile(field, file, def);
      // best-effort cleanup of the old image asset
      const oldUrl = existing?.[field.name];
      const oldPublicId = publicIdFromUrl(oldUrl, field.folder ?? def.folderPrefix ?? "media");
      if (oldPublicId) void deleteCloudinaryAsset(oldPublicId).catch(() => {});
      values[field.name] = url;
    }
    const row = await delegate.update({ where: { id }, data: values });
    revalidateTag("cms", { expire: 0 });
    return NextResponse.json({ data: row });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message?.includes("Unique") ? "A record with that identifier already exists." : "Could not update the record." },
      { status: 400 }
    );
  }
}

export async function handleUpdateStatus(def: ResourceDef, req: Request, id: number) {
  const statusField = def.fields.find((f) => f.name === "status" && f.type === "select");
  if (!statusField) {
    return NextResponse.json({ message: "This resource has no status field." }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const status = String(body?.status ?? "");
  if (statusField.options && !statusField.options.includes(status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  const delegate = asDelegate(def.model);
  const existing = await delegate.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ message: "Record not found." }, { status: 404 });

  const row = await delegate.update({ where: { id }, data: { status } });
  revalidateTag("cms", { expire: 0 });
  return NextResponse.json({ data: row });
}

export async function handleDelete(def: ResourceDef, id: number) {
  const delegate = asDelegate(def.model);
  const existing = await delegate.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ message: "Record not found." }, { status: 404 });

  const imageFields = def.fields.filter((f) => f.type === "image");
  for (const field of imageFields) {
    const url: string | null | undefined = existing?.[field.name];
    const publicId = publicIdFromUrl(url, field.folder ?? def.folderPrefix ?? "media");
    if (publicId) void deleteCloudinaryAsset(publicId).catch(() => {});
  }

  await delegate.delete({ where: { id } });
  revalidateTag("cms", { expire: 0 });
  return NextResponse.json({ ok: true });
}
