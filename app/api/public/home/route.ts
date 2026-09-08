import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await cachedPublic("home", [], async () => {
    const [
      settings,
      stats,
      sectors,
      whyChoose,
      impactMetrics,
      testimonials,
      loanProducts,
      recentArticles,
    ] = await Promise.all([
      prisma.websiteSetting.findFirst(),
      prisma.stat.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.sectorCard.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.whyChooseItem.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.impactMetric.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
      }),
      prisma.testimonial.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED" },
        take: 6,
      }),
      prisma.loanProduct.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED", isHomeFeatured: true },
      }),
      prisma.article.findMany({
        orderBy: { date: "desc" },
        where: { status: "PUBLISHED" },
        take: 3,
      }),
    ]);

    return {
      settings,
      stats,
      sectors,
      whyChoose,
      impactMetrics,
      testimonials,
      loanProducts,
      recentArticles,
    };
  });

  return ok(data);
}
