"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  facility: string;
  amount: string;
  quote: string;
  image: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "grace-phiri",
    name: "Grace Phiri",
    role: "Retail Enterprise Owner",
    location: "Area 25, Lilongwe",
    facility: "MSME QuickGrowth Facility",
    amount: "MWK 2,500,000",
    quote:
      "Before Ufulu Finance, informal lenders charged 30% per month, taking all our retail profits. With their MSME loan, I restocked my grocery shop, expanded to wholesale maize trade, and hired two full-time assistants in Area 25.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "kondwani-gondwe",
    name: "Kondwani Gondwe",
    role: "Commercial Grain & Soya Farmer",
    location: "Mchinji District",
    facility: "Agri-Seasonal Input Credit",
    amount: "MWK 4,000,000",
    quote:
      "Financing certified seed and basal fertilizer upfront used to be our biggest struggle every planting season. Ufulu Finance disbursed directly to our agro-dealer within 24 hours, and structured repayments to match our harvest marketing cycles.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "tiwonge-mkandawire",
    name: "Tiwonge Mkandawire",
    role: "Senior Secondary Educator",
    location: "Mzuzu City",
    facility: "Civil Servant Salary FastAdvance",
    amount: "MWK 850,000",
    quote:
      "When my daughter needed urgent university tuition fees, commercial banks quoted a 3-week processing turnaround. Ufulu verified my payslip and deposited the tuition funds directly to my Airtel Money wallet in under 6 hours.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: "blessings-chirwa",
    name: "Blessings Chirwa",
    role: "Building Materials & Timber Supplier",
    location: "Limbe Commercial Area, Blantyre",
    facility: "Asset & Logistics Expansion Facility",
    amount: "MWK 6,500,000",
    quote:
      "The zero hidden fee guarantee is 100% genuine. Every single kwacha was detailed upfront in my sanction letter. That transparent capital allowed us to procure a 3-ton delivery truck and double our regional distribution capacity.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

export function ClientTestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ── Main Testimonial Card ── */}
      <div className="relative bg-gradient-to-br from-[#1b4332] via-[#143d28] to-[#0c281a] rounded-[32px] p-8 sm:p-12 text-white shadow-2xl overflow-hidden border border-emerald-700/40">
        {/* Ambient Radial Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(132,204,22,0.15)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[radial-gradient(circle,_rgba(45,106,79,0.25)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
          
          {/* Avatar & Badges Column */}
          <div className="flex flex-col items-center shrink-0 text-center">
            <div className="relative size-24 sm:size-28 rounded-3xl overflow-hidden border-3 border-[#84cc16] shadow-xl">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="112px"
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-[11px] font-semibold text-[#a3e635]">
              <BadgeCheck className="size-3.5 text-[#84cc16]" />
              <span>Verified Borrower</span>
            </div>

            <div className="mt-2 text-[11px] font-bold text-emerald-200/70">
              {current.facility}
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            {/* Stars & Quote Icon Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <div className="flex items-center gap-0.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-[#84cc16] text-[#84cc16]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white ml-1">5.0</span>
                <span className="text-[10px] text-emerald-200/60">&middot; Verified Story</span>
              </div>

              <Quote className="size-8 text-[#84cc16]/40 hidden md:block" />
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-lg text-slate-100 font-normal italic leading-relaxed pt-1">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author Meta */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h4 className="text-base font-extrabold text-white">
                  {current.name}
                </h4>
                <p className="text-xs text-emerald-200/80">
                  {current.role} &middot; <span className="text-[#a3e635]">{current.location}</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10 self-center sm:self-auto">
                <span className="text-[11px] text-emerald-200/60 font-normal">Disbursed:</span>
                <span>{current.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation Controls (Arrows & Indicators) ── */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          
          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  currentIndex === idx
                    ? "w-8 bg-[#84cc16]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

          {/* Previous / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous story"
              className="size-9 rounded-full bg-white/10 hover:bg-[#84cc16] hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-95"
            >
              <ChevronLeft className="size-4.5" />
            </button>
            <span className="text-xs font-bold text-emerald-200/60 px-1">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next story"
              className="size-9 rounded-full bg-white/10 hover:bg-[#84cc16] hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-95"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
