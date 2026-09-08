/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { listParams } from "@/lib/admin-resource";
import { EnquiryStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

function delegate(kind: string): any {
  return kind === "loan" ? prisma.loanEnquiry : prisma.companyEnquiry;
}

export async function GET(req: Request, { params }: { params: Promise<{ kind: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { kind } = await params;
  if (kind !== "loan" && kind !== "company") {
    return NextResponse.json({ message: "Unknown enquiry kind" }, { status: 400 });
  }
  const db = delegate(kind);
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip, q } = listParams(url);
  const status = sp.get("status");

  const where: any = {};
  if (status === "PENDING" || status === "RESOLVED") where.status = EnquiryStatus[status];
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { refNumber: { contains: q, mode: "insensitive" } },
    ];
    if (kind === "loan") where.OR.push({ productName: { contains: q, mode: "insensitive" } });
    else where.OR.push({ category: { contains: q, mode: "insensitive" } });
  }

  const [rows, total] = await Promise.all([
    db.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
    db.count({ where }),
  ]);
  return NextResponse.json({
    data: rows,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}
