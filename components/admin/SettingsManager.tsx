"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type LucideIcon,
  Loader2,
  Save,
  Plus,
  Trash2,
  Building2,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Link2,
  Share2,
  Bell,
  Settings as SettingsIcon,
  CircleAlert,
  CircleCheck,
  Globe,
  AtSign,
  Briefcase,
  Camera,
  Play,
} from "lucide-react";

const GENERAL_FIELDS = [
  { name: "siteName", label: "Site name" },
  { name: "tagline", label: "Tagline" },
  { name: "aboutLine", label: "About line (home)" },
  { name: "footerAbout", label: "Footer about" },
];

const CONTACT_FIELDS: {
  name: string;
  label: string;
  icon?: LucideIcon;
  wide?: boolean;
}[] = [
  { name: "primaryEmail", label: "Primary email", icon: Mail },
  { name: "supportEmail", label: "Support email", icon: Mail },
  { name: "loansEmail", label: "Loans email", icon: Mail },
  { name: "phone", label: "Phone", icon: Phone },
  { name: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { name: "addressLine1", label: "Address line 1", icon: MapPin },
  { name: "addressLine2", label: "Address line 2" },
  { name: "officeHours", label: "Office hours", icon: Clock, wide: true },
  { name: "mapEmbedUrl", label: "Map embed URL", icon: Link2, wide: true },
];

type OfficeRow = {
  label: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
};
type SocialRow = { platform: string; name: string; url: string };

const EMPTY_OFFICE: OfficeRow = {
  label: "",
  city: "",
  address: "",
  phone: "",
  email: "",
  hours: "",
};
const EMPTY_SOCIAL: SocialRow = { platform: "facebook", name: "", url: "" };

const SOCIAL_PLATFORMS = [
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
  "youtube",
] as const;

const PLATFORM_ICON: Record<string, LucideIcon> = {
  facebook: Globe,
  twitter: AtSign,
  linkedin: Briefcase,
  instagram: Camera,
  youtube: Play,
};

const TABS = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "contact", label: "Contact & offices", icon: Phone },
  { id: "social", label: "Social links", icon: Share2 },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

type TabId = (typeof TABS)[number]["id"];

const strOf = (r: unknown, key: string) =>
  r &&
  typeof r === "object" &&
  (r as Record<string, unknown>)[key] !== undefined
    ? String((r as Record<string, unknown>)[key])
    : "";

function FieldShell({
  label,
  icon: Icon,
  wide,
  children,
}: {
  label: string;
  icon?: LucideIcon;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <Label className="text-xs font-semibold text-slate-700">{label}</Label>
      <div className="relative mt-1.5">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        )}
        {children}
      </div>
    </div>
  );
}

export function SettingsManager() {
  const [general, setGeneral] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Record<string, string>>({});
  const [offices, setOffices] = useState<OfficeRow[]>([]);
  const [socials, setSocials] = useState<SocialRow[]>([]);
  const [notifEmail, setNotifEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("general");

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
          })),
        );
        const rawSocials = Array.isArray(row.socialLinks)
          ? row.socialLinks
          : [];
        setSocials(
          rawSocials.map((o: unknown) => ({
            platform:
              strOf(o, "platform") || strOf(o, "name")?.toLowerCase() || "",
            name: strOf(o, "name") || strOf(o, "platform"),
            url: strOf(o, "url"),
          })),
        );
        setNotifEmail(strOf(row, "notificationEmail"));
        setGeneral(g);
        setContact(c);
      } catch {
        toast.error("Couldn't load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const touch = () => setDirty(true);

  const setField = (
    group: "general" | "contact",
    name: string,
    value: string,
  ) => {
    const setter = group === "general" ? setGeneral : setContact;
    setter((prev) => ({ ...prev, [name]: value }));
    touch();
  };

  const updateOffice = (i: number, key: keyof OfficeRow, value: string) => {
    setOffices((prev) =>
      prev.map((o, idx) => (idx === i ? { ...o, [key]: value } : o)),
    );
    touch();
  };

  const updateSocial = (i: number, patch: Partial<SocialRow>) => {
    setSocials((prev) =>
      prev.map((o, idx) => (idx === i ? { ...o, ...patch } : o)),
    );
    touch();
  };

  const officeSummary = (o: OfficeRow, i: number) =>
    o.label || o.city || `Office ${i + 1}`;

  async function save() {
    setSaving(true);
    try {
      const fd = new FormData();
      for (const f of GENERAL_FIELDS) fd.append(f.name, general[f.name] ?? "");
      for (const f of CONTACT_FIELDS) fd.append(f.name, contact[f.name] ?? "");
      fd.append("notificationEmail", notifEmail.trim());
      const cleanOffices = offices.filter(
        (o) => o.label || o.address || o.city,
      );
      const cleanSocials = socials.filter((s) => s.url.trim());
      fd.append("offices", JSON.stringify(cleanOffices));
      fd.append("socialLinks", JSON.stringify(cleanSocials));
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Save failed");
      toast.success("Settings saved");
      setDirty(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const completeness = useMemo(() => {
    const filledOffices = offices.filter((o) => o.label || o.address).length;
    const filledSocials = socials.filter((s) => s.url.trim()).length;
    return { filledOffices, filledSocials };
  }, [offices, socials]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-5 pb-24">
      {/* Tab navigation */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabId)}
      >
        <div className="overflow-x-auto pb-1">
          <TabsList className="h-10 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="gap-2 whitespace-nowrap rounded-lg px-3 text-xs font-bold text-slate-500 data-active:bg-[#034DA2] data-active:text-white data-active:shadow-sm hover:text-[#034DA2]"
                >
                  <Icon className="size-4" />
                  {tab.label}
                  {tab.id === "contact" && offices.length > 0 && (
                    <span className="rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {offices.length}
                    </span>
                  )}
                  {tab.id === "social" && completeness.filledSocials > 0 && (
                    <span className="rounded-md bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {completeness.filledSocials}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </Tabs>

      {/* Tab content */}
      <div>
        {activeTab === "general" && (
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <p className="mb-4 text-sm text-slate-500">
              The name and language visitors see across the site and footer.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GENERAL_FIELDS.map((f) => (
                <div
                  key={f.name}
                  className={f.name !== "siteName" ? "sm:col-span-2" : ""}
                >
                  <Label className="text-xs font-semibold text-slate-700">
                    {f.label}
                  </Label>
                  <Input
                    value={general[f.name] ?? ""}
                    onChange={(e) =>
                      setField("general", f.name, e.target.value)
                    }
                    className="mt-1.5 h-10 rounded-xl border-slate-200 bg-white"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
              <p className="mb-4 text-sm text-slate-500">
                How people reach you, and where enquiries get routed.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTACT_FIELDS.map((f) => (
                  <FieldShell
                    key={f.name}
                    label={f.label}
                    icon={f.icon}
                    wide={f.wide}
                  >
                    <Input
                      value={contact[f.name] ?? ""}
                      onChange={(e) =>
                        setField("contact", f.name, e.target.value)
                      }
                      className={`h-10 rounded-xl border-slate-200 bg-white ${f.icon ? "pl-9" : ""}`}
                    />
                  </FieldShell>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Branch offices
                  </p>
                  <p className="text-xs text-slate-500">
                    Listed on the contact page, in the order shown here.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-slate-200"
                  onClick={() => {
                    setOffices((prev) => [...prev, { ...EMPTY_OFFICE }]);
                    touch();
                  }}
                >
                  <Plus className="size-4" /> Add office
                </Button>
              </div>

              {offices.length === 0 && (
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
                  <Building2 className="size-5 text-slate-300" />
                  <p className="text-sm text-slate-400">
                    No offices listed yet. Add your first one.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {offices.map((office, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Building2 className="size-4 text-slate-400" />
                        {officeSummary(office, i)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setOffices((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          );
                          touch();
                        }}
                        aria-label="Remove office"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
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
                          <Label className="text-[11px] font-semibold text-slate-500">
                            {label}
                          </Label>
                          <Input
                            value={office[key]}
                            onChange={(e) =>
                              updateOffice(i, key, e.target.value)
                            }
                            className="mt-1 h-9 rounded-xl border-slate-200 bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "social" && (
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Shown on the public contact page and site footer.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl border-slate-200"
                onClick={() => {
                  setSocials((prev) => [...prev, { ...EMPTY_SOCIAL }]);
                  touch();
                }}
              >
                <Plus className="size-4" /> Add link
              </Button>
            </div>

            {socials.length === 0 && (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
                <Share2 className="size-5 text-slate-300" />
                <p className="text-sm text-slate-400">No social links yet.</p>
              </div>
            )}

            <div className="space-y-3">
              {socials.map((social, i) => {
                const PlatformIcon = PLATFORM_ICON[social.platform] ?? Share2;
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
                  >
                    <div className="w-full sm:w-44">
                      <Label className="text-[11px] font-semibold text-slate-500">
                        Platform
                      </Label>
                      <Select
                        value={social.platform}
                        onValueChange={(v) =>
                          updateSocial(i, {
                            platform: v,
                            name: social.name || v,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 h-9 rounded-xl border-slate-200 bg-white">
                          <span className="flex items-center gap-2">
                            <PlatformIcon className="size-4 text-slate-400" />
                            <SelectValue />
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {SOCIAL_PLATFORMS.map((p) => {
                            const Icon = PLATFORM_ICON[p];
                            return (
                              <SelectItem key={p} value={p}>
                                <span className="flex items-center gap-2">
                                  <Icon className="size-4 text-slate-400" />
                                  {p.charAt(0).toUpperCase() + p.slice(1)}
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label className="text-[11px] font-semibold text-slate-500">
                        Display name
                      </Label>
                      <Input
                        value={social.name}
                        onChange={(e) =>
                          updateSocial(i, { name: e.target.value })
                        }
                        className="mt-1 h-9 rounded-xl border-slate-200 bg-white"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-[11px] font-semibold text-slate-500">
                        URL
                      </Label>
                      <Input
                        value={social.url}
                        onChange={(e) =>
                          updateSocial(i, { url: e.target.value })
                        }
                        placeholder="https://"
                        className="mt-1 h-9 rounded-xl border-slate-200 bg-white"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="self-start rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 sm:self-end"
                      onClick={() => {
                        setSocials((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        );
                        touch();
                      }}
                      aria-label="Remove link"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === "notifications" && (
          <section className="max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <p className="mb-4 text-sm text-slate-500">
              Where new job applications, loan enquiries and company enquiries
              get emailed.
            </p>
            <FieldShell label="Notification email" icon={Mail}>
              <Input
                type="email"
                value={notifEmail}
                onChange={(e) => {
                  setNotifEmail(e.target.value);
                  touch();
                }}
                placeholder="hr@ufulufinance.com"
                className="h-10 rounded-xl border-slate-200 bg-white pl-9"
              />
            </FieldShell>
            <p className="mt-2 text-xs text-slate-400">
              Leave blank to send to the configured SMTP user instead.
            </p>
          </section>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            {dirty ? (
              <>
                <CircleAlert className="size-3.5 text-amber-500" /> Unsaved
                changes
              </>
            ) : (
              <>
                <CircleCheck className="size-3.5 text-brand-green" /> All
                changes saved
              </>
            )}
          </span>
          <Button
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-xl bg-[#034DA2] px-5 text-white shadow-md shadow-blue-950/15 hover:bg-[#023877] disabled:opacity-40"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
