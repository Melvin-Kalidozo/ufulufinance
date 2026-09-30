import { Suspense } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAboutContent } from "@/lib/cms-data";
import { LeadershipGrid, type Leader } from "@/components/public/LeadershipGrid";
import { AboutFaqAccordion } from "@/components/public/AboutFaqAccordion";
import { SectionDeepLink } from "@/components/public/SectionDeepLink";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Target,
  Scale,
  HeartHandshake,
  CheckCircle2,
  Compass,
  Check,
  MapPin,
  HelpCircle,
} from "lucide-react";

type LeaderView = Leader;

export default async function AboutPage() {
  const content = await getAboutContent();

  const aboutRow = (r: unknown) => (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const aval = (r: unknown, k: string, d = "") => {
    const v = aboutRow(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };
  const aarr = (r: unknown, k: string): string[] => {
    const v = aboutRow(r)[k];
    return Array.isArray(v) ? v.map((x) => String(x)) : [];
  };
  const abool = (r: unknown, k: string) => Boolean(aboutRow(r)[k]);
  const valueIcon = (key: string): LucideIcon => {
    const map: Record<string, LucideIcon> = {
      ShieldCheck, Sparkles, BadgeCheck, Target, Scale, HeartHandshake,
    };
    return map[key] ?? ShieldCheck;
  };
  const vId = (r: unknown) => aval(r, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const CORE_VALUES = (content.values ?? []).map((r) => ({
    id: vId(r),
    title: aval(r, "title"),
    description: aval(r, "description"),
    icon: valueIcon(aval(r, "iconKey")),
    badge: aval(r, "badge"),
    isFeatured: abool(r, "isFeatured"),
  }));

  const TIMELINE = (content.timeline ?? []).map((r) => ({
    year: aval(r, "year"),
    title: aval(r, "title"),
    description: aval(r, "description"),
  }));

  const REGIONAL_HUBS = (content.hubs ?? []).map((r) => ({
    region: aval(r, "region"),
    city: aval(r, "city"),
    location: aval(r, "location"),
    focus: aval(r, "focus"),
    contacts: aarr(r, "contacts").join(" | "),
  }));

  const LEADERS: LeaderView[] = (content.leaders ?? []).map((r) => ({
    name: aval(r, "name"),
    role: aval(r, "title"),
    bio: aval(r, "bio"),
    image: aval(r, "image"),
  }));

  const ABOUT_FAQS = (content.aboutFaqs ?? []).map((r, i) => ({
    id: String(aboutRow(r).id ?? `faq-${i}`),
    question: aval(r, "question"),
    answer: aval(r, "answer"),
  }));

  const PRODUCTS = (content.products ?? [])
    .map((r) => aval(r, "title"))
    .filter(Boolean);

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      <Suspense fallback={null}>
        <SectionDeepLink />
      </Suspense>

      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-about.jpg"
            alt="About Ufulu Finance"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#01214A]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            About Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Company Overview &middot; History &middot; Mission &amp; Vision &middot; Governance &middot; Impact
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#009FE0] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#009FE0] font-semibold">About us</span>
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY OVERVIEW (Who we are, what we do, who we serve) ─ */}
      <section id="company-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Company Overview</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Improving the Welfare of Malawians Through Accessible &amp; Meaningful Financial Services
            </h2>

            <p className="text-sm font-semibold text-[#034DA2] bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              A non-deposit-taking financial institution committed to responsible lending, customer-focused service, and expanding financial inclusion across Malawi.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900 font-semibold">Ufulu Finance Limited</strong> commenced its operations in 2016 as a non-deposit-taking financial institution with a focus on providing accessible and reliable credit solutions to Malawians.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              The company was established with a core focus on supporting civil servants through tailored loan products. Over the years, Ufulu Finance has continued to grow its customer base and expand its financial solutions — progressively moving into business financing to support entrepreneurs, small businesses, and other productive sectors of the economy.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Our long-term strategic ambition is to progress into a <strong className="text-slate-900 font-semibold">deposit-taking financial institution</strong> — a journey driven by our commitment to expanding financial inclusion and providing a broader range of services to individuals and businesses.
            </p>

            {PRODUCTS.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
                Our Loan Products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm font-medium text-slate-700">
                {PRODUCTS.map((product) => (
                  <div key={product} className="flex items-center gap-2">
                    <Check className="size-4 text-[#00A3E0] shrink-0" />
                    <span>{product}</span>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. INSTITUTIONAL HISTORY & DEVELOPMENT TIMELINE ─────────── */}
      {TIMELINE.length > 0 && (
      <section id="our-history" className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Our History</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              From Grassroots Micro-Credit to a National Financial Partner
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A track record built on continuous listening, financial discipline, and borrower-first solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((step, idx) => (
              <div
                key={step.year}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#034DA2] tracking-tight">
                      {step.year}
                    </span>
                    <span className="size-7 rounded-full bg-[#009FE0]/20 text-slate-950 font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-brand-green">
                  <CheckCircle2 className="size-3.5 text-brand-green" />
                  <span>Milestone Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 4. MISSION & VISION (Full Section — White Background, Prominent) ─ */}
      <section id="vision-mission" className="w-full bg-white py-16 sm:py-24 border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Vision Statement */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-blue-50 text-[#034DA2] flex items-center justify-center">
                  <Compass className="size-6 text-[#034DA2]" />
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2]">
                  <span className="size-2 rounded-full bg-brand-green" />
                  <span>Vision Statement</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  A Leading Industry Player in Improving the Welfare of Malawians
                </h3>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  To be a leading industry player in improving the welfare of Malawians through provision of affordable and meaningful financial services.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                <span className="font-semibold text-slate-400 uppercase tracking-wider">Our Guiding North Star</span>
                <span className="text-[#034DA2] font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  <span>Ufulu Vision</span>
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
                  <Target className="size-6 text-brand-green" />
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green">
                  <span className="size-2 rounded-full bg-[#034DA2]" />
                  <span>Mission Statement</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  A Lender of Choice for the Communities We Serve
                </h3>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  To stimulate the socio-economic status of our customers for the better, through provision of highly competitive credit and savings facilities and in so doing to become a lender of choice for the communities.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                <span className="font-semibold text-slate-400 uppercase tracking-wider">Customer-First Always</span>
                <span className="text-[#034DA2] font-bold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  <span>Ufulu Mission</span>
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CORE VALUES ──────────────────────────────────────────── */}
      {CORE_VALUES.length > 0 && (
      <section id="core-values" className="bg-[#f8fafc] py-16 sm:py-24 border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The Principles Guiding Every Decision
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We stand apart through our commitment to ethical lending, mutual accountability, and client dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              if (val.isFeatured) {
              return (
                  <div
                    key={val.id}
                    className="rounded-3xl p-7 bg-[#034DA2] text-white shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wide border border-white/20">
                          {val.badge}
                        </span>
                        <div className="size-10 rounded-full bg-white/20 text-white flex items-center justify-center">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <h3 className="text-lg font-extrabold leading-snug text-white">{val.title}</h3>
                      <p className="text-xs text-blue-100 font-medium mt-3 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-blue-100">
                      <span>Guaranteed Standard</span>
                      <ArrowRight className="size-4 text-[#009FE0]" />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={val.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                        {val.badge}
                      </span>
                      <div className="size-10 rounded-full bg-[#009FE0]/20 text-slate-900 flex items-center justify-center">
                        <Icon className="size-5 text-slate-900" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Practiced Daily</span>
                    <Check className="size-4 text-[#00A3E0]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── 6. REGIONAL REACH & BRANCH PRESENCE (Integrated layout, not cards) ── */}
      {REGIONAL_HUBS.length > 0 && (
      <section id="regional-footprint" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="size-2 rounded-full bg-brand-green" />
            <span>Regional Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Serving Borrowers Across Central, Southern &amp; Northern Malawi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Full-service branches and field credit officers supporting urban markets and farming communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200/80 pt-10">
          {REGIONAL_HUBS.map((hub, idx) => (
            <div
              key={hub.city}
              className={`flex flex-col justify-between py-6 md:py-0 ${
                idx === 0 ? "md:pr-8" : idx === 1 ? "md:px-8" : "md:pl-8"
              }`}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#034DA2] uppercase tracking-wider block">
                  {hub.region}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{hub.city} Hub</h3>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="size-3.5 text-[#00A3E0]" /> {hub.location}
                </p>

                <div className="mt-5 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Operational Focus:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {hub.focus}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
                {hub.contacts}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ── 7. GOVERNANCE & LEADERSHIP (Board & Management) ─────────── */}
      <section id="governance-leadership" className="bg-[#f8fafc] py-16 sm:py-24 border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Governance &amp; Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Governed by Proven Banking &amp; Development Leaders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Meet the people steering Ufulu Finance. Select a profile to read their full biography.
            </p>
          </div>

          <LeadershipGrid leaders={LEADERS} />
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS (FAQ) ───────────────────── */}
      <section id="about-faq" className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <HelpCircle className="size-4 text-[#00A3E0]" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Have questions about our regulatory compliance, loan qualification, branch locations, or transparent repayment models? Find answers below.
            </p>
          </div>

          {ABOUT_FAQS.length > 0 && <AboutFaqAccordion faqs={ABOUT_FAQS} />}

          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-[#034DA2]">
                Need more answers or custom advisory?
              </h4>
              <p className="text-xs text-[#034DA2]/80 mt-0.5">
                Explore our full FAQ knowledge base or speak with our accredited loan officers.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Full FAQ Page</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <span>Branch Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. IMPACT: COMMUNITY INVOLVEMENT & CONTRIBUTION ─────────── */}
      <section className="bg-white text-slate-900 py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2]">
                <span className="size-2 rounded-full bg-brand-green" />
                <span>Our Impact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Transforming Livelihoods Across All 3 Malawian Regions
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Beyond disbursing working capital, Ufulu Finance invests directly into borrower education, solar-powered agricultural infrastructure, and women-led cooperatives.
              </p>

              <div className="pt-2">
                <Link
                  href="/impact"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#034DA2] hover:text-[#02336e] transition-colors group"
                >
                  <span>Explore our detailed Impact &amp; Portfolio Report</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="sm:pl-0 sm:pr-6 pt-6 sm:pt-0">
                <p className="text-4xl sm:text-5xl font-black tracking-tight text-[#034DA2]">
                  14,000+
                </p>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  Entrepreneurs Financed
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Active smallholders, market traders, teachers, and healthcare staff.
                </p>
              </div>

              <div className="sm:px-6 pt-6 sm:pt-0">
                <p className="text-4xl sm:text-5xl font-black tracking-tight text-[#034DA2]">
                  68%
                </p>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  Women-Led Enterprises
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Empowering female market vendors and village banking cooperative clusters.
                </p>
              </div>

              <div className="sm:pl-6 sm:pr-0 pt-6 sm:pt-0">
                <p className="text-4xl sm:text-5xl font-black tracking-tight text-brand-green">
                  98.4%
                </p>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  On-Time Repayment
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Reflecting responsible credit limits tailored to real borrower cashflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
