import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Ufulu Finance Limited is a registered non-deposit-taking microfinance institution in Malawi, founded in 2016 in Lilongwe. Learn about our mission, values, governance, and national footprint.",
  path: "/about",
  keywords: [
    "about Ufulu Finance",
    "microfinance institution Malawi",
    "Malawi financial inclusion",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
