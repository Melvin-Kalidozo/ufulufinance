"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById, getRelatedArticles } from "@/lib/blogData";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Quote,
  Sparkles,
  Building2,
  ChevronRight,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ThumbsUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DedicatedArticlePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const article = getArticleById(resolvedParams.slug);

  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (!article) return notFound();

  const relatedArticles = getRelatedArticles(article.id, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900">

      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#0b1f14] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover object-center opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#01214A]/90 via-[#011632]/95 to-[#01214A]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-10 sm:pt-32 sm:pb-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-medium text-sky-300/70 mb-5 flex-wrap">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Home</Link>
            <ChevronRight className="size-3 text-sky-700 shrink-0" />
            <Link href="/blog" className="hover:text-[#38bdf8] transition-colors">Blog & Insights</Link>
            <ChevronRight className="size-3 text-sky-700 shrink-0" />
            <span className="text-sky-400/80 truncate max-w-[180px] sm:max-w-xs">{article.category}</span>
          </nav>

          {/* Category + Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-[#00A3E0] text-slate-950 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-sky-300/80 font-medium">
              <Clock className="size-3 text-[#38bdf8]" />
              {article.readTime}
            </span>
            <span className="text-sky-700">·</span>
            <span className="flex items-center gap-1.5 text-[11px] text-sky-300/80 font-medium">
              <Calendar className="size-3 text-[#38bdf8]" />
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.2] max-w-4xl mb-3">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-sky-100/70 max-w-3xl leading-relaxed font-normal mb-6">
            {article.excerpt}
          </p>

          {/* Author row + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10">
            {/* Author */}
            <div className="flex items-center gap-3">
              {article.authorImage && (
                <div className="relative size-11 rounded-full overflow-hidden border-2 border-[#00A3E0] shrink-0">
                  <Image src={article.authorImage} alt={article.author} fill className="object-cover" sizes="44px" />
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-white leading-tight">{article.author}</p>
                <p className="text-[11px] text-sky-400 font-medium">{article.authorRole || "Ufulu Finance"}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLiked(!liked)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold transition-all cursor-pointer ${
                  liked
                    ? "bg-[#00A3E0] text-slate-950 border-[#00A3E0]"
                    : "bg-white/8 border-white/15 text-white hover:bg-white/15"
                }`}
              >
                <ThumbsUp className="size-3.5" />
                {liked ? "Helpful (1)" : "Helpful"}
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white text-[11px] font-bold transition-all cursor-pointer hover:bg-white/15"
              >
                {copied ? (
                  <><Check className="size-3.5 text-[#38bdf8]" /><span className="text-[#38bdf8]">Copied!</span></>
                ) : (
                  <><Share2 className="size-3.5" /><span>Share</span></>
                )}
              </button>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white text-[11px] font-bold transition-all hover:bg-white/15"
              >
                <ArrowLeft className="size-3.5 text-[#38bdf8]" />
                All Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-8 relative z-20">
        <div className="relative h-[180px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl border border-white/40 bg-slate-900">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">

          {/* ── LEFT: Article Body ── */}
          <article className="space-y-8 min-w-0">

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-[#00A3E0] flex items-center justify-center shrink-0">
                    <Sparkles className="size-3.5 text-slate-950" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#01214A]">Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content paragraphs & numbered steps */}
            <div className="space-y-5">
              {article.content.map((p, i) => {
                const numbered = p.match(/^(\d+)\.\s*(.*)/);
                if (numbered) {
                  const num = numbered[1];
                  const rest = numbered[2];
                  const dot = rest.indexOf(". ");
                  const headline = dot > -1 ? rest.substring(0, dot) : rest;
                  const body = dot > -1 ? rest.substring(dot + 2) : "";
                  return (
                    <div key={i} className="flex gap-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                      <div className="size-10 rounded-xl bg-[#01214A] text-[#38bdf8] font-black text-sm flex items-center justify-center shrink-0">
                        {num.padStart(2, "0")}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{headline}</h3>
                        {body && <p className="text-sm text-slate-600 leading-relaxed">{body}</p>}
                      </div>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-base text-slate-700 leading-[1.8] font-normal">
                    {p}
                  </p>
                );
              })}
            </div>

            {/* Pull Quote */}
            {article.quote && (
              <blockquote className="relative rounded-2xl bg-[#01214A] text-white px-8 py-8 overflow-hidden">
                <Quote className="absolute -top-3 -left-2 size-20 text-white/5 pointer-events-none" />
                <Quote className="absolute -bottom-3 -right-2 size-20 text-white/5 pointer-events-none rotate-180" />
                <p className="relative text-lg sm:text-xl font-medium italic leading-relaxed text-sky-100 mb-4">
                  "{article.quote.text}"
                </p>
                <cite className="text-xs font-black uppercase tracking-wider text-[#38bdf8] not-italic">
                  — {article.quote.author}
                </cite>
              </blockquote>
            )}

            {/* CTA Banner */}
            <div className="rounded-2xl bg-slate-950 border border-sky-900/30 p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,163,224,0.15),_transparent_65%)] pointer-events-none" />
              <div className="relative space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00A3E0] text-slate-950 mb-1">
                  Accelerate Your Enterprise
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Need Predictable Working Capital for Your Business?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  From bulk inventory purchases to seasonal input financing, Ufulu Finance provides rapid 24-hour disbursements directly to Airtel Money or TNM Mpamba with zero hidden charges.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <LoanEnquiryDialog
                    triggerButton={
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#00A3E0] hover:bg-[#38bdf8] text-slate-950 font-bold px-6 py-2.5 text-xs tracking-wide uppercase transition-all cursor-pointer shadow-sm"
                      >
                        Apply for Financing
                        <ArrowRight className="size-3.5" />
                      </button>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="flex gap-5 items-start bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              {article.authorImage && (
                <div className="relative size-16 rounded-xl overflow-hidden border-2 border-[#00A3E0] shrink-0">
                  <Image src={article.authorImage} alt={article.author} fill className="object-cover" sizes="64px" />
                </div>
              )}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{article.author}</h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 text-[#01214A] text-[10px] font-bold">
                    <ShieldCheck className="size-2.5 text-[#00A3E0]" />
                    Verified Contributor
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-[#01214A]">{article.authorRole || "Ufulu Finance"}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dedicated to expanding practical financial literacy, transparent credit models, and sustainable enterprise development for entrepreneurs across Malawi.
                </p>
              </div>
            </div>
          </article>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* Loan Calculator Card */}
            <div className="bg-[#01214A] text-white rounded-2xl p-5 space-y-3.5 border border-sky-900/40">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00A3E0] text-slate-950">
                  Loan Estimator
                </span>
                <Calculator className="size-4 text-[#38bdf8]" />
              </div>
              <h4 className="text-sm font-bold leading-snug">Transparent Repayment Calculator</h4>
              <p className="text-xs text-sky-200/70 leading-relaxed">
                Borrow from MWK 100,000 to MWK 10,000,000 with flat rates and zero surprise deductions.
              </p>
              <Link
                href="/loans"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs transition-colors"
              >
                Open Loan Calculator
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-[#01214A]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">Our Offices</span>
              </div>

              <div className="space-y-2.5">
                {/* Lilongwe */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Lilongwe Office</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="size-3 text-[#00A3E0] shrink-0" />
                    Cuckoo&apos;s Nest, 1st Flr, Mandala St, Area 3
                  </p>
                  <a href="tel:+265994485444" className="flex items-center gap-1.5 text-[11px] text-[#01214A] font-semibold hover:underline">
                    <Phone className="size-3 shrink-0" />
                    +265 994 485 444
                  </a>
                </div>
                {/* Blantyre */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Blantyre / Limbe Office</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="size-3 text-[#00A3E0] shrink-0" />
                    Zuleka Arcade, 1st Flr Rm 26 (Opp. Illovo), Limbe
                  </p>
                  <a href="tel:+265888885444" className="flex items-center gap-1.5 text-[11px] text-[#01214A] font-semibold hover:underline">
                    <Phone className="size-3 shrink-0" />
                    +265 888 885 444
                  </a>
                </div>
                {/* Mzuzu */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Mzuzu Regional Office</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="size-3 text-[#00A3E0] shrink-0" />
                    Katoto Commercial Area
                  </p>
                  <a href="mailto:info@ufulufinance.com" className="flex items-center gap-1.5 text-[11px] text-[#01214A] font-semibold hover:underline">
                    <Mail className="size-3 shrink-0" />
                    info@ufulufinance.com
                  </a>
                </div>
              </div>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#01214A] font-bold text-xs py-2.5 transition-colors"
              >
                View Full Directory
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#38bdf8]">Stay Informed</span>
              <h4 className="text-sm font-bold leading-snug">Malawi Market & Financing Insights</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monthly updates on agri cycles, MSME cashflow strategies, and regulatory news.
              </p>
              {subscribed ? (
                <div className="rounded-xl bg-sky-950/60 border border-sky-800/40 py-3 text-center">
                  <p className="text-xs font-bold text-[#38bdf8]">You're subscribed!</p>
                  <p className="text-[11px] text-sky-300/70 mt-0.5">We'll be in touch soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                  className="space-y-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white/8 border border-white/15 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#00A3E0] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Mail className="size-3.5" />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>

        {/* ── RELATED ARTICLES ─────────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#034DA2] mb-1">Keep Reading</p>
                <h3 className="text-2xl font-extrabold text-slate-900">Related Insights & Market Updates</h3>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01214A] hover:text-[#00A3E0] transition-colors shrink-0"
              >
                View All Insights
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
                >
                  <div className="relative h-40 bg-slate-100 shrink-0">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/75 backdrop-blur-sm text-white">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1 gap-1.5">
                    <p className="text-[10px] text-slate-400 font-medium">
                      {rel.date} · {rel.readTime}
                    </p>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                      {rel.excerpt}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#01214A] group-hover:text-[#00A3E0] transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
