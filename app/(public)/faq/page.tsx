import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/content";
import { getFaqs } from "@/lib/cms-data";
import { FaqExplorer, type FaqExplorerItem } from "@/components/public/FaqExplorer";

export default async function FAQPage() {
  const rows = await getFaqs();

  const faqs: FaqExplorerItem[] = rows.map((row) => ({
    id: String(row.id),
    category: slugify(row.category),
    categoryLabel: row.category,
    question: row.question,
    answer: row.answer,
  }));

  const categories = [
    { id: "all", label: "All Questions" },
    ...Array.from(new Set(rows.map((row) => row.category))).map((label) => ({
      id: slugify(label),
      label,
    })),
  ];

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

        <FaqExplorer faqs={faqs} categories={categories} />
      </section>
    </div>
  );
}
