import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { JobApplicationStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { id } = await params;
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const values = Object.values(JobApplicationStatus);
  if (!values.includes(body.status)) return NextResponse.json({ message: "Invalid status" }, { status: 400 });

  const row = await prisma.jobApplication.update({
    where: { id: numeric },
    data: { status: body.status },
  });
  return NextResponse.json({ data: row });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { id } = await params;
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  await prisma.jobApplication.delete({ where: { id: numeric } });
  return NextResponse.json({ ok: true });
}
