import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Build your career with Ufulu Finance. Explore open roles in field credit operations, customer service, and finance across Lilongwe, Blantyre, and Mzuzu, and apply online.",
  path: "/jobs",
  keywords: [
    "Ufulu Finance careers",
    "microfinance jobs Malawi",
    "loan officer jobs Malawi",
  ],
});

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
