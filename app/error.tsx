"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  ShieldCheck,
  PhoneCall,
  Mail,
  HelpCircle,
} from "lucide-react";

export default function ErrorPage({
  error,
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
  retry?: () => void;
}) {
  const handleRetry = () => {
    if (reset) reset();
    else if (retry) retry();
    else if (typeof window !== "undefined") window.location.reload();
  };

  useEffect(() => {
    // Log the error to console or telemetry
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="w-full bg-[#01214A] border-b border-sky-900/40 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-[#034DA2] border border-[#00A3E0]/40 flex items-center justify-center font-black text-white text-lg shadow-sm">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-tight leading-none">
                Ufulu Finance
              </span>
              <span className="text-[10px] font-semibold text-sky-400 tracking-wider uppercase mt-0.5">
                Microfinance Malawi
              </span>
            </div>
          </Link>

          <Link
            href="/contact"
            className="text-xs font-semibold text-sky-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="size-3.5 text-[#00A3E0]" />
            <span>Support Desk</span>
          </Link>
        </div>
      </header>

      {/* Main Error Body */}
      <main className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6">
        <div className="w-full max-w-2xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6">
            <AlertTriangle className="size-3.5 text-amber-600" />
            <span>System Notice • Error 500</span>
          </div>

          {/* Icon graphic */}
          <div className="size-20 sm:size-24 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-900/10 border border-amber-200">
            <AlertTriangle className="size-10 sm:size-12 text-amber-600" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Temporary System Interruption
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            We encountered an unexpected error while processing your request. Our technical team has been
            notified and is actively working on a resolution.
          </p>

          {/* Security & Integrity Reassurance */}
          <div className="my-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 max-w-md mx-auto flex items-center gap-3 text-left">
            <div className="size-9 rounded-xl bg-[#034DA2] text-[#38bdf8] flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Your Data & Records Remain Protected</h4>
              <p className="text-[11px] text-slate-600">
                Any loan enquiries, account transactions, or documents in progress remain safe.
              </p>
            </div>
          </div>

          {/* Error Digest Code if available */}
          {error?.digest && (
            <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-500 mb-6">
              Diagnostic Code: <span className="font-semibold text-slate-700">{error.digest}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#034DA2] hover:bg-[#023877] text-white text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] shadow-md shadow-blue-950/20 cursor-pointer"
            >
              <RotateCcw className="size-4 text-[#38bdf8]" />
              <span>Retry Operation</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-xs"
            >
              <Home className="size-4 text-slate-500" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white text-xs sm:text-sm font-extrabold transition-all hover:scale-[1.02] shadow-md shadow-sky-500/20"
            >
              <PhoneCall className="size-4" />
              <span>Contact Support</span>
            </Link>
          </div>

          {/* Emergency helpline */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="size-3.5 text-[#034DA2]" />
              <span>Emergency Hotline:</span>
              <a href="tel:+265990000000" className="font-bold text-slate-800 hover:text-[#034DA2]">
                +265 99 000 0000
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="size-3.5 text-[#034DA2]" />
              <span>Email:</span>
              <a href="mailto:support@ufulufinance.com" className="font-bold text-slate-800 hover:text-[#034DA2]">
                support@ufulufinance.com
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="w-full border-t border-slate-200 py-4 px-4 text-center text-[11px] text-slate-400 bg-white">
        © {new Date().getFullYear()} Ufulu Finance Ltd. Regulated microfinance institution. All rights reserved.
      </footer>
    </div>
  );
}
