import { prisma } from "@/lib/prisma";
import { okPage, getPagination, getQuery } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const { page, limit, skip } = getPagination(sp);
  const q = getQuery(sp);

  const data = await cachedPublic("public:services-list", [q, String(page), String(limit)], async () => {
    const where = {
      status: "PUBLISHED" as const,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" as const } },
              { description: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };
    const [rows, total] = await Promise.all([
      prisma.service.findMany({ where, orderBy: { sortOrder: "asc" }, skip, take: limit }),
      prisma.service.count({ where }),
    ]);
    return { rows, total };
  });

  return okPage(data.rows, page, limit, data.total);
}
