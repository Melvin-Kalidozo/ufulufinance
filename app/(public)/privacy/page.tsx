"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ShieldCheck,
  Check,
  Award,
  Users,
  Sliders,
  HeartHandshake,
  ArrowRight,
  Lock,
  Eye,
  FileText,
  Key,
  Database,
  Building2,
  HelpCircle,
} from "lucide-react";

export default function PrivacyPage() {
  const SECTIONS = [
    {
      id: "collection",
      title: "Information We Collect",
      description: "National ID details, contact info, employment/business records, and financial statements necessary for credit evaluation.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      icon: FileText,
      isFeatured: false,
    },
    {
      id: "lawful",
      title: "Lawful Basis for Processing",
      description: "Data is gathered solely to appraise credit eligibility, prevent fraud, fulfill statutory anti-money laundering duties, and service active loans.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      icon: ShieldCheck,
      isFeatured: true, // Featured lime card matching Rudra!
    },
    {
      id: "credit-bureaus",
      title: "Credit Reference Bureaus",
      description: "Reporting loan performance data to licensed Malawian credit bureaus in compliance with national financial reporting laws.",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
      icon: Database,
      isFeatured: false,
    },
    {
      id: "security",
      title: "Data Security & Encryption",
      description: "Bank-grade 256-bit encryption, restricted officer access protocols, and cloud architecture shielding your records.",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
      icon: Lock,
      isFeatured: false,
    },
    {
      id: "channels",
      title: "Mobile Money & Banking",
      description: "Secure integrations with Airtel Money, TNM Mpamba, and commercial banks ensuring safe disbursal and repayment.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      icon: Building2,
      isFeatured: false,
    },
    {
      id: "rights",
      title: "Your Rights & Access",
      description: "You retain the right to inspect your personal data, request corrections to inaccuracies, and receive statements.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      icon: Key,
      isFeatured: false,
    },
    {
      id: "cookies",
      title: "Digital Session Security",
      description: "Minimal necessary cookies used solely for secure portal authentication and session protection without selling data.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      icon: Eye,
      isFeatured: false,
    },
    {
      id: "compliance",
      title: "Privacy Officer Inquiries",
      description: "Direct assistance from our dedicated Data Protection & Compliance desk for any confidentiality questions or requests.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      icon: HelpCircle,
      isFeatured: false,
    },
  ];

  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">

      {/* ── 1. ROUNDED HERO BANNER (Rudra design) ────────────────────── */}
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2400&q=80"
            alt="Privacy Policy and Institutional Disclosures"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0b2b1b]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Statutory Data Protection, Client Confidentiality &amp; Fair Information Principles
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* ── 2. INTRO SPLIT SECTION ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Client Data Protection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Safeguarding Your Personal &amp; Financial Information with Integrity
            </h2>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              Ufulu Finance Limited is committed to the highest standards of confidentiality, transparency, and data integrity. We treat all personal, business, and credit information entrusted to us with institutional prudence under the laws and regulations of Malawi.
            </p>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
                Our Core Privacy Commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Zero Unauthorised Third-Party Selling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Bank-Grade 256-Bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Transparent Credit Bureau Reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Right to Review &amp; Correct Records</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Secure Mobile Disbursal Rails</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Dedicated Compliance Officer Support</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. "WHY TRUST OUR PROTECTION" LARGE CARD BLOCK ───────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-[#84cc16]" />
                <span>Security Standards</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                How We Protect Your Rights as a Borrower
              </h2>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80"
                  alt="Ufulu Finance Compliance Officer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#65a30d] shadow-lg">
                    <Lock className="size-7" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 4 Horizontal Cards with Lime Badges */}
            <div className="lg:col-span-6 space-y-4">

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Statutory Regulatory Adherence
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Compliant with national microfinance privacy codes, anti-money laundering statutes, and financial records retention.
                  </p>
                </div>
              </div>

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <Key className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Secure Administrative Access
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Client dossiers and loan files are accessible exclusively to authorized credit assessment and auditing personnel.
                  </p>
                </div>
              </div>

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <Database className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Accurate Credit Information Sharing
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Timely notifications provided prior to mandatory credit performance transmissions to licensed credit reference bureaus.
                  </p>
                </div>
              </div>

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <Award className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Prompt Dispute &amp; Inquiry Resolution
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Standardized 5-day resolution timeline for any borrower reporting inaccuracies or filing privacy queries.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 4. 4x2 GRID: PRIVACY CHAPTERS ───────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Policy Articles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Key Articles of our Privacy Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Comprehensive guidelines governing how your information is collected, processed, and safeguarded.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;

              if (sec.isFeatured) {
                return (
                  <div
                    key={sec.id}
                    className="rounded-3xl p-6 bg-[#84cc16] text-slate-950 shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-extrabold leading-snug">
                          {sec.title}
                        </h3>
                        <div className="size-8 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0">
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-900 font-medium mt-2 leading-relaxed">
                        {sec.description}
                      </p>
                    </div>

                    <div className="mt-6 relative h-36 rounded-2xl overflow-hidden shadow-inner">
                      <Image
                        src={sec.image}
                        alt={sec.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute bottom-2.5 left-2.5 size-9 rounded-full bg-slate-950 text-[#84cc16] flex items-center justify-center shadow-md">
                        <Icon className="size-4" />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={sec.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {sec.title}
                      </h3>
                      <div className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-6 relative h-36 rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src={sec.image}
                      alt={sec.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute bottom-2.5 left-2.5 size-9 rounded-full bg-[#a3e635] text-slate-950 flex items-center justify-center shadow-md">
                      <Icon className="size-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact?subject=Privacy%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-8 py-3.5 text-sm font-semibold shadow-md transition-all"
            >
              Contact Data Protection Desk
              <ArrowRight className="size-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
