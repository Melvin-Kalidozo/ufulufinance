import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await cachedPublic("public:products-data", [], async () => {
    const [products, audiences, advantages] = await Promise.all([
      prisma.product.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.productAudience.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.productAdvantage.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
    ]);
    return { products, audiences, advantages };
  });
  return ok(data);
}
