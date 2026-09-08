import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

type Section = { heading: string; body?: string; bullets?: string[] };

function normalizeSections(value: unknown): Section[] | null {
  if (!Array.isArray(value)) return null;
  const out: Section[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    const heading = String(row.heading ?? "").trim();
    if (!heading) return null;
    const bullets = Array.isArray(row.bullets)
      ? (row.bullets as unknown[]).map((b) => String(b)).filter((b) => b.trim())
      : undefined;
    out.push({
      heading,
      body: typeof row.body === "string" && row.body.trim() ? row.body : undefined,
      bullets,
    });
  }
  return out;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { slug } = await params;
  const page = await prisma.legalPage.findUnique({ where: { slug } });
  return NextResponse.json({ data: page });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { slug } = await params;
  if (slug !== "privacy" && slug !== "terms") {
    return NextResponse.json({ message: "Unknown legal document." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const sections = normalizeSections(body.sections);
  if (!title) return NextResponse.json({ message: "Title is required." }, { status: 400 });
  if (!sections || sections.length === 0) {
    return NextResponse.json(
      { message: "Add at least one section with a heading." },
      { status: 400 }
    );
  }

  const page = await prisma.legalPage.upsert({
    where: { slug },
    create: { slug, title, content: { sections } },
    update: { title, content: { sections } },
  });
  revalidateTag("cms", { expire: 0 });
  return NextResponse.json({ data: page });
}
