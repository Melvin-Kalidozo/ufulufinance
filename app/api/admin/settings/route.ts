import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const TEXT_FIELDS = [
  "siteName",
  "tagline",
  "aboutLine",
  "footerAbout",
  "primaryEmail",
  "supportEmail",
  "loansEmail",
  "phone",
  "whatsapp",
  "addressLine1",
  "addressLine2",
  "officeHours",
  "mapEmbedUrl",
] as const;

const JSON_FIELDS = ["offices", "socialLinks", "legal"] as const;

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const settings = await prisma.websiteSetting.findFirst();
  if (settings) return NextResponse.json({ data: settings });
  const created = await prisma.websiteSetting.create({ data: {} });
  return NextResponse.json({ data: created });
}

export async function PATCH(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  for (const field of TEXT_FIELDS) {
    const raw = form.get(field);
    if (raw !== null) data[field] = String(raw);
  }
  for (const field of JSON_FIELDS) {
    const raw = form.get(field);
    if (raw === null) continue;
    try {
      data[field] = JSON.parse(String(raw));
    } catch {
      return NextResponse.json({ message: `${field} must be valid JSON.` }, { status: 400 });
    }
  }

  const existing = await prisma.websiteSetting.findFirst();

  try {
    const updated = await prisma.websiteSetting.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });
    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error("settings update error", e);
    return NextResponse.json({ message: "Could not save settings." }, { status: 500 });
  }
}
