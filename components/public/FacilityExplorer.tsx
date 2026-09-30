"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Wallet,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

export interface PublicProduct {
  id: string;
  title: string;
  tagline: string;
  description: string;
  limit: string;
  tenure: string;
  turnaround: string;
  repayment: string;
  collateral: string;
  image: string;
  isFeatured: boolean;
  idealFor: string;
}

const productIcon = (slug: string): LucideIcon => {
  const map: Record<string, LucideIcon> = {
    "civil-service": Wallet,
    "private-sector-payroll": Briefcase,
    "village-banking": Users,
    "business-loans": TrendingUp,
  };
  return map[slug] ?? TrendingUp;
};

export function FacilityExplorer({ products }: { products: PublicProduct[] }) {
  const searchParams = useSearchParams();
  const facility = searchParams.get("facility");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  useEffect(() => {
    if (!facility) return;
    const idx = products.findIndex((p) => p.id === facility);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (idx >= 0) setSelectedProductIndex(idx);
    requestAnimationFrame(() => {
      document
        .getElementById("facility-explorer")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [facility, products]);

  const activeProduct = products[Math.min(selectedProductIndex, products.length - 1)];

  return (
    <section
      id="facility-explorer"
      className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034DA2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <span className="size-2 rounded-full bg-brand-green" />
            <span>Our Credit Facilities</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 max-w-xl leading-tight">
              Select a Facility to Explore Full Details
            </h2>
            <p className="text-xs text-slate-500 max-w-xs sm:text-right leading-relaxed">
              Click any product below to review limits, tenure, turnaround, and repayment structure.
            </p>
          </div>
        </div>

        {/* ── MOBILE FILTER BAR ── */}
        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex items-center justify-between gap-2 bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-xs">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Filter className="size-4 text-[#009FE0] shrink-0 ml-1" />
              <select
                value={selectedProductIndex}
                onChange={(e) => setSelectedProductIndex(Number(e.target.value))}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer truncate"
                aria-label="Select facility"
              >
                {products.map((srv, idx) => (
                  <option key={srv.id} value={idx}>
                    {idx + 1}. {srv.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 shrink-0 border-l border-slate-200 pl-2">
              <button
                type="button"
                onClick={() => setSelectedProductIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1))}
                className="size-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous facility"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-[11px] font-bold text-slate-500 px-1">
                {selectedProductIndex + 1}/{products.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProductIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0))}
                className="size-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next facility"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {products.map((srv, idx) => {
              const Icon = productIcon(srv.id);
              const isActive = selectedProductIndex === idx;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#034DA2] text-white shadow-md shadow-blue-900/20 scale-[1.02]"
                      : "bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-[#009FE0]" : "text-slate-500"}`} />
                  <span>{srv.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-panel grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5 items-start">
          {/* LEFT: Desktop product list */}
          <div className="hidden lg:flex flex-col gap-2">
            {products.map((srv, idx) => {
              const Icon = productIcon(srv.id);
              const isActive = selectedProductIndex === idx;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`group w-full text-left rounded-2xl px-4 py-3 sm:px-4.5 sm:py-3.5 border transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                    isActive
                      ? "bg-[#034DA2] border-[#034DA2] shadow-md"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "bg-[#009FE0] text-white"
                      : "bg-slate-100 text-[#034DA2] group-hover:bg-blue-50"
                  }`}>
                    <Icon className="size-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs sm:text-sm font-bold leading-snug truncate transition-colors ${
                      isActive ? "text-white" : "text-slate-900"
                    }`}>
                      {srv.title}
                    </p>
                    <p className={`text-[11px] mt-0.5 leading-snug line-clamp-1 transition-colors ${
                      isActive ? "text-blue-200/90" : "text-slate-500"
                    }`}>
                      {srv.tagline}
                    </p>
                  </div>

                  <div className={`size-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isActive ? "bg-[#009FE0] text-white" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                  }`}>
                    <ArrowRight className="size-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detail panel */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xl">
              <div className="relative h-[160px] sm:h-[190px] w-full overflow-hidden">
                <Image
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#009FE0] text-white shadow-xs">
                    Active Facility
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug drop-shadow-xs">
                    {activeProduct.title}
                  </h3>
                  <p className="text-xs text-blue-100/90 mt-0.5 line-clamp-1">{activeProduct.tagline}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {activeProduct.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Loan Amount", value: activeProduct.limit },
                    { label: "Tenure", value: activeProduct.tenure },
                    { label: "Disbursement", value: activeProduct.turnaround, accent: true },
                    { label: "Repayment", value: activeProduct.repayment },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className={`text-xs sm:text-[13px] font-bold leading-snug ${item.accent ? "text-[#034DA2]" : "text-slate-900"}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2.5 bg-blue-50/60 border border-blue-100/80 rounded-xl p-3">
                  <ShieldCheck className="size-4 text-[#034DA2] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-[#034DA2] font-bold uppercase tracking-wider mb-0.5">Security / Collateral</p>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{activeProduct.collateral}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <LoanEnquiryDialog
                      defaultFacility={activeProduct.title}
                      triggerButton={
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer hover:shadow-md"
                        >
                          Enquire for This Product
                          <ArrowRight className="size-3.5" />
                        </button>
                      }
                    />
                  </div>

                  <div className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-slate-500 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProductIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="size-3.5" />
                      Prev
                    </button>
                    <span className="text-[11px] text-slate-400 px-1">
                      {selectedProductIndex + 1} of {products.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProductIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors cursor-pointer"
                    >
                      Next
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
