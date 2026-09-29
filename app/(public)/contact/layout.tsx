import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Ufulu Finance loan advisors in Lilongwe, Blantyre, and Mzuzu. Call, email, or send a loan or general enquiry and we will respond promptly.",
  path: "/contact",
  keywords: ["contact Ufulu Finance", "loan advisor Malawi", "Lilongwe office"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
