"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

function AccountShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    } else if (session?.user?.role !== "CUSTOMER") {
      router.replace("/admin");
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex min-h-[100dvh] flex-col gap-4 p-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (session.user.role !== "CUSTOMER") return null;

  return <>{children}</>;
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AccountShell>{children}</AccountShell>
    </SessionProvider>
  );
}
