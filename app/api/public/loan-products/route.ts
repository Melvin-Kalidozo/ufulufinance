import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { okPage, getPagination, getQuery } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip } = getPagination(sp);
  const q = getQuery(sp);
  const category = sp.get("category");
  const featured = sp.get("featured") === "1";

  const data = await cachedPublic(
    "public:loan-products",
    [q, category ?? "all", String(featured), String(page), String(limit)],
    async () => {
      const where: Prisma.LoanProductWhereInput = { status: "PUBLISHED" };
      if (category && category !== "all") where.category = category;
      if (featured) where.isFeatured = true;
      if (q) {
        where.OR = [
          { name: { contains: q, mode: "insensitive" } },
          { tagline: { contains: q, mode: "insensitive" } },
        ];
      }
      const [rows, total] = await Promise.all([
        prisma.loanProduct.findMany({ where, orderBy: { sortOrder: "asc" }, skip, take: limit }),
        prisma.loanProduct.count({ where }),
      ]);
      return { rows, total };
    }
  );

  return okPage(data.rows, page, limit, data.total);
}
