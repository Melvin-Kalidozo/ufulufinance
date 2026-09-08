import "server-only";
import { prisma } from "@/lib/prisma";
import { cachedPublic } from "@/lib/public-cache";

/**
 * Server-side content reads (no HTTP self-fetch). Shared by SSR pages and,
 * where noted, by the public REST handlers.
 */

export type HomeContent = {
  settings: unknown;
  stats: unknown[];
  sectors: unknown[];
  whyChoose: unknown[];
  impactMetrics: unknown[];
  testimonials: unknown[];
  loanProducts: unknown[];
  recentArticles: unknown[];
};

export async function getHomeContent(): Promise<HomeContent> {
  return cachedPublic("public:home", [], async () => {
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
}

export async function getJobBySlug(slug: string) {
  return cachedPublic(`public:job:${slug}`, [], async () =>
    prisma.job.findFirst({ where: { slug, status: "PUBLISHED" } })
  );
}

export async function getOpenJobs(limit = 20) {
  return cachedPublic("cms:open-jobs", [String(limit)], async () =>
    prisma.job.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
      take: limit,
    })
  );
}
