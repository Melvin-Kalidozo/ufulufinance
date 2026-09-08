/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { EnquiryStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

function delegate(kind: string): any {
  return kind === "loan" ? prisma.loanEnquiry : prisma.companyEnquiry;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ kind: string; id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { kind, id } = await params;
  if (kind !== "loan" && kind !== "company") {
    return NextResponse.json({ message: "Unknown enquiry kind" }, { status: 400 });
  }
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if (body.status === EnquiryStatus.PENDING || body.status === EnquiryStatus.RESOLVED) {
    data.status = body.status;
  }
  if (Object.keys(data).length === 0) return NextResponse.json({ message: "Nothing to update" }, { status: 400 });

  const row = await delegate(kind).update({ where: { id: numeric }, data });
  return NextResponse.json({ data: row });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ kind: string; id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { kind, id } = await params;
  if (kind !== "loan" && kind !== "company") {
    return NextResponse.json({ message: "Unknown enquiry kind" }, { status: 400 });
  }
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  await delegate(kind).delete({ where: { id: numeric } });
  return NextResponse.json({ ok: true });
}
