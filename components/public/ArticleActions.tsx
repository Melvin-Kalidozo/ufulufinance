"use client";

import { useState } from "react";
import { Share2, Check, ThumbsUp } from "lucide-react";

export function ArticleActions() {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => setLiked(!liked)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold transition-all cursor-pointer ${
          liked
            ? "bg-[#00A3E0] text-slate-950 border-[#00A3E0]"
            : "bg-white/8 border-white/15 text-white hover:bg-white/15"
        }`}
      >
        <ThumbsUp className="size-3.5" />
        {liked ? "Helpful (1)" : "Helpful"}
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white text-[11px] font-bold transition-all cursor-pointer hover:bg-white/15"
      >
        {copied ? (
          <><Check className="size-3.5 text-[#38bdf8]" /><span className="text-[#38bdf8]">Copied!</span></>
        ) : (
          <><Share2 className="size-3.5" /><span>Share</span></>
        )}
      </button>
    </div>
  );
}
