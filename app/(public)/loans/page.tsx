"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
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

const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "msme-working-capital",
    name: "MSME QuickGrowth Working Capital",
    category: "msme",
    categoryLabel: "MSME Business",
    badge: "Most Popular",
    tagline: "Speedy inventory and restocking cash for registered shops and market traders.",
    minAmount: 100000,
    maxAmount: 10000000,
    minMonths: 1,
    maxMonths: 12,
    interestRateMonthly: 3.5,
    processingFeePercent: 2.0,
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    intro:
      "A fast-response credit line created for active merchants, wholesalers, and stall operators. Avoid lost inventory sales and negotiate bulk supplier discounts with ready cash.",
    keyDetails: [
      "Disbursement within 24 hours of approval",
      "Flexible weekly or monthly repayment cycles",
      "Repeat borrowers qualify for credit limit increases up to MWK 10,000,000",
      "Direct mobile wallet (Airtel Money / TNM Mpamba) disbursement",
    ],
    eligibility: [
      "Operating business location for a minimum of 6 months",
      "Demonstrable daily or weekly sales cashflow",
      "Malawian citizen aged 21 years and above",
    ],
    kycRequirements: [
      "Valid National Identity Card",
      "Recent 3 months mobile money or commercial bank statement",
      "Proof of physical trading stall / business residence",
      "Two passport-sized photographs",
    ],
    repaymentTerms:
      "Flat monthly interest calculated transparently. Early repayment without penalties.",
  },
  {
    id: "agri-seasonal-booster",
    name: "Mlimi Harvest Input Booster",
    category: "agri",
    categoryLabel: "Agri-Finance",
    badge: "Seasonal Special",
    tagline: "Fertilizer, seed, and irrigation financing tailored to harvest cycles.",
    minAmount: 150000,
    maxAmount: 7500000,
    minMonths: 3,
    maxMonths: 9,
    interestRateMonthly: 3.0,
    processingFeePercent: 1.5,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    intro:
      "Engineered specifically for central Malawi smallholders cultivating maize, soya, groundnuts, and tobacco. Get inputs when rain falls, repay when you sell your crop.",
    keyDetails: [
      "Structured grace period during the growing window",
      "Bullet repayment options following commodity harvest sales",
      "Input delivery partnerships with accredited seed & fertilizer distributors",
      "Agronomic risk advisory included at zero cost",
    ],
    eligibility: [
      "Cultivating minimum 1.5 acres of farmland",
      "Membership in an agricultural club or cooperative preferred",
      "Historical proof of crop production for at least 2 seasons",
    ],
    kycRequirements: [
      "Valid National ID Card",
      "Letter of confirmation from Village Head or Cooperative Chairman",
      "Produce buyer contract or historical marketing receipts",
    ],
    repaymentTerms:
      "Flexible schedule with principal payable upon harvest commodity aggregation.",
  },
  {
    id: "boma-salary-express",
    name: "Boma Civil Servant Express",
    category: "payroll",
    categoryLabel: "Payroll Advances",
    badge: "Low Interest",
    tagline: "Low-stress salary advances for teachers, nurses, and government staff.",
    minAmount: 50000,
    maxAmount: 2500000,
    minMonths: 1,
    maxMonths: 24,
    interestRateMonthly: 2.8,
    processingFeePercent: 1.0,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    intro:
      "A dignified salary loan for civil servants facing school fee deadlines, hospital emergencies, or home improvements, protecting you from aggressive informal loan sharks.",
    keyDetails: [
      "Turnaround under 4 hours via Airtel Money or Mpamba",
      "Zero collateral required — salary backed",
      "Extended tenure up to 24 months for larger capital needs",
      "Strict compliance with maximum 1/3 net salary take-home regulations",
    ],
    eligibility: [
      "Permanent employment with Government of Malawi or approved public agency",
      "Minimum 3 months confirmed service",
      "Salary paid via commercial bank account",
    ],
    kycRequirements: [
      "Valid National Identity Card",
      "Latest 3 months original payslips",
      "Recent 3 months certified bank statement showing salary deposits",
      "Staff employment ID card",
    ],
    repaymentTerms:
      "Direct payroll deduction or bank stop-order on the official government salary date.",
  },
  {
    id: "tikondane-group-credit",
    name: "Tikondane Solidarity Cluster Credit",
    category: "group",
    categoryLabel: "Group Lending",
    badge: "Community First",
    tagline: "Solidarity-backed credit lines for women cooperatives and village banking.",
    minAmount: 50000,
    maxAmount: 500000,
    minMonths: 3,
    maxMonths: 6,
    interestRateMonthly: 3.2,
    processingFeePercent: 1.0,
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    intro:
      "Wholesale credit lines for established Village Savings and Loans Associations (VSLAs). Empowering female micro-entrepreneurs without demanding traditional real estate collateral.",
    keyDetails: [
      "Joint liability and peer support replace physical collateral",
      "Fortnightly field officer collection at your community meeting place",
      "Free financial literacy and cooperative governance training",
    ],
    eligibility: [
      "Member of an active group with at least 5 to 25 verified members",
      "Group operating with consistent savings history for at least 6 months",
    ],
    kycRequirements: [
      "National ID for all group signatories",
      "Group constitution and meeting minute book",
      "Introduction letter from local Community Development Assistant (CDA)",
    ],
    repaymentTerms:
      "Bi-weekly or monthly collection during standard cluster group meetings.",
  },
  {
    id: "asset-finance-trike",
    name: "Commercial Asset & Equipment Credit",
    category: "msme",
    categoryLabel: "MSME Business",
    badge: "Asset Backed",
    tagline: "Finance delivery motorcycles, trikes, solar pumps, and grain mills.",
    minAmount: 500000,
    maxAmount: 15000000,
    minMonths: 6,
    maxMonths: 36,
    interestRateMonthly: 2.9,
    processingFeePercent: 2.0,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    intro:
      "Acquire productive equipment that generates daily revenue. Ufulu Finance pays the vendor directly, and the asset secures the facility while you generate income.",
    keyDetails: [
      "Up to 80% financing of asset invoice value",
      "Asset itself serves as security",
      "Comprehensive insurance package structured into monthly payments",
    ],
    eligibility: [
      "Verifiable existing enterprise in transport, logistics, or agro-processing",
      "Ability to contribute 20% down payment",
    ],
    kycRequirements: [
      "National ID and business registration certificate",
      "Pro-forma invoice from authorized equipment/vehicle dealer",
      "6 months bank or mobile money turnover statement",
    ],
    repaymentTerms:
      "Equal monthly instalments matched to the asset's productive lifespan.",
  },
];

export default function LoansPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<LoanProduct | null>(null);

  // Repayment Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(1000000);
  const [calcMonths, setCalcMonths] = useState<number>(6);
  const [calcRateMonthly, setCalcRateMonthly] = useState<number>(3.5);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return LOAN_PRODUCTS;
    return LOAN_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Calculator computations
  const estimatedMonthlyPayment = useMemo(() => {
    const principalPerMonth = calcAmount / calcMonths;
    const interestPerMonth = (calcAmount * (calcRateMonthly / 100));
    return Math.round(principalPerMonth + interestPerMonth);
  }, [calcAmount, calcMonths, calcRateMonthly]);

  const estimatedTotalPayment = useMemo(() => {
    return estimatedMonthlyPayment * calcMonths;
  }, [estimatedMonthlyPayment, calcMonths]);

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=2400&q=80"
            alt="Ufulu Finance Loan Products"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0b2b1b]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Loan Products
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Product Categories &middot; Featured Facilities &middot; Eligibility &middot; Repayment Calculator
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Loan Products</span>
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCT CATEGORIES & FEATURED LOANS ─────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-[#84cc16]" />
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
                      ? "bg-[#1b4332] text-white shadow-xs"
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
                    className="rounded-3xl p-7 bg-[#84cc16] text-slate-950 shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1 relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-slate-950 text-[#84cc16] text-[10px] font-extrabold uppercase tracking-wide">
                          {prod.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-950">
                          {prod.categoryLabel}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-900 font-medium mt-2 leading-relaxed">
                        {prod.tagline}
                      </p>

                      <div className="mt-6 p-4 rounded-2xl bg-slate-950/10 space-y-2 text-xs">
                        <div className="flex justify-between font-bold">
                          <span>Limit:</span>
                          <span>MWK {prod.minAmount.toLocaleString()} – {prod.maxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-900">
                          <span>Tenure:</span>
                          <span>{prod.minMonths} to {prod.maxMonths} Months</span>
                        </div>
                        <div className="flex justify-between text-slate-900">
                          <span>Monthly Rate:</span>
                          <span>{prod.interestRateMonthly}% / Month</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-950/10 flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalProduct(prod)}
                        className="text-xs font-bold underline hover:text-slate-800 transition-colors cursor-pointer"
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
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-[#84cc16] text-xs font-bold transition-all cursor-pointer"
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
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
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
                        <span>MWK {prod.minAmount.toLocaleString()} – {prod.maxAmount.toLocaleString()}</span>
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
                      className="text-xs font-bold text-[#1b4332] hover:underline transition-colors cursor-pointer"
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
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold transition-all cursor-pointer"
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
      <section className="relative overflow-hidden bg-[#1b4332] text-white py-20 sm:py-28">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_#84cc16_0%,_transparent_60%)]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a3e635] bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <Calculator className="size-4" />
                <span>Transparent Repayment Calculator</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Plan Your Financing with Complete Predictability
                </h2>
                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
                  Adjust your desired borrowing amount and repayment tenure to preview your estimated monthly instalments with zero hidden markups.
                </p>
              </div>

              {/* Amount Slider Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Desired Borrowing Amount:</span>
                  <span className="text-[#a3e635] text-2xl sm:text-3xl font-black tracking-tight">
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
                  className="w-full accent-[#84cc16] cursor-pointer h-2.5 bg-emerald-950/80 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-medium text-emerald-200/75">
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
                          ? "bg-[#84cc16] text-slate-950 border-[#84cc16] shadow-lg font-black scale-105"
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
                <p className="text-3xl sm:text-4xl font-black text-[#1b4332] mt-1 tracking-tight">
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
                  <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold text-[11px]">
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-4 text-sm font-bold shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <span>Enquire for This Loan Facility</span>
                    <ArrowRight className="size-4 text-[#a3e635]" />
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
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
                className="relative bg-slate-50 rounded-3xl p-7 border border-slate-200 hover:border-[#84cc16] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-[#84cc16] transition-colors">
                      {step}
                    </span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                      {badge}
                    </span>
                  </div>

                  <div className="size-12 rounded-2xl bg-white shadow-xs border border-slate-200 text-[#1b4332] flex items-center justify-center mb-5 group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-[#1b4332]">
                  <span>Step {step} Verified</span>
                  <CheckCircle2 className="size-3.5 text-[#65a30d]" />
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
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
              <div className="size-11 rounded-2xl bg-[#a3e635]/20 text-[#1b4332] flex items-center justify-center">
                <BadgeCheck className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Basic Eligibility</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>Malawian citizen aged 21 to 65 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>Active business operating for minimum 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>Or confirmed civil servant / permanent employee</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="size-11 rounded-2xl bg-[#a3e635]/20 text-[#1b4332] flex items-center justify-center">
                <FileText className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. KYC Identification</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>National ID (Smart Card) or valid Malawian Passport</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>2 recent passport-size photographs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>Proof of residence (water/electric bill or chief's letter)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="size-11 rounded-2xl bg-[#a3e635]/20 text-[#1b4332] flex items-center justify-center">
                <Users className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Financial Statements</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>3 to 6 months bank or mobile money statement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                  <span>Or latest 3 months official payslips (for salary loans)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
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
                    <CheckCircle2 className="size-3.5 text-[#65a30d]" />
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
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-950 space-y-1">
              <span className="font-bold uppercase tracking-wider block">
                Repayment &amp; Charges
              </span>
              <p>{activeModalProduct.repaymentTerms}</p>
              <p className="font-semibold text-emerald-800">
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
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold cursor-pointer"
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
