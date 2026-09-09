"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { EmptyState, StaticHero } from "@/components/public/ContentSkeletons";
import { usePublicData } from "@/lib/content-store";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
  Sliders,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  Wheat,
  Briefcase,
  Wallet,
  Car,
  PiggyBank,
  BookOpen,
  Zap,
  CheckCircle2,
  HelpCircle,
  Percent,
} from "lucide-react";

export default function ServicesPage() {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const { body } = usePublicData<{ data: Record<string, unknown[]> }>(
    "/api/public/services-data"
  );
  const svc = body?.data ?? null;

  const svcRow = (r: unknown) => (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const sval = (r: unknown, k: string, d = "") => {
    const v = svcRow(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };
  const iconOf = (key: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      Wallet, Briefcase, Users, TrendingUp, Wheat, Zap, Percent, ShieldCheck, HeartHandshake, Award, Sliders, Car, PiggyBank,
    };
    return icons[key] ?? TrendingUp;
  };
  const serviceIcon = (slug: string): LucideIcon => {
    const map: Record<string, LucideIcon> = {
      "civil-service": Wallet,
      "private-sector-payroll": Briefcase,
      "village-banking": Users,
      "business-loans": TrendingUp,
    };
    return map[slug] ?? TrendingUp;
  };
  const advantageIcon = (title: string): LucideIcon => {
    const t = title.toLowerCase();
    if (t.includes("payout")) return Zap;
    if (t.includes("grace") || t.includes("harvest")) return Wheat;
    if (t.includes("rate")) return Percent;
    return TrendingUp;
  };

  const SERVICES = (svc?.services ?? []).map((r) => ({
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
    icon: serviceIcon(sval(r, "slug")),
    isFeatured: Boolean(svcRow(r).isFeatured),
    idealFor: sval(r, "idealFor"),
  }));

  const WHO_WE_SERVE = (svc?.audiences ?? []).map((r) => ({
    title: sval(r, "title"),
    subtitle: sval(r, "subtitle"),
    desc: sval(r, "description"),
    icon: iconOf(sval(r, "iconKey")),
  }));

  const SERVICE_ADVANTAGES = (svc?.advantages ?? []).map((r) => ({
    title: sval(r, "title"),
    desc: sval(r, "description"),
    icon: advantageIcon(sval(r, "title")),
  }));

  const activeService = SERVICES[Math.min(selectedServiceIndex, SERVICES.length - 1)];

  if (!svc) {
    return (
      <div className="min-h-screen bg-[#fcfdfd]">
        <StaticHero
          title="Credit Facilities & Services"
          subtitle="Explore the Ufulu Finance facilities designed for civil servants, businesses, groups and communities."
        />
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200/70" />
          <div className="h-64 w-full animate-pulse rounded-3xl bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-200/70" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (SERVICES.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfdfd] px-4 py-20">
        <EmptyState
          title="No published services yet"
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
            alt="Ufulu Finance Credit Services"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021833]/95 via-[#0a2540]/90 to-[#034DA2]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Our Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Transparent, Ethical Financial Solutions Tailored for Malawian Enterprises
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#38bdf8] font-semibold">Services</span>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES STATS STRIP ───────────────────────────────────── */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { stat: "8+", label: "Distinct Facility Types", sub: "MSME · Agri · Payroll · Group" },
              { stat: "24h", label: "Disbursement Turnaround", sub: "Direct Airtel & Mpamba payout" },
              { stat: "0%", label: "Hidden Fee Policy", sub: "All charges disclosed upfront" },
              { stat: "MWK 15M", label: "Max Loan Ceiling", sub: "For asset-backed facilities" },
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

      {/* ── 3 + 4. SERVICES EXPLORER (Two-panel interactive layout) ─── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="size-2 rounded-full bg-[#009FE0]" />
              <span>Our Credit Facilities</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 max-w-xl leading-tight">
                Select a Facility to Explore Full Details
              </h2>
              <p className="text-xs text-slate-500 max-w-xs sm:text-right leading-relaxed">
                Click any product below to review limits, tenure, turnaround, and repayment structure.
              </p>
            </div>
          </div>

          {/* Two-panel grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5 items-start">

            {/* ── LEFT: Service list ── */}
            <div className="flex flex-col gap-2">
              {SERVICES.map((srv, idx) => {
                const Icon = srv.icon;
                const isActive = selectedServiceIndex === idx;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`group w-full text-left rounded-2xl px-4 py-3 sm:px-4.5 sm:py-3.5 border transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                      isActive
                        ? "bg-[#034DA2] border-[#034DA2] shadow-md"
                        : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Icon bubble */}
                    <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#009FE0] text-white"
                        : "bg-slate-100 text-[#034DA2] group-hover:bg-blue-50"
                    }`}>
                      <Icon className="size-4.5" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs sm:text-sm font-bold leading-snug truncate transition-colors ${
                        isActive ? "text-white" : "text-slate-900"
                      }`}>
                        {srv.title}
                      </p>
                      <p className={`text-[11px] mt-0.5 leading-snug line-clamp-1 transition-colors ${
                        isActive ? "text-blue-200/90" : "text-slate-500"
                      }`}>
                        {srv.tagline}
                      </p>
                    </div>

                    {/* Active chevron */}
                    <div className={`size-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isActive ? "bg-[#009FE0] text-white" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                    }`}>
                      <ArrowRight className="size-3" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── RIGHT: Detail panel ── */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xl">

                {/* Cover image (compact height) */}
                <div className="relative h-[160px] sm:h-[190px] w-full overflow-hidden">
                  <Image
                    key={activeService.id}
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#009FE0] text-white shadow-xs">
                      Active Facility
                    </span>
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug drop-shadow-xs">
                      {activeService.title}
                    </h3>
                    <p className="text-xs text-blue-100/90 mt-0.5 line-clamp-1">{activeService.tagline}</p>
                  </div>
                </div>

                {/* Detail body (compact, clean light background) */}
                <div className="p-5 sm:p-6 space-y-4">

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {activeService.description}
                  </p>

                  {/* 4-stat grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: "Loan Amount", value: activeService.limit },
                      { label: "Tenure", value: activeService.tenure },
                      { label: "Disbursement", value: activeService.turnaround, accent: true },
                      { label: "Repayment", value: activeService.repayment },
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className={`text-xs sm:text-[13px] font-bold leading-snug ${item.accent ? "text-[#034DA2]" : "text-slate-900"}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Collateral */}
                  <div className="flex items-start gap-2.5 bg-blue-50/60 border border-blue-100/80 rounded-xl p-3">
                    <ShieldCheck className="size-4 text-[#034DA2] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-[#034DA2] font-bold uppercase tracking-wider mb-0.5">Security / Collateral</p>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{activeService.collateral}</p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <LoanEnquiryDialog
                      defaultFacility={activeService.title}
                      triggerButton={
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer hover:shadow-md"
                        >
                          Enquire for This Service
                          <ArrowRight className="size-3.5" />
                        </button>
                      }
                    />
                    <Link
                      href="/loans"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 px-5 py-2.5 text-xs font-semibold transition-colors"
                    >
                      Loan Calculator
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHO WE SERVE ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="size-2 rounded-full bg-[#009FE0]" />
              <span>Who We Serve</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Tailored For Malawians From Every Walk of Life
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Our products are purpose-built for the reality of local commerce and employment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_WE_SERVE.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="size-12 rounded-2xl bg-blue-50 text-[#034DA2] flex items-center justify-center border border-blue-100">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{group.title}</h3>
                    <span className="text-[11px] font-semibold text-[#009FE0] block">
                      {group.subtitle}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {group.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#034DA2]">
                    <span>Eligible for Credit</span>
                    <CheckCircle2 className="size-3.5 text-[#00A3E0]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. DISTINCT SERVICE ADVANTAGES (Non-repetitive, modern cards) ─ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <span className="size-2 rounded-full bg-[#009FE0]" />
            <span>Borrower Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Engineered for Flexibility, Built for Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Enjoy credit without unfair penalties, complex bureaucracy, or predatory deductions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="size-11 rounded-2xl bg-[#034DA2] text-[#38bdf8] flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{adv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#034DA2]">
                  <span>Guaranteed Feature</span>
                  <CheckCircle2 className="size-3 text-[#00A3E0]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
