"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type ResourceDef, type FieldDef } from "@/lib/admin-resource";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Plus, Pencil, Trash2, Search, Loader2, ImagePlus, X } from "lucide-react";

type Row = Record<string, any>;

function titleValue(row: Row, def: ResourceDef): string {
  for (const f of ["title", "name", "question", "label", "value"]) {
    if (row[f] != null && String(row[f]).trim()) return String(row[f]);
  }
  for (const f of def.fields) {
    const v = row[f.name];
    if (v != null && String(v).trim() && f.type === "text") return String(v);
  }
  return `#${row.id}`;
}

function secondaryValue(row: Row, def: ResourceDef): string {
  const second = def.fields.find((f) => f.type === "text" && f.name !== "slug");
  const fieldName = ["category", "categoryLabel", "department", "enterprise", "role", "city"].find(
    (n) => row[n]
  );
  if (fieldName) return String(row[fieldName]);
  if (second) {
    const v = row[second.name];
    if (v) return String(v);
  }
  return new Date(row.updatedAt ?? row.createdAt ?? Date.now()).toLocaleDateString();
}

function imageValue(row: Row, def: ResourceDef): string | null {
  const img = def.fields.find((f) => f.type === "image");
  return img ? row[img.name] ?? null : null;
}

const statusColor: Record<string, string> = {
  PUBLISHED: "bg-emerald-50 text-emerald-600 border-emerald-200",
  DRAFT: "bg-slate-100 text-slate-500 border-slate-200",
  UNPUBLISHED: "bg-amber-50 text-amber-600 border-amber-200",
  ARCHIVED: "bg-slate-100 text-slate-400 border-slate-200",
};

export function ResourceManager({
  def,
  apiBase,
}: {
  def: ResourceDef;
  apiBase: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`${apiBase}?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to load");
      setRows(json.data);
      setTotal(json.pagination.total);
      setTotalPages(json.pagination.totalPages);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [apiBase, page, limit, q]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(row: Row) {
    setEditing(row);
    setDialogOpen(true);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${apiBase}/${deleteTarget.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Delete failed");
      toast.success("Deleted successfully");
      setDeleteTarget(null);
      fetchData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  const listColumnImage = imageValue;
  const showImageColumn = useMemo(() => def.fields.some((f) => f.type === "image"), [def]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder={`Search ${def.title.toLowerCase()}…`}
            className="h-10 rounded-xl border-slate-200 bg-white pl-9"
          />
        </div>
        <Button
          onClick={openCreate}
          className="rounded-xl bg-[#034DA2] text-white shadow-md shadow-blue-950/15 transition-all hover:scale-[1.02] hover:bg-[#023877]"
        >
          <Plus className="size-4" />
          {def.addLabel ?? `Add ${def.singular}`}
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-700">No {def.title.toLowerCase()} yet</p>
          <p className="mt-1 text-xs text-slate-500">Use “{def.addLabel ?? `Add ${def.singular}`}” to create one.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 bg-slate-50/60 hover:bg-transparent">
                  {showImageColumn && (
                    <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Image
                    </TableHead>
                  )}
                  <TableHead className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Title
                  </TableHead>
                  <TableHead className="hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:table-cell">
                    Details
                  </TableHead>
                  <TableHead className="hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  const img = listColumnImage(row, def);
                  const active = row.isActive;
                  const status = row.status;
                  return (
                    <TableRow key={row.id} className="border-slate-100 hover:bg-blue-50/40">
                      {showImageColumn && (
                        <TableCell className="px-4 py-3">
                          {img ? (
                            <div className="relative h-10 w-14 overflow-hidden rounded-lg border border-slate-200">
                              <Image src={img} alt="" fill className="object-cover" sizes="56px" unoptimized={img.startsWith("https://res.cloudinary.com")} />
                            </div>
                          ) : (
                            <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-300">
                              <ImagePlus className="size-4" />
                            </div>
                          )}
                        </TableCell>
                      )}
                      <TableCell className="px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900">{titleValue(row, def)}</p>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 text-sm text-slate-500 md:table-cell">
                        {secondaryValue(row, def)}
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 sm:table-cell">
                        {status ? (
                          <Badge
                            variant="outline"
                            className={cn("rounded-lg border text-[10px] font-bold uppercase tracking-wide", statusColor[status] ?? "border-slate-200 text-slate-500")}
                          >
                            {status}
                          </Badge>
                        ) : (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 text-xs font-semibold",
                              active ? "text-[#00A3E0]" : "text-slate-400"
                            )}
                          >
                            <span className={cn("size-1.5 rounded-full", active ? "bg-[#00A3E0]" : "bg-slate-300")} />
                            {active === false ? "Inactive" : "Active"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg text-slate-500 hover:bg-blue-50 hover:text-[#034DA2]"
                            onClick={() => openEdit(row)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => setDeleteTarget(row)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
            <p className="text-xs text-slate-500">
              Showing {rows.length} of {total} · Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      <ResourceDialog
        def={def}
        apiBase={apiBase}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        saving={saving}
        setSaving={setSaving}
        onSaved={() => {
          setDialogOpen(false);
          fetchData();
        }}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteTarget(null);
        }}
        title={`Delete ${def.singular}?`}
        description={
          deleteTarget
            ? `This will permanently remove “${titleValue(deleteTarget, def)}” and cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function ResourceDialog({
  def,
  apiBase,
  open,
  onOpenChange,
  editing,
  saving,
  setSaving,
  onSaved,
}: {
  def: ResourceDef;
  apiBase: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editing: Row | null;
  saving: boolean;
  setSaving: (s: boolean) => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [removes, setRemoves] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    const next: Record<string, string> = {};
    for (const f of def.fields) {
      const val = editing?.[f.name];
      if (val === null || val === undefined) continue;
      if (f.type === "boolean") next[f.name] = val === true ? "true" : "false";
      else if (f.type === "json-array") next[f.name] = Array.isArray(val) ? val.join("\n") : "";
      else if (f.type === "json-object") next[f.name] = JSON.stringify(val ?? null, null, 2);
      else if (f.type === "datetime") {
        if (val instanceof Date || typeof val === "string") next[f.name] = toLocalInput(val);
      } else next[f.name] = String(val);
    }
    setForm(next);
    setFiles({});
    setRemoves({});
    setFieldErrors({});
  }, [open, editing, def]);

  function setField(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
    setFieldErrors((e) => ({ ...e, [name]: "" }));
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    for (const f of def.fields) {
      if (!f.required) continue;
      const v = form[f.name] ?? "";
      if (f.type === "boolean") continue;
      if (f.type === "image") {
        if (!files[f.name] && !editing?.[f.name] && !removes[f.name]) errors[f.name] = `${f.label} is required.`;
        continue;
      }
      if (!v.trim()) errors[f.name] = `${f.label} is required.`;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      for (const f of def.fields) {
        const name = f.name;
        if (f.type === "image") {
          const file = files[name];
          if (file) fd.append(name, file);
          else if (removes[name]) fd.append(`remove-${name}`, "1");
          continue;
        }
        const value = form[name];
        if (value === undefined || value === null) continue;
        if (f.type === "json-array" || f.type === "json-object") {
          if (f.type === "json-array") {
            const lines = value.split("\n").map((l) => l.trim()).filter(Boolean);
            fd.append(name, JSON.stringify(lines));
          } else {
            const text = value.trim();
            fd.append(name, text ? JSON.stringify(parseJsonField(text)) : "");
          }
        } else {
          fd.append(name, value);
        }
      }
      const res = await fetch(editing ? `${apiBase}/${editing.id}` : apiBase, {
        method: editing ? "PATCH" : "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.message || "Save failed");
        return;
      }
      toast.success(editing ? "Updated successfully" : "Created successfully");
      onSaved();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl overflow-y-auto sm:max-w-2xl max-h-[92vh]">
        <DialogHeader>
          <DialogTitle>{editing ? `Edit ${def.singular}` : `Add ${def.singular}`}</DialogTitle>
          <DialogDescription>
            Fields marked with <span className="text-red-500">*</span> are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {def.fields.map((field) => (
            <FieldControl
              key={field.name}
              field={field}
              fullWidth={field.type === "textarea" || field.type === "image" || field.type === "json-object"}
              value={form[field.name] ?? ""}
              error={fieldErrors[field.name]}
              onChange={(v) => setField(field.name, v)}
              file={files[field.name] ?? null}
              onFile={(file) => {
                setFiles((s) => ({ ...s, [field.name]: file }));
                setRemoves((r) => ({ ...r, [field.name]: false }));
              }}
              existingImage={editing?.[field.name] ?? null}
              removeImage={removes[field.name] ?? false}
              onRemoveImage={(rm) => {
                setRemoves((r) => ({ ...r, [field.name]: rm }));
                if (rm) {
                  setFiles((s) => ({ ...s, [field.name]: null }));
                }
              }}
            />
          ))}
          <DialogFooter className="col-span-full pt-2">
            <div className="flex w-full justify-end gap-2">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#034DA2] text-white shadow-md shadow-blue-950/15 hover:bg-[#023877]"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {saving ? "Saving…" : editing ? "Save changes" : "Create"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function toLocalInput(value: Date | string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function parseJsonField(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function FieldControl({
  field,
  fullWidth,
  value,
  error,
  onChange,
  file,
  onFile,
  existingImage,
  removeImage,
  onRemoveImage,
}: {
  field: FieldDef;
  fullWidth: boolean;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  file: File | null;
  onFile: (f: File | null) => void;
  existingImage: string | null;
  removeImage: boolean;
  onRemoveImage: (remove: boolean) => void;
}) {
  const previewUrl = useRef<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    };
  }, []);

  const errorCls = error ? "border-red-400 focus-visible:ring-red-400" : "border-slate-200";

  return (
    <div className={cn("space-y-1.5", fullWidth && "sm:col-span-2")}>
      <Label className="text-xs font-semibold text-slate-700">
        {field.label}
        {field.required && <span className="ml-0.5 text-red-500">*</span>}
      </Label>

      {field.type === "text" || field.type === "number" || field.type === "datetime" ? (
        <Input
          type={field.type === "datetime" ? "datetime-local" : field.type === "number" ? "number" : "text"}
          step={field.type === "number" ? "any" : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn("h-10 rounded-xl bg-white", errorCls)}
        />
      ) : field.type === "textarea" ? (
        <textarea
          rows={field.rows ?? 4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn("w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#034DA2] focus:ring-2 focus:ring-blue-100", errorCls)}
        />
      ) : field.type === "select" ? (
        <Select value={value || undefined} onValueChange={onChange}>
          <SelectTrigger className={cn("h-10 rounded-xl bg-white", errorCls)}>
            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.type === "boolean" ? (
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
          <input
            type="checkbox"
            checked={value === "true"}
            onChange={(e) => onChange(e.target.checked ? "true" : "false")}
            className="size-4 rounded accent-[#034DA2]"
          />
          <span className="text-sm text-slate-700">Enabled</span>
        </label>
      ) : field.type === "json-array" ? (
        <textarea
          rows={field.rows ?? 5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ?? "One item per line"}
          className={cn("w-full rounded-xl border bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 outline-none transition-colors focus:border-[#034DA2] focus:ring-2 focus:ring-blue-100", errorCls)}
        />
      ) : field.type === "json-object" ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='{"location":"Lilongwe"}'
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 outline-none transition-colors focus:border-[#034DA2] focus:ring-2 focus:ring-blue-100"
        />
      ) : field.type === "image" ? (
        <ImagePicker
          field={field}
          file={file}
          onFile={onFile}
          existingImage={existingImage}
          removeImage={removeImage}
          onRemoveImage={onRemoveImage}
        />
      ) : null}

      {field.help && !error && <p className="text-[11px] text-slate-400">{field.help}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ImagePicker({
  field,
  file,
  onFile,
  existingImage,
  removeImage,
  onRemoveImage,
}: {
  field: FieldDef;
  file: File | null;
  onFile: (f: File | null) => void;
  existingImage: string | null;
  removeImage: boolean;
  onRemoveImage: (remove: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const showExisting = existingImage && !file && !removeImage;
  const showNew = preview && file && !removeImage;

  return (
    <div className="space-y-2">
      {(showExisting || showNew) && (
        <div className="relative h-36 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <Image
            src={showNew ? preview! : existingImage!}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, 50vw"
            unoptimized={showNew ? false : existingImage?.startsWith("https://res.cloudinary.com")}
          />
          <button
            type="button"
            onClick={() => {
              onRemoveImage(true);
              if (inputRef.current) inputRef.current.value = "";
              setPreview(null);
            }}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            aria-label={`Remove ${field.label}`}
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {removeImage && !file && (
        <p className="text-xs text-amber-600">Current image will be removed when you save.</p>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-xs font-semibold text-slate-500 transition-colors hover:border-[#034DA2] hover:text-[#034DA2]"
      >
        <ImagePlus className="size-4" />
        {file || showExisting ? "Choose a replacement image" : "Upload image"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          onFile(f);
          onRemoveImage(false);
        }}
      />
    </div>
  );
}
