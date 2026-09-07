"use client";

import { SessionProvider } from "next-auth/react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { NotFoundContent } from "@/components/public/NotFoundContent";

export default function NotFound() {
  return (
    <SessionProvider>
      <div className="flex min-h-[100dvh] flex-col bg-[#fafbfc] text-slate-900">
        <PublicHeader />
        <main className="flex-1 flex items-center justify-center">
          <NotFoundContent />
        </main>
        <PublicFooter />
      </div>
    </SessionProvider>
  );
}
