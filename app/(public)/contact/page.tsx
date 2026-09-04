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
} from "lucide-react";

const SOCIAL = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    d: "M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.5 9 4.667V8z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    d: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
];

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
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
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!emailRegex.test(form.email.trim())) {
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
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    toast.success("Message sent! We will get back to you shortly.");
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
        "bg-[#F0F4F8] border border-emerald-400/80 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
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
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2400&q=80"
            alt="Contact Ufulu Finance"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0d281a]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-lg mx-auto font-normal leading-relaxed">
            Our accredited loan advisors are ready to assist you in Lilongwe, Blantyre, and Mzuzu.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <a href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </a>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Contact</span>
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
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Get in touch
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                    Our accredited loan officers and client relationship managers are available across Lilongwe, Blantyre, and Mzuzu to provide rapid, judgment-free financial advisory.
                  </p>

                  <div className="mt-8 space-y-6">
                    {/* Head Office */}
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1b4332] text-white shadow-md shadow-emerald-950/20">
                        <MapPin className="size-5 text-[#84cc16]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Head Office</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          City Centre, Area 3, Lilongwe<br />
                          Regional Hubs: Blantyre (Limbe) &amp; Mzuzu (Orton Chirwa Ave)
                        </p>
                      </div>
                    </div>

                    {/* Email Us */}
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1b4332] text-white shadow-md shadow-emerald-950/20">
                        <Mail className="size-5 text-[#84cc16]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Email Us</p>
                        <p className="text-xs text-slate-500 mt-1">support@ufulufinance.com</p>
                        <p className="text-xs text-slate-500">loans@ufulufinance.com</p>
                      </div>
                    </div>

                    {/* Call Us */}
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1b4332] text-white shadow-md shadow-emerald-950/20">
                        <Phone className="size-5 text-[#84cc16]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Call Us</p>
                        <p className="text-xs text-slate-500 mt-1">Direct: +265 99 123 4567</p>
                        <p className="text-xs text-slate-500">Toll-Free WhatsApp: +265 88 123 4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-800 mb-3">
                    Follow our social media
                  </p>
                  <div className="flex items-center gap-2.5">
                    {SOCIAL.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.name}
                        className="flex size-8 items-center justify-center rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white transition-transform hover:scale-110 shadow-xs"
                      >
                        <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                          <path d={s.d} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: SEND US A MESSAGE ────────────────── */}
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Send us a message
                </h2>

                {sent ? (
                  <div className="mt-10 flex flex-col items-center gap-4 py-16 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-[#1b4332]">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                      Thank you for contacting Ufulu Finance. Our team will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-4 rounded-full bg-[#1b4332] text-white px-6 py-2.5 text-xs font-semibold hover:bg-[#2d6a4f] transition-colors"
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
                            <CheckCircle2 className="size-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                            <CheckCircle2 className="size-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                          Email
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
                            <CheckCircle2 className="size-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                          <CheckCircle2 className="size-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                        className="w-full rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] active:bg-[#143d28] disabled:opacity-60 text-white py-3.5 text-sm font-semibold shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
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

      {/* ── GOOGLE MAP SECTION ───────────────────────────────────────── */}
      <section className="mt-14 sm:mt-20 w-full overflow-hidden">
        <iframe
          title="Ufulu Finance — Lilongwe, Malawi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.883711905626!2d33.78572187510842!3d-13.96692298628286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d47e3e2e7b29%3A0xf05c81d52c14d7c1!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2smw!4v1700000000000!5m2!1sen!2smw"
          width="100%"
          height="460"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </div>
  );
}
