"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resolveEmbed } from "@/lib/embed";
import {
  Search,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Play,
} from "lucide-react";

import type { Article, EventItem } from "@/lib/blogData";

export function InsightsExplorer({
  articles,
  events,
}: {
  articles: Article[];
  events: EventItem[];
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"all" | "blog" | "news" | "events">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tab === "all" || tab === "blog" || tab === "news" || tab === "events") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tab);
      requestAnimationFrame(() => {
        document
          .getElementById("insights")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else if (!tab) {
      setActiveTab("all");
    }
  }, [tab]);

  const filteredArticles = articles.filter((art) => {
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

  return (
    <>
      {/* ── 3. SEARCH & TABS BAR ─────────────────────────────────────── */}
      <section
        id="insights"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
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
                onClick={() => setActiveTab(tab.id as "all" | "blog" | "news" | "events")}
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
              {filteredArticles.map((art) => {
                const embed = resolveEmbed(art.embedUrl);
                return (
                <Link
                  key={art.id}
                  href={`/blog/${art.id}`}
                  className="group relative bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900 shrink-0">
                    {art.image ? (
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#01214A] via-[#023168] to-[#011632]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {embed ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-12 items-center justify-center rounded-full bg-black/55 text-white ring-2 ring-white/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <Play className="size-5 fill-current translate-x-0.5" />
                        </span>
                      </div>
                    ) : null}

                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      art.type === "news"
                        ? "bg-[#01214A] text-[#38bdf8]"
                        : "bg-[#00A3E0] text-slate-950"
                    }`}>
                      {art.category}
                    </span>

                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-semibold text-white">
                      <Clock className="size-2.5" />
                      {art.readTime}
                    </span>

                    <span className="absolute bottom-3 left-3 text-[10px] font-medium text-white/80">
                      {art.date}
                    </span>

                    {embed ? (
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-green text-white text-[10px] font-black uppercase tracking-wider">
                        <Play className="size-2.5 fill-current" />
                        Video
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                      {art.excerpt}
                    </p>

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

                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#01214A] to-[#00A3E0] transition-all duration-500 ease-out" />
                </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── 5. EVENTS & WORKSHOPS SECTION ───────────────────────────── */}
      {events.length > 0 && (activeTab === "all" || activeTab === "events") && (
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
            {events.map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.id}`}
                className="group relative bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    evt.status === "Upcoming"
                      ? "bg-[#00A3E0] text-slate-950"
                      : "bg-white/20 backdrop-blur-sm text-white"
                  }`}>
                    {evt.status}
                  </span>

                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-semibold text-white">
                    <Calendar className="size-2.5" />
                    {evt.date}
                  </span>

                  <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-medium text-white/80">
                    <Clock className="size-3" />
                    {evt.time}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug line-clamp-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                    {evt.description}
                  </p>

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

                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#01214A] to-[#00A3E0] transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
