"use client";

import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
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
  const PROJECTS = [
    {
      id: "solar-agri",
      title: "Solar Irrigation Pilot for Smallholders",
      category: "Green Agri-Finance",
      location: "Dedza & Mchinji Districts",
      description:
        "Financed 280 solar-powered water pump kits for commercial horticulture smallholders, replacing expensive petrol generators and enabling continuous dry-season harvest cycles.",
      metrics: "280 Pumps Installed &middot; 42% Cost Reduction",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      icon: SunMedium,
    },
    {
      id: "market-vendor",
      title: "Urban Market Vendor Liquidity Corridor",
      category: "MSME Working Capital",
      location: "Lilongwe (Area 2, Tsoka) & Blantyre (Limbe)",
      description:
        "Provided revolving micro-inventory credit to over 4,500 market traders, protecting them from predatory informal lenders and sustaining essential food supply chains.",
      metrics: "4,500+ Traders &middot; MWK 1.2B Capital Rotated",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
      icon: Briefcase,
    },
    {
      id: "women-cluster",
      title: "Chikondi Women Cooperative Revolving Fund",
      category: "Village Banking",
      location: "Central & Southern Regions",
      description:
        "Structured solidarity wholesale loans for 120 village savings clusters, enabling rural women to aggregate produce, purchase commercial trikes, and invest in grain mills.",
      metrics: "120 Clusters &middot; 68% Female Borrowers",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
      icon: HeartHandshake,
    },
  ];

  const COMMUNITY_INITIATIVES = [
    {
      title: "Grassroots Financial Literacy Clinics",
      desc: "Delivered 140 free in-person workshops across trading centers on bookkeeping, pricing discipline, and cashflow separation.",
      icon: GraduationCap,
    },
    {
      title: "Agro-Forestry & Soil Restoration Pledge",
      desc: "Planted over 25,000 indigenous trees across farming communities in Dedza and Kasungu to mitigate seasonal flood risks.",
      icon: Trees,
    },
    {
      title: "Emergency Educational Hardship Grants",
      desc: "Provided short-term relief advances and zero-interest hardship deferrals for families impacted by seasonal weather shocks.",
      icon: HeartHandshake,
    },
  ];

  const SUCCESS_STORIES = [
    {
      name: "Grace Banda",
      enterprise: "Maize & Legume Aggregation",
      location: "Mchinji Boma",
      quote:
        "Before Ufulu Finance, informal lenders charged 40% per month, consuming all my profits. With Ufulu’s Mlimi Harvest loan, I purchased certified seeds and rented a warehouse. My seasonal turnover doubled within two harvest cycles.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      stats: "Turnover: +110% | 4 Seasonal Employees Hired",
    },
    {
      name: "Chikondi Phiri",
      enterprise: "Secondary School Educator & Poultry Farmer",
      location: "Lilongwe City",
      quote:
        "The Civil Servant advance was approved on the same day via Airtel Money. I invested in 500 broiler chicks and automated drinkers. The predictable salary deductions make repayment effortless.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      stats: "500 Broilers Financed | 0 Loan Delinquencies",
    },
    {
      name: "Tikondane Women’s Cluster",
      enterprise: "Vegetable Trading & Processing",
      location: "Limbe Market, Blantyre",
      quote:
        "Our village banking group received joint credit within 48 hours. We pooled our capital to purchase wholesale tomatoes and onions directly from Ntcheu growers, increasing our group savings reserve by 65%.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      stats: "18 Women Members | 100% Repayment Record",
    },
  ];

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2400&q=80"
            alt="Ufulu Finance Impact & Portfolio"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0d281a]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Portfolio &amp; Impact
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Transforming Grassroots Economies &middot; Success Stories &middot; Sustainable Community Development
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Impact</span>
          </div>
        </div>
      </section>

      {/* ── 2. PORTFOLIO INTRODUCTION ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Portfolio Introduction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Measuring Success Through Changed Lives, Not Just Loan Volumes
            </h2>

            <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
              Every kwacha disbursed by Ufulu Finance is structured to safeguard borrower dignity, protect household earnings, and multiply long-term assets.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              Since our founding in Lilongwe, Ufulu Finance has deployed credit as a high-leverage instrument for socio-economic mobility. By focusing on productivity-enhancing credit—such as agricultural input financing, transport machinery, and retail inventory—we ensure our borrowers build lasting wealth.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#1b4332] block">MWK 4.8B+</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Cumulative Credit</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#1b4332] block">15,200+</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Borrowers Financed</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#1b4332] block">68%</span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Women Entrepreneurs</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-center">
                <span className="text-2xl font-extrabold text-[#1b4332] block">98.4%</span>
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
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-[#a3e635] uppercase tracking-wider">
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
                    <span className="text-xs font-bold text-emerald-800 block pt-3">
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
        <div className="bg-[#1b4332] text-white rounded-[32px] p-8 sm:p-14 shadow-xl">
          <div className="max-w-2xl mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
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
                  <div className="size-12 rounded-2xl bg-[#84cc16] text-slate-950 flex items-center justify-center">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">{init.title}</h3>
                  <p className="text-xs text-emerald-100/85 leading-relaxed">
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
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
                      <span className="text-xs text-[#1b4332] font-semibold block">
                        {story.enterprise}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{story.location}</span>
                    </div>
                  </div>

                  <Quote className="size-6 text-[#84cc16]" />

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-emerald-800">
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
