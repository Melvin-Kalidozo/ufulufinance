"use client";

import { useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

export interface FaqExplorerItem {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
}

export function FaqExplorer({
  faqs,
  categories,
}: {
  faqs: FaqExplorerItem[];
  categories: { id: string; label: string }[];
}) {
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

  return (
    <>
      {/* ── SEARCH & CATEGORIES BAR ─────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mt-10 space-y-6">
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

      {/* ── QUESTIONS & ANSWERS (Accordion Section) ──────────────────── */}
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

                  <div
                    className={`px-6 pb-5 pt-1 border-t border-slate-100 bg-[#fcfdfd] ${
                      isOpen ? "" : "hidden"
                    }`}
                  >
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
