"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserRound,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Loans", href: "/loans" },
  { label: "About us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Job listings", href: "/jobs" },
  { label: "Contact us", href: "/contact" },
];

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";
  // The customer portal (/account) is DISABLED — customer accounts are a
  // future improvement. Only admin/staff accounts exist today, so the signed-in
  // menu below only links into /admin for now.
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* ── MAIN HEADER (Transparent on hero → Turns white on scroll, borderless on hero) ─ */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm"
            : "bg-gradient-to-b from-slate-950/60 to-transparent"
        )}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Brand Logo ── */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div
              className={cn(
                "rounded-xl p-1.5 transition-all duration-300 flex items-center justify-center",
                isScrolled
                  ? "bg-transparent"
                  : "bg-white/95 shadow-sm border border-white/40 backdrop-blur-xs"
              )}
            >
              <Image
                src="/logo.png"
                alt="Ufulu Finance - Financial Freedom in Reach"
                width={175}
                height={55}
                priority
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </div>
          </Link>

          {/* ── Desktop Navigation (Animated Underline Highlight) ── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-2.5 px-3 text-sm font-semibold transition-colors duration-200 group flex flex-col items-center",
                    isScrolled
                      ? active
                        ? "text-[#034DA2]"
                        : "text-slate-600 hover:text-slate-950"
                      : active
                      ? "text-[#38bdf8]"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  <span>{link.label}</span>
                  {/* Small animated underline */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out",
                      active
                        ? cn(
                            "w-4/5",
                            isScrolled ? "bg-[#034DA2]" : "bg-[#38bdf8]"
                          )
                        : cn(
                            "w-0 group-hover:w-3/5 opacity-0 group-hover:opacity-100",
                            isScrolled ? "bg-[#034DA2]/60" : "bg-[#38bdf8]/80"
                          )
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            {/* Apply Now button */}
            <Link
              href="/loans"
              className={cn(
                "hidden sm:inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 cursor-pointer",
                isScrolled
                  ? "bg-[#034DA2] hover:bg-[#023877] active:bg-[#022955] text-white shadow-md shadow-blue-900/15"
                  : "bg-[#00A3E0] hover:bg-[#0284C7] active:bg-[#0369a1] text-white font-bold shadow-lg shadow-sky-950/30"
              )}
            >
              Apply Now
            </Link>

            {/* User profile dropdown if authenticated */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-2 rounded-xl p-1 pr-2.5 transition-colors border",
                      isScrolled
                        ? "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        : "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                    )}
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#034DA2] text-[10px] font-bold text-white">
                      {initials}
                    </span>
                    <span className="hidden text-xs font-semibold xl:inline">
                      {user.name}
                    </span>
                    <ChevronDown className="size-3 opacity-60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl shadow-md border-slate-200"
                >
                  <DropdownMenuLabel>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <LayoutDashboard className="size-4" />
                        Admin portal
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    // Customer portal (/account) is disabled — future improvement.
                    <DropdownMenuItem disabled className="opacity-60">
                      <UserRound className="size-4" />
                      My account (coming soon)
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border transition-colors lg:hidden",
                isScrolled
                  ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU (White Slide Down Drawer) ───────────────────── */}
      {mobileOpen && (
        <div className="bg-white/98 backdrop-blur-xl border-b border-slate-200 text-slate-900 px-5 py-6 lg:hidden shadow-2xl space-y-4">
          <nav className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-2.5 text-sm font-semibold rounded-xl px-3.5 transition-colors",
                    active
                      ? "bg-[#034DA2] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    className={cn(
                      "size-3.5 transition-opacity",
                      active ? "text-white opacity-90" : "text-slate-400 opacity-60"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 text-center space-y-1">
              <p className="font-semibold text-slate-700">+265 99 123 4567 &middot; info@ufulufinance.com</p>
              <p>City Centre, Area 3, Lilongwe, Malawi</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
