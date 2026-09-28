import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Loan Products",
  description:
    "Explore Ufulu Finance credit facilities for Malawi: civil service loans, private sector payroll loans, village banking, MSME working capital, and agriculture finance. Transparent rates and fast mobile disbursement.",
  path: "/products",
  keywords: [
    "loan products Malawi",
    "civil service loan",
    "payroll loan",
    "village banking loan",
    "MSME working capital",
  ],
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
