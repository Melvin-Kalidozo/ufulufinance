import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getArticlesList, getEventsList } from "@/lib/cms-data";
import { InsightsExplorer } from "@/components/public/InsightsExplorer";
import { ArrowRight, Sparkles } from "lucide-react";

import type { Article, EventItem } from "@/lib/blogData";

export default async function BlogInsightsPage() {
  const [articleRows, eventRows] = await Promise.all([
    getArticlesList(),
    getEventsList(20),
  ]);

  const blRow = (r: unknown) => (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
  const bval = (r: unknown, k: string, d = "") => {
    const v = blRow(r)[k];
    return v !== undefined && v !== null && String(v) !== "" ? String(v) : d;
  };
  const longDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

  const ARTICLES: Article[] = articleRows.map((r) => ({
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
    embedUrl: bval(r, "embedUrl") || undefined,
    isFeatured: Boolean(blRow(r).isFeatured),
    content: [],
  })) as Article[];

  const EVENTS: EventItem[] = eventRows.map((r) => ({
    id: bval(r, "slug"),
    title: bval(r, "title"),
    date: longDate(bval(r, "date")),
    time: bval(r, "time"),
    location: bval(r, "location"),
    status: (new Date(bval(r, "date")) >= new Date() ? "Upcoming" : "Past") as "Upcoming" | "Past",
    description: bval(r, "description"),
    details: (Array.isArray(blRow(r).details) ? (blRow(r).details as unknown[]) : []) as string[],
    image: bval(r, "image"),
  })) as unknown as EventItem[];

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

      {/* ── 2. INSIGHTS INTRODUCTION & OUR PERSPECTIVE (Non-Card Layout) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
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

            <div className="pt-2 flex items-center gap-2.5 text-xs font-medium text-slate-600">
              <Sparkles className="size-4 text-[#00A3E0] shrink-0" />
              <span>Curated by accredited Malawian financial advisors and agronomists.</span>
            </div>
          </div>

          {/* Thought Leadership (Integrated Section, Not a Card) */}
          <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-slate-200/80 lg:pl-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2]">
              <span className="size-2 rounded-full bg-brand-green" />
              <span>Thought Leadership</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
              &ldquo;True financial inclusion does not mean giving people debt; it means providing liquidity that multiplies their productivity.&rdquo;
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              In our latest industry whitepaper, we dissect why rigid commercial bank requirements push over 70% of Malawians to informal money lenders—and how digital-first microfinance creates a safe bridge to prosperity.
            </p>

            <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="font-semibold text-slate-500">By Chifundo Banda, Managing Director</span>
              <Link
                href="/blog/sme-working-capital-2026"
                className="font-bold text-[#034DA2] hover:text-[#02336e] inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>Read Perspective</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-5. INSIGHTS EXPLORER (interactive client island) ───────── */}
      <Suspense fallback={<div className="py-16" />}>
        <InsightsExplorer articles={ARTICLES} events={EVENTS} />
      </Suspense>
    </div>
  );
}
