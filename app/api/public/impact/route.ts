import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await cachedPublic("public:impact", [], async () => {
    const [projects, initiatives, stories] = await Promise.all([
      prisma.project.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.communityInitiative.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.successStory.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
    ]);
    return { projects, initiatives, stories };
  });
  return ok(data);
}
