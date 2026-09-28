import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Clear, honest answers about Ufulu Finance loans, eligibility, interest rates, collateral requirements, and mobile money disbursement in Malawi.",
  path: "/faq",
  keywords: [
    "Ufulu Finance FAQ",
    "loan eligibility Malawi",
    "loan interest rates Malawi",
  ],
});

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
