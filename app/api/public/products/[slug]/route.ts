import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await cachedPublic(`public:product:${slug}`, [], async () =>
    prisma.product.findFirst({ where: { slug, status: "PUBLISHED" } })
  );
  if (!data) return fail("Product not found", 404);
  return ok(data);
}
