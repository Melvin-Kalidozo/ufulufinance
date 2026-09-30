import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { getProductsData } from "@/lib/cms-data";
import { EmptyState } from "@/components/public/ContentSkeletons";
import { FacilityExplorer, type PublicProduct } from "@/components/public/FacilityExplorer";
import {
  ShieldCheck,
  Award,
  Users,
  Sliders,
  HeartHandshake,
  TrendingUp,
  Wheat,
  Briefcase,
  Wallet,
  Car,
  PiggyBank,
  Zap,
  CheckCircle2,
  Percent,
} from "lucide-react";

export default async function ProductsPage() {
  const data = await getProductsData();

  const row = (r: unknown) => (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const sval = (r: unknown, k: string, d = "") => {
    const v = row(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };
  const iconOf = (key: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      Wallet, Briefcase, Users, TrendingUp, Wheat, Zap, Percent, ShieldCheck, HeartHandshake, Award, Sliders, Car, PiggyBank,
    };
    return icons[key] ?? TrendingUp;
  };
  const advantageIcon = (title: string): LucideIcon => {
    const t = title.toLowerCase();
    if (t.includes("payout")) return Zap;
    if (t.includes("grace") || t.includes("harvest")) return Wheat;
    if (t.includes("rate")) return Percent;
    return TrendingUp;
  };

  const PRODUCTS: PublicProduct[] = (data.products ?? []).map((r) => ({
    id: sval(r, "slug"),
    title: sval(r, "title"),
    tagline: sval(r, "tagline"),
    description: sval(r, "description"),
    limit: sval(r, "limit"),
    tenure: sval(r, "tenure"),
    turnaround: sval(r, "turnaround"),
    repayment: sval(r, "repayment"),
    collateral: sval(r, "collateral"),
    image: sval(r, "image"),
    isFeatured: Boolean(row(r).isFeatured),
    idealFor: sval(r, "idealFor"),
  }));

  const AUDIENCE_IMAGES = [
    "/images/audience-market-vendors.jpg",
    "/images/audience-smallholder-farmers.jpg",
    "/images/audience-civil-servants.jpg",
    "/images/audience-women-entrepreneurs.jpg",
  ];

  const WHO_WE_SERVE = (data.audiences ?? []).map((r, i) => ({
    title: sval(r, "title"),
    subtitle: sval(r, "subtitle"),
    desc: sval(r, "description"),
    icon: iconOf(sval(r, "iconKey")),
    image: sval(r, "image") || AUDIENCE_IMAGES[i % AUDIENCE_IMAGES.length],
  }));

  const PRODUCT_ADVANTAGES = (data.advantages ?? []).map((r) => ({
    title: sval(r, "title"),
    desc: sval(r, "description"),
    icon: advantageIcon(sval(r, "title")),
  }));

  if (PRODUCTS.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfdfd] px-4 py-20">
        <EmptyState
          title="No published products yet"
          description="Available credit facilities will appear here once they are published from the admin portal."
        />
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-services.jpg"
            alt="Ufulu Finance Loan Products"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021833]/95 via-[#0a2540]/90 to-[#034DA2]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Our Loan Products
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Transparent, Ethical Financial Solutions Tailored for Malawian Enterprises
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#38bdf8] font-semibold">Loan Products</span>
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCTS STATS STRIP ───────────────────────────────────── */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { stat: "8+", label: "Distinct Facility Types", sub: "MSME · Agri · Payroll · Group" },
              { stat: "24h", label: "Disbursement Turnaround", sub: "Direct Airtel & Mpamba payout" },
              { stat: "0%", label: "Hidden Fee Policy", sub: "All charges disclosed upfront" },
              { stat: "MWK 50M", label: "Max Loan Ceiling", sub: "For asset-backed facilities" },
            ].map((item) => (
              <div key={item.stat} className="py-8 px-6 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#034DA2]">{item.stat}</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{item.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 + 4. PRODUCTS EXPLORER (interactive client island) ─────── */}
      <Suspense fallback={<div className="py-24 bg-[#f8fafc]" />}>
        <FacilityExplorer products={PRODUCTS} />
      </Suspense>

      {/* ── 5. WHO WE SERVE (Full-Image Cards with Text Overlay) ─────── */}
      {WHO_WE_SERVE.length > 0 && (
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Who We Serve</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Tailored For Malawians From Every Walk of Life
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Our products are purpose-built for the reality of local commerce and employment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {WHO_WE_SERVE.map((group) => (
              <div
                key={group.title}
                className="relative rounded-2xl overflow-hidden group cursor-default aspect-[4/3] sm:aspect-[3/2]"
              >
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block">
                    {group.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    {group.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">
                    {group.desc}
                  </p>
                  <div className="pt-3 border-t border-white/20 flex items-center gap-1.5 text-[11px] font-semibold text-white/80 uppercase tracking-wide">
                    <CheckCircle2 className="size-3.5 text-white" />
                    <span>Eligible for Credit</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 6. DISTINCT PRODUCT ADVANTAGES (Integrated layout, not cards) ─ */}
      {PRODUCT_ADVANTAGES.length > 0 && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="size-2 rounded-full bg-brand-green" />
            <span>Borrower Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Engineered for Flexibility, Built for Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Enjoy credit without unfair penalties, complex bureaucracy, or predatory deductions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-t border-slate-200/80 pt-12">
          {PRODUCT_ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-[#034DA2]/10 text-[#034DA2] flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-brand-green uppercase tracking-wide">
                  <CheckCircle2 className="size-3.5 text-brand-green" />
                  <span>Guaranteed Feature</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

    </div>
  );
}
