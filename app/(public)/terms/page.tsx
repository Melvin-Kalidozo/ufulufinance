"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("section-1");

  const TOC_ITEMS = [
    { num: "01", title: "Acceptance of Terms", id: "section-1" },
    { num: "02", title: "Applicant Eligibility", id: "section-2" },
    { num: "03", title: "Transparent Interest & Terms", id: "section-3" },
    { num: "04", title: "Repayment Channels", id: "section-4" },
    { num: "05", title: "Facility Disbursement", id: "section-5" },
    { num: "06", title: "Statutory MFI Governance", id: "section-6" },
    { num: "07", title: "Credit Information Reporting", id: "section-7" },
    { num: "08", title: "Early Repayment & Settlement", id: "section-8" },
    { num: "09", title: "Client Dispute Resolution", id: "section-9" },
    { num: "10", title: "Governing Law & Inquiries", id: "section-10" },
  ];

  // Active section scroll spy so the TOC indicator slides down with the user
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 antialiased min-h-screen">

      {/* ── 1. FULL-WIDTH HERO BANNER ─────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-16 sm:pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80"
            alt="Terms of Service"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#01214A]/90 to-slate-950/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#00A3E0] mb-4">
            <span>Governance &amp; Statutory Terms</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Standard Credit Facility Agreement, Borrower Rights &amp; Prudential Repayment Obligations
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Last updated: September 5, 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Version 2.4 &middot; Tier-2 MFI Compliance
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN MERGED TWO-COLUMN LAYOUT (TOC Left, Content Right) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Note: No items-start so aside stretches to 100% height, enabling sticky slide-down */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">

          {/* LEFT COLUMN: Sticky Slide-Down Table of Contents & Support Card (4 cols) */}
          <aside className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6 max-h-[calc(100vh-8.5rem)] overflow-y-auto pr-2 scrollbar-thin">

              {/* Document Table of Contents */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3E0] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A3E0]"></span>
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#00A3E0] font-mono bg-sky-50 px-2 py-0.5 rounded-md">
                    10 Articles
                  </span>
                </div>

                <nav className="space-y-1">
                  {TOC_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`group flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-[#00A3E0]/10 text-[#00A3E0] shadow-xs border border-[#00A3E0]/20"
                            : "text-slate-600 hover:text-[#00A3E0] hover:bg-sky-50/70 border border-transparent"
                        }`}
                      >
                        <span className="flex items-center gap-3 truncate">
                          <span
                            className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                              isActive
                                ? "bg-[#00A3E0] text-white"
                                : "text-slate-400 group-hover:text-[#00A3E0]"
                            }`}
                          >
                            {item.num}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </span>
                        <span
                          className={`transition-all transform ${
                            isActive
                              ? "text-[#00A3E0] translate-x-1"
                              : "text-slate-300 group-hover:text-[#00A3E0] group-hover:translate-x-0.5"
                          }`}
                        >
                          &rarr;
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Support / Legal Contact Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#00A3E0] block">
                    Legal &amp; Compliance Help
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Have Questions on These Terms?
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Our compliance officers are available to clarify amortization, documentation rules, or account settlements.
                  </p>
                </div>

                <div className="pt-2 space-y-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-[#00A3E0] shrink-0" />
                    <a href="mailto:compliance@ufulufinance.com" className="hover:text-[#00A3E0] transition-colors">
                      compliance@ufulufinance.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-[#00A3E0] shrink-0" />
                    <span>+265 (0) 1 772 400</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/privacy"
                    className="text-xs font-semibold text-[#00A3E0] hover:text-[#01214A] transition-colors"
                  >
                    View Privacy Policy &rarr;
                  </Link>
                  <Link
                    href="/contact?subject=Terms%20of%20Service%20Query"
                    className="text-xs font-bold text-slate-700 hover:text-[#00A3E0] transition-colors"
                  >
                    Contact Desk
                  </Link>
                </div>
              </div>

            </div>
          </aside>

          {/* RIGHT COLUMN: Merged Continuous Policy Document (8 cols) */}
          <main className="lg:col-span-8">

            {/* Mobile Collapsible Table of Contents */}
            <div className="lg:hidden mb-6 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-bold uppercase tracking-wider text-slate-700 focus:outline-none">
                  <span>Table of Contents (10 Articles)</span>
                  <ChevronDown className="size-4 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <nav className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`flex items-center gap-2 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-[#00A3E0]/10 text-[#00A3E0] font-bold"
                          : "text-slate-600 hover:text-[#00A3E0] hover:bg-sky-50"
                      }`}
                    >
                      <span className="font-mono font-bold text-slate-400">{item.num}</span>
                      <span>{item.title}</span>
                    </a>
                  ))}
                </nav>
              </details>
            </div>

            {/* Single Cohesive Merged Document Container */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7 sm:p-12 divide-y divide-slate-100">

              {/* Section 01: Acceptance of Terms */}
              <section id="section-1" className="scroll-mt-28 pb-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Acceptance of Terms &amp; Agreement Framework
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    By submitting a credit application, accessing the Ufulu Finance Limited digital portals, signing a facility sanction letter, or accepting loan proceeds (collectively, the &ldquo;Services&rdquo;), you expressly agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
                  </p>
                  <p>
                    These Terms constitute a legally enforceable credit contract between you (the &ldquo;Borrower&rdquo;) and Ufulu Finance Limited (the &ldquo;Lender&rdquo;). If you do not agree to these conditions, you must decline the credit offer and discontinue use of our facilities immediately.
                  </p>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 mt-4">
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      <strong>Binding Agreement Notice:</strong> Acceptance of loan proceeds through bank transfer or registered mobile money constitutes affirmative consent and irrevocable execution of the facility contract terms detailed herein.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 02: Applicant Eligibility */}
              <section id="section-2" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Applicant Eligibility Criteria
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Credit facilities are offered strictly to applicants meeting our prudential assessment criteria. All applicants must fulfill the following baseline requirements at the date of loan underwriting:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Must be at least 18 years of age at submission</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Valid National ID card or biometric passport</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Verifiable income or operating business cash flows</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Clean or regularised Credit Reference Bureau standing</span>
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 pt-2">
                    Ufulu Finance Limited reserves the right to request additional supporting records, including certified bank statements, business registration certificates, or employer confirmation letters.
                  </p>
                </div>
              </section>

              {/* Section 03: Transparent Interest & Terms */}
              <section id="section-3" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Transparent Interest, Fees &amp; Disclosure
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    In full compliance with Reserve Bank of Malawi consumer financial protection principles, every borrower receives a Key Facts Statement (KFS) prior to loan disbursement detailing:
                  </p>
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Nominal Interest Rate &amp; APR:</strong> Calculated transparently with no hidden administrative fees or unannounced compound levies.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Processing &amp; Statutory Charges:</strong> Upfront administration fees and loan insurance costs are explicitly disclosed prior to signature.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Total Cost of Credit:</strong> The aggregate figure representing principal plus total accrued interest and statutory charges is signed off by both parties.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 04: Repayment Channels */}
              <section id="section-4" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Authorised Repayment Channels &amp; Verification
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Borrowers must remit all scheduled loan instalments through official, verifiable enterprise accounts. Ufulu Finance never solicits payments to individual employee accounts or non-registered phone numbers.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                      <span className="text-xs font-bold text-slate-900 block">Bank Account Transfers</span>
                      <p className="text-xs text-slate-500 mt-1">Direct deposit or EFT to designated commercial bank corporate accounts.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                      <span className="text-xs font-bold text-slate-900 block">Airtel Money Merchant</span>
                      <p className="text-xs text-slate-500 mt-1">Official till code and merchant pay-bill with instant SMS transaction receipts.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                      <span className="text-xs font-bold text-slate-900 block">TNM Mpamba Biller</span>
                      <p className="text-xs text-slate-500 mt-1">Verified biller name &ldquo;UFULU FINANCE&rdquo; with automated loan ledger reconciliation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs mt-2">
                    <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Fraud Prevention:</strong> Never send funds to individual sales agent mobile phone numbers. Always ensure the recipient display name confirms &ldquo;Ufulu Finance Ltd&rdquo;.</span>
                  </div>
                </div>
              </section>

              {/* Section 05: Facility Disbursement */}
              <section id="section-5" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    05
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Facility Disbursement &amp; Account Crediting
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Upon satisfactory document appraisal, identity validation, and execution of the facility agreement, approved funds are released directly to the borrower&rsquo;s verified Malawian commercial bank account or registered mobile money wallet.
                  </p>
                  <p>
                    Disbursements are completed within 24 to 48 business hours post-approval. Ufulu Finance will transmit an electronic disbursement advice via SMS and email confirmation. The borrower is responsible for verifying receipt immediately and notifying us of any discrepancies within 2 business days.
                  </p>
                </div>
              </section>

              {/* Section 06: Statutory MFI Governance */}
              <section id="section-6" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    06
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Statutory MFI Governance &amp; Regulatory Compliance
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Ufulu Finance Limited conducts microfinance operations under the Financial Services Act, the Microfinance Act, and relevant circulars promulgated by the Reserve Bank of Malawi.
                  </p>
                  <p>
                    We strictly enforce anti-money laundering (AML) and combating the financing of terrorism (CFT) obligations pursuant to the Financial Crimes Act. Any transactions deemed suspicious or contradictory to declared economic profiles will be flagged for compliance investigation and reporting to the Financial Intelligence Authority (FIA).
                  </p>
                </div>
              </section>

              {/* Section 07: Credit Information Reporting */}
              <section id="section-7" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    07
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Credit Reference Bureau (CRB) Reporting
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Under the Credit Reference Bureau Act, licensed lenders are legally mandated to furnish performance histories of all credit facilities to licensed credit reference bureaus, including Credit Data CRB Ltd and Metropol CRB.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Positive Reporting:</strong> Timely payments enhance your credit score, facilitating higher limits and preferential future pricing.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Default Notification:</strong> Accounts remaining in arrears beyond 60 calendar days are classified as non-performing and reported, which impairs access to borrowing across all Malawian financial institutions.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 08: Early Repayment & Settlement */}
              <section id="section-8" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    08
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Early Repayment &amp; Facility Settlement
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Borrowers retain the right to settle their outstanding facility balances in advance of the agreed contractual tenure. Ufulu Finance does not impose penal charges on early principal liquidations.
                  </p>
                  <p>
                    To request an early payoff calculation, the borrower should contact our accounts office for an official Full Settlement Statement. Unearned interest for future unexpired months is discounted in accordance with regulatory rebate schedules.
                  </p>
                </div>
              </section>

              {/* Section 09: Client Dispute Resolution */}
              <section id="section-9" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    09
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Client Grievances &amp; Dispute Resolution
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    We maintain an independent complaints procedure ensuring every borrower grievance is reviewed impartially:
                  </p>
                  <ol className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
                    <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Internal Lodgment:</strong> Submit your dispute in writing to our Customer Care Desk or via <span className="font-semibold text-slate-900">compliance@ufulufinance.com</span>. We provide an acknowledgment ticket within 24 hours.
                    </li>
                    <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Investigation Window:</strong> Our compliance team investigates and delivers a formal resolution determination within 14 calendar days.
                    </li>
                    <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Escalation Authority:</strong> If dissatisfied, clients retain the right to appeal to the Registrar of Financial Institutions at the Reserve Bank of Malawi.
                    </li>
                  </ol>
                </div>
              </section>

              {/* Section 10: Governing Law & Inquiries */}
              <section id="section-10" className="scroll-mt-28 pt-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Governing Law &amp; Legal Inquiries
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    These Terms of Service and any loan facilities extended hereunder are governed by and construed in accordance with the substantive laws of the Republic of Malawi.
                  </p>
                  <p>
                    Both the borrower and Ufulu Finance Limited submit to the exclusive jurisdiction of the competent courts of Malawi in respect of any litigation or claims arising out of this agreement.
                  </p>
                  <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">Ufulu Finance Limited — Legal Secretariat</p>
                    <p>Head Office: Victoria Avenue, Blantyre, Republic of Malawi</p>
                    <p>Email: <a href="mailto:compliance@ufulufinance.com" className="text-[#00A3E0] underline font-medium">compliance@ufulufinance.com</a> | Telephone: +265 (0) 1 772 400</p>
                  </div>
                </div>
              </section>

            </div>

          </main>
        </div>
      </div>

    </div>
  );
}
