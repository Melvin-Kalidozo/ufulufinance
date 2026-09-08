"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, X, ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER SELF-REGISTRATION — DISABLED
//
// The live system only has admin/staff accounts (provisioned via the admin
// "Users" manager or the seed script). The public-facing customer portal
// (/account) is a FUTURE IMPROVEMENT, so this sign-up screen is muted.
//
// To re-enable when customer self-service launches, flip
// SELF_REGISTRATION_DISABLED to false — the full multi-step form + email
// verification flow below is kept intact for that purpose.
// ─────────────────────────────────────────────────────────────────────────────
const SELF_REGISTRATION_DISABLED = true;

const RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

type Step = "form" | "verify";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const passedRules = RULES.filter((r) => r.test(password)).length;
  const allRulesPassed = passedRules === RULES.length;
  const passwordsMatch = password === confirm && confirm.length > 0;
  const canSubmit = allRulesPassed && passwordsMatch && email.length > 0 && name.length > 0;

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to create account");
        return;
      }
      toast.success(data.message || "Verification code sent!");
      setStep("verify");
      setCountdown(60);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) inputsRef.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    setOtp(text.split(""));
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  }

  async function handleVerify() {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Verification failed");
        return;
      }
      toast.success("Email verified! Please sign in.");
      router.push(`/signin?verified=${encodeURIComponent(email)}`);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function handleResend() {
    if (countdown > 0) return;
    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to resend code");
        return;
      }
      toast.success("New code sent!");
      setCountdown(60);
    } catch {
      toast.error("Network error. Please try again.");
    }
  }

  if (SELF_REGISTRATION_DISABLED) {
    return (
      <div className="space-y-6">
        <div className="space-y-1.5">
          <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#034DA2]">
            <ShieldCheck className="size-5" />
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#034DA2]">
            Staff Portal
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Registration is invite-only
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-500">
          Self-service account creation is currently disabled. Admin and
          customer accounts are provisioned by the Ufulu Finance team. The
          customer portal will open for public self-registration in a future
          improvement.
        </p>

        <Link
          href="/signin"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#034DA2] px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-950/15 transition-all hover:scale-[1.02] hover:bg-[#023877]"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Verify your email</h2>
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
            {otp.map((digit, i) => (
              <Input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="h-12 w-12 px-0 text-center text-lg font-bold"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          <Button className="w-full" onClick={handleVerify} disabled={verifying}>
            {verifying ? "Verifying..." : "Verify & Create Account"}
          </Button>

          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">
              Didn&apos;t get the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className="font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
              </button>
            </p>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Get started
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
        <p className="text-sm text-muted-foreground">
          Open a customer account to access loans, savings and more.
        </p>
      </div>

      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
            autoComplete="name"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+265 99 000 0000"
            autoComplete="tel"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {password && (
            <div className="space-y-1.5 pt-2">
              <div className="flex gap-1.5">
                {RULES.map((r, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      r.test(password) ? "bg-primary" : "bg-border"
                    )}
                  />
                ))}
              </div>
              <ul className="grid grid-cols-1 gap-1 pt-1">
                {RULES.map((r) => {
                  const ok = r.test(password);
                  return (
                    <li
                      key={r.label}
                      className={cn(
                        "flex items-center gap-1.5 text-xs",
                        ok ? "text-success" : "text-muted-foreground"
                      )}
                    >
                      {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                      {r.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {confirm.length > 0 && (
            <p
              className={cn(
                "text-xs",
                passwordsMatch ? "text-success" : "text-destructive"
              )}
            >
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={!canSubmit || loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
