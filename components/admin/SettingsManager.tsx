"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

const TEXT_FIELDS: { name: string; label: string; span?: boolean }[] = [
  { name: "siteName", label: "Site name" },
  { name: "tagline", label: "Tagline", span: true },
  { name: "aboutLine", label: "About line (home)", span: true },
  { name: "footerAbout", label: "Footer about", span: true },
  { name: "primaryEmail", label: "Primary email" },
  { name: "supportEmail", label: "Support email" },
  { name: "loansEmail", label: "Loans email" },
  { name: "phone", label: "Phone" },
  { name: "whatsapp", label: "WhatsApp" },
  { name: "addressLine1", label: "Address line 1" },
  { name: "addressLine2", label: "Address line 2" },
  { name: "officeHours", label: "Office hours", span: true },
  { name: "mapEmbedUrl", label: "Map embed URL", span: true },
];

export function SettingsManager() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        const s = json.data ?? {};
        const next: Record<string, string> = {};
        for (const f of TEXT_FIELDS) next[f.name] = s[f.name] ?? "";
        next.offices = JSON.stringify(s.offices ?? null, null, 2);
        next.socialLinks = JSON.stringify(s.socialLinks ?? null, null, 2);
        next.legal = JSON.stringify(s.legal ?? null, null, 2);
        setForm(next);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function set(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const fd = new FormData();
      for (const f of TEXT_FIELDS) fd.append(f.name, form[f.name] ?? "");
      for (const j of ["offices", "socialLinks", "legal"] as const) {
        const text = (form[j] ?? "").trim();
        fd.append(j, text ? text : "null");
      }
      const res = await fetch("/api/admin/settings", { method: "PATCH", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Save failed");
      toast.success("Settings saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>General & contact details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TEXT_FIELDS.map((f) => (
              <div key={f.name} className={f.span ? "sm:col-span-2" : ""}>
                <Label className="text-xs font-semibold text-slate-700">{f.label}</Label>
                <Input
                  value={form[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  className="mt-1 h-10 rounded-xl border-slate-200 bg-white"
                />
              </div>
            ))}
            {["offices", "socialLinks", "legal"].map((j) => (
              <div key={j} className="sm:col-span-2">
                <Label className="text-xs font-semibold text-slate-700 capitalize">{j} (JSON)</Label>
                <textarea
                  rows={6}
                  value={form[j] ?? ""}
                  onChange={(e) => set(j, e.target.value)}
                  className="mt-1 w-full min-h-24 resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-xs outline-none focus:border-[#034DA2]"
                  placeholder='[{ "platform":"facebook", "name":"Facebook", "url":"https://facebook.com" }]'
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-[#034DA2] px-6 text-white shadow-md shadow-blue-950/15 hover:bg-[#023877]"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
