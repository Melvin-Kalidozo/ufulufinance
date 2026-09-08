import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { ClientTestimonialSlider } from "@/components/public/ClientTestimonialSlider";
import { HomePreload } from "@/components/public/HomePreload";
import { getJson } from "@/lib/content";
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

export default async function HomePage() {
  const SECTOR_ICON: Record<string, LucideIcon> = {
    Landmark, Building2, Users, TrendingUp, Wallet, Briefcase, Wheat, Zap, ShieldCheck, Sparkles,
  };
  const iconOf = (key: string) => SECTOR_ICON[key] ?? Sparkles;
  const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '');

  const json = await getJson<{
    data?: {
      settings?: Record<string, unknown> | null;
      stats?: Record<string, unknown>[];
      sectors?: Record<string, unknown>[];
      whyChoose?: Record<string, unknown>[];
      impactMetrics?: Record<string, unknown>[];
      loanProducts?: Record<string, unknown>[];
      recentArticles?: Record<string, unknown>[];
    };
  }>("/api/public/home").catch(() => null);
  const payload = json?.data ?? null;


  const STATS = (payload?.stats ?? []).map((x) => ({
    number: String(x.value ?? ''),
    label: String(x.label ?? ''),
    description: String(x.description ?? ''),
  }));

  const WHO_WE_EMPOWER = (payload?.sectors ?? []).map((x) => ({
    id: String(x.slug ?? x.title ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: String(x.title ?? ''),
    subtitle: String(x.subtitle ?? ''),
    description: String(x.description ?? ''),
    icon: iconOf(String(x.iconKey ?? '')),
    link: String(x.link ?? '#facilities'),
  }));

  const LOAN_PRODUCTS = (payload?.loanProducts ?? []).map((x) => ({
    id: String(x.slug ?? x.name ?? ''),
    name: String(x.name ?? ''),
    category: String(x.categoryLabel ?? ''),
    tagline: String(x.tagline ?? ''),
    description: String(x.description ?? x.intro ?? ''),
    amount: String(x.amountText ?? ''),
    tenure: String(x.tenureText ?? ''),
    disbursement: String(x.disbursementText ?? ''),
    repayment: String(x.repaymentText ?? ''),
    collateral: String(x.collateralText ?? ''),
    image: String(x.image ?? ''),
    imageAlt: String(x.imageAlt ?? x.name ?? ''),
  }));

  const WHY_CHOOSE_ITEMS = (payload?.whyChoose ?? []).map((x) => ({
    title: String(x.title ?? ''),
    description: String(x.description ?? ''),
  }));

  const IMPACT_METRICS = (payload?.impactMetrics ?? []).map((x) => ({
    value: String(x.value ?? ''),
    label: String(x.label ?? ''),
    sub: String(x.sub ?? ''),
  }));

  const RECENT_INSIGHTS = (payload?.recentArticles ?? []).map((x) => ({
    id: String(x.slug ?? x.id ?? ''),
    title: String(x.title ?? ''),
    category: String(x.category ?? ''),
    date: fmtDate(String(x.date ?? '')),
    excerpt: String(x.excerpt ?? ''),
    image: String(x.image ?? ''),
  }));

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased overflow-hidden">
      <HomePreload />

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/95 via-[#034DA2]/85 to-[#021833]/80" />
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] active:bg-[#0369a1] text-white px-7 py-3.5 text-sm font-bold shadow-lg shadow-sky-950/20 transition-all hover:scale-105 cursor-pointer"
              >
                Apply Now
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
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
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mt-1">{stat.label}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{stat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-[#034DA2]">
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
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
              About Ufulu Finance
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Driven by Integrity.<br />
              <span className="text-[#034DA2]">Built for Financial Inclusion.</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Founded in 2016 in Lilongwe, Ufulu Finance Limited is a non-deposit-taking microfinance institution registered and operating in Malawi. We specialize in structured civil service loan facilities, private sector payroll lending, village banking community facilities, and expanding business financing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transparent Terms</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Zero hidden fees or surprise penalties</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">National Reach</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Branches in Lilongwe, Blantyre &amp; Mzuzu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Client Protection Code</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Strict anti-predatory lending policies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Fast Mobile Payouts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Airtel Money, TNM Mpamba, or Bank</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[#034DA2] hover:bg-[#023877] text-white px-6 py-3 text-xs font-semibold transition-colors shadow-sm"
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
            <div className="absolute -bottom-6 right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200/80 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#034DA2]">
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
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
              Who We Empower
            </p>
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
                    <div className="size-11 rounded-xl bg-blue-50 text-[#034DA2] flex items-center justify-center group-hover:bg-[#034DA2] group-hover:text-white transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                      <p className="text-[11px] font-semibold text-[#009FE0] mt-0.5">{pillar.subtitle}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#034DA2] hover:text-[#023877] transition-colors"
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
          4. LOANS SECTION (Dedicated Full-Width Alternating Showcases)
      ───────────────────────────────────────────────────────────────── */}
      <div id="facilities" className="scroll-mt-20">
        <div className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-3">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
            Official Credit Facilities
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Transparent Loan Facilities Tailored to You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Review our official lending facilities with structured repayment terms, transparent fee schedules, and straightforward requirements.
          </p>
        </div>

        {/* Dedicated Full-Width Sections for each Service (Alternating Image Left / Right, Clean Refined Presentation) */}
        {LOAN_PRODUCTS.map((prod, idx) => {
          const isFlipped = idx % 2 === 1; // Odd index: Image on Left, Content on Right

          return (
            <section
              key={prod.id}
              className={`py-20 sm:py-28 border-t border-slate-200/80 ${
                isFlipped ? "bg-[#f8fafc]" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Content Column */}
                  <div
                    className={`space-y-6 lg:col-span-7 ${
                      isFlipped ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Category Kicker */}
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#00A3E0]">
                      {prod.category}
                    </p>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {prod.name}
                      </h3>
                      <p className="text-base sm:text-lg font-semibold text-slate-700 mt-2">
                        {prod.tagline}
                      </p>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                      {prod.description}
                    </p>

                    {/* Structured Specifications Grid */}
                    <div className="pt-6 border-t border-slate-200/80">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Loan Amount
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 block">
                            {prod.amount}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Tenure
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 block">
                            {prod.tenure}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Disbursement
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 block">
                            {prod.disbursement}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Repayment
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 block">
                            {prod.repayment}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-baseline gap-2 text-xs sm:text-sm">
                        <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                          Security / Collateral:
                        </span>
                        <span className="font-semibold text-slate-800">{prod.collateral}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center gap-5">
                      <LoanEnquiryDialog
                        defaultFacility={prod.name}
                        triggerButton={
                          <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#034DA2] hover:bg-[#023877] text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-blue-950/15 transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>Enquire for This Loan</span>
                            <ArrowRight className="size-4" />
                          </button>
                        }
                      />

                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#034DA2] transition-colors py-2 group"
                      >
                        <span>View full requirements</span>
                        <ChevronRight className="size-4 text-[#00A3E0] transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Matching Image Column: Clean Photography with No Badges */}
                  <div
                    className={`lg:col-span-5 ${
                      isFlipped ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 group">
                      <Image
                        src={prod.image}
                        alt={prod.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          5. WHY CHOOSE US SECTION
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
              Institutional Strengths
            </p>
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
                <div className="size-10 rounded-xl bg-gradient-to-br from-[#034DA2] to-[#009FE0] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
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
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
            Social &amp; Economic Impact
          </p>
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
              <div className="text-3xl sm:text-4xl font-extrabold text-[#034DA2]">{metric.value}</div>
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
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
                Knowledge &amp; Market Insights
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                Latest Financial Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#034DA2] hover:text-[#023877] transition-colors"
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
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#009FE0] mb-2 font-mono">
                      {post.category} &middot; {post.date}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-[#034DA2] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#034DA2] hover:underline"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#021833]/95 via-[#0a2540]/90 to-[#034DA2]/85 backdrop-brightness-90" />
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white px-8 py-3.5 text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              Apply for Financing
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
            >
              Contact Nearest Branch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
