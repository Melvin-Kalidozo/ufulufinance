import { NextResponse } from "next/server";
import { Prisma, JobApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { listParams } from "@/lib/admin-resource";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const url = new URL(req.url);
  const { page, limit, skip, q } = listParams(url);
  const status = url.searchParams.get("status");
  const jobIdParam = url.searchParams.get("jobId");

  const where: Prisma.JobApplicationWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { job: { title: { contains: q, mode: "insensitive" } } },
    ];
  }
  if (status) where.status = status as JobApplicationStatus;
  if (jobIdParam) {
    const jobId = Number(jobIdParam);
    if (!Number.isInteger(jobId)) {
      return NextResponse.json(
        { message: "Invalid job filter." },
        { status: 400 }
      );
    }
    where.jobId = jobId;
  }

  const [rows, total] = await Promise.all([
    prisma.jobApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { job: { select: { id: true, title: true } } },
    }),
    prisma.jobApplication.count({ where }),
  ]);
  return NextResponse.json({
    data: rows,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}
