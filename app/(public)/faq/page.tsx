"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
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

const FAQS: FAQItem[] = [
  {
    id: "who-is-ufulu",
    category: "general",
    categoryLabel: "General Questions",
    question: "Who is Ufulu Finance and is the institution regulated?",
    answer:
      "Ufulu Finance Limited is a registered Malawian microfinance institution established in Lilongwe. We operate under national microfinance prudential regulations and consumer credit protection standards, providing non-deposit credit facilities to micro, small, and medium enterprises (MSMEs), agricultural producers, and salaried civil servants.",
  },
  {
    id: "where-branches",
    category: "general",
    categoryLabel: "General Questions",
    question: "Where are your branch offices located?",
    answer:
      "Our Lilongwe Office is at Cuckoo's Nest, 1st Floor, Mandala Street, Area 3, Lilongwe (+265 994 485 444). Our Blantyre / Limbe Office is at Zuleka Arcade, 1st Floor Room 26, Opposite Illovo, Limbe (+265 888 885 444). All offices are open Monday to Friday, 8:00 AM – 5:00 PM.",
  },
  {
    id: "who-qualifies",
    category: "eligibility",
    categoryLabel: "Loan Eligibility",
    question: "Who qualifies for an Ufulu Finance loan?",
    answer:
      "Malawian citizens aged 21 to 65 who own an active registered or informal enterprise operating for at least 6 months, smallholder farmers with verifiable land cultivation, or permanent civil servants and public sector employees with regular salary credits.",
  },
  {
    id: "required-documents",
    category: "eligibility",
    categoryLabel: "Loan Eligibility",
    question: "What documents do I need to present when applying?",
    answer:
      "1. Valid Malawian National ID Card (Smart Card) or passport.\n2. Recent 3 to 6 months bank statement or mobile money (Airtel Money / TNM Mpamba) transaction history.\n3. Proof of business trading location or residential utility bill/chief's letter.\n4. For civil servants: Latest 3 months payslips and confirmation letter.\n5. Two recent passport-size photos.",
  },
  {
    id: "how-much-borrow",
    category: "eligibility",
    categoryLabel: "Loan Eligibility",
    question: "What is the minimum and maximum amount I can borrow?",
    answer:
      "First-time borrowers can access loans starting from MWK 50,000 up to MWK 2,500,000 depending on cashflow assessment. Established repeat borrowers with exemplary repayment track records can scale up to MWK 15,000,000 for asset and commercial facilities.",
  },
  {
    id: "interest-charges",
    category: "repayments",
    categoryLabel: "Repayments & Rates",
    question: "What interest rates and fees does Ufulu Finance charge?",
    answer:
      "Our interest rates range between 2.8% and 3.5% flat monthly depending on the facility type, tenure, and collateral backing. We have a strict 'Zero Hidden Deductions' policy: all processing fees (1.0% to 2.0%) and insurance charges are disclosed upfront on your official sanction letter before disbursement.",
  },
  {
    id: "early-repayment",
    category: "repayments",
    categoryLabel: "Repayments & Rates",
    question: "Can I repay my loan before the agreed tenure without penalty?",
    answer:
      "Yes! Ufulu Finance encourages early debt liquidation. Borrowers who settle their balance ahead of schedule are charged interest only for the duration the facility was active, with zero penalty surcharges.",
  },
  {
    id: "how-repay",
    category: "repayments",
    categoryLabel: "Repayments & Rates",
    question: "How do I make my monthly or weekly loan repayments?",
    answer:
      "Repayments can be made through:\n- Direct Mobile Money bill pay via Airtel Money or TNM Mpamba using your Loan Account Reference.\n- Direct bank transfer or branch deposit into our designated National Bank or Standard Bank accounts.\n- Automated payroll deduction (for registered civil servants and corporate partnerships).\n- In-person at any Ufulu Finance branch cashier.",
  },
  {
    id: "mobile-payout-speed",
    category: "mobile",
    categoryLabel: "Mobile Wallet Payouts",
    question: "How quickly are funds disbursed to my mobile wallet?",
    answer:
      "Once your KYC documents are approved and your agreement is signed, funds are pushed to your registered Airtel Money or TNM Mpamba wallet within 15 to 30 minutes, or credited to your commercial bank within 24 hours.",
  },
  {
    id: "data-security",
    category: "security",
    categoryLabel: "Security & Privacy",
    question: "How is my personal financial data and credit record protected?",
    answer:
      "We strictly adhere to the Malawi Data Protection Act and Reserve Bank of Malawi confidentiality regulations. Your financial statements, phone numbers, and repayment histories are stored on encrypted servers and are never sold or shared with unauthorized commercial third parties.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((f) => {
      const matchesCat = activeCategory === "all" || f.category === activeCategory;
      const matchesSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=2400&q=80"
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
            <span className="size-2 rounded-full bg-[#009FE0]" />
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
            {[
              { id: "all", label: "All Questions" },
              { id: "general", label: "General" },
              { id: "eligibility", label: "Loan Eligibility" },
              { id: "repayments", label: "Repayments & Rates" },
              { id: "mobile", label: "Mobile Wallet Payouts" },
              { id: "security", label: "Security & Privacy" },
            ].map((cat) => (
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
