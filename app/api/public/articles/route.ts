import { prisma } from "@/lib/prisma";
import { BlogType } from "@prisma/client";
import { okPage, getPagination, getQuery } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip } = getPagination(sp);
  const q = getQuery(sp);
  const typeParam = sp.get("type");
  const category = sp.get("category");

  const data = await cachedPublic(
    "public:articles",
    [q, typeParam ?? "all", category ?? "all", String(page), String(limit)],
    async () => {
      const where: {
        status: "PUBLISHED";
        kind?: BlogType;
        category?: string;
        OR?: { title: { contains: string; mode: "insensitive" } }[];
      } = { status: "PUBLISHED" };
      if (typeParam === "blog" || typeParam === "news") {
        where.kind = typeParam === "news" ? BlogType.NEWS : BlogType.BLOG;
      }
      if (category && category !== "all") where.category = category;
      if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }];

      const [rows, total] = await Promise.all([
        prisma.article.findMany({ where, orderBy: { date: "desc" }, skip, take: limit }),
        prisma.article.count({ where }),
      ]);
      return { rows, total };
    }
  );

  return okPage(data.rows, page, limit, data.total);
}
