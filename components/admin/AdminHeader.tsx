"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Menu, KeyRound, LogOut, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [pwdOpen, setPwdOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const user = session?.user;
  const initials = (user?.name || "A")
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const pageTitle =
    pathname === "/admin" ? "Dashboard" : pathname.startsWith("/admin/users") ? "Users" : "Admin";

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

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-slate-600 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        {/* Brand (mobile only — desktop uses the sidebar brand) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <Image
              src="/logo.png"
              alt="Ufulu Finance"
              width={120}
              height={40}
              priority
              className="h-5 w-auto object-contain"
            />
          </div>
        </div>

        <div className="leading-tight">
          <p className="hidden text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#009FE0] sm:block">
            Ufulu Finance
          </p>
          <h1 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            {pageTitle}
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-[#034DA2] md:inline-flex"
          >
            <Globe className="size-3.5" />
            View website
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-2.5 text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#034DA2] text-[10px] font-bold text-white">
                  {initials}
                </span>
                <span className="hidden text-xs font-semibold sm:inline">
                  {user?.name}
                </span>
                <ChevronDown className="size-3.5 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 shadow-md">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                  <span className="text-xs text-slate-500">{user?.email}</span>
                  <Badge
                    variant="outline"
                    className="mt-1 w-fit rounded-lg border-blue-200 bg-blue-50 text-[10px] font-bold uppercase tracking-wide text-[#034DA2]"
                  >
                    {user?.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPwdOpen(true)}>
                <KeyRound className="size-4" />
                Change password
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#034DA2] text-white hover:bg-[#023877]"
                >
                  {saving ? "Saving..." : "Update password"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
