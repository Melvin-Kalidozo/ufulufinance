import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await cachedPublic("public:about", [], async () => {
    const [settings, values, timeline, hubs, leaders, aboutFaqs] = await Promise.all([
      prisma.websiteSetting.findFirst(),
      prisma.aboutValue.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.aboutTimeline.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.regionalHub.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.governanceMember.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.faq.findMany({
        where: { status: "PUBLISHED", category: "About Ufulu" },
        orderBy: { sortOrder: "asc" },
      }),
    ]);
    return { settings, values, timeline, hubs, leaders, aboutFaqs };
  });
  return ok(data);
}
