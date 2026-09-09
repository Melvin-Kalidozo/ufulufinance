import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const pages = await prisma.legalPage.findMany({ orderBy: { slug: "asc" } });
  return NextResponse.json({ data: pages });
}
