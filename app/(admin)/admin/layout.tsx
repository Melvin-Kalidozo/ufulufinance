"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    } else if (session?.user?.role !== "ADMIN") {
      // Customer portal (/account) is disabled — future improvement.
      router.replace("/account");
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex min-h-[100dvh] flex-col gap-4 bg-[#fcfdfd] p-6">
        <div className="flex h-16 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-1 gap-4">
          <Skeleton className="hidden w-64 rounded-2xl lg:block" />
          <Skeleton className="flex-1 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (session.user.role !== "ADMIN") return null;

  return (
    <div className="flex min-h-[100dvh] bg-[#fcfdfd] text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200/90 bg-white lg:block">
        <div className="sticky top-0 h-[100dvh]">
          <AppSidebar />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-slate-200/90 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AppSidebar />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
