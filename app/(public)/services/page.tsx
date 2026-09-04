"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
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

  const SERVICES = [
    {
      id: "msme",
      title: "MSME Working Capital Credit",
      tagline: "Fueling wholesale orders, retail shop stock, and daily cashflow.",
      description:
        "Designed for retailers, wholesalers, and market vendors needing prompt liquidity to purchase seasonal stock, take bulk cash discounts from suppliers, and expand retail inventory.",
      limit: "MWK 100,000 – MWK 10,000,000",
      tenure: "1 to 12 Months",
      turnaround: "Under 24 Hours",
      repayment: "Weekly or Monthly flexible instalments",
      collateral: "Business inventory, chattel mortgage, or guarantor",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
      icon: Briefcase,
      isFeatured: false,
    },
    {
      id: "agri",
      title: "Agri-Seasonal Input Credit",
      tagline: "Fertilizer, certified seed, and irrigation pumps for commercial smallholders.",
      description:
        "Structured around Malawi's agricultural planting and harvest seasons. Farmers receive critical inputs at the onset of rains, with repayment aligned to harvest commodity sales.",
      limit: "MWK 150,000 – MWK 7,500,000",
      tenure: "3 to 9 Months (with crop grace periods)",
      turnaround: "48 Hours prior to planting window",
      repayment: "Bullet at harvest or tiered quarterly instalments",
      collateral: "Cooperative peer guarantee or produce pledge",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      icon: Wheat,
      isFeatured: true, // Featured Lime Card
    },
    {
      id: "payroll",
      title: "Civil Servant Salary Advances",
      tagline: "Predictable, fair payroll credit for teachers, nurses, and public servants.",
      description:
        "Transparent, low-stress salary advances to cover school fees, urgent medical needs, or domestic improvements without predatory loan-shark deductions.",
      limit: "MWK 50,000 – MWK 2,500,000",
      tenure: "1 to 24 Months",
      turnaround: "Same-day mobile money transfer",
      repayment: "Direct payroll deduction or bank stop-order",
      collateral: "Proof of government employment / payslip",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      icon: Wallet,
      isFeatured: false,
    },
    {
      id: "asset",
      title: "Asset & Equipment Financing",
      tagline: "Acquire revenue-generating vehicles, maize mills, and machinery.",
      description:
        "Hire-purchase credit allowing entrepreneurs to purchase delivery motorcycles, commercial trikes, solar irrigation pumps, and grain processing equipment that directly increase earnings.",
      limit: "MWK 500,000 – MWK 15,000,000",
      tenure: "6 to 36 Months",
      turnaround: "3 to 5 Business Days",
      repayment: "Monthly commercial instalments",
      collateral: "The financed equipment / vehicle serves as primary security",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      icon: Car,
      isFeatured: false,
    },
    {
      id: "village",
      title: "Village Banking & Solidarity Groups",
      tagline: "Community-based group credit for women cooperatives and cluster savings.",
      description:
        "Leveraging group solidarity and social collateral, our field officers provide wholesale credit lines to recognized village banking groups and VSLA cooperatives.",
      limit: "MWK 50,000 – MWK 500,000 per member",
      tenure: "3 to 6 Months",
      turnaround: "48 Hours following cluster appraisal",
      repayment: "Bi-weekly or monthly cluster meetings",
      collateral: "Joint liability & peer co-guarantee",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
      icon: Users,
      isFeatured: false,
    },
    {
      id: "trade",
      title: "Commercial Trade & Invoice Bridge",
      tagline: "Short-term liquidity for tenders, government LPOs, and bulk delivery.",
      description:
        "Bridge the gap between product delivery and invoice settlement with established corporate or public sector purchasers across major trade hubs.",
      limit: "MWK 1,000,000 – MWK 20,000,000",
      tenure: "30 to 90 Days",
      turnaround: "24 to 48 Hours",
      repayment: "Direct invoice liquidation via escrow",
      collateral: "Assignment of verifiable Local Purchase Order (LPO)",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      icon: TrendingUp,
      isFeatured: false,
    },
    {
      id: "advisory",
      title: "Financial Literacy & Advisory",
      tagline: "Practical cashflow coaching, debt servicing, and bookkeeping clinics.",
      description:
        "Every client gains free access to Ufulu’s practical business management workshops, teaching record keeping, pricing discipline, and cashflow separation.",
      limit: "Included with every facility",
      tenure: "Continuous Support",
      turnaround: "On-demand at any branch",
      repayment: "Complimentary institutional benefit",
      collateral: "None required",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      icon: BookOpen,
      isFeatured: false,
    },
    {
      id: "emergency",
      title: "Family Emergency Relief Credit",
      tagline: "Fast assistance for hospital admissions, funeral expenses, and school fees.",
      description:
        "Life happens unexpectedly. Our expedited personal relief loans protect households from distressed asset sales or high-interest predatory loan sharks.",
      limit: "MWK 30,000 – MWK 500,000",
      tenure: "1 to 3 Months",
      turnaround: "Under 4 Hours",
      repayment: "Monthly or split salary payments",
      collateral: "Character reference & active bank/mobile statement",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      icon: Zap,
      isFeatured: false,
    },
  ];

  const WHO_WE_SERVE = [
    {
      title: "Market Vendors & Retailers",
      subtitle: "Area 2, Tsoka Market, Limbe, and Regional Trade Hubs",
      desc: "Fast working capital for bulk purchases, seasonal inventory build-up, and rapid stock turn.",
      icon: Briefcase,
    },
    {
      title: "Smallholder Farmers & Growers",
      subtitle: "Mchinji, Dedza, Kasungu, and Central Food Belts",
      desc: "Timely fertilizer and seed packages structured to match rainfall patterns and harvest commodity sales.",
      icon: Wheat,
    },
    {
      title: "Civil Servants & Teachers",
      subtitle: "Ministries, District Councils, Health & Education Services",
      desc: "Transparent salary advances with zero hidden fees and automated payroll deduction convenience.",
      icon: Wallet,
    },
    {
      title: "Women Entrepreneurs & Savings Groups",
      subtitle: "Village Banking Clusters & Cooperative Federations",
      desc: "Solidarity-backed credit lines supporting women-led micro-enterprises and community wealth building.",
      icon: Users,
    },
  ];

  const SERVICE_ADVANTAGES = [
    {
      title: "Same-Day Mobile Payouts",
      desc: "Funds pushed directly to Airtel Money or TNM Mpamba within minutes of agreement verification.",
      icon: Zap,
    },
    {
      title: "Harvest-Aligned Grace Periods",
      desc: "Repayment dates matched specifically to crop marketing cycles so farmers never struggle during growing seasons.",
      icon: Wheat,
    },
    {
      title: "Transparent & Published Rates",
      desc: "Every kwacha of interest and processing fee is clearly itemized with zero surprise deductions.",
      icon: Percent,
    },
    {
      title: "Credit Limit Escalator",
      desc: "Timely repayments automatically unlock higher credit limits up to MWK 15,000,000 for your business.",
      icon: TrendingUp,
    },
  ];

  const activeService = SERVICES[selectedServiceIndex];

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80"
            alt="Ufulu Finance Credit Services"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0b2b1b]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Our Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Transparent, Ethical Financial Solutions Tailored for Malawian Enterprises
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Services</span>
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
                <p className="text-3xl sm:text-4xl font-extrabold text-[#1b4332]">{item.stat}</p>
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
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
                        ? "bg-[#1b4332] border-[#1b4332] shadow-md"
                        : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Icon bubble */}
                    <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#84cc16] text-slate-950"
                        : "bg-slate-100 text-[#1b4332] group-hover:bg-emerald-50"
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
                        isActive ? "text-emerald-200/90" : "text-slate-500"
                      }`}>
                        {srv.tagline}
                      </p>
                    </div>

                    {/* Active chevron */}
                    <div className={`size-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isActive ? "bg-[#84cc16] text-slate-950" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
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
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#84cc16] text-slate-950 shadow-xs">
                      Active Facility
                    </span>
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug drop-shadow-xs">
                      {activeService.title}
                    </h3>
                    <p className="text-xs text-emerald-100/90 mt-0.5 line-clamp-1">{activeService.tagline}</p>
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
                        <p className={`text-xs sm:text-[13px] font-bold leading-snug ${item.accent ? "text-[#1b4332]" : "text-slate-900"}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Collateral */}
                  <div className="flex items-start gap-2.5 bg-emerald-50/60 border border-emerald-100/80 rounded-xl p-3">
                    <ShieldCheck className="size-4 text-[#1b4332] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-emerald-900/80 font-bold uppercase tracking-wider mb-0.5">Security / Collateral</p>
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
                          className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer hover:shadow-md"
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
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
                    <div className="size-12 rounded-2xl bg-[#a3e635]/20 text-[#1b4332] flex items-center justify-center">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{group.title}</h3>
                    <span className="text-[11px] font-semibold text-emerald-800 block">
                      {group.subtitle}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {group.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#1b4332]">
                    <span>Eligible for Credit</span>
                    <CheckCircle2 className="size-3.5 text-[#65a30d]" />
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
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="size-2 rounded-full bg-[#84cc16]" />
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
                  <div className="size-11 rounded-2xl bg-[#1b4332] text-[#84cc16] flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{adv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
                  <span>Guaranteed Feature</span>
                  <CheckCircle2 className="size-3 text-[#65a30d]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
