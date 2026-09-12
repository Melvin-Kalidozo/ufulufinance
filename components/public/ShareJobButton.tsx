"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function ShareJobButton({ jobTitle }: { jobTitle?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Share ${jobTitle || "Job"}`}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 text-xs backdrop-blur-sm transition-all cursor-pointer hover:scale-105 w-full sm:w-auto shadow-sm"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-brand-green-light" />
          <span className="text-brand-green-light font-bold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="size-3.5 text-sky-300" />
          <span>Share Vacancy</span>
        </>
      )}
    </button>
  );
}
