"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, ChevronDown } from "lucide-react";
import { getJson } from "@/lib/content";
import { Shimmer, EmptyState } from "@/components/public/ContentSkeletons";

type Section = { heading: string; body?: string; bullets?: string[] };

function RenderSections({ sections }: { sections: Section[] }) {
  return (
    <div className="divide-y divide-slate-100">
      {sections.map((section, index) => {
        const id = `section-${index + 1}`;
        const num = String(index + 1).padStart(2, "0");
        return (
          <section
            key={id}
            id={id}
            className="scroll-mt-28 py-10 first:pb-10"
          >
            <div className="flex items-baseline gap-3">
              <span className="rounded-md bg-sky-50 px-2.5 py-1 font-mono text-xs font-bold text-[#00A3E0]">
                {num}
              </span>
              <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                {section.heading}
              </h2>
            </div>
            <div className="space-y-3.5 pl-0 text-sm text-slate-600 leading-relaxed sm:pl-10 sm:text-[15px]">
              {section.body
                ? section.body.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)
                : null}
              {section.bullets?.length ? (
                <ul className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                  {section.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-slate-200/70 bg-slate-50 p-3 text-xs font-medium text-slate-700 sm:text-sm"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function LegalDocument({ slug }: { slug: "privacy" | "terms" }) {
  const [doc, setDoc] = useState<{ title: string; sections: Section[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("");

  useEffect(() => {
    getJson<{ data?: { title: string; content: { sections?: Section[] } } }>(
      `/api/public/legal/${slug}`
    )
      .then((json) => {
        const content = json.data?.content as { sections?: Section[] } | undefined;
        if (json.data && content?.sections?.length) {
          setDoc({ title: json.data.title, sections: content.sections });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const ids = (doc?.sections ?? []).map((_, i) => `section-${i + 1}`);
    if (!ids.length) return;
    const onScroll = () => {
      const pos = window.scrollY + 180;
      let current = "";
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= pos) {
          current = ids[i];
          break;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActive(id);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Shimmer className="h-8 w-64" />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Shimmer key={i} className="h-9 w-full" />
            ))}
          </div>
          <div className="space-y-4 lg:col-span-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Shimmer key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Document not published yet"
          description="This document will appear here once it is published from the admin portal."
        />
      </div>
    );
  }

  const tocItems = doc.sections.map((section, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: section.heading,
    id: `section-${i + 1}`,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8.5rem)] space-y-6 overflow-y-auto rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="border-b border-slate-100 pb-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Table of Contents
              </h3>
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                      isActive
                        ? "border-[#00A3E0]/20 bg-[#00A3E0]/10 text-[#00A3E0]"
                        : "border-transparent text-slate-600 hover:bg-sky-50/70 hover:text-[#00A3E0]"
                    }`}
                  >
                    <span className="flex items-center gap-3 truncate">
                      <span className="font-mono text-[11px] font-bold text-slate-400">
                        {item.num}
                      </span>
                      <span className="truncate">{item.title}</span>
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="space-y-2 rounded-2xl border border-slate-200/90 bg-white p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#00A3E0]">
                {slug === "privacy" ? "Privacy Office" : "Legal Secretariat"}
              </p>
              <div className="space-y-2 pt-1 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 shrink-0 text-[#00A3E0]" />
                  {slug === "privacy" ? "privacy@ufulufinance.com" : "compliance@ufulufinance.com"}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 shrink-0 text-[#00A3E0]" />
                  +265 (0) 1 772 400
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <div className="mb-6 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm lg:hidden">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                <span>Table of Contents</span>
                <ChevronDown className="size-4 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <nav className="mt-4 grid grid-cols-1 gap-1.5 border-t border-slate-100 pt-3 sm:grid-cols-2">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item.id)}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-600 hover:bg-sky-50 hover:text-[#00A3E0]"
                  >
                    <span className="font-mono font-bold text-slate-400">{item.num}</span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </details>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm sm:p-12">
            <RenderSections sections={doc.sections} />
          </div>
        </div>
      </div>
    </div>
  );
}
