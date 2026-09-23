"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
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
  Wallet,
  Briefcase,
  Users,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePublicData } from "@/lib/content-store";

type NavLink = { label: string; href: string; menu?: "products" | "blog" };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", menu: "products" },
  { label: "About us", href: "/about" },
  { label: "Blog", href: "/blog", menu: "blog" },
  { label: "Job listings", href: "/jobs" },
  { label: "Contact us", href: "/contact" },
];

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "civil-service": Wallet,
  "private-sector-payroll": Briefcase,
  "village-banking": Users,
  "business-loans": TrendingUp,
};

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"products" | "blog" | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  const { body: productsBody } = usePublicData<{ data: { products?: unknown[] } }>(
    "/api/public/products-data"
  );
  const { body: articlesBody } = usePublicData<{ data: unknown[] }>(
    "/api/public/articles"
  );

  const row = (r: unknown) =>
    (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const str = (r: unknown, k: string, d = "") => {
    const v = row(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };

  const PRODUCTS = ((productsBody?.data?.products ?? []) as unknown[]).map((r) => ({
    slug: str(r, "slug"),
    title: str(r, "title"),
    tagline: str(r, "tagline"),
  }));

  const LATEST_ARTICLES = ((articlesBody?.data ?? []) as unknown[])
    .map((r) => ({ slug: str(r, "slug"), title: str(r, "title") }))
    .filter((a) => a.slug && a.title)
    .slice(0, 3);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (FINCA style)
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </div>
          </Link>

          {/* ── Desktop Navigation (Animated Underline Highlight) ── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const linkClass = cn(
                "relative py-2.5 px-3 text-sm font-semibold transition-colors duration-200 group flex flex-col items-center cursor-pointer",
                isScrolled
                  ? active
                    ? "text-[#034DA2]"
                    : "text-slate-600 hover:text-slate-950"
                  : active
                  ? "text-[#38bdf8]"
                  : "text-white/90 hover:text-white"
              );

              if (link.menu) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(link.menu ?? null)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <Link
                      href={link.href}
                      aria-haspopup="true"
                      aria-expanded={openMenu === link.menu}
                      className={linkClass}
                    >
                      <span className="inline-flex items-center gap-1">
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "size-3.5 opacity-60 transition-transform",
                            openMenu === link.menu && "rotate-180"
                          )}
                        />
                      </span>
                      {/* Small animated underline */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out",
                          active || openMenu === link.menu
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

                    {openMenu === link.menu && link.menu === "products" && (
                      <div className="absolute left-0 top-full z-50 pt-3 w-[720px]">
                        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/20 border border-slate-200/90 grid grid-cols-[1fr_200px]">
                          {/* Column 1: loan products list */}
                          <div className="p-4 space-y-0.5">
                            <p className="px-3 pt-1 pb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                              Loan Products
                            </p>
                            {PRODUCTS.map((p) => {
                              const Icon = PRODUCT_ICONS[p.slug] ?? Wallet;
                              return (
                                <Link
                                  key={p.slug}
                                  href={`/products?facility=${p.slug}`}
                                  onClick={() => setOpenMenu(null)}
                                  className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-blue-50 transition-colors"
                                >
                                  <span className="size-9 rounded-lg bg-slate-100 text-[#034DA2] flex items-center justify-center group-hover/item:bg-[#034DA2] group-hover/item:text-white transition-colors shrink-0">
                                    <Icon className="size-4" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-xs font-bold text-slate-900 group-hover/item:text-[#034DA2] transition-colors">
                                      {p.title}
                                    </span>
                                    <span className="block text-[11px] text-slate-500 line-clamp-1">
                                      {p.tagline}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                            <Link
                              href="/products"
                              onClick={() => setOpenMenu(null)}
                              className="flex items-center gap-1.5 px-3 pt-2.5 text-xs font-bold text-[#034DA2] hover:text-[#023877] transition-colors"
                            >
                              Explore all products
                              <ArrowRight className="size-3.5" />
                            </Link>
                          </div>

                          {/* Column 2: full-height image */}
                          <Link
                            href="/products"
                            onClick={() => setOpenMenu(null)}
                            className="relative block bg-slate-900"
                          >
                            <Image
                              src="/images/cta-home.jpg"
                              alt="Ufulu Finance Loan Products"
                              fill
                              className="object-cover"
                              sizes="200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#021833]/95 via-[#021833]/35 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#38bdf8]">
                                Credit Facilities
                              </span>
                              <span className="block text-sm font-bold text-white leading-snug mt-0.5">
                                Find the right facility for your needs
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}

                    {openMenu === link.menu && link.menu === "blog" && (
                      <div className="absolute left-0 top-full z-50 pt-3 w-72">
                        <div className="rounded-2xl bg-white shadow-2xl shadow-slate-900/20 border border-slate-200/90 p-2">
                          <Link
                            href="/blog"
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#034DA2] transition-colors"
                          >
                            All Insights
                            <ArrowRight className="size-3.5 text-slate-400" />
                          </Link>
                          <Link
                            href="/blog?tab=blog"
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#034DA2] transition-colors"
                          >
                            Blog Articles
                          </Link>
                          <Link
                            href="/blog?tab=news"
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#034DA2] transition-colors"
                          >
                            Company News
                          </Link>
                          <Link
                            href="/blog?tab=events"
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#034DA2] transition-colors"
                          >
                            Events &amp; Workshops
                          </Link>

                          {LATEST_ARTICLES.length > 0 && (
                            <>
                              <div className="my-1.5 border-t border-slate-100" />
                              <p className="px-3 pt-1.5 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                Latest
                              </p>
                              {LATEST_ARTICLES.map((a) => (
                                <Link
                                  key={a.slug}
                                  href={`/blog/${a.slug}`}
                                  onClick={() => setOpenMenu(null)}
                                  className="block rounded-xl px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-[#034DA2] transition-colors line-clamp-2 leading-snug"
                                >
                                  {a.title}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={link.href} href={link.href} className={linkClass}>
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
              href="/products"
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

      {/* ── MOBILE MENU (Full Screen Overlay with Button at Bottom) ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex h-dvh w-full flex-col justify-between bg-white text-slate-900 lg:hidden animate-in fade-in duration-200">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Ufulu Finance"
                width={140}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Drawer Body - Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
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
                      "flex items-center justify-between py-3 px-4 text-base font-semibold rounded-2xl transition-all",
                      active
                        ? "bg-[#034DA2] text-white shadow-xs font-bold"
                        : "text-slate-800 hover:bg-slate-100 hover:text-slate-950"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      className={cn(
                        "size-4 transition-opacity",
                        active ? "text-white opacity-90" : "text-slate-400 opacity-60"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Quick sub-links */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-[#034DA2] rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Explore Facilities</span>
                <span className="text-[10px] uppercase font-bold text-[#009FE0] bg-sky-50 px-2.5 py-0.5 rounded-md">8+ Types</span>
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-[#034DA2] rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span>Frequently Asked Questions</span>
                <span className="text-[10px] text-slate-400">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Drawer Footer - Button at Bottom */}
          <div className="border-t border-slate-100 bg-white p-6">
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-[#034DA2] hover:bg-[#023877] active:bg-[#022955] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-900/20 transition-all cursor-pointer"
            >
              <span>Apply for a Loan</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
