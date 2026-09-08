"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { prefetchPublic } from "@/lib/content-store";

const ENDPOINTS = [
  "/api/public/about",
  "/api/public/services-data",
  "/api/public/loan-products",
  "/api/public/faqs",
  "/api/public/impact",
  "/api/public/articles",
  "/api/public/events",
  "/api/public/jobs",
  "/api/public/legal/privacy",
  "/api/public/legal/terms",
];

const ROUTES = [
  "/services",
  "/loans",
  "/about",
  "/blog",
  "/jobs",
  "/contact",
  "/faq",
  "/impact",
];

/** Warms the shared content store + Next.js route chunks while the user is on Home. */
export function HomePreload() {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      prefetchPublic(ENDPOINTS);
      for (const route of ROUTES) {
        router.prefetch(route);
      }
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(warm, { timeout: 2500 });
    } else {
      const t = window.setTimeout(warm, 1500);
      return () => window.clearTimeout(t);
    }
  }, [router]);

  return null;
}
