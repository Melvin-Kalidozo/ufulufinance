import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await cachedPublic("public:services-data", [], async () => {
    const [services, audiences, advantages] = await Promise.all([
      prisma.service.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.serviceAudience.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.serviceAdvantage.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
    ]);
    return { services, audiences, advantages };
  });
  return ok(data);
}
