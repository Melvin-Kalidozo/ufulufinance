"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

const INPUT_CLASS =
  "h-11 rounded-xl border-slate-200 bg-slate-50 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const verifiedEmail = searchParams.get("verified");

  const [email, setEmail] = useState(verifiedEmail ?? "");
  const [prevVerified, setPrevVerified] = useState(verifiedEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (verifiedEmail !== prevVerified) {
    setPrevVerified(verifiedEmail);
    if (verifiedEmail) setEmail(verifiedEmail);
  }

  useEffect(() => {
    if (verifiedEmail) {
      toast.success("Email verified! Please sign in.");
    }
  }, [verifiedEmail]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password.");
      return;
    }

    const session = await getSession();
    // Only admin/staff accounts are active today. CUSTOMER role routing to
    // /account is reserved for a future customer portal.
    const dest = session?.user?.role === "ADMIN" ? "/admin" : "/account";

    toast.success("Welcome back!");
    router.push(dest);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#034DA2]">
          <ShieldCheck className="size-3.5" />
          Staff Portal
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Sign in to the portal
        </h2>
        <p className="text-sm text-slate-500">
          Access the Ufulu Finance admin dashboard with your staff credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@ufulufinance.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={`${INPUT_CLASS} pl-10`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={`${INPUT_CLASS} pl-10 pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 h-11 w-full rounded-xl bg-[#034DA2] text-sm font-bold text-white shadow-md shadow-blue-950/15 transition-all hover:scale-[1.02] hover:bg-[#023877] active:bg-[#022955]"
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
        Access is limited to authorised staff. Customer self-registration is
        disabled.
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
