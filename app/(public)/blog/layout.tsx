import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insights & News",
  description:
    "Practical business coaching, financial literacy insights, announcements, and community event updates from Ufulu Finance Malawi.",
  path: "/blog",
  keywords: [
    "Malawi business insights",
    "financial literacy Malawi",
    "Ufulu Finance news",
  ],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
