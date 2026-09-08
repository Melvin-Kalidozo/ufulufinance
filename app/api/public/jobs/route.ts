import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPagination, getQuery } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip } = getPagination(sp);
  const q = getQuery(sp);

  const data = await cachedPublic(
    "public:jobs",
    [q, String(page), String(limit)],
    async () => {
      const where: {
        status: "PUBLISHED";
        OR?: { title: { contains: string; mode: "insensitive" } }[];
      } = { status: "PUBLISHED" };
      if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }];

      const [jobs, total, perks] = await Promise.all([
        prisma.job.findMany({ where, orderBy: { createdAt: "asc" }, skip, take: limit }),
        prisma.job.count({ where }),
        prisma.perk.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { sortOrder: "asc" },
        }),
      ]);
      return { jobs, total, perks };
    }
  );

  return NextResponse.json({
    data: data.jobs,
    pagination: { total: data.total, page, limit, totalPages: Math.ceil(data.total / limit) },
    perks: data.perks,
  });
}
