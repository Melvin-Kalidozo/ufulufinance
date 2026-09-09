import { NextResponse } from "next/server";
import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getPagination } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip } = getPagination(sp);
  const category = sp.get("category");

  const data = await cachedPublic(
    "public:faqs",
    [category ?? "all", String(page), String(limit)],
    async () => {
      const where = {
        status: ContentStatus.PUBLISHED,
        ...(category && category !== "all" ? { category } : {}),
      };
      const [rows, total] = await Promise.all([
        prisma.faq.findMany({ where, orderBy: { sortOrder: "asc" }, skip, take: limit }),
        prisma.faq.count({ where }),
      ]);
      const grouped = await prisma.faq.groupBy({
        by: ["category"],
        where: { status: ContentStatus.PUBLISHED },
      });
      return { rows, total, categories: grouped.map((g) => g.category) };
    }
  );

  return NextResponse.json({
    data: data.rows,
    pagination: { total: data.total, page, limit, totalPages: Math.ceil(data.total / limit) },
    categories: data.categories,
  });
}
