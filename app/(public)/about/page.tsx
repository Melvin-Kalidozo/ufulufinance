"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { StaticHero } from "@/components/public/ContentSkeletons";
import { usePublicData } from "@/lib/content-store";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  ArrowRight,
  Landmark,
  Eye,
  Target,
  Sparkles,
  CheckCircle2,
  Calendar,
  Compass,
  Briefcase,
  TrendingUp,
  Scale,
  MapPin,
  Mail,
  Building2,
  ChevronDown,
  HelpCircle,
  Check,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";

export default function AboutPage() {
  const [activeLeaderTab, setActiveLeaderTab] = useState<"all" | "board" | "executive">("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("regulation");
  const { body } = usePublicData<{ data: Record<string, unknown[]> }>("/api/public/about");
  const content = body?.data ?? null;

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

  const CORE_VALUES = (content?.values ?? []).map((r) => ({
    id: vId(r),
    title: aval(r, "title"),
    description: aval(r, "description"),
    icon: valueIcon(aval(r, "iconKey")),
    badge: aval(r, "badge"),
    isFeatured: abool(r, "isFeatured"),
  }));

  const TIMELINE = (content?.timeline ?? []).map((r) => ({
    year: aval(r, "year"),
    title: aval(r, "title"),
    description: aval(r, "description"),
  }));

  const REGIONAL_HUBS = (content?.hubs ?? []).map((r) => ({
    region: aval(r, "region"),
    city: aval(r, "city"),
    location: aval(r, "location"),
    focus: aval(r, "focus"),
    contacts: aarr(r, "contacts").join(" | "),
  }));

  const LEADERS = (content?.leaders ?? []).map((r) => ({
    name: aval(r, "name"),
    role: aval(r, "title"),
    category: aval(r, "category"),
    credentials: aval(r, "credentials"),
    experience: aval(r, "experience"),
    expertise: aarr(r, "expertise"),
    bio: aval(r, "bio"),
    image: aval(r, "image"),
  }));

  const filteredLeaders =
    activeLeaderTab === "all"
      ? LEADERS
      : LEADERS.filter((l) => l.category === activeLeaderTab);

  const ABOUT_FAQS = (content?.aboutFaqs ?? []).map((r) => ({
    id: `${vId(r)}-${aval(r, "question").length}`,
    question: aval(r, "question"),
    answer: aval(r, "answer"),
  }));

  if (!content) {
    return (
      <div className="min-h-screen bg-[#fcfdfd]">
        <StaticHero
          title="About Ufulu Finance"
          subtitle="Company Overview · History · Mission & Vision · Governance · Impact"
        />
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-3xl bg-slate-200/70" />
            ))}
          </div>
          <div className="h-72 w-full animate-pulse rounded-3xl bg-slate-200/70" />
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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

            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
                Our Current Services
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Civil Service Loans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Private Sector Payroll Loans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Village Banking Loans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Business Loans (Expanding)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Responsible Lending Practices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Non-Deposit Taking Microfinance Institution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. INSTITUTIONAL HISTORY & DEVELOPMENT TIMELINE ─────────── */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
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

      {/* ── 4. MISSION & VISION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-[#034DA2] text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#009FE0] tracking-wide uppercase">
                <Eye className="size-3.5" />
                <span>Vision Statement</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                A Leading Industry Player in Improving the Welfare of Malawians
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                To be a leading industry player in improving the welfare of Malawians through provision of affordable and meaningful financial services.
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-blue-700/50 flex items-center justify-between text-xs text-blue-200">
              <span>Our Guiding North Star</span>
              <span className="text-[#009FE0] font-semibold">Ufulu Vision &rarr;</span>
            </div>

            <div className="absolute -bottom-16 -right-16 size-48 rounded-full bg-[#009FE0]/15 blur-2xl pointer-events-none" />
          </div>

          {/* Mission Card */}
          <div className="bg-white text-slate-900 rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-200/90 flex flex-col justify-between">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-800 tracking-wide uppercase">
                <Target className="size-3.5 text-[#00A3E0]" />
                <span>Mission Statement</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                A Lender of Choice for the Communities We Serve
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To stimulate the socio-economic status of our customers for the better, through provision of highly competitive credit and savings facilities and in so doing to become a lender of choice for the communities.
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Customer-First Always</span>
              <span className="text-[#00A3E0] font-semibold">Ufulu Mission &rarr;</span>
            </div>

            <div className="absolute -top-16 -right-16 size-44 rounded-full bg-[#009FE0]/10 blur-2xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── 5. CORE VALUES ──────────────────────────────────────────── */}
      <section className="bg-[#f8fafc] py-16 sm:py-24 border-t border-slate-200/80">
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

      {/* ── 6. REGIONAL REACH & BRANCH PRESENCE (Bespoke non-repetitive) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REGIONAL_HUBS.map((hub) => (
            <div
              key={hub.city}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="size-11 rounded-2xl bg-[#034DA2] text-[#009FE0] flex items-center justify-center">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#034DA2] uppercase tracking-wide block">
                    {hub.region}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{hub.city} Hub</h3>
                  <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="size-3.5 text-[#00A3E0]" /> {hub.location}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900 block mb-1">Operational Focus:</span>
                  <p>{hub.focus}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                {hub.contacts}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. GOVERNANCE & LEADERSHIP (Board & Management) ─────────── */}
      <section className="bg-[#f8fafc] py-16 sm:py-24 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-brand-green" />
                <span>Governance &amp; Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Governed by Proven Banking &amp; Development Leaders
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Our board of directors and senior management team uphold the highest standards of credit compliance and risk oversight.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-medium self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveLeaderTab("all")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  activeLeaderTab === "all"
                    ? "bg-[#034DA2] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>All Leaders</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeLeaderTab === "all" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                  {LEADERS.length}
                </span>
              </button>
              <button
                onClick={() => setActiveLeaderTab("board")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  activeLeaderTab === "board"
                    ? "bg-[#034DA2] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Board of Directors</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeLeaderTab === "board" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                  {LEADERS.filter((l) => l.category === "board").length}
                </span>
              </button>
              <button
                onClick={() => setActiveLeaderTab("executive")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  activeLeaderTab === "executive"
                    ? "bg-[#034DA2] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Executive Management</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeLeaderTab === "executive" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                  {LEADERS.filter((l) => l.category === "executive").length}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeaders.map((lead) => (
              <div
                key={lead.name}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Portrait: Content-aware contain with ambient blurred backdrop */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                    {/* Blurred ambient background to smoothly fill card */}
                    <Image
                      src={lead.image}
                      alt=""
                      fill
                      aria-hidden
                      className="object-cover blur-xl scale-125 opacity-40 pointer-events-none"
                    />
                    {/* Foreground portrait fully contained without cropping faces */}
                    <Image
                      src={lead.image}
                      alt={lead.name}
                      fill
                      className="relative z-10 object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Clean floating badges on top */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-md inline-flex items-center gap-1.5 ${
                          lead.category === "board"
                            ? "bg-white/95 text-[#034DA2] border border-slate-200/60"
                            : "bg-[#034DA2]/95 text-white border border-blue-700/50"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            lead.category === "board" ? "bg-amber-500" : "bg-[#009FE0]"
                          }`}
                        />
                        {lead.category === "board" ? "Board Member" : "Executive"}
                      </span>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs border border-slate-200/60">
                        {lead.experience}
                      </span>
                    </div>
                  </div>

                  {/* Card Body (Evened out, balanced proportion) */}
                  <div className="p-5 pb-3">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug tracking-tight">
                      {lead.name}
                    </h3>
                    <p className="text-xs font-bold text-[#034DA2] mt-0.5 leading-snug">
                      {lead.role}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-2 font-medium">
                      <GraduationCap className="size-3.5 text-[#034DA2] shrink-0" />
                      <span className="truncate">{lead.credentials}</span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                      {lead.bio}
                    </p>
                  </div>
                </div>

                {/* Footer: Verified Authority */}
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1 text-brand-green font-semibold">
                      <BadgeCheck className="size-3.5 text-brand-green" />
                      Verified Credentials
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                      Ufulu Finance
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED QUESTIONS (FAQ) ───────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80">
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

          <div className="space-y-3.5">
            {ABOUT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-[#034DA2] text-white rotate-180" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
      <section className="bg-slate-950 text-white py-16 sm:py-24 rounded-t-[40px] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#009FE0]">
                <span className="size-2 rounded-full bg-brand-green" />
                <span>Our Impact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Transforming Livelihoods Across All 3 Malawian Regions
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Beyond disbursing working capital, Ufulu Finance invests directly into borrower education, solar-powered agricultural infrastructure, and women-led cooperatives.
              </p>

              <div className="pt-2">
                <Link
                  href="/impact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#009FE0] hover:text-white transition-colors"
                >
                  <span>Explore our detailed Impact &amp; Portfolio Report</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#009FE0]">
                  MWK 4.8B+
                </p>
                <h4 className="text-sm font-bold text-white mt-1">
                  Capital Disbursed
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Fueling inventory, fertilizer inputs, and asset acquisitions across Malawi.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#009FE0]">
                  15,200+
                </p>
                <h4 className="text-sm font-bold text-white mt-1">
                  Entrepreneurs Financed
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Active smallholders, market traders, teachers, and healthcare staff.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#009FE0]">
                  68%
                </p>
                <h4 className="text-sm font-bold text-white mt-1">
                  Women-Led Enterprises
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Empowering female market vendors and village banking cooperative clusters.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-green-light">
                  98.4%
                </p>
                <h4 className="text-sm font-bold text-white mt-1">
                  On-Time Repayment
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
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
