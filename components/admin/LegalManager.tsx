"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

type Section = { heading: string; body?: string; bullets?: string[] };
type Page = { slug: string; title: string; sections: Section[] };

const SLUGS = ["privacy", "terms"] as const;

export function LegalManager() {
  const [pages, setPages] = useState<Record<string, Page>>({});
  const [active, setActive] = useState<(typeof SLUGS)[number]>("privacy");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/legal");
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        const bySlug: Record<string, Page> = {};
        for (const row of json.data ?? []) {
          const content = row.content as { sections?: Section[] } | undefined;
          bySlug[row.slug] = { slug: row.slug, title: row.title, sections: content?.sections ?? [] };
        }
        for (const slug of SLUGS) {
          bySlug[slug] ??= { slug, title: slug === "privacy" ? "Privacy Policy" : "Terms of Service", sections: [] };
        }
        setPages(bySlug);
      } catch {
        toast.error("Failed to load legal documents");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const page = pages[active];
  const setSections = (sections: Section[]) =>
    setPages((p) => ({ ...p, [active]: { ...p[active], sections } }));

  function updateSection(i: number, patch: Partial<Section>) {
    setSections(page.sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  async function save() {
    if (!page.title.trim()) return toast.error("Title is required.");
    const clean = page.sections.filter((s) => s.heading.trim());
    if (!clean.length) return toast.error("Add at least one section with a heading.");
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/legal/${active}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: page.title, sections: clean }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Save failed");
      toast.success("Legal document saved and published.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={active} onValueChange={(v) => setActive(v as (typeof SLUGS)[number])}>
          <TabsList className="h-10 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1">
            <TabsTrigger value="privacy" className="rounded-lg px-3 text-xs font-bold data-active:bg-[#034DA2] data-active:text-white">
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger value="terms" className="rounded-lg px-3 text-xs font-bold data-active:bg-[#034DA2] data-active:text-white">
              Terms of Service
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={save} disabled={saving} className="rounded-xl bg-[#034DA2] text-white shadow hover:bg-[#023877]">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : "Publish changes"}
        </Button>
      </div>

      <div>
        <Label className="text-xs font-semibold text-slate-700">Document title</Label>
        <Input
          value={page?.title ?? ""}
          onChange={(e) => setPages((p) => ({ ...p, [active]: { ...p[active], title: e.target.value } }))}
          className="mt-1 h-10 max-w-xl rounded-xl border-slate-200 bg-white"
        />
      </div>

      <div className="space-y-4">
        {page?.sections.map((section, i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Section {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon-sm" disabled={i === 0} onClick={() => setSections(move(page.sections, i, -1))} aria-label="Move up">
                  <ArrowUp className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" disabled={i === page.sections.length - 1} onClick={() => setSections(move(page.sections, i, 1))} aria-label="Move down">
                  <ArrowDown className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-red-500 hover:bg-red-50" onClick={() => setSections(page.sections.filter((_, idx) => idx !== i))} aria-label="Remove">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <Input
                value={section.heading}
                onChange={(e) => updateSection(i, { heading: e.target.value })}
                placeholder="Section heading"
                className="h-10 rounded-xl border-slate-200 bg-white font-semibold"
              />
              <textarea
                rows={3}
                value={section.body ?? ""}
                onChange={(e) => updateSection(i, { body: e.target.value })}
                placeholder="Body paragraphs (blank line = new paragraph)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#034DA2]"
              />
              <textarea
                rows={2}
                value={section.bullets?.join("\n") ?? ""}
                onChange={(e) =>
                  updateSection(i, {
                    bullets: e.target.value.split("\n").filter((l) => l.trim()),
                  })
                }
                placeholder="Bullet points (one per line)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#034DA2]"
              />
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={() => setSections([...page.sections, { heading: "", body: "" }])}
          className="rounded-xl border-dashed"
        >
          <Plus className="size-4" />
          Add section
        </Button>
      </div>
    </div>
  );
}

function move<T>(arr: T[], from: number, delta: number): T[] {
  const to = from + delta;
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
