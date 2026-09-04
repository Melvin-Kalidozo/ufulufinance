"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Home,
  FileQuestion,
  HelpCircle,
  Briefcase,
  Layers,
  PhoneCall,
  Search,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { SessionProvider } from "next-auth/react";

export default function NotFound() {
  const router = useRouter();

  return (
    <SessionProvider>
      <div className="flex min-h-[100dvh] flex-col bg-[#fafbfc] text-slate-900">
        <PublicHeader />

        <main className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1b4332] text-xs font-bold uppercase tracking-wider mb-6">
              <FileQuestion className="size-3.5 text-[#84cc16]" />
              <span>Error 404 • Page Not Found</span>
            </div>

            {/* Big 404 Visual Graphic */}
            <div className="relative my-4 flex items-center justify-center">
              <span className="text-8xl sm:text-9xl font-extrabold tracking-tight text-slate-100 select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-20 sm:size-24 rounded-3xl bg-gradient-to-br from-[#1b4332] to-[#0f2e1e] flex items-center justify-center shadow-xl shadow-emerald-950/20 border border-white/20">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#84cc16]">
                    ?
                  </span>
                </div>
              </div>
            </div>

            {/* Headline and Description */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              We couldn’t find that financial destination
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              The page you requested may have been relocated, renamed, or is temporarily
              unavailable. Explore our verified services below or head back to the main portal.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-xs cursor-pointer"
              >
                <ArrowLeft className="size-4 text-slate-500" />
                <span>Go Back</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143225] text-white text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] shadow-md shadow-emerald-950/20"
              >
                <Home className="size-4 text-[#84cc16]" />
                <span>Return to Homepage</span>
              </Link>

              <Link
                href="/loans"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#a3e635] text-slate-950 text-xs sm:text-sm font-extrabold transition-all hover:scale-[1.02] shadow-md shadow-lime-500/20"
              >
                <span>Browse Loan Products</span>
              </Link>
            </div>

            {/* Helpful Popular Destinations Grid */}
            <div className="mt-14 pt-10 border-t border-slate-200 text-left">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-5">
                Popular Destinations & Fast Links
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  href="/loans"
                  className="group p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="size-8 rounded-lg bg-emerald-50 text-[#1b4332] flex items-center justify-center group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                      <Search className="size-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">Loan Facilities</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    MSME credit, agri-inputs, civil payroll advances & asset finance.
                  </p>
                </Link>

                <Link
                  href="/services"
                  className="group p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="size-8 rounded-lg bg-emerald-50 text-[#1b4332] flex items-center justify-center group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                      <Layers className="size-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">All Services</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Village solidarity groups, digital trade credit & advisory clinics.
                  </p>
                </Link>

                <Link
                  href="/jobs"
                  className="group p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="size-8 rounded-lg bg-emerald-50 text-[#1b4332] flex items-center justify-center group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                      <Briefcase className="size-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">Careers</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Join our field team, credit analysis desk, or digital banking unit.
                  </p>
                </Link>

                <Link
                  href="/contact"
                  className="group p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="size-8 rounded-lg bg-emerald-50 text-[#1b4332] flex items-center justify-center group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
                      <HelpCircle className="size-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">Help & Support</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Branch locator across Blantyre, Lilongwe & Mzuzu with direct lines.
                  </p>
                </Link>
              </div>

              {/* Direct Help Bar */}
              <div className="mt-8 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#1b4332] text-[#84cc16] flex items-center justify-center shrink-0">
                    <PhoneCall className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Need Immediate Customer Assistance?</h4>
                    <p className="text-[11px] text-slate-600">
                      Our call centre is open Monday to Friday, 07:30 - 17:00 CAT.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+265990000000"
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#1b4332] transition-colors"
                  >
                    +265 99 000 0000
                  </a>
                  <Link
                    href="/contact"
                    className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#143225] text-xs font-bold text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <PublicFooter />
      </div>
    </SessionProvider>
  );
}
