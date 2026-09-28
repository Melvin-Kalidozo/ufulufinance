"use client";

import { SessionProvider } from "next-auth/react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ScrollToTop } from "@/components/public/ScrollToTop";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-[100dvh] flex-col">
        <PublicHeader />
        <main className="flex-1">{children}</main>
        <PublicFooter />
        <ScrollToTop />
      </div>
    </SessionProvider>
  );
}
