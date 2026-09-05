"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LoanEnquiryDialog } from "@/components/public/LoanEnquiryDialog";
import { ArrowRight, Building2, Phone, Mail, Clock, MapPin } from "lucide-react";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    d: "M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.5 0 9 1.5 9 4.667V8z",
  },
  {
    name: "X",
    href: "https://twitter.com",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
];

export function PublicFooter() {
  const pathname = usePathname();

  // On homepage (where Section 8 is already CTA + Section 9 is Contact) or contact page, don't duplicate banner
  const hideCtaBanner = pathname === "/" || pathname === "/contact";

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#0a2540] via-[#032d60] to-[#021833] text-slate-100 overflow-hidden border-t border-blue-900/40">
      {/* Subtle ambient decorative radial glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(0,159,224,0.12)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-[radial-gradient(circle,_rgba(3,77,162,0.2)_0%,_transparent_70%)] pointer-events-none" />

      {/* ── CTA BANNER (For Subpages) ───────────── */}
      {!hideCtaBanner && (
        <div className="relative min-h-[360px] sm:min-h-[400px] flex items-center justify-center overflow-hidden border-b border-blue-800/40">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
              alt="Let's Cultivate Your Financial Future, Together"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Natural vignette/gradient overlay */}
            <div className="absolute inset-0 bg-[#032d60]/85 backdrop-brightness-95" />
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 text-center text-white space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
              Let’s Cultivate Your Financial Future, Together.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Ready to expand your business, finance harvest inputs, or secure payroll advances? Speak with our accredited loan advisors today.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/loans"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A3E0] hover:bg-[#0284C7] text-white px-8 py-3.5 text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                Apply for Financing
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
              >
                Contact Nearest Branch
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER BODY (Integrated Blue Gradient Footer) ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">

          {/* ── Brand column (Left) ── */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center group">
              <div className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-md border border-white/20">
                <Image
                  src="/logo.png"
                  alt="Ufulu Finance - Financial Freedom in Reach"
                  width={200}
                  height={65}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Dedicated to empowering everyday Malawians with transparent financial solutions, ethical microfinance, and fair credit to cultivate sustainable prosperity.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-[#009FE0] hover:text-white text-white transition-all hover:scale-105"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── 4 Navigation & Office Columns (Right) ── */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* Company */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-[#38bdf8] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#38bdf8] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/loans" className="hover:text-[#38bdf8] transition-colors">
                    Loan Products
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-[#38bdf8] transition-colors">
                    Portfolio &amp; Impact
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#38bdf8] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <Link href="/blog" className="hover:text-[#38bdf8] transition-colors">
                    Blog &amp; Insights
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#38bdf8] transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/loans" className="hover:text-[#38bdf8] transition-colors">
                    Loan Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#38bdf8] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#38bdf8] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Career & Support */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                Careers &amp; Help
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <Link href="/jobs" className="hover:text-[#38bdf8] transition-colors">
                    Open Positions
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-[#38bdf8] transition-colors">
                    Why Work With Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#38bdf8] transition-colors">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#38bdf8] transition-colors">
                    Branch Locator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Branch Locations Integrated Column */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5 text-[#38bdf8]">
                <MapPin className="size-3.5" />
                <span>Our Offices</span>
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <p className="font-bold text-white">Lilongwe Head Office</p>
                  <p className="text-[11px] text-slate-400">City Centre, Area 3, Lilongwe, Malawi</p>
                  <div className="flex items-center justify-between text-[11px] mt-0.5">
                    <a href="tel:+265991234567" className="text-[#38bdf8] hover:underline font-medium">
                      +265 99 123 4567
                    </a>
                    <span className="text-[10px] text-slate-400">8:00 AM – 5:00 PM</span>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-white">Blantyre Commercial Branch</p>
                  <p className="text-[11px] text-slate-400">Victoria Avenue, CBD, Blantyre, Malawi</p>
                  <div className="flex items-center justify-between text-[11px] mt-0.5">
                    <a href="tel:+265881234567" className="text-[#38bdf8] hover:underline font-medium">
                      +265 88 123 4567
                    </a>
                    <span className="text-[10px] text-slate-400">8:00 AM – 5:00 PM</span>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-white">Mzuzu Regional Office</p>
                  <p className="text-[11px] text-slate-400">Katoto Commercial Area, Mzuzu, Malawi</p>
                  <div className="flex items-center justify-between text-[11px] mt-0.5">
                    <a href="mailto:info@ufulufinance.com" className="text-[#38bdf8] hover:underline font-medium">
                      info@ufulufinance.com
                    </a>
                    <span className="text-[10px] text-slate-400">8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom Copyright & Legal ── */}
        <div className="mt-14 pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Ufulu Finance Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
