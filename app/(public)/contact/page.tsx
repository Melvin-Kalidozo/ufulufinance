"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Mail,
  Phone,
  Link2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { usePublicData } from "@/lib/content-store";
import {
  StaticHero,
  Shimmer,
  SectionHeadingSkeleton,
  TextCardGridSkeleton,
} from "@/components/public/ContentSkeletons";

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

type ContactRow = Record<string, unknown>;

const BRAND_PATHS: Record<string, string> = {
  facebook:
    "M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.5 9 4.667V8z",
  twitter:
    "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  linkedin:
    "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  youtube:
    "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
};

const DEFAULT_OFFICES: ContactRow[] = [
  {
    city: "Lilongwe",
    label: "Lilongwe Head Office",
    address: "Mandala Road, Area 3, Lilongwe, Malawi",
    phone: "+265 99 123 4567",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -13.98774,
    lng: 33.76651,
  },
  {
    city: "Blantyre",
    label: "Blantyre Commercial Branch",
    address: "Victoria Avenue, CBD, Blantyre, Malawi",
    phone: "+265 88 123 4567",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -15.78853,
    lng: 35.00483,
  },
  {
    city: "Mzuzu",
    label: "Mzuzu Regional Office",
    address: "Katoto Commercial Area, Mzuzu, Malawi",
    phone: "+265 99 876 5432",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -11.45916,
    lng: 34.00955,
  },
  {
    city: "Kasungu",
    label: "Kasungu Region Branch",
    address: "Kasungu City Offices, Kasungu, Malawi",
    phone: "+265 998 02 91 46",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -13.03199,
    lng: 33.48286,
  },
  {
    city: "Zomba",
    label: "Zomba Region Branch",
    address: "Zomba Post Office, Zomba, Malawi",
    phone: "+265 999 67 94 44",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -15.3858,
    lng: 35.319,
  },
  {
    city: "Karonga",
    label: "Karonga Region Branch",
    address: "Karonga Post Office, Karonga, Malawi",
    phone: "+265 994 37 54 44",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -9.9386,
    lng: 33.9269,
  },
];

const OFFICE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  lilongwe: { lat: -13.98774, lng: 33.76651 },
  blantyre: { lat: -15.78853, lng: 35.00483 },
  mzuzu: { lat: -11.45916, lng: 34.00955 },
  kasungu: { lat: -13.03199, lng: 33.48286 },
  zomba: { lat: -15.3858, lng: 35.319 },
  karonga: { lat: -9.9386, lng: 33.9269 },
};

function getOfficeCoordinates(office: ContactRow | null): { lat: number; lng: number } {
  if (!office) return OFFICE_COORDINATES.lilongwe;

  // 1. Check if office contains direct lat / lng values (number or numeric string)
  if (
    office.lat !== undefined &&
    office.lat !== null &&
    office.lat !== "" &&
    office.lng !== undefined &&
    office.lng !== null &&
    office.lng !== ""
  ) {
    const parsedLat = typeof office.lat === "number" ? office.lat : parseFloat(String(office.lat));
    const parsedLng = typeof office.lng === "number" ? office.lng : parseFloat(String(office.lng));
    if (!Number.isNaN(parsedLat) && !Number.isNaN(parsedLng)) {
      return { lat: parsedLat, lng: parsedLng };
    }
  }

  // 2. City / Address fallback resolution
  const city = String(office.city ?? "").toLowerCase();
  const label = String(office.label ?? "").toLowerCase();
  const address = String(office.address ?? "").toLowerCase();

  if (city.includes("blantyre") || label.includes("blantyre") || address.includes("blantyre")) {
    return OFFICE_COORDINATES.blantyre;
  }
  if (city.includes("mzuzu") || label.includes("mzuzu") || address.includes("mzuzu")) {
    return OFFICE_COORDINATES.mzuzu;
  }
  if (city.includes("kasungu") || label.includes("kasungu") || address.includes("kasungu")) {
    return OFFICE_COORDINATES.kasungu;
  }
  if (city.includes("zomba") || label.includes("zomba") || address.includes("zomba")) {
    return OFFICE_COORDINATES.zomba;
  }
  if (city.includes("karonga") || label.includes("karonga") || address.includes("karonga")) {
    return OFFICE_COORDINATES.karonga;
  }
  return OFFICE_COORDINATES.lilongwe;
}

export default function ContactPage() {
  const { body: settingsBody } = usePublicData<{ data: ContactRow | null }>(
    "/api/public/settings",
  );
  const DEFAULT_SETTINGS: ContactRow = {
    addressLine1: "City Centre, Area 3, Lilongwe, Malawi",
    addressLine2: "Lilongwe",
    supportEmail: "support@ufulufinance.com",
    loansEmail: "loans@ufulufinance.com",
    phone: "+265 99 123 4567",
    officeHours: "Mon – Fri, 8:00 AM – 5:00 PM",
    offices: DEFAULT_OFFICES,
  };
  const settings: ContactRow = settingsBody?.data ?? DEFAULT_SETTINGS;
  const s = (key: string, fallback = "") =>
    settings[key] !== undefined && settings[key] !== null
      ? String(settings[key])
      : fallback;
  const rawOffices: ContactRow[] = Array.isArray(settings?.offices)
    ? (settings?.offices as unknown[]).map((o) =>
        o && typeof o === "object" ? (o as ContactRow) : {},
      )
    : [];
  // Merge: use DB offices but patch any stale/missing fields from our defaults,
  // then append any city not already in the DB (e.g. Kasungu, Zomba, Karonga).
  const offices: ContactRow[] = (() => {
    if (rawOffices.length === 0) return DEFAULT_OFFICES;
    // Build a lookup of defaults by city key for patching
    const defaultByCity = new Map(
      DEFAULT_OFFICES.map((d) => [String(d.city ?? "").toLowerCase().trim(), d]),
    );
    // Patch each DB office: fill blank email or replace stale info@ with loans@, and ensure lat/lng are populated
    const patched = rawOffices.map((o) => {
      const key = String(o.city ?? "").toLowerCase().trim();
      const def = defaultByCity.get(key);
      if (!def) return o;
      const dbEmail = String(o.email ?? "").trim();
      const needsEmail = !dbEmail || dbEmail === "info@ufulufinance.com";
      const email = needsEmail ? def.email : o.email;
      const lat =
        o.lat !== undefined && o.lat !== null && o.lat !== ""
          ? o.lat
          : def.lat;
      const lng =
        o.lng !== undefined && o.lng !== null && o.lng !== ""
          ? o.lng
          : def.lng;
      return { ...o, email, lat, lng };
    });
    // Append cities not yet in DB
    const dbCities = new Set(patched.map((o) => String(o.city ?? "").toLowerCase().trim()));
    const missing = DEFAULT_OFFICES.filter(
      (d) => !dbCities.has(String(d.city ?? "").toLowerCase().trim()),
    );
    return [...patched, ...missing];
  })();
  const socials: ContactRow[] = Array.isArray(settings?.socialLinks)
    ? (settings?.socialLinks as unknown[]).map((o) =>
        o && typeof o === "object" ? (o as ContactRow) : {},
      )
    : [];
  const str = (r: ContactRow, k: string) =>
    r[k] !== undefined && r[k] !== null ? String(r[k]) : "";
  const officePhones = (o: ContactRow): string[] => {
    const raw = o["phones"];
    if (Array.isArray(raw)) {
      return raw.map((p) => String(p ?? "")).filter((p) => p.trim());
    }
    const single = str(o, "phone");
    return single ? [single] : [];
  };
  const firstOffice = offices[0];
  const addressLine =
    s("addressLine1") ||
    (firstOffice ? str(firstOffice, "address") : "Address coming soon");
  const addressLine2 = s("addressLine2") || "";
  const supportEmail = s("supportEmail") || "";
  const loansEmail = s("loansEmail") || "";
  const directPhone = s("phone") || "";
  const whatsapp = s("whatsapp") || "";
  const phoneList: string[] = Array.isArray(settings?.phones)
    ? (settings?.phones as unknown[])
        .map((p) => String(p ?? ""))
        .filter((p) => p.trim())
    : directPhone
      ? [directPhone]
      : [];
  const mapEmbed = s("mapEmbedUrl") || "";
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState<number>(0);
  const activeOffice = offices[selectedOfficeIndex] || offices[0] || null;
  const activeAddress = activeOffice
    ? str(activeOffice, "address") || str(activeOffice, "city")
    : addressLine;
  const activeLabel = activeOffice
    ? str(activeOffice, "label") || str(activeOffice, "city") || "Office"
    : "Head Office";
  const activeCoords = getOfficeCoordinates(activeOffice);
  const officeMapEmbedUrl =
    activeOffice && str(activeOffice, "mapEmbedUrl")
      ? str(activeOffice, "mapEmbedUrl")
      : mapEmbed && selectedOfficeIndex === 0
        ? mapEmbed
        : `https://maps.google.com/maps?q=${activeCoords.lat},${activeCoords.lng}&hl=en&z=16&output=embed`;

  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    company: false,
    phone: false,
    email: false,
    subject: false,
    message: false,
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Real-time inline validation
  const errors = useMemo(() => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) {
      errs.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    const digitsOnly = form.phone.replace(/[^0-9]/g, "");
    if (!form.phone.trim()) {
      errs.phone = "Phone is required";
    } else if (digitsOnly.length < 7) {
      errs.phone = "Please enter a valid phone number";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (form.email.trim() && !emailRegex.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!form.subject.trim()) {
      errs.subject = "Subject is required";
    } else if (form.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }

    if (!form.message.trim()) {
      errs.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      errs.message = `Please enter at least 10 characters (${10 - form.message.trim().length} more needed)`;
    }

    return errs;
  }, [form]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({
      name: true,
      company: true,
      phone: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    setSending(true);
    try {
      const categoryMap = (subject: string) => {
        const t = subject.toLowerCase();
        if (t.includes("loan")) return "Loan Info";
        if (t.includes("partnership")) return "Partnership";
        if (t.includes("complaint")) return "Complaints";
        if (t.includes("career") || t.includes("job")) return "Careers";
        if (t.includes("media") || t.includes("press")) return "Media";
        return "General Information";
      };
      const res = await fetch("/api/public/enquiries/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          category: categoryMap(form.subject),
          message: `${form.subject}\n\n${form.message}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          json.error || json.message || "We could not send your message.",
        );
      }
      setSent(true);
      toast.success("Message sent! We will get back to you shortly.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  function handleReset() {
    setSent(false);
    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
    setTouched({
      name: false,
      company: false,
      phone: false,
      email: false,
      subject: false,
      message: false,
    });
  }

  // Determine input classes based on validation state
  function getFieldState(field: keyof FormData) {
    const isTouched = touched[field];
    const errorMsg = errors[field];
    const hasValue = Boolean(form[field]?.trim());

    const isInvalid = isTouched && Boolean(errorMsg);
    const isValid = isTouched && !errorMsg && hasValue;

    let borderClasses =
      "bg-[#F0F4F8] border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

    if (isInvalid) {
      borderClasses =
        "bg-red-50/30 border border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20";
    } else if (isValid) {
      borderClasses =
        "bg-[#F0F4F8] border border-sky-400/80 focus:bg-white focus:border-[#00A3E0] focus:ring-2 focus:ring-sky-500/20";
    }

    return {
      isInvalid,
      isValid,
      errorMsg,
      borderClasses,
    };
  }



  return (
    <div className="flex flex-col bg-white antialiased text-slate-900">
      {/* ── FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-28 sm:pb-36 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-contact.jpg"
            alt="Contact Ufulu Finance"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#01214A]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-lg mx-auto font-normal leading-relaxed">
            Our accredited loan advisors are ready to assist you in Lilongwe,
            Blantyre, Mzuzu, Kasungu, Zomba, and Karonga.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <a href="/" className="hover:text-[#009FE0] transition-colors">
              Home
            </a>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#009FE0] font-semibold">Contact</span>
          </div>
        </div>
      </section>

      {/* ── FLOATING CARD (Faithful to reference design) ─────────────── */}
      <section className="relative z-10  px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28">
        <div className="mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* ── LEFT COLUMN: GET IN TOUCH ──────────────────────── */}
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="mb-3 block h-1 w-8 rounded-full bg-brand-green" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Get in touch
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                    Our accredited loan officers and client relationship
                    managers are available across Lilongwe, Blantyre, Mzuzu,
                    Kasungu, Zomba, and Karonga to provide rapid, judgment-free
                    financial advisory.
                  </p>

                  <div className="mt-8 space-y-6">
                    {(addressLine || addressLine2) && (
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#034DA2] text-white shadow-md shadow-blue-900/20">
                          <MapPin className="size-5 text-[#009FE0]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Head Office
                          </p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {addressLine}
                            {addressLine2 ? (
                              <>
                                <br />
                                {addressLine2}
                              </>
                            ) : null}
                            {s("officeHours") ? (
                              <>
                                <br />
                                {s("officeHours")}
                              </>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    )}

                    {[supportEmail, loansEmail].filter(Boolean).length > 0 && (
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#034DA2] text-white shadow-md shadow-blue-900/20">
                          <Mail className="size-5 text-[#009FE0]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Email Us
                          </p>
                          {[supportEmail, loansEmail]
                            .filter(Boolean)
                            .map((email) => (
                              <p
                                key={email}
                                className="text-xs text-slate-500 mt-1"
                              >
                                {email}
                              </p>
                            ))}
                        </div>
                      </div>
                    )}

                    {(phoneList.length > 0 || whatsapp) && (
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#034DA2] text-white shadow-md shadow-blue-900/20">
                          <Phone className="size-5 text-[#009FE0]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Call Us
                          </p>
                          {phoneList.map((num) => (
                            <p
                              key={num}
                              className="text-xs text-slate-500 mt-1"
                            >
                              {num}
                            </p>
                          ))}
                          {whatsapp ? (
                            <p className="text-xs text-slate-500 mt-1">
                              {whatsapp}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {socials.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-800 mb-3">
                      Follow our social media
                    </p>
                    <div className="flex items-center gap-2.5">
                      {socials.map((social, i) => {
                        const platform = String(
                          social.platform ?? social.name ?? "",
                        ).toLowerCase();
                        const label =
                          String(social.name ?? platform) || "Social";
                        const url = String(social.url ?? "");
                        if (!url) return null;
                        const path = BRAND_PATHS[platform];
                        return (
                          <a
                            key={`${label}-${i}`}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={label}
                            className="flex size-8 items-center justify-center rounded-full bg-[#034DA2] hover:bg-[#023877] text-white transition-transform hover:scale-110 shadow-xs"
                          >
                            {path ? (
                              <svg
                                className="size-3.5 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d={path} />
                              </svg>
                            ) : (
                              <Link2 className="size-3.5" />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ── RIGHT COLUMN: SEND US A MESSAGE ────────────────── */}
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
                <span className="mb-3 block h-1 w-8 rounded-full bg-brand-green" />
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Send us a message
                </h2>

                {sent ? (
                  <div className="mt-10 flex flex-col items-center gap-4 py-16 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                      Thank you for contacting Ufulu Finance. Our team will get
                      back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-4 rounded-full bg-[#034DA2] text-white px-6 py-2.5 text-xs font-semibold hover:bg-[#023877] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-6 space-y-4"
                  >
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs text-slate-500 mb-1"
                        >
                          Name
                        </label>
                        <div className="relative">
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={() => handleBlur("name")}
                            placeholder="Name"
                            className={`w-full rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all outline-none ${getFieldState("name").borderClasses}`}
                          />
                          {getFieldState("name").isValid && (
                            <CheckCircle2 className="size-4 text-[#00A3E0] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                          {getFieldState("name").isInvalid && (
                            <AlertCircle className="size-4 text-red-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                        </div>
                        {getFieldState("name").isInvalid && (
                          <p className="mt-1 text-[11px] text-red-500 font-medium">
                            {getFieldState("name").errorMsg}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-xs text-slate-500 mb-1"
                        >
                          Company
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company"
                          className="w-full rounded-lg bg-[#F0F4F8] border border-transparent px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs text-slate-500 mb-1"
                        >
                          Phone
                        </label>
                        <div className="relative">
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={() => handleBlur("phone")}
                            placeholder="Phone"
                            className={`w-full rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all outline-none ${getFieldState("phone").borderClasses}`}
                          />
                          {getFieldState("phone").isValid && (
                            <CheckCircle2 className="size-4 text-[#00A3E0] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                          {getFieldState("phone").isInvalid && (
                            <AlertCircle className="size-4 text-red-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                        </div>
                        {getFieldState("phone").isInvalid && (
                          <p className="mt-1 text-[11px] text-red-500 font-medium">
                            {getFieldState("phone").errorMsg}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs text-slate-500 mb-1"
                        >
                          Email{" "}
                          <span className="text-slate-400">(optional)</span>
                        </label>
                        <div className="relative">
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur("email")}
                            placeholder="Email"
                            className={`w-full rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all outline-none ${getFieldState("email").borderClasses}`}
                          />
                          {getFieldState("email").isValid && (
                            <CheckCircle2 className="size-4 text-[#00A3E0] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                          {getFieldState("email").isInvalid && (
                            <AlertCircle className="size-4 text-red-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                        </div>
                        {getFieldState("email").isInvalid && (
                          <p className="mt-1 text-[11px] text-red-500 font-medium">
                            {getFieldState("email").errorMsg}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs text-slate-500 mb-1"
                      >
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          value={form.subject}
                          onChange={handleChange}
                          onBlur={() => handleBlur("subject")}
                          placeholder="Subject"
                          className={`w-full rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all outline-none ${getFieldState("subject").borderClasses}`}
                        />
                        {getFieldState("subject").isValid && (
                          <CheckCircle2 className="size-4 text-[#00A3E0] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        )}
                        {getFieldState("subject").isInvalid && (
                          <AlertCircle className="size-4 text-red-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        )}
                      </div>
                      {getFieldState("subject").isInvalid && (
                        <p className="mt-1 text-[11px] text-red-500 font-medium">
                          {getFieldState("subject").errorMsg}
                        </p>
                      )}
                    </div>

                    {/* Row 4: Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs text-slate-500 mb-1"
                      >
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          onBlur={() => handleBlur("message")}
                          placeholder="Message"
                          className={`w-full rounded-lg p-4 text-sm text-slate-800 placeholder:text-slate-400 resize-none transition-all outline-none ${getFieldState("message").borderClasses}`}
                        />
                      </div>
                      {getFieldState("message").isInvalid && (
                        <p className="mt-1 text-[11px] text-red-500 font-medium">
                          {getFieldState("message").errorMsg}
                        </p>
                      )}
                    </div>

                    {/* Row 5: Send Button (Solid blue rounded pill matching mockup) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full rounded-full bg-[#034DA2] hover:bg-[#023877] active:bg-[#022955] disabled:opacity-60 text-white py-3.5 text-sm font-semibold shadow-md shadow-blue-900/20 transition-all cursor-pointer"
                      >
                        {sending ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="size-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR OFFICES & INTERACTIVE MAP ─────────────────────── */}
      {offices.length > 0 && (
        <section
          id="offices"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#034DA2]">
                <MapPin className="size-3.5 text-[#00A3E0]" />
                Branch Locations
              </p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mt-1">
                Our offices
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Select any branch below to view its location on the map.
            </p>
          </div>

          {/* Office Cards Selector */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, i) => {
              const isSelected = selectedOfficeIndex === i;
              const title = str(office, "label") || str(office, "city") || "Office";
              const address = str(office, "address");
              const email = str(office, "email");
              const hours = str(office, "hours");
              const phones = officePhones(office);

              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedOfficeIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedOfficeIndex(i);
                    }
                  }}
                  className={`rounded-2xl border p-6 transition-all text-left cursor-pointer flex flex-col justify-between select-none ${
                    isSelected
                      ? "border-[#034DA2] bg-white ring-2 ring-[#034DA2]/25 shadow-lg shadow-blue-950/10 scale-[1.01]"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md hover:scale-[1.005]"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {title}
                      </h3>
                      {isSelected ? (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#034DA2] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          <MapPin className="size-3" />
                          Viewing
                        </span>
                      ) : (
                        <span className="shrink-0 text-[11px] font-medium text-slate-400 group-hover:text-[#034DA2] transition-colors">
                          Click to view
                        </span>
                      )}
                    </div>

                    {address ? (
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {address}
                      </p>
                    ) : null}

                    <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                      {phones.map((num) => (
                        <p key={num} className="flex items-center gap-1.5">
                          <Phone className="size-3.5 text-[#00A3E0] shrink-0" /> {num}
                        </p>
                      ))}
                      {email ? (
                        <p className="flex items-center gap-1.5">
                          <Mail className="size-3.5 text-[#00A3E0] shrink-0" /> {email}
                        </p>
                      ) : null}
                      {hours ? (
                        <p className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-[#00A3E0] shrink-0" /> {hours}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? "text-[#034DA2]" : "text-slate-500"}>
                      {isSelected ? "Currently rendered on map" : "Click to view on map"}
                    </span>
                    <MapPin className={`size-4 ${isSelected ? "text-[#034DA2]" : "text-slate-400"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── FULL-WIDTH INTERACTIVE MAP SECTION ───────────────────── */}
      <section className="relative w-full h-[480px] sm:h-[580px] overflow-hidden border-t border-slate-200 bg-slate-100">
        <iframe
          key={`${activeAddress}-${selectedOfficeIndex}`}
          title={`${activeLabel} location map`}
          src={officeMapEmbedUrl}
          width="100%"
          height="100%"
          className="w-full h-full block"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Visual center pin marker with pulse ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Animated radar pulse */}
            <span className="absolute -bottom-1 size-8 rounded-full bg-[#00A3E0]/30 animate-ping" />
            <span className="absolute -bottom-0.5 size-4 rounded-full bg-[#034DA2]/40" />

            {/* Custom pin badge */}
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#01214A] text-white text-xs font-bold shadow-xl border border-sky-400/50">
              <span className="size-2 rounded-full bg-[#00A651] animate-pulse" />
              <span>{activeLabel}</span>
            </div>
          </div>
          {/* Pin pointer stem */}
          <div className="w-0.5 h-3 bg-[#01214A]" />
          <div className="size-2 rounded-full bg-[#034DA2] ring-2 ring-white shadow-xs" />
        </div>

        {/* Floating badge displaying the active location */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-lg border border-slate-200/80 max-w-[calc(100vw-2rem)] sm:max-w-md pointer-events-auto">
          <div className="size-8 rounded-xl bg-[#034DA2] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MapPin className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 leading-tight truncate">
              {activeLabel}
            </p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {activeAddress}
            </p>
          </div>
          <a
            href={`https://maps.google.com/?q=${activeCoords.lat},${activeCoords.lng}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#034DA2] hover:text-white text-[11px] font-semibold text-slate-700 transition-colors"
          >
            <span>Open Maps</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </section>
    </div>
  );
}
