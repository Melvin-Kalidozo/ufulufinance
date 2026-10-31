import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  const includeJobIdParam = new URL(req.url).searchParams.get("includeJobId");
  const includeJobId = includeJobIdParam ? Number(includeJobIdParam) : null;
  const validIncludeJobId =
    includeJobId !== null && Number.isInteger(includeJobId)
      ? includeJobId
      : null;

  const where: Prisma.JobWhereInput = validIncludeJobId
    ? {
        OR: [{ status: "OPEN" }, { id: validIncludeJobId }],
      }
    : { status: "OPEN" };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { title: "asc" },
    select: { id: true, title: true, status: true },
  });

  return NextResponse.json({ data: jobs });
}
