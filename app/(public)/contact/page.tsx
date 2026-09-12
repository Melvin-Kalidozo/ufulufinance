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
} from "lucide-react";
import { usePublicData } from "@/lib/content-store";

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

export default function ContactPage() {
  const { body: settingsBody } = usePublicData<{ data: ContactRow | null }>(
    "/api/public/settings"
  );
  const settings: ContactRow | null = settingsBody?.data ?? null;
  const s = (key: string, fallback = "") =>
    settings && settings[key] !== undefined && settings[key] !== null
      ? String(settings[key])
      : fallback;
  const offices: ContactRow[] = Array.isArray(settings?.offices)
    ? (settings?.offices as unknown[]).map((o) =>
        o && typeof o === "object" ? (o as ContactRow) : {}
      )
    : [];
  const socials: ContactRow[] = Array.isArray(settings?.socialLinks)
    ? (settings?.socialLinks as unknown[]).map((o) =>
        o && typeof o === "object" ? (o as ContactRow) : {}
      )
    : [];
  const str = (r: ContactRow, k: string) =>
    r[k] !== undefined && r[k] !== null ? String(r[k]) : "";
  const firstOffice = offices[0];
  const addressLine =
    s("addressLine1") ||
    (firstOffice ? str(firstOffice, "address") : "Address coming soon");
  const addressLine2 = s("addressLine2") || "";
  const supportEmail = s("supportEmail") || "";
  const loansEmail = s("loansEmail") || "";
  const directPhone = s("phone") || "";
  const whatsapp = s("whatsapp") || "";
  const mapEmbed = s("mapEmbedUrl") || "";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        throw new Error(json.error || json.message || "We could not send your message.");
      }
      setSent(true);
      toast.success("Message sent! We will get back to you shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Network error. Please try again.");
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
            Our accredited loan advisors are ready to assist you in Lilongwe, Blantyre, and Mzuzu.
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
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28">
        <div className="mx-auto max-w-5xl">
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
                    Our accredited loan officers and client relationship managers are available across Lilongwe, Blantyre, and Mzuzu to provide rapid, judgment-free financial advisory.
                  </p>

                  <div className="mt-8 space-y-6">
                    {(addressLine || addressLine2) && (
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#034DA2] text-white shadow-md shadow-blue-900/20">
                          <MapPin className="size-5 text-[#009FE0]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Head Office</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {addressLine}
                            {addressLine2 ? <><br />{addressLine2}</> : null}
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
                          <p className="text-sm font-bold text-slate-900">Email Us</p>
                          {[supportEmail, loansEmail]
                            .filter(Boolean)
                            .map((email) => (
                              <p key={email} className="text-xs text-slate-500 mt-1">
                                {email}
                              </p>
                            ))}
                        </div>
                      </div>
                    )}

                    {(directPhone || whatsapp) && (
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#034DA2] text-white shadow-md shadow-blue-900/20">
                          <Phone className="size-5 text-[#009FE0]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Call Us</p>
                          {directPhone ? (
                            <p className="text-xs text-slate-500 mt-1">
                              Direct: {directPhone}
                            </p>
                          ) : null}
                          {whatsapp ? (
                            <p className="text-xs text-slate-500 mt-1">
                              WhatsApp: {whatsapp}
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
                        const platform = String(social.platform ?? social.name ?? "").toLowerCase();
                        const label = String(social.name ?? platform) || "Social";
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
                              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
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
                    <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                      Thank you for contacting Ufulu Finance. Our team will get back to you shortly.
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
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

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
                          Email <span className="text-slate-400">(optional)</span>
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

      {/* ── OUR OFFICES (from admin settings) ─────────────────────── */}
      {offices.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our offices</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-sm font-bold text-slate-900">
                  {str(office, "label") || str(office, "city") || "Office"}
                </h3>
                {str(office, "address") ? (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {str(office, "address")}
                  </p>
                ) : null}
                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  {str(office, "phone") ? (
                    <p className="flex items-center gap-1.5">
                      <Phone className="size-3.5 text-[#00A3E0]" /> {str(office, "phone")}
                    </p>
                  ) : null}
                  {str(office, "email") ? (
                    <p className="flex items-center gap-1.5">
                      <Mail className="size-3.5 text-[#00A3E0]" /> {str(office, "email")}
                    </p>
                  ) : null}
                  {str(office, "hours") ? (
                    <p className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-[#00A3E0]" /> {str(office, "hours")}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MAP (only when a map embed URL is configured) ─────────────── */}
      {mapEmbed && (
        <section className="mt-2 w-full overflow-hidden sm:mt-6">
          <iframe
            title="Ufulu Finance location map"
            src={mapEmbed}
            width="100%"
            height="460"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}

    </div>
  );
}
