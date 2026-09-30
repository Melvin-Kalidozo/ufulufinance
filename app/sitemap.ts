import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

const lastModified = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/impact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/jobs`, lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];

  let jobRoutes: MetadataRoute.Sitemap = [];
  let articleRoutes: MetadataRoute.Sitemap = [];
  let eventRoutes: MetadataRoute.Sitemap = [];

  try {
    const [jobs, articles, events] = await Promise.all([
      prisma.job.findMany({
        where: { status: "OPEN" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.article.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true, image: true },
      }),
      prisma.event.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true, image: true },
      }),
    ]);

    jobRoutes = jobs.map((job) => ({
      url: `${SITE_URL}/jobs/${job.slug}`,
      lastModified: job.updatedAt,
      changeFrequency: "weekly",
      priority: 0.75,
    }));

    articleRoutes = articles.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
      ...(article.image ? { images: [absoluteUrl(article.image)] } : {}),
    }));

    eventRoutes = events.map((event) => ({
      url: `${SITE_URL}/events/${event.slug}`,
      lastModified: event.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
      ...(event.image ? { images: [absoluteUrl(event.image)] } : {}),
    }));
  } catch {
    // If the database is unavailable, still serve the static routes.
  }

  return [...staticRoutes, ...jobRoutes, ...articleRoutes, ...eventRoutes];
}
