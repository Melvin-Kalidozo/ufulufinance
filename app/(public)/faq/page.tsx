"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { slugify } from "@/lib/content";
import { usePublicData } from "@/lib/content-store";
import { Shimmer, StaticHero } from "@/components/public/ContentSkeletons";
import {
  Search,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Wallet,
  Building2,
  FileCheck,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "general" | "eligibility" | "repayments" | "mobile" | "security";
  categoryLabel: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const { body } = usePublicData<{
    data: { id: number; question: string; answer: string; category: string }[];
  }>("/api/public/faqs");
  const loading = body === null;

  const faqs: FAQItem[] = (body?.data ?? []).map((row) => ({
    id: String(row.id),
    category: slugify(row.category) as FAQItem["category"],
    categoryLabel: row.category,
    question: row.question,
    answer: row.answer,
  }));

  const categories = [
    { id: "all", label: "All Questions" },
    ...Array.from(new Set((body?.data ?? []).map((row) => row.category))).map((label) => ({
      id: slugify(label),
      label,
    })),
  ];

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = activeCategory === "all" || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfd]">
        <StaticHero
          title="Frequently Asked Questions"
          subtitle="Clear, Honest Answers Regarding Loans, Eligibility, Rates & Mobile Disbursements"
        />
        <div className="mx-auto max-w-4xl space-y-4 px-4 py-12">
          <Shimmer className="h-11 w-full rounded-2xl" />
          <Shimmer className="h-9 w-2/3 rounded-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-20 w-full rounded-2xl" />
          ))}
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
            src="/images/hero-faq.jpg"
            alt="Ufulu Finance FAQs"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#01214A]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Clear, Honest Answers Regarding Loans, Eligibility, Rates &amp; Mobile Disbursements
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#009FE0] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#009FE0] font-semibold">FAQs</span>
          </div>
        </div>
      </section>

      {/* ── 2. FAQS INTRODUCTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="size-2 rounded-full bg-brand-green" />
            <span>FAQs Introduction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Everything You Need to Know Before You Borrow
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Transparency is our core promise. We have assembled the most common questions regarding loan qualifications, interest calculations, Airtel/Mpamba payouts, and consumer rights.
          </p>
        </div>

        {/* ── 3. SEARCH & CATEGORIES BAR ─────────────────────────────── */}
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
          {/* Search bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <input
              type="text"
              placeholder="Type keywords like 'interest rate', 'airtel money', 'payslip', 'chattel'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm shadow-xs focus:outline-none focus:border-[#034DA2]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#034DA2] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. QUESTIONS & ANSWERS (Accordion Section) ──────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <HelpCircle className="size-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No matching questions found</p>
              <p className="text-xs text-slate-500">
                Try searching with different keywords or browse our categories above.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-[#009FE0] shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`size-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100 bg-[#fcfdfd]">
                      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
