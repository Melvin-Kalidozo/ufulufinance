import Link from "next/link";
import { FileText } from "lucide-react";
import { LegalDocument } from "@/components/public/LegalDocument";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-16 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#01214A]/90 to-slate-950/95" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-[#00A3E0] backdrop-blur-md">
            <FileText className="size-3.5" />
            <span>Terms &amp; Conditions</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200/90 sm:text-base">
            Loan Facility Terms, Consumer Obligations &amp; Regulatory Compliance
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
              Last updated: September 5, 2026
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
              Microfinance Act &amp; RBM Prudential Compliance
            </span>
          </div>
          <div className="mt-4">
            <Link href="/privacy" className="text-xs font-semibold text-[#38bdf8] hover:underline">
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </section>

      <LegalDocument slug="terms" />
    </div>
  );
}
