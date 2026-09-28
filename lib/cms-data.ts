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
  products: unknown[];
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
      products,
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
      prisma.product.findMany({
        orderBy: { sortOrder: "asc" },
        where: { status: "PUBLISHED", isFeatured: true },
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
      products,
      recentArticles,
    };
  });
}

export async function getJobBySlug(slug: string) {
  return cachedPublic(`public:job:${slug}`, [], async () =>
    prisma.job.findFirst({ where: { slug, status: { in: ["OPEN", "CLOSED"] } } })
  );
}

export async function getOpenJobs(limit = 20) {
  return cachedPublic("cms:open-jobs", [String(limit)], async () =>
    prisma.job.findMany({
      where: { status: "OPEN" },
      orderBy: { createdAt: "asc" },
      take: limit,
    })
  );
}
