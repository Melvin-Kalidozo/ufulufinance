import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await cachedPublic(`public:legal:${slug}`, [], async () =>
    prisma.legalPage.findUnique({ where: { slug } })
  );
  if (!page) return fail("Document not found", 404);
  return ok(page);
}
