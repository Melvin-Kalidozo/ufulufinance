import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { ClientTestimonialSlider } from "@/components/public/ClientTestimonialSlider";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Landmark,
  Building2,
  Users,
  Wheat,
  Briefcase,
  ChevronRight,
  Star,
  Wallet,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Quote,
  Sparkles,
  ArrowUpRight,
  Zap,
  Banknote,
} from "lucide-react";

export const metadata = {
  title: "Ufulu Finance | Transparent Microfinance in Malawi",
  description:
    "Providing Civil Service Loans, Private Sector Payroll Loans, Village Banking Facilities, and Business Lending across Malawi.",
};

const STATS = [
  {
    number: "250+",
    label: "SMEs & Groups Financed",
    description: "Empowering small enterprises, community clusters, and public servants with accessible credit.",
  },
  {
    number: "15,000+",
    label: "Loans Disbursed",
    description: "Delivering rapid financial support directly to mobile wallets and bank accounts nationwide.",
  },
  {
    number: "100%",
    label: "Transparent Pricing",
    description: "Guaranteed clear terms, predictable payroll deductions, and zero hidden penalties.",
  },
];

const WHO_WE_EMPOWER = [
  {
    id: "civil-servants",
    title: "Civil Servants & Public Officers",
    subtitle: "Ministries, Healthcare, Education & Uniformed Services",
    description:
      "Structured personal financing with automated, predictable payroll deductions that simplify debt management.",
    icon: Landmark,
    link: "#facilities",
  },
  {
    id: "private-sector",
    title: "Private Sector Employees",
    subtitle: "Corporate, NGO & Commercial Enterprises",
    description:
      "Reliable salary-linked credit facilities arranged through approved employer participation and direct payroll linkage.",
    icon: Building2,
    link: "#facilities",
  },
  {
    id: "village-banking",
    title: "Village Banking Groups",
    subtitle: "Solidarity Clusters & Savings Collectives",
    description:
      "Group-level credit facilities empowering community clusters to expand income-generating activities together.",
    icon: Users,
    link: "#facilities",
  },
  {
    id: "business-loans",
    title: "Businesses & MSMEs",
    subtitle: "Retailers, Wholesalers & Growing Enterprises",
    description:
      "Expanding capital access to finance bulk stock replenishment, commercial machinery, and business expansion.",
    icon: TrendingUp,
    link: "#facilities",
  },
];

const LOAN_PRODUCTS = [
  {
    id: "civil-service",
    name: "Civil Service Loans",
    badge: "Active Facility",
    isFlagship: true,
    tagline: "Structured financing designed specifically for government employees.",
    description:
      "Our Civil Service Loans provide eligible government employees with access to financing to meet their personal and financial needs. We understand the unique needs of civil servants and provide structured loan solutions with convenient repayment arrangements through payroll deductions.",
    amount: "Subject to assessment",
    tenure: "Flexible terms",
    disbursement: "Efficient processing",
    repayment: "Payroll deduction",
    collateral: "Employment confirmation",
    icon: Landmark,
  },
  {
    id: "private-sector-payroll",
    name: "Private Sector Payroll Loans",
    badge: "Active Facility",
    isFlagship: false,
    tagline: "Payroll-based lending solutions for eligible private sector employees.",
    description:
      "Our Private Sector Payroll Loans provide financing solutions for eligible employees working in vetted private sector organisations. Designed to assist with personal financial needs with structured repayments deducted directly or arranged through employer partnerships.",
    amount: "Subject to assessment",
    tenure: "Flexible terms",
    disbursement: "Efficient processing",
    repayment: "Linked to payroll",
    collateral: "Employer participation required",
    icon: Building2,
  },
  {
    id: "village-banking",
    name: "Village Banking Loans",
    badge: "Community Facility",
    isFlagship: false,
    tagline: "Community-based financing supporting income-generating activities.",
    description:
      "Supporting organised community groups that participate in village banking and other community-based financial activities. The facility helps groups access financing that can support income-generating activities and small businesses.",
    amount: "Subject to group assessment",
    tenure: "Flexible terms",
    disbursement: "Group-based processing",
    repayment: "Community group schedule",
    collateral: "Group guarantee",
    icon: Users,
  },
  {
    id: "business-loans",
    name: "Business Loans",
    badge: "Expanding Service",
    isFlagship: false,
    tagline: "Financing solutions for businesses and entrepreneurs — expanding now.",
    description:
      "As part of our growth strategy, Ufulu Finance is expanding its lending portfolio to provide financing solutions for businesses and entrepreneurs across Malawi, helping access capital for business expansion, working capital, and equipment.",
    amount: "Subject to business assessment",
    tenure: "Flexible terms",
    disbursement: "Business assessment period",
    repayment: "Agreed repayment schedule",
    collateral: "Business assets / documentation",
    icon: TrendingUp,
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    title: "Transparent Terms & Zero Hidden Fees",
    description:
      "Every fee and interest charge is declared upfront. No unexpected insurance deductions or hidden administration penalties.",
  },
  {
    title: "Direct Mobile & Bank Disbursal",
    description:
      "Receive approved loan funds within minutes directly to your Airtel Money, TNM Mpamba, or commercial bank account.",
  },
  {
    title: "Seasonal Cashflow Matching",
    description:
      "Repayment schedules customized to align with your business revenue cycles or agricultural harvest seasons.",
  },
  {
    title: "Respectful & Ethical Advisory",
    description:
      "Our accredited credit officers provide dignified, professional guidance in English, Chichewa, and Tumbuka.",
  },
];

const IMPACT_METRICS = [
  {
    value: "65%+",
    label: "Women Entrepreneurs",
    sub: "Directly empowering female traders, grocers, and farmers",
  },
  {
    value: "MWK 3.5B+",
    label: "Capital Disbursed",
    sub: "Injected into local Malawian grassroots economies",
  },
  {
    value: "15,000+",
    label: "Livelihoods Transformed",
    sub: "Supporting families, school fees, and community resilience",
  },
  {
    value: "98.4%",
    label: "Client Retention Rate",
    sub: "Borrowers returning to expand their businesses year after year",
  },
];

const RECENT_INSIGHTS = [
  {
    id: "working-capital",
    title: "5 Proven Working Capital Strategies for Malawian SMEs in 2026",
    category: "MSME Business",
    date: "Nov 17, 2026",
    excerpt: "Managing liquidity during supplier lead times is critical for retail survival across Lilongwe and Blantyre.",
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "harvest-credit",
    title: "Navigating Input Financing: How Farmers Maximize Harvest Yields",
    category: "Agri-Finance",
    date: "Nov 16, 2026",
    excerpt: "Structured fertilizer and seed input acquisition aligned directly with commercial harvest cycles.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "salary-advances",
    title: "Understanding Salary Advances: Transparent Payroll Support",
    category: "Personal Credit",
    date: "Nov 14, 2026",
    excerpt: "How regulated payroll advances protect civil servants from high-interest predatory money lenders.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased overflow-hidden">

      {/* ─────────────────────────────────────────────────────────────────
          1. HERO SECTION
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=80"
            alt="Ufulu Finance Operations and Trade"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d281a]/95 via-[#0f2e1e]/85 to-[#0b2115]/80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Your Trusted Partner in Microfinance &amp; Growth
            </h1>

            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-xl">
              Empowering Malawian civil servants, private sector employees, community groups, and entrepreneurs with transparent credit terms, efficient processing, and dedicated financial guidance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/loans"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d6a4f] hover:bg-[#1b4332] active:bg-[#143d28] text-white px-7 py-3.5 text-sm font-semibold shadow-lg shadow-black/20 transition-all hover:scale-105 cursor-pointer"
              >
                Apply Now
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
              >
                Explore Facilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Bar (Overlapping Hero) */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 sm:p-8 shadow-xl shadow-slate-900/[0.06] border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                    <span>{stat.number}</span>
                    <span className="size-2 rounded-full bg-emerald-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mt-1">{stat.label}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{stat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                  <span>Verified institutional data</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. ABOUT SECTION
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b4332]">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>About Ufulu Finance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Driven by Integrity.<br />
              <span className="text-[#1b4332]">Built for Financial Inclusion.</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Founded in 2016 in Lilongwe, Ufulu Finance Limited is a non-deposit-taking microfinance institution registered and operating in Malawi. We specialize in structured civil service loan facilities, private sector payroll lending, village banking community facilities, and expanding business financing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transparent Terms</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Zero hidden fees or surprise penalties</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">National Reach</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Branches in Lilongwe, Blantyre &amp; Mzuzu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Client Protection Code</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Strict anti-predatory lending policies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Fast Mobile Payouts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Airtel Money, TNM Mpamba, or Bank</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-6 py-3 text-xs font-semibold transition-colors shadow-sm"
              >
                Learn More About Our Mission
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                alt="Malawian enterprise and commercial trade"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -top-6 -left-6 size-20 rounded-full bg-[#1b4332] border-4 border-white shadow-xl flex flex-col items-center justify-center text-white text-center p-2">
              <ShieldCheck className="size-5 text-emerald-300" />
              <span className="text-[9px] font-bold uppercase tracking-wider leading-none mt-1">Verified</span>
            </div>
            <div className="absolute -bottom-6 right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200/80 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Star className="size-5 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>★ 4.9 Rating</span>
                  <span className="text-slate-400 font-normal">(Serving Malawi Since 2016)</span>
                </div>
                <p className="text-[11px] text-slate-500">Accredited Non-Deposit Institution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          3. SECTORS WE EMPOWER (Our Lending Pillars)
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b4332] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Who We Empower</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Financial Solutions Built for Malawi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Supporting civil servants, private employees, community savings clusters, and growing businesses with transparent, respectful financing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_WE_EMPOWER.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="size-11 rounded-xl bg-emerald-50 text-[#1b4332] flex items-center justify-center group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                      <p className="text-[11px] font-semibold text-emerald-800 mt-0.5">{pillar.subtitle}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b4332] hover:text-[#2d6a4f] transition-colors"
                    >
                      <span>Explore loan facilities</span>
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          4. LOANS SECTION (Refined 2x2 Showcase)
      ───────────────────────────────────────────────────────────────── */}
      <section id="facilities" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b4332] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            <span className="size-2 rounded-full bg-[#84cc16] animate-pulse" />
            <span>Official Credit Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Transparent Loan Facilities Tailored to You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Review our official lending facilities with structured repayment terms, transparent fee schedules, and straightforward requirements.
          </p>
        </div>

        {/* 2x2 Refined Facility Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {LOAN_PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Flagship accent banner if applicable */}
                {prod.isFlagship && (
                  <div className="absolute top-0 right-0 bg-[#1b4332] text-[#a3e635] text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-xs">
                    ★ Primary Facility
                  </div>
                )}

                <div>
                  {/* Header: Icon & Status Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="size-12 rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                      <Icon className="size-6" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        prod.badge === "Active Facility"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : prod.badge === "Community Facility"
                          ? "bg-lime-50 text-lime-900 border-lime-200"
                          : "bg-amber-50 text-amber-900 border-amber-200"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          prod.badge === "Active Facility"
                            ? "bg-emerald-600 animate-pulse"
                            : prod.badge === "Community Facility"
                            ? "bg-lime-600"
                            : "bg-amber-600"
                        }`}
                      />
                      {prod.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-5 tracking-tight group-hover:text-[#1b4332] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
                    {prod.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Structured Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <Banknote className="size-3 text-emerald-700 shrink-0" />
                        <span>Loan Amount</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{prod.amount}</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <Clock className="size-3 text-emerald-700 shrink-0" />
                        <span>Tenure</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{prod.tenure}</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <Zap className="size-3 text-emerald-700 shrink-0" />
                        <span>Disbursement</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{prod.disbursement}</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <Wallet className="size-3 text-emerald-700 shrink-0" />
                        <span>Repayment</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{prod.repayment}</div>
                    </div>

                    <div className="col-span-2 sm:col-span-2 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <ShieldCheck className="size-3 text-emerald-700 shrink-0" />
                        <span>Security / Collateral</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">{prod.collateral}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <LoanEnquiryDialog
                    defaultProduct={prod.name}
                    triggerButton={
                      <button
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-7 py-3 text-xs font-bold shadow-sm transition-all hover:scale-102 cursor-pointer"
                      >
                        <span>Enquire for This Loan</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                    }
                  />

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#1b4332] transition-colors py-1"
                  >
                    <span>View full requirements</span>
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          5. WHY CHOOSE US SECTION
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Institutional Strengths</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Why Choose Ufulu Finance?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Our service model is engineered to remove delays, hidden deductions, and unfair terms from microfinance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm flex items-start gap-4"
              >
                <div className="size-10 rounded-xl bg-[#a3e635] text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          6. IMPACT SECTION (FINCA-inspired Social Metrics)
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="size-2 rounded-full bg-[#84cc16]" />
            <span>Social &amp; Economic Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Transforming Livelihoods Across Malawi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Inspired by global microfinance standards, we measure our success by the tangible growth and resilience of the communities we finance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {IMPACT_METRICS.map((metric, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm text-center space-y-2"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1b4332]">{metric.value}</div>
              <h4 className="text-sm font-bold text-slate-900">{metric.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{metric.sub}</p>
            </div>
          ))}
        </div>

        {/* Client Testimonials Slider */}
        <ClientTestimonialSlider />
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          7. INSIGHTS SECTION (Blog & Financial Literacy)
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-[#84cc16]" />
                <span>Knowledge &amp; Market Insights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                Latest Financial Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4332] hover:text-[#2d6a4f] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RECENT_INSIGHTS.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48 w-full bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
                      {post.category} &middot; {post.date}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-emerald-800 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b4332] hover:underline"
                    >
                      Read article <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          8. CTA SECTION (High-Impact Landscape Banner)
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
            alt="Cultivate Your Financial Future"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0d281a]/85 backdrop-brightness-95" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 text-center text-white space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            Let’s Cultivate Your Financial Future, Together.
          </h2>
          <p className="text-xs sm:text-sm text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Ready to access civil service credit, explore payroll facilities, or expand your business? Speak with our accredited loan advisors today.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/loans"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-slate-950 px-8 py-3.5 text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              Apply for Financing
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
            >
              Contact Nearest Branch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
