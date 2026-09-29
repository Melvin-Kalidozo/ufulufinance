import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio & Impact",
  description:
    "See how Ufulu Finance is transforming grassroots economies across Malawi through community projects, financial literacy, and client success stories.",
  path: "/impact",
  keywords: [
    "Ufulu Finance impact",
    "microfinance social impact Malawi",
    "community development Malawi",
  ],
});

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
