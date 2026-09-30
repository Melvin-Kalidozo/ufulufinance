"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AboutFaq {
  id: string;
  question: string;
  answer: string;
}

export function AboutFaqAccordion({ faqs }: { faqs: AboutFaq[] }) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  return (
    <div className="space-y-3.5">
      {faqs.map((faq) => {
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

            <div
              className={`px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 ${
                isOpen ? "" : "hidden"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
