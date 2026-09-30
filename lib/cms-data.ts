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

export async function getImpactContent() {
  return cachedPublic("public:impact", [], async () => {
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
}

export async function getProductsList() {
  return cachedPublic("public:products-list", [], async () =>
    prisma.product.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    })
  );
}

export async function getProductsData() {
  return cachedPublic("public:products-data", [], async () => {
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
}

export async function getFaqs() {
  return cachedPublic("public:faqs-all", [], async () =>
    prisma.faq.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    })
  );
}

export async function getAboutContent() {
  return cachedPublic("public:about", [], async () => {
    const [settings, values, timeline, hubs, leaders, aboutFaqs, products] =
      await Promise.all([
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
        prisma.product.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { sortOrder: "asc" },
        }),
      ]);
    return { settings, values, timeline, hubs, leaders, aboutFaqs, products };
  });
}

export async function getJobsList() {
  return cachedPublic("public:jobs-all", [], async () =>
    prisma.job.findMany({
      where: { status: { in: ["OPEN", "CLOSED"] } },
      orderBy: { createdAt: "asc" },
    })
  );
}

export async function getArticlesList() {
  return cachedPublic("public:articles-all", [], async () =>
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "desc" },
    })
  );
}

export async function getEventsList(limit = 20) {
  return cachedPublic("public:events-list", [String(limit)], async () =>
    prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "desc" },
      take: limit,
    })
  );
}

export async function getJobBySlug(slug: string) {
  return cachedPublic(`public:job:${slug}`, [], async () =>
    prisma.job.findFirst({ where: { slug, status: { in: ["OPEN", "CLOSED"] } } })
  );
}

export async function getArticleBySlug(slug: string) {
  return cachedPublic(`public:article:${slug}`, [], async () =>
    prisma.article.findFirst({ where: { slug, status: "PUBLISHED" } })
  );
}

export async function getEventBySlug(slug: string) {
  return cachedPublic(`public:event:${slug}`, [], async () =>
    prisma.event.findFirst({ where: { slug, status: "PUBLISHED" } })
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
