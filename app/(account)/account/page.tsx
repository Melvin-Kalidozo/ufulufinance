"use client";

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER ACCOUNT PORTAL — DISABLED (FUTURE IMPROVEMENT)
//
// The live system only has ADMIN/staff accounts, so this page is unreachable
// for now (no customers exist and /account is not linked anywhere). Keep it
// intact — it will be the foundation of the public customer portal in a
// future improvement.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Landmark, KeyRound, LogOut, Home, ShieldCheck } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [pwdOpen, setPwdOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [signoutOpen, setSignoutOpen] = useState(false);

  const initials = (user?.name || "C")
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to change password");
        return;
      }
      toast.success("Password changed successfully");
      setPwdOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignout() {
    await signOut({ callbackUrl: "/" });
    router.refresh();
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-30 border-b bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Landmark className="size-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold">Ufulu Finance</p>
              <p className="text-xs text-muted-foreground">Customer Portal</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="size-4" />
                Home
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSignoutOpen(true)}>
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your account details and preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {initials}
              </div>
              <div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-auto text-[10px] uppercase tracking-wide">
                {user?.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-muted-foreground">Account type</Label>
                <p className="font-medium">Customer</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Status</Label>
                <p className="inline-flex items-center gap-1.5 font-medium">
                  <span className="size-1.5 rounded-full bg-success" />
                  Active
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row">
              <Button onClick={() => setPwdOpen(true)}>
                <KeyRound className="size-4" />
                Change password
              </Button>
              <Button variant="outline" onClick={() => setSignoutOpen(true)}>
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan products</CardTitle>
            <CardDescription>
              Loan applications are coming soon. Check back shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 rounded-md border border-dashed p-6 text-sm text-muted-foreground">
              <ShieldCheck className="size-6 text-primary" />
              New loan products and savings features are being prepared for your account.
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Change password dialog */}
      <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Update password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sign out confirmation */}
      <ConfirmDialog
        open={signoutOpen}
        onOpenChange={setSignoutOpen}
        title="Sign out?"
        description="You will be signed out of your account. You can sign back in anytime."
        confirmLabel="Sign out"
        variant="default"
        onConfirm={handleSignout}
      />
    </div>
  );
}
