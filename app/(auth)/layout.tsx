import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Landmark } from "lucide-react";
import { AuthBackground } from "@/components/auth/AuthBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      <AuthBackground />

      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <Link href="/">
          <Button variant="outline" size="icon" aria-label="Back to home">
            <Home className="size-4" />
          </Button>
        </Link>
      </div>

      <div className="relative flex min-h-[100dvh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Landmark className="size-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Ufulu Finance</h1>
            <p className="text-sm text-muted-foreground">
              Loans, savings and financial freedom for every community.
            </p>
          </div>

          <Card className="relative w-full border-border shadow-lg">
            <CardContent className="pt-6">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
