"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

const GENERAL_FIELDS = [
  { name: "siteName", label: "Site name" },
  { name: "tagline", label: "Tagline" },
  { name: "aboutLine", label: "About line (home)" },
  { name: "footerAbout", label: "Footer about" },
];

const CONTACT_FIELDS = [
  { name: "primaryEmail", label: "Primary email" },
  { name: "supportEmail", label: "Support email" },
  { name: "loansEmail", label: "Loans email" },
  { name: "phone", label: "Phone" },
  { name: "whatsapp", label: "WhatsApp" },
  { name: "addressLine1", label: "Address line 1" },
  { name: "addressLine2", label: "Address line 2" },
  { name: "officeHours", label: "Office hours" },
  { name: "mapEmbedUrl", label: "Map embed URL" },
];

type OfficeRow = { label: string; city: string; address: string; phone: string; email: string; hours: string };
type SocialRow = { platform: string; name: string; url: string };

const EMPTY_OFFICE: OfficeRow = { label: "", city: "", address: "", phone: "", email: "", hours: "" };
const EMPTY_SOCIAL: SocialRow = { platform: "facebook", name: "", url: "" };

const SOCIAL_PLATFORMS = ["facebook", "twitter", "linkedin", "instagram", "youtube"];

const strOf = (r: unknown, key: string) =>
  r && typeof r === "object" && (r as Record<string, unknown>)[key] !== undefined
    ? String((r as Record<string, unknown>)[key])
    : "";

export function SettingsManager() {
  const [general, setGeneral] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Record<string, string>>({});
  const [offices, setOffices] = useState<OfficeRow[]>([]);
  const [socials, setSocials] = useState<SocialRow[]>([]);
  const [legalText, setLegalText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        const row = json.data ?? {};
        const g: Record<string, string> = {};
        for (const f of GENERAL_FIELDS) g[f.name] = strOf(row, f.name);
        const c: Record<string, string> = {};
        for (const f of CONTACT_FIELDS) c[f.name] = strOf(row, f.name);
        const rawOffices = Array.isArray(row.offices) ? row.offices : [];
        setOffices(
          rawOffices.map((o: unknown) => ({
            label: strOf(o, "label"),
            city: strOf(o, "city"),
            address: strOf(o, "address"),
            phone: strOf(o, "phone"),
            email: strOf(o, "email"),
            hours: strOf(o, "hours"),
          }))
        );
        const rawSocials = Array.isArray(row.socialLinks) ? row.socialLinks : [];
        setSocials(
          rawSocials.map((o: unknown) => ({
            platform: strOf(o, "platform") || strOf(o, "name")?.toLowerCase() || "",
            name: strOf(o, "name") || strOf(o, "platform"),
            url: strOf(o, "url"),
          }))
        );
        setLegalText(JSON.stringify(row.legal ?? null, null, 2));
        setGeneral(g);
        setContact(c);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setField = (group: "general" | "contact", name: string, value: string) => {
    const setter = group === "general" ? setGeneral : setContact;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  async function save() {
    setSaving(true);
    try {
      const fd = new FormData();
      for (const f of GENERAL_FIELDS) fd.append(f.name, general[f.name] ?? "");
      for (const f of CONTACT_FIELDS) fd.append(f.name, contact[f.name] ?? "");
      const cleanOffices = offices.filter((o) => o.label || o.address || o.city);
      const cleanSocials = socials.filter((s) => s.url.trim());
      fd.append("offices", JSON.stringify(cleanOffices));
      fd.append("socialLinks", JSON.stringify(cleanSocials));
      const legal = legalText.trim();
      fd.append("legal", legal ? legal : "null");
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
    <div className="max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GENERAL_FIELDS.map((f) => (
              <div key={f.name} className={f.name !== "siteName" ? "sm:col-span-2" : ""}>
                <Label className="text-xs font-semibold text-slate-700">{f.label}</Label>
                <Input
                  value={general[f.name] ?? ""}
                  onChange={(e) => setField("general", f.name, e.target.value)}
                  className="mt-1 h-10 rounded-xl border-slate-200 bg-white"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact &amp; offices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CONTACT_FIELDS.map((f) => (
              <div key={f.name} className={f.name === "officeHours" || f.name === "mapEmbedUrl" ? "sm:col-span-2" : ""}>
                <Label className="text-xs font-semibold text-slate-700">{f.label}</Label>
                <Input
                  value={contact[f.name] ?? ""}
                  onChange={(e) => setField("contact", f.name, e.target.value)}
                  className="mt-1 h-10 rounded-xl border-slate-200 bg-white"
                />
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Branch offices</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setOffices((prev) => [...prev, { ...EMPTY_OFFICE }])}
              >
                <Plus className="size-4" /> Add office
              </Button>
            </div>
            {offices.length === 0 && (
              <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-xs text-slate-400">
                No offices yet — add one.
              </p>
            )}
            <div className="space-y-3">
              {offices.map((office, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Office {i + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-lg text-red-500 hover:bg-red-50"
                      onClick={() => setOffices((prev) => prev.filter((_, idx) => idx !== i))}
                      aria-label="Remove office"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(
                      [
                        ["label", "Label"],
                        ["city", "City"],
                        ["address", "Address"],
                        ["phone", "Phone"],
                        ["email", "Email"],
                        ["hours", "Hours"],
                      ] as const
                    ).map(([key, label]) => (
                      <div key={key}>
                        <Label className="text-[11px] font-semibold text-slate-600">{label}</Label>
                        <Input
                          value={office[key]}
                          onChange={(e) =>
                            setOffices((prev) =>
                              prev.map((o, idx) => (idx === i ? { ...o, [key]: e.target.value } : o))
                            )
                          }
                          className="mt-0.5 h-9 rounded-lg border-slate-200 bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Shown on the public contact page and footer.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => setSocials((prev) => [...prev, { ...EMPTY_SOCIAL }])}
            >
              <Plus className="size-4" /> Add link
            </Button>
          </div>
          {socials.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-xs text-slate-400">
              No social links yet.
            </p>
          )}
          <div className="space-y-3">
            {socials.map((social, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-end">
                <div className="w-full sm:w-44">
                  <Label className="text-[11px] font-semibold text-slate-600">Platform</Label>
                  <Select
                    value={social.platform}
                    onValueChange={(v) =>
                      setSocials((prev) =>
                        prev.map((o, idx) =>
                          idx === i
                            ? { ...o, platform: v, name: o.name || v }
                            : o
                        )
                      )
                    }
                  >
                    <SelectTrigger className="mt-0.5 h-9 rounded-lg border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SOCIAL_PLATFORMS.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label className="text-[11px] font-semibold text-slate-600">Name</Label>
                  <Input
                    value={social.name}
                    onChange={(e) =>
                      setSocials((prev) =>
                        prev.map((o, idx) => (idx === i ? { ...o, name: e.target.value } : o))
                      )
                    }
                    className="mt-0.5 h-9 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-[11px] font-semibold text-slate-600">URL</Label>
                  <Input
                    value={social.url}
                    onChange={(e) =>
                      setSocials((prev) =>
                        prev.map((o, idx) => (idx === i ? { ...o, url: e.target.value } : o))
                      )
                    }
                    className="mt-0.5 h-9 rounded-lg border-slate-200 bg-white"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-lg text-red-500 hover:bg-red-50"
                  onClick={() => setSocials((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label="Remove link"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legal (advanced JSON)</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            rows={5}
            value={legalText}
            onChange={(e) => setLegalText(e.target.value)}
            className="w-full min-h-20 resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-xs outline-none focus:border-[#034DA2]"
            placeholder="null"
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Privacy &amp; Terms content is managed under Admin → Legal.
          </p>
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
