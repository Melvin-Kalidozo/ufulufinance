"use client";

import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { StaticHero } from "@/components/public/ContentSkeletons";
import { usePublicData } from "@/lib/content-store";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Wheat,
  Briefcase,
  CheckCircle2,
  Quote,
  Trees,
  GraduationCap,
  SunMedium,
} from "lucide-react";

export default function ImpactPortfolioPage() {
  const { body } = usePublicData<{ data: Record<string, unknown[]> }>("/api/public/impact");
  const content = body?.data ?? null;

  const iconOf = (title: string): LucideIcon => {
    const t = title.toLowerCase();
    if (t.includes("solar") || t.includes("irrigation")) return SunMedium;
    if (t.includes("vendor") || t.includes("market")) return Briefcase;
    if (t.includes("women") || t.includes("chikondi") || t.includes("grant")) return HeartHandshake;
    if (t.includes("literacy") || t.includes("clinic")) return GraduationCap;
    if (t.includes("tree") || t.includes("forest")) return Trees;
    if (t.includes("grower") || t.includes("farmer") || t.includes("agro")) return Wheat;
    return TrendingUp;
  };

  const row = (r: unknown): Record<string, unknown> =>
    (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const str = (r: unknown, k: string, d = ""): string => {
    const v = row(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };
  const slugId = (r: unknown) => str(r, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const PROJECTS = (content?.projects ?? []).map((r) => ({
    id: slugId(r),
    title: str(r, "title"),
    category: str(r, "category"),
    location: str(r, "location"),
    description: str(r, "description"),
    metrics: str(r, "metrics"),
    image: str(r, "image"),
    icon: iconOf(str(r, "title")),
  }));

  const COMMUNITY_INITIATIVES = (content?.initiatives ?? []).map((r) => ({
    title: str(r, "title"),
    desc: str(r, "description"),
    icon: iconOf(str(r, "title")),
  }));

  const SUCCESS_STORIES = (content?.stories ?? []).map((r) => ({
    name: str(r, "name"),
    image: str(r, "image"),
    enterprise: str(r, "enterprise"),
    location: str(r, "location"),
    quote: str(r, "quote"),
    stats: str(r, "statsText"),
  }));

  if (!content) {
    return (
      <div className="min-h-screen bg-[#fcfdfd]">
        <StaticHero
          title="Impact & Portfolio"
          subtitle="Projects, community initiatives and client success stories transforming livelihoods across Malawi."
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 h-4 w-1/2 animate-pulse rounded-full bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
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
            src="/images/hero-impact.jpg"
            alt="Ufulu Finance Impact & Portfolio"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#01214A]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Portfolio &amp; Impact
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Transforming Grassroots Economies &middot; Success Stories &middot; Sustainable Community Development
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#009FE0] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#009FE0] font-semibold">Impact</span>
          </div>
        </div>
      </section>

      {/* ── 2. PORTFOLIO INTRODUCTION ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Portfolio Introduction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Measuring Success Through Changed Lives, Not Just Loan Volumes
            </h2>

            <p className="text-sm font-semibold text-[#034DA2] bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              Every kwacha disbursed by Ufulu Finance is structured to safeguard borrower dignity, protect household earnings, and multiply long-term assets.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              Since our founding in Lilongwe, Ufulu Finance has deployed credit as a high-leverage instrument for socio-economic mobility. By focusing on productivity-enhancing credit—such as agricultural input financing, transport machinery, and retail inventory—we ensure our borrowers build lasting wealth.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#034DA2] block">MWK 4.8B+</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Cumulative Credit</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#034DA2] block">15,200+</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Borrowers Financed</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#034DA2] block">68%</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Women Entrepreneurs</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-brand-green block">98.4%</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">On-Time Repayment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Featured Initiatives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Targeted Credit Interventions with Lasting ROI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              How our structured credit initiatives solve systemic liquidity gaps for Malawian producers and traders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => {
              const Icon = proj.icon;
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-[#009FE0] uppercase tracking-wider">
                        {proj.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        {proj.location}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                    <span className="text-xs font-bold text-[#034DA2] block pt-3">
                      {proj.metrics}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. COMMUNITY INITIATIVES ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#034DA2] text-white rounded-[32px] p-8 sm:p-14 shadow-xl">
          <div className="max-w-2xl mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#009FE0]">
              <Sparkles className="size-4" />
              <span>Community Initiatives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Investing Back Into The Communities We Call Home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_INITIATIVES.map((init) => {
              const Icon = init.icon;
              return (
                <div
                  key={init.title}
                  className="bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-xs space-y-3"
                >
                  <div className="size-12 rounded-2xl bg-[#009FE0] text-white flex items-center justify-center">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">{init.title}</h3>
                  <p className="text-xs text-blue-100/85 leading-relaxed">
                    {init.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. SUCCESS STORIES ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Voices From Our Community of Borrowers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Real accounts of business expansion, resilient family incomes, and financial freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story) => (
              <div
                key={story.name}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{story.name}</h4>
                      <span className="text-xs text-[#034DA2] font-semibold block">
                        {story.enterprise}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{story.location}</span>
                    </div>
                  </div>

                  <Quote className="size-6 text-[#009FE0]" />

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#034DA2]">
                    {story.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
