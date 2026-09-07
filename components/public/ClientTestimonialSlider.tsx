"use client";

import { useState, useMemo } from "react";
import {
  Quote,
  Star,
  BadgeCheck,
  ShieldCheck,
  Clock,
  Banknote,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  facility: string;
  amount: string;
  category: "all" | "msme" | "agri" | "civil" | "logistics" | "group";
  categoryLabel: string;
  quote: string;
  image: string;
  rating: number;
  date: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "kondwani-gondwe",
    name: "Kondwani Gondwe",
    role: "Commercial Grain & Soya Farmer",
    location: "Mchinji District",
    facility: "Agri-Seasonal Input Credit",
    amount: "MWK 4,000,000",
    category: "agri",
    categoryLabel: "Agriculture",
    quote:
      "Financing certified seed and basal fertilizer upfront used to be our biggest struggle every planting season. Ufulu Finance disbursed directly to our agro-dealer within 24 hours, and structured repayments to match our harvest marketing cycles.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    date: "1 month ago",
    highlight: "Direct Agro-Dealer Disbursal",
  },
  {
    id: "blessings-chirwa",
    name: "Blessings Chirwa",
    role: "Building Materials & Timber Supplier",
    location: "Limbe Commercial Area, Blantyre",
    facility: "Asset & Logistics Expansion Facility",
    amount: "MWK 6,500,000",
    category: "logistics",
    categoryLabel: "Asset & Logistics",
    quote:
      "The zero hidden fee guarantee is 100% genuine. Every single kwacha was detailed upfront in my sanction letter. That transparent capital allowed us to procure a 3-ton delivery truck and double our regional distribution capacity.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    date: "3 weeks ago",
    highlight: "Zero Hidden Fees Guarantee",
  },
  {
    id: "grace-phiri",
    name: "Grace Phiri",
    role: "Retail Enterprise Owner",
    location: "Area 25, Lilongwe",
    facility: "MSME QuickGrowth Facility",
    amount: "MWK 2,500,000",
    category: "msme",
    categoryLabel: "MSME Working Capital",
    quote:
      "Before Ufulu Finance, informal lenders charged 30% per month, taking all our retail profits. With their MSME loan, I restocked my grocery shop, expanded to wholesale maize trade, and hired two full-time assistants in Area 25.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    date: "2 weeks ago",
    highlight: "Disbursed in Under 24h",
  },
  {
    id: "tiwonge-mkandawire",
    name: "Tiwonge Mkandawire",
    role: "Senior Secondary Educator",
    location: "Mzuzu City",
    facility: "Civil Servant Salary FastAdvance",
    amount: "MWK 850,000",
    category: "civil",
    categoryLabel: "Civil Service",
    quote:
      "When my daughter needed urgent university tuition fees, commercial banks quoted a 3-week processing turnaround. Ufulu verified my payslip and deposited the tuition funds directly to my Airtel Money wallet in under 6 hours.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    date: "Last month",
    highlight: "Disbursed via Airtel Money",
  },
  {
    id: "alinane-banda",
    name: "Alinane Banda",
    role: "Solidarity Cluster Group Leader",
    location: "Salima District",
    facility: "Village Banking Group Credit",
    amount: "MWK 1,800,000",
    category: "group",
    categoryLabel: "Village Banking",
    quote:
      "Our women's cooperative of 12 fish-smoking entrepreneurs needed collective working capital. Ufulu's credit officer visited our cluster in Salima, provided financial literacy guidance, and structured our group facility with dignity.",
    image:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    date: "3 weeks ago",
    highlight: "12-Member Cluster Financed",
  },
  {
    id: "dalitso-phiri",
    name: "Dalitso Phiri",
    role: "Medical & Pharmaceutical Distributor",
    location: "Kanengo Industrial Area, Lilongwe",
    facility: "Commercial Trade & Invoice Bridge",
    amount: "MWK 8,000,000",
    category: "msme",
    categoryLabel: "MSME Working Capital",
    quote:
      "When supplying regional clinics, waiting 60 days for hospital invoice reconciliations choked our cash flow. Ufulu's trade finance bridge helped us keep inventory stocked without interrupting essential medical supply chains.",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    date: "2 months ago",
    highlight: "Invoice Discounting Bridge",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Stories" },
  { id: "agri", label: "Agriculture" },
  { id: "msme", label: "MSME & Retail" },
  { id: "civil", label: "Civil Service" },
  { id: "logistics", label: "Asset & Logistics" },
  { id: "group", label: "Village Banking" },
] as const;

export function ClientTestimonialSlider() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredStories = useMemo(() => {
    if (selectedCategory === "all") return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const displayedStories = showAll ? filteredStories : filteredStories.slice(0, 3);

  return (
    <div className="w-full space-y-10">
      {/* ── 1. AGGREGATE RATING & TRUST SOCIAL PROOF BANNER ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Star rating score */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="size-16 sm:size-18 rounded-2xl bg-[#034DA2] text-white flex flex-col items-center justify-center shadow-md">
                <span className="text-2xl sm:text-3xl font-black leading-none">4.9</span>
                <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wide">Out of 5</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  Exceptional Borrower Satisfaction
                </div>
                <p className="text-xs text-slate-500">
                  Based on 1,200+ verified disbursements across Malawi
                </p>
              </div>
            </div>
          </div>

          {/* Center / Right: Key Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="size-8 rounded-xl bg-blue-100 text-[#034DA2] flex items-center justify-center shrink-0">
                <Clock className="size-4 text-[#00A3E0]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">24h Turnaround</span>
                <span className="text-[10px] text-slate-500">Fast decision</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="size-8 rounded-xl bg-blue-100 text-[#034DA2] flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4 text-[#00A3E0]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">100% Transparent</span>
                <span className="text-[10px] text-slate-500">Zero hidden fees</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="size-8 rounded-xl bg-blue-100 text-[#034DA2] flex items-center justify-center shrink-0">
                <Banknote className="size-4 text-[#00A3E0]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Flexible Terms</span>
                <span className="text-[10px] text-slate-500">Harvest &amp; payroll aligned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. FILTER PILLS BAR ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full [scrollbar-width:none]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline-flex items-center gap-1">
            <Filter className="size-3.5 text-[#034DA2]" /> Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? TESTIMONIALS.length
                : TESTIMONIALS.filter((t) => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowAll(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5",
                  isActive
                    ? "bg-[#034DA2] text-white shadow-md shadow-blue-950/15"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {filteredStories.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-[#034DA2] hover:text-[#00A3E0] transition-colors cursor-pointer ml-auto"
          >
            {showAll ? "Show Less" : `View All (${filteredStories.length}) Stories`}
          </button>
        )}
      </div>

      {/* ── 3. MODERN TESTIMONIAL CARD GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedStories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
          >
            {/* Top Row: Stars + Date + Facility Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-slate-900 ml-1">5.0</span>
                </div>

                <span className="text-[11px] font-medium text-slate-400">{item.date}</span>
              </div>

              {/* Facility Tag */}
              <div className="mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#034DA2]">
                  {item.facility}
                </span>
              </div>

              {/* Testimonial Quote */}
              <div className="relative mb-6">
                <Quote className="size-8 text-sky-100 absolute -top-3 -left-2 pointer-events-none -z-0" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal relative z-10 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom: Borrower Profile & Disbursement Badge */}
            <div className="pt-5 border-t border-slate-100 space-y-4">
              {/* Profile details */}
              <div className="flex items-center gap-3.5">
                <div className="size-11 rounded-full bg-gradient-to-br from-[#01214A] via-[#034DA2] to-[#00A3E0] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm shrink-0 border border-sky-400/30">
                  <span className="select-none">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#034DA2] transition-colors truncate">
                      {item.name}
                    </h4>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#00A3E0]">
                      <BadgeCheck className="size-3 text-[#00A3E0]" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{item.role}</p>
                  <p className="text-[11px] font-semibold text-[#034DA2] truncate">{item.location}</p>
                </div>
              </div>

              {/* Disbursed Amount + Highlight */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Disbursed:</span>
                  <span className="font-mono font-extrabold text-[#034DA2]">{item.amount}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 truncate">
                  {item.highlight}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
