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
  FileCheck,
  Scale,
  CreditCard,
  AlertCircle,
  HelpCircle,
  Clock,
  Landmark,
} from "lucide-react";

export default function TermsPage() {
  const TERMS_SECTIONS = [
    {
      id: "eligibility",
      title: "Applicant Eligibility",
      description: "Must be at least 18 years of age, hold valid Malawian identification, and provide verifiable economic activity or payroll status.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      icon: Users,
      isFeatured: false,
    },
    {
      id: "interest-terms",
      title: "Transparent Interest & Terms",
      description: "Interest rates, facility tenures, and total repayment amounts are explicitly declared in writing before loan agreement signing.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      icon: Scale,
      isFeatured: true, // Featured lime card matching Rudra!
    },
    {
      id: "repayment-channels",
      title: "Repayment Channels",
      description: "Instalments are accepted through official bank deposits, Airtel Money, and TNM Mpamba business accounts with automated receipts.",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
      icon: CreditCard,
      isFeatured: false,
    },
    {
      id: "disbursement",
      title: "Facility Disbursement",
      description: "Approved loan proceeds are disbursed directly to the verified borrower's bank account or registered mobile money number.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      icon: Clock,
      isFeatured: false,
    },
    {
      id: "governance",
      title: "Statutory MFI Governance",
      description: "Operating under Malawian non-deposit microfinance guidelines, consumer financial protection, and credit disclosure rules.",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
      icon: Landmark,
      isFeatured: false,
    },
    {
      id: "bureau",
      title: "Credit Information Reporting",
      description: "Mandatory transmission of repayment records to registered Credit Reference Bureaus as stipulated by national regulations.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      icon: FileCheck,
      isFeatured: false,
    },
    {
      id: "prepayment",
      title: "Early Repayment & Settlement",
      description: "Borrowers may settle loan balances ahead of maturity without unfair early-exit penalty fees.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      icon: Award,
      isFeatured: false,
    },
    {
      id: "inquiries",
      title: "Client Dispute Resolution",
      description: "Structured escalation protocol providing prompt review and resolution of account discrepancies within 5 business days.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
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
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80"
            alt="Terms of Service"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0b2b1b]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Standard Credit Facility Agreement, Borrower Rights &amp; Prudential Repayment Obligations
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Terms of Service</span>
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
              <span>Credit Agreement Terms</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Clear, Honest, and Responsible Borrowing Standards
            </h2>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              These Terms of Service govern the credit application, evaluation, disbursement, and repayment relationship between Ufulu Finance Limited and our borrowers. We prioritize fair terms, explicit fee schedules, and responsible client service.
            </p>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
                Key Borrower Rights &amp; Commitments
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Transparent APR &amp; Total Cost Disclosures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Zero Early Repayment Settlement Penalties</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Compliant With Credit Reporting Laws</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Multi-Channel Mobile Money &amp; Bank Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Strict Client Data Privacy Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Accredited Non-Deposit MFI Oversight</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. "WHY TRUST OUR TERMS" LARGE CARD BLOCK ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-[#84cc16]" />
                <span>Fair Credit Code</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Institutional Lending Principles Built on Mutual Trust
              </h2>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                  alt="Ufulu Finance Loan Signing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#65a30d] shadow-lg">
                    <Scale className="size-7" />
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
                    Explicit Pricing Documentation
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Prior to disbursement, borrowers receive a full amortization schedule stating every kwacha due with zero ambiguous charges.
                  </p>
                </div>
              </div>

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <Sliders className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Proactive Financial Counseling
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    If cashflow challenges arise, our credit advisors work with you to restructure timelines rather than resorting to aggressive measures.
                  </p>
                </div>
              </div>

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <Award className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Positive Credit Building
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Consistent on-time repayments establish formal institutional credit scores that qualify you for higher limits and lower rates.
                  </p>
                </div>
              </div>

              <div className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4">
                <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
                  <HeartHandshake className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Dignified Client Treatment
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Our field officers operate under strict ethical conduct guidelines prohibiting harassment or public disclosure of loan balances.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 4. 4x2 GRID: KEY TERMS CLAUSES ──────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Standard Contract Terms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Contract Articles &amp; Credit Conditions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Review standard facility clauses governing applications, disbursements, and account operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TERMS_SECTIONS.map((sec) => {
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
              href="/contact?subject=Terms%20of%20Service%20Query"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-8 py-3.5 text-sm font-semibold shadow-md transition-all"
            >
              Contact Legal &amp; Compliance Team
              <ArrowRight className="size-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
