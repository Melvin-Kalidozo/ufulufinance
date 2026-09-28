import type { Metadata } from "next";
import {
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_ALT,
  SITE_OG_IMAGE,
  absoluteUrl,
} from "@/lib/site";

/**
 * Build a complete, consistent page-level metadata object.
 *
 * Because Next.js merges metadata shallowly (nested fields like `openGraph`
 * are replaced wholesale by the last segment that defines them), every page
 * that wants a title must go through this helper to keep canonical URLs and
 * social images intact.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  const hasCustomImage = Boolean(input.image);
  const imageUrl = hasCustomImage
    ? absoluteUrl(input.image as string)
    : absoluteUrl(SITE_OG_IMAGE);

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    keywords: [...SITE_KEYWORDS, ...(input.keywords ?? [])],
    alternates: { canonical: input.path },
    ...(input.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: input.type ?? "website",
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      url,
      images: [
        hasCustomImage
          ? { url: imageUrl, alt: input.title }
          : { url: imageUrl, width: 1200, height: 630, alt: SITE_OG_ALT },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
  };
}
