import { prisma } from "@/lib/prisma";
import { okPage, getPagination, getQuery } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip } = getPagination(sp);
  const q = getQuery(sp);
  const status = sp.get("status"); // upcoming | past

  const data = await cachedPublic(
    "public:events",
    [q, status ?? "all", String(page), String(limit)],
    async () => {
      const where: {
        status: "PUBLISHED";
        OR?: { title: { contains: string; mode: "insensitive" } }[];
        date?: { gte: Date } | { lt: Date };
      } = { status: "PUBLISHED" };
      if (status === "upcoming") where.date = { gte: new Date() };
      if (status === "past") where.date = { lt: new Date() };
      if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }];

      const [rows, total] = await Promise.all([
        prisma.event.findMany({ where, orderBy: { date: "desc" }, skip, take: limit }),
        prisma.event.count({ where }),
      ]);
      return { rows, total };
    }
  );

  return okPage(data.rows, page, limit, data.total);
}
