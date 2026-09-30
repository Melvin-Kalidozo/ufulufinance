"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function SectionDeepLink() {
  const section = useSearchParams().get("section");

  useEffect(() => {
    if (!section) return;
    const el = document.getElementById(section);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [section]);

  return null;
}
