"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { StaticHero } from "@/components/public/ContentSkeletons";
import { usePublicData } from "@/lib/content-store";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  Wheat,
  Briefcase,
  Wallet,
  Car,
  Calculator,
  CheckCircle2,
  FileText,
  BadgeCheck,
  HelpCircle,
  X,
  Clock,
  SendHorizontal,
} from "lucide-react";

interface LoanProduct {
  id: string;
  name: string;
  category: "msme" | "agri" | "payroll" | "group";
  categoryLabel: string;
  badge: string;
  tagline: string;
  minAmount: number;
  maxAmount: number;
  minMonths: number;
  maxMonths: number;
  interestRateMonthly: number;
  processingFeePercent: number;
  image: string;
  isFeatured: boolean;
  intro: string;
  keyDetails: string[];
  eligibility: string[];
  kycRequirements: string[];
  repaymentTerms: string;
}

type LoanRow = Record<string, unknown>;
const CATEGORY_KEYS = ["msme", "agri", "payroll", "group"] as const;
const num = (r: LoanRow, k: string, d = 0) => {
  const v = r[k];
  return v !== undefined && v !== null && !Number.isNaN(Number(v)) ? Number(v) : d;
};
const arr = (r: LoanRow, k: string): string[] => {
  const v = r[k];
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string") return v ? [v] : [];
  return [];
};
function toLoan(r: LoanRow): LoanProduct {
  const rawCat = String(r.category ?? "");
  return {
    id: String(r.slug ?? r.name ?? ""),
    name: String(r.name ?? ""),
    category: (CATEGORY_KEYS.includes(rawCat as (typeof CATEGORY_KEYS)[number]) ? rawCat : "msme") as LoanProduct["category"],
    categoryLabel: String(r.categoryLabel ?? ""),
    badge: String(r.badge ?? ""),
    tagline: String(r.tagline ?? ""),
    minAmount: num(r, "minAmount"),
    maxAmount: num(r, "maxAmount"),
    minMonths: num(r, "minMonths"),
    maxMonths: num(r, "maxMonths"),
    interestRateMonthly: num(r, "interestRateMonthly"),
    processingFeePercent: num(r, "processingFeePercent"),
    image: String(r.image ?? ""),
    isFeatured: Boolean(r.isFeatured),
    intro: String(r.intro ?? ""),
    keyDetails: arr(r, "keyDetails"),
    eligibility: arr(r, "eligibility"),
    kycRequirements: arr(r, "kycRequirements"),
    repaymentTerms: Array.isArray(r.repaymentTerms)
      ? (r.repaymentTerms as unknown[]).join("\n")
      : String(r.repaymentTerms ?? ""),
  };
}

export default function LoansPage() {
  const { body } = usePublicData<{ data: unknown[] }>("/api/public/loan-products");
  const loading = body === null;
  const liveProducts: LoanProduct[] = (body?.data ?? []).map((r) => toLoan(r as LoanRow));

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<LoanProduct | null>(null);

  // Repayment Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(1000000);
  const [calcMonths, setCalcMonths] = useState<number>(6);
  const [calcRateMonthly, setCalcRateMonthly] = useState<number>(3.5);

  const LOAN_PRODUCTS: LoanProduct[] = liveProducts;

  // Deep-link: scroll to the calculator once content (and its anchor) is rendered.
  useEffect(() => {
    if (loading) return;
    if (typeof window !== "undefined" && window.location.hash === "#calculator") {
      const el = document.getElementById("calculator");
      if (el) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        );
      }
    }
  }, [loading]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return LOAN_PRODUCTS;
    return LOAN_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, LOAN_PRODUCTS]);

  // Calculator computations
  const estimatedMonthlyPayment = useMemo(() => {
    const principalPerMonth = calcAmount / calcMonths;
    const interestPerMonth = (calcAmount * (calcRateMonthly / 100));
    return Math.round(principalPerMonth + interestPerMonth);
  }, [calcAmount, calcMonths, calcRateMonthly]);

  const estimatedTotalPayment = useMemo(() => {
    return estimatedMonthlyPayment * calcMonths;
  }, [estimatedMonthlyPayment, calcMonths]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfd]">
        <StaticHero
          title="Loan Products"
          subtitle="Product Categories · Featured Facilities · Eligibility · Repayment Calculator"
        />
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-slate-200/70" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-loans.jpg"
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
            Loan Products
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Product Categories &middot; Featured Facilities &middot; Eligibility &middot; Repayment Calculator
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

      {/* ── 2. PRODUCT CATEGORIES & FEATURED LOANS ─────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <span className="size-2 rounded-full bg-brand-green" />
                <span>Product Categories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Explore Available Loan Facilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Filter by category to find the credit facility matching your business or household needs.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-medium self-start md:self-auto overflow-x-auto max-w-full">
              {[
                { id: "all", label: "All Products" },
                { id: "msme", label: "MSME Business" },
                { id: "agri", label: "Agri-Finance" },
                { id: "payroll", label: "Payroll Advances" },
                { id: "group", label: "Group Lending" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-[#034DA2] text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              if (prod.isFeatured) {
                return (
                  <div
                    key={prod.id}
                    className="rounded-3xl p-7 bg-gradient-to-br from-[#021833] via-[#034DA2] to-[#008AC8] text-white shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1 relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-[#38bdf8] text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-sm border border-white/20">
                          {prod.badge}
                        </span>
                        <span className="text-xs font-bold text-blue-100">
                          {prod.categoryLabel}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-blue-100/90 font-medium mt-2 leading-relaxed">
                        {prod.tagline}
                      </p>

                      <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2 text-xs">
                        <div className="flex justify-between font-bold">
                          <span>Limit:</span>
                          <span className="text-[#38bdf8]">MWK {prod.minAmount.toLocaleString()} – {prod.maxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-blue-100">
                          <span>Tenure:</span>
                          <span>{prod.minMonths} to {prod.maxMonths} Months</span>
                        </div>
                        <div className="flex justify-between text-blue-100">
                          <span>Monthly Rate:</span>
                          <span>{prod.interestRateMonthly}% / Month</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalProduct(prod)}
                        className="text-xs font-bold text-[#38bdf8] underline hover:text-white transition-colors cursor-pointer"
                      >
                        View Full Details &amp; KYC
                      </button>
                      <LoanEnquiryDialog
                        defaultFacility={prod.name}
                        defaultMinAmount={prod.minAmount}
                        defaultMaxAmount={prod.maxAmount}
                        triggerButton={
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3E0] hover:bg-[#0284C7] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                          >
                            Apply Now
                            <ArrowRight className="size-3.5" />
                          </button>
                        }
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#034DA2] border border-blue-100 text-[10px] font-bold uppercase tracking-wide">
                        {prod.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {prod.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {prod.tagline}
                    </p>

                    <div className="mt-6 p-4 rounded-2xl bg-slate-50 space-y-2 text-xs border border-slate-100">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Limit:</span>
                        <span className="text-[#034DA2]">MWK {prod.minAmount.toLocaleString()} – {prod.maxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Tenure:</span>
                        <span>{prod.minMonths} to {prod.maxMonths} Months</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Monthly Rate:</span>
                        <span>{prod.interestRateMonthly}% / Month</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalProduct(prod)}
                      className="text-xs font-bold text-[#034DA2] hover:underline transition-colors cursor-pointer"
                    >
                      View Full Details &amp; KYC
                    </button>
                    <LoanEnquiryDialog
                      defaultFacility={prod.name}
                      defaultAmount={prod.minAmount ? String(prod.minAmount) : undefined}
                      defaultMinAmount={prod.minAmount}
                      defaultMaxAmount={prod.maxAmount}
                      triggerButton={
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white text-xs font-semibold transition-all cursor-pointer"
                        >
                          Enquire Now
                          <ArrowRight className="size-3.5" />
                        </button>
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. REPAYMENT INFORMATION & LIVE CALCULATOR (FULL-WIDTH) ──── */}
      <section id="calculator" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#021833] via-[#0a2540] to-[#034DA2] text-white py-20 sm:py-28 sm:scroll-mt-28">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_#009FE0_0%,_transparent_60%)]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#009FE0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                <Calculator className="size-4" />
                <span>Transparent Repayment Calculator</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Plan Your Financing with Complete Predictability
                </h2>
                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl font-normal">
                  Adjust your desired borrowing amount and repayment tenure to preview your estimated monthly instalments with zero hidden markups.
                </p>
              </div>

              {/* Amount Slider Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Desired Borrowing Amount:</span>
                  <span className="text-[#38bdf8] text-2xl sm:text-3xl font-black tracking-tight">
                    MWK {calcAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-[#009FE0] cursor-pointer h-2.5 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-medium text-blue-200/75">
                  <span>Min: MWK 100,000</span>
                  <span>Max: MWK 10,000,000</span>
                </div>
              </div>

              {/* Tenure Selection Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-3 backdrop-blur-xs">
                <label className="text-xs sm:text-sm font-semibold text-slate-200 block">
                  Select Loan Duration (Months):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {[1, 3, 6, 9, 12, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCalcMonths(m)}
                      className={`py-3 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                        calcMonths === m
                          ? "bg-[#009FE0] text-white border-[#009FE0] shadow-lg font-black scale-105"
                          : "bg-white/10 text-white border-white/15 hover:bg-white/20"
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Summary Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Estimated Repayment Summary
              </span>

              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs font-semibold text-slate-500">Estimated Monthly Instalment</span>
                <p className="text-3xl sm:text-4xl font-black text-[#034DA2] mt-1 tracking-tight">
                  MWK {estimatedMonthlyPayment.toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Includes principal &amp; monthly flat rate
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Principal Amount:</span>
                  <span className="font-bold text-slate-900">MWK {calcAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Loan Duration:</span>
                  <span className="font-bold text-slate-900">{calcMonths} Months</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Total Estimated Repayment:</span>
                  <span className="font-bold text-slate-900">MWK {estimatedTotalPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 items-center">
                  <span className="text-slate-500">Disbursement Turnaround:</span>
                  <span className="inline-flex items-center gap-1 text-brand-green bg-brand-green-soft px-2.5 py-1 rounded-full font-bold text-[11px]">
                    Within 24 Hours
                  </span>
                </div>
              </div>

              <LoanEnquiryDialog
                defaultFacility="MSME QuickGrowth Working Capital"
                defaultAmount={String(calcAmount)}
                defaultMinAmount={100000}
                defaultMaxAmount={10000000}
                triggerButton={
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00A3E0] hover:bg-[#0284C7] text-white py-4 text-sm font-bold shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <span>Enquire for This Loan Facility</span>
                    <ArrowRight className="size-4" />
                  </button>
                }
              />
              <p className="text-[11px] text-center text-slate-400 leading-normal">
                Transparent indicative quote. Sanctioned terms, dates, and amounts are finalized upon physical or digital KYC submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. APPLICATION & DISBURSEMENT JOURNEY ─────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Simple, Fast &amp; Dignified</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              How Application to Disbursement Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We streamlined our process so you spend less time gathering paperwork and more time expanding your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Calculate & Select",
                desc: "Choose the facility matching your cashflow and preview transparent terms with our live calculator.",
                icon: Calculator,
                badge: "Self-Service",
              },
              {
                step: "02",
                title: "Submit 60s Enquiry",
                desc: "Send your basic contact and borrowing request online or drop by any of our regional branch offices.",
                icon: SendHorizontal,
                badge: "Fast Online",
              },
              {
                step: "03",
                title: "Rapid Verification",
                desc: "A dedicated loan officer verifies your National ID and business cashflow with respectful, clear terms.",
                icon: ShieldCheck,
                badge: "Same-Day",
              },
              {
                step: "04",
                title: "24-Hour Funding",
                desc: "Once approved, sanctioned funds are credited straight into your Airtel Money, TNM Mpamba, or bank account.",
                icon: Wallet,
                badge: "Disbursed",
              },
            ].map(({ step, title, desc, icon: Icon, badge }) => (
              <div
                key={step}
                className="relative bg-slate-50 rounded-3xl p-7 border border-slate-200 hover:border-[#00A3E0] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-[#00A3E0] transition-colors">
                      {step}
                    </span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                      {badge}
                    </span>
                  </div>

                  <div className="size-12 rounded-2xl bg-white shadow-xs border border-slate-200 text-[#01214A] flex items-center justify-center mb-5 group-hover:bg-[#01214A] group-hover:text-white transition-colors">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-[#01214A]">
                  <span>Step {step} Verified</span>
                  <CheckCircle2 className="size-3.5 text-[#00A3E0]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ELIGIBILITY & KYC REQUIREMENTS ───────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Eligibility &amp; Requirements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Straightforward, Practical Qualification Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Prepare these standard documents before visiting our branch or applying online for rapid same-day processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="size-11 rounded-2xl bg-[#00A3E0]/15 text-[#034DA2] flex items-center justify-center">
                <BadgeCheck className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Basic Eligibility</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>Malawian citizen aged 21 to 65 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>Active business operating for minimum 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>Or confirmed civil servant / permanent employee</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="size-11 rounded-2xl bg-[#00A3E0]/15 text-[#034DA2] flex items-center justify-center">
                <FileText className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. KYC Identification</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>National ID (Smart Card) or valid Malawian Passport</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>2 recent passport-size photographs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>Proof of residence (water/electric bill or chief's letter)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="size-11 rounded-2xl bg-[#00A3E0]/15 text-[#034DA2] flex items-center justify-center">
                <Users className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Financial Statements</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>3 to 6 months bank or mobile money statement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>Or latest 3 months official payslips (for salary loans)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span>One reliable local guarantor or peer cluster pledge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INDIVIDUAL LOAN PRODUCT MODAL (Product Introduction → Key Details → Eligibility → KYC Requirements → Repayment & Charges → Enquiry Form) ── */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Product Introduction */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#034DA2]">
                {activeModalProduct.categoryLabel}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {activeModalProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {activeModalProduct.intro}
              </p>
            </div>

            {/* Key Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Facility Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block">Limit Range</span>
                  <span className="font-bold text-slate-900">
                    MWK {activeModalProduct.minAmount.toLocaleString()} – {activeModalProduct.maxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block">Duration</span>
                  <span className="font-bold text-slate-900">
                    {activeModalProduct.minMonths} to {activeModalProduct.maxMonths} Months
                  </span>
                </div>
              </div>
              <ul className="space-y-1.5 pt-1 text-xs text-slate-600">
                {activeModalProduct.keyDetails.map((k, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[#00A3E0]" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility & KYC Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Eligibility Criteria
                </h5>
                <ul className="space-y-1 text-xs text-slate-600">
                  {activeModalProduct.eligibility.map((e, i) => (
                    <li key={i}>&bull; {e}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  KYC Documentation
                </h5>
                <ul className="space-y-1 text-xs text-slate-600">
                  {activeModalProduct.kycRequirements.map((k, i) => (
                    <li key={i}>&bull; {k}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Repayment & Charges */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-900 space-y-1">
              <span className="font-bold uppercase tracking-wider block text-[#034DA2]">
                Repayment &amp; Charges
              </span>
              <p>{activeModalProduct.repaymentTerms}</p>
              <p className="font-semibold text-[#034DA2]">
                Monthly interest rate: {activeModalProduct.interestRateMonthly}% | Processing fee: {activeModalProduct.processingFeePercent}%
              </p>
            </div>

            {/* Enquiry CTA */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <LoanEnquiryDialog
                defaultFacility={activeModalProduct.name}
                defaultAmount={String(activeModalProduct.minAmount)}
                defaultMinAmount={activeModalProduct.minAmount}
                defaultMaxAmount={activeModalProduct.maxAmount}
                triggerButton={
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white text-xs font-bold cursor-pointer"
                  >
                    Enquire for This Product
                    <ArrowRight className="size-3.5" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
