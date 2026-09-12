"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticHero } from "@/components/public/ContentSkeletons";
import { usePublicData } from "@/lib/content-store";
import {
  Search,
  ChevronRight,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  BookOpen,
  Newspaper,
  CalendarCheck2,
  Share2,
  Users,
} from "lucide-react";

import type { Article, EventItem } from "@/lib/blogData";

export default function BlogInsightsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "blog" | "news" | "events">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { body: arts } = usePublicData<Record<string, unknown[]>>("/api/public/articles");
  const { body: evts } = usePublicData<Record<string, unknown[]>>("/api/public/events");
  const live =
    arts && evts ? { articles: arts.data ?? [], events: evts.data ?? [] } : null;

  const blRow = (r: unknown) => (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const bval = (r: unknown, k: string, d = "") => {
    const v = blRow(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };
  const longDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

  const ARTICLES: Article[] = live?.articles?.length
    ? (live.articles.map((r) => ({
        id: bval(r, "slug"),
        type: (bval(r, "kind") === "NEWS" ? "news" : "blog") as "blog" | "news",
        title: bval(r, "title"),
        category: bval(r, "category"),
        date: longDate(bval(r, "date")),
        author: bval(r, "author"),
        authorRole: bval(r, "authorRole"),
        authorImage: bval(r, "authorImage") || null,
        readTime: bval(r, "readTime") ? `${bval(r, "readTime")} min read` : "",
        excerpt: bval(r, "excerpt"),
        image: bval(r, "image"),
        isFeatured: Boolean(blRow(r).isFeatured),
        content: [],
      })) as Article[])
    : [];

  const EVENTS: EventItem[] = live?.events?.length
    ? (live.events.map((r) => ({
        id: bval(r, "slug"),
        title: bval(r, "title"),
        date: longDate(bval(r, "date")),
        time: bval(r, "time"),
        location: bval(r, "location"),
        status: (new Date(bval(r, "date")) >= new Date() ? "Upcoming" : "Past") as "Upcoming" | "Past",
        description: bval(r, "description"),
        details: (Array.isArray(blRow(r).details) ? (blRow(r).details as unknown[]) : []) as string[],
        image: bval(r, "image"),
      })) as unknown as EventItem[])
    : [];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "blog" && art.type === "blog") ||
      (activeTab === "news" && art.type === "news");

    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  if (!live) {
    return (
      <div className="min-h-screen bg-[#fcfdfd]">
        <StaticHero
          title="Insights & News"
          subtitle="Our Perspective · Practical Business Coaching · Announcements · Community Events"
        />
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-slate-200/70" />
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
            src="/images/hero-blog.jpg"
            alt="Ufulu Finance Insights"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0b2b1b]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Insights &amp; News
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Our Perspective &middot; Practical Business Coaching &middot; Announcements &middot; Community Events
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#38bdf8] font-semibold">Insights</span>
          </div>
        </div>
      </section>

      {/* ── 2. INSIGHTS INTRODUCTION & OUR PERSPECTIVE ──────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Our Perspective</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Actionable Knowledge For Sustainable Prosperity
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We believe fair financial services must always be paired with transparent financial education. Our leadership regularly shares research on liquidity cycles, agricultural value chains, and micro-enterprise risk management in Malawi.
            </p>

            <div className="pt-2">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <Sparkles className="size-5 text-[#00A3E0] shrink-0" />
                <p className="text-xs font-semibold text-slate-900">
                  Every insight is curated by accredited Malawian financial advisors and agronomists.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Perspective Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#01214A] to-[#034DA2] text-white rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <span className="px-3 py-1 rounded-full bg-[#00A3E0] text-slate-950 text-[10px] font-extrabold uppercase tracking-wide">
              Thought Leadership
            </span>

            <h3 className="text-xl sm:text-2xl font-bold mt-4 leading-snug">
              &ldquo;True financial inclusion does not mean giving people debt; it means providing liquidity that multiplies their productivity.&rdquo;
            </h3>

            <p className="text-xs sm:text-sm text-sky-100/85 mt-3 leading-relaxed">
              In our latest industry whitepaper, we dissect why rigid commercial bank requirements push over 70% of Malawians to informal money lenders—and how digital-first microfinance creates a safe bridge to prosperity.
            </p>

            <div className="mt-6 pt-4 border-t border-[#00A3E0]/30 flex items-center justify-between text-xs text-sky-200">
              <span>By Chifundo Banda, Managing Director</span>
              <Link
                href="/blog/sme-working-capital-2026"
                className="font-bold text-[#38bdf8] hover:underline flex items-center gap-1"
              >
                Read Perspective <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SEARCH & TABS BAR ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
          {/* Tab Navigation */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-semibold overflow-x-auto max-w-full">
            {[
              { id: "all", label: "All Insights" },
              { id: "blog", label: "Blog Articles" },
              { id: "news", label: "Company News" },
              { id: "events", label: "Events & Workshops" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? "bg-[#01214A] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#034DA2]"
            />
          </div>
        </div>
      </section>

      {/* ── 4. ARTICLES & NEWS GRID ─────────────────────────────────── */}
      {(activeTab === "all" || activeTab === "blog" || activeTab === "news") && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
              <BookOpen className="size-10 text-slate-300" />
              <p className="text-sm font-semibold text-slate-500">No articles found for your search.</p>
              <button onClick={() => setSearchQuery("")} className="text-xs text-[#034DA2] font-bold hover:underline cursor-pointer">Clear search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/blog/${art.id}`}
                  className="group relative bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Cover image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Type pill — top left */}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      art.type === "news"
                        ? "bg-[#01214A] text-[#38bdf8]"
                        : "bg-[#00A3E0] text-slate-950"
                    }`}>
                      {art.category}
                    </span>

                    {/* Read time — top right */}
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-semibold text-white">
                      <Clock className="size-2.5" />
                      {art.readTime}
                    </span>

                    {/* Date on image bottom */}
                    <span className="absolute bottom-3 left-3 text-[10px] font-medium text-white/80">
                      {art.date}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                      {art.excerpt}
                    </p>

                    {/* Author row */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {art.authorImage ? (
                          <div className="relative size-7 rounded-full overflow-hidden border-2 border-[#00A3E0] shrink-0">
                            <Image src={art.authorImage} alt={art.author} fill className="object-cover" sizes="28px" />
                          </div>
                        ) : (
                          <div className="size-7 rounded-full bg-[#01214A] text-[#38bdf8] flex items-center justify-center text-[10px] font-black shrink-0">
                            {art.author.charAt(0)}
                          </div>
                        )}
                        <span className="text-[11px] font-semibold text-slate-700 truncate">{art.author}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#01214A] group-hover:text-[#00A3E0] transition-colors shrink-0">
                        Read
                        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Animated bottom accent bar */}
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#01214A] to-[#00A3E0] transition-all duration-500 ease-out" />
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 5. EVENTS & WORKSHOPS SECTION ───────────────────────────── */}
      {(activeTab === "all" || activeTab === "events") && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-brand-green" />
                <span>Upcoming & Past Events</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Community Clinics & Borrower Forums
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENTS.map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.id}`}
                className="group relative bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Cover image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Status pill */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    evt.status === "Upcoming"
                      ? "bg-[#00A3E0] text-slate-950"
                      : "bg-white/20 backdrop-blur-sm text-white"
                  }`}>
                    {evt.status}
                  </span>

                  {/* Date pill — top right */}
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-semibold text-white">
                    <Calendar className="size-2.5" />
                    {evt.date}
                  </span>

                  {/* Time on image bottom */}
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-medium text-white/80">
                    <Clock className="size-3" />
                    {evt.time}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug line-clamp-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                    {evt.description}
                  </p>

                  {/* Location + CTA row */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="size-3 text-[#00A3E0] shrink-0" />
                      <span className="text-[11px] text-slate-500 truncate">{evt.location}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#01214A] group-hover:text-[#00A3E0] transition-colors shrink-0">
                      Details
                      <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Animated bottom accent */}
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#01214A] to-[#00A3E0] transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
