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
} from "lucide-react";

export const metadata = {
  title: "Ufulu Finance | Transparent Microfinance in Malawi",
  description:
    "Your trusted partner in microfinance and growth. Providing MSME business loans, civil servant advances, and agri-seasonal credit across Malawi.",
};

const STATS = [
  {
    number: "250+",
    label: "SMEs Financed",
    description: "Empowering small enterprises and commercial suppliers with accessible working capital.",
  },
  {
    number: "15,000+",
    label: "Loans Disbursed",
    description: "Delivering rapid financial support directly to mobile wallets and bank accounts nationwide.",
  },
  {
    number: "99%",
    label: "On-Time Decisions",
    description: "Guaranteed transparent credit evaluation with formal decisions delivered within 24 hours.",
  },
];

const SERVICES_ECOSYSTEM = [
  {
    id: "msme",
    title: "MSME Business Credit",
    description: "Working capital, inventory restocking, and asset finance for small enterprises and retailers.",
    icon: Briefcase,
    link: "/loans",
  },
  {
    id: "agri",
    title: "Agri-Seasonal Credit",
    description: "Seed, fertilizer, and irrigation financing structured around Malawi harvest and market cycles.",
    icon: Wheat,
    link: "/loans",
  },
  {
    id: "payroll",
    title: "Civil Servant Advances",
    description: "Predictable, low-stress salary advances for teachers, healthcare staff, and public officers.",
    icon: Wallet,
    link: "/loans",
  },
  {
    id: "village",
    title: "Village Banking Groups",
    description: "Solidarity lending strengthening community savings clusters through mutual guarantees.",
    icon: Users,
    link: "/loans",
  },
  {
    id: "mobile",
    title: "Digital Agency Payouts",
    description: "Fast disbursements and repayments via Airtel Money, TNM Mpamba, and commercial banks.",
    icon: Sparkles,
    link: "/loans",
  },
  {
    id: "coaching",
    title: "Financial Literacy Coaching",
    description: "Practical workshops in budgeting, cashflow management, and responsible debt servicing.",
    icon: Landmark,
    link: "/about",
  },
];

const LOAN_PRODUCTS = [
  {
    id: "personal",
    name: "Personal & Emergency Loan",
    amount: "Up to MWK 2,000,000",
    tenure: "1 – 12 months",
    rate: "From 6.5% monthly",
    features: ["No physical collateral required", "24-hour decision", "Mobile money disbursement"],
  },
  {
    id: "business",
    name: "MSME Business Growth Loan",
    amount: "Up to MWK 10,000,000",
    tenure: "3 – 24 months",
    rate: "From 5.5% monthly",
    features: ["Working capital & asset finance", "Flexible grace periods", "Dedicated credit advisor"],
  },
  {
    id: "group",
    name: "Village Banking Group Loan",
    amount: "Per group cluster",
    tenure: "3 – 6 months",
    rate: "From 4.5% monthly",
    features: ["Social guarantee model", "Financial literacy training", "Progressive credit limits"],
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
              Empowering Malawian entrepreneurs, farmers, and civil servants with transparent credit terms, rapid 24-hour decisions, and dedicated financial guidance.
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
              Founded in Lilongwe, Ufulu Finance was established to bridge the credit gap for unbanked and underserved micro-enterprises, smallholder farmers, and salaried workers across Malawi. We combine flexible loan structures with transparent, responsible lending standards.
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
                  <span className="text-slate-400 font-normal">(15k+ clients)</span>
                </div>
                <p className="text-[11px] text-slate-500">Accredited Non-Deposit Institution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          3. SERVICES SECTION
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Full Service Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Comprehensive Financial Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Modeled on leading microfinance standards to provide flexible credit, mobile access, and advisory across Malawi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_ECOSYSTEM.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="size-11 rounded-xl bg-emerald-50 text-[#1b4332] flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{srv.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={srv.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b4332] hover:text-[#2d6a4f] transition-colors"
                    >
                      <span>Explore service details</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          4. LOANS SECTION (Products & Live Calculator)
      ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="size-2 rounded-full bg-[#84cc16]" />
            <span>Credit Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Transparent Loan Facilities Tailored to You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Compare our key loan categories and estimate your monthly instalments in Malawian Kwacha.
          </p>
        </div>

        {/* 3 Loan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {LOAN_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  {prod.tenure}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{prod.name}</h3>
                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-[#1b4332]">{prod.amount}</div>
                  <div className="text-xs text-slate-500">{prod.rate}</div>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  {prod.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <LoanEnquiryDialog
                  defaultProduct={prod.name}
                  triggerButton={
                    <button
                      type="button"
                      className="w-full rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Enquire for This Loan
                    </button>
                  }
                />
              </div>
            </div>
          ))}
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
            Ready to expand your business, finance harvest inputs, or secure payroll advances? Speak with our accredited loan advisors today.
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
