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
  Lock,
} from "lucide-react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>("section-1");

  const TOC_ITEMS = [
    { num: "01", title: "Information We Collect", id: "section-1" },
    { num: "02", title: "Purposes of Processing", id: "section-2" },
    { num: "03", title: "Legal Grounds & Consent", id: "section-3" },
    { num: "04", title: "Data Sharing & CRB Disclosures", id: "section-4" },
    { num: "05", title: "Data Security Standards", id: "section-5" },
    { num: "06", title: "Retention Periods", id: "section-6" },
    { num: "07", title: "Data Subject Rights", id: "section-7" },
    { num: "08", title: "Cookies & Tracking Tech", id: "section-8" },
    { num: "09", title: "Cross-Border Transfers", id: "section-9" },
    { num: "10", title: "DPO & Regulatory Inquiries", id: "section-10" },
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
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2400&q=80"
            alt="Privacy Policy"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#01214A]/90 to-slate-950/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#00A3E0] mb-4">
            <Lock className="size-3.5 text-[#00A3E0]" />
            <span>Data Protection &amp; Confidentiality</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Data Protection Principles, Consumer Privacy Rights &amp; Regulatory Information Governance
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Last updated: September 5, 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Malawi Data Protection Act 2023 Compliant
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

              {/* DPO / Privacy Support Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#00A3E0] block">
                    Privacy Office
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Data Protection Officer (DPO)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Exercise your data rights, request copies of stored files, or report security concerns.
                  </p>
                </div>

                <div className="pt-2 space-y-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-[#00A3E0] shrink-0" />
                    <a href="mailto:ufulufinance@gmail.com" className="hover:text-[#00A3E0] transition-colors">
                      ufulufinance@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-[#00A3E0] shrink-0" />
                    <span>+265 (0) 1 772 400</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/terms"
                    className="text-xs font-semibold text-[#00A3E0] hover:text-[#01214A] transition-colors"
                  >
                    View Terms &rarr;
                  </Link>
                  <Link
                    href="/contact?subject=Privacy%20Inquiry"
                    className="text-xs font-bold text-slate-700 hover:text-[#00A3E0] transition-colors"
                  >
                    Contact DPO
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

              {/* Section 01: Information We Collect */}
              <section id="section-1" className="scroll-mt-28 pb-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Categories of Information We Collect
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Ufulu Finance Limited collects personal and financial data necessary to deliver lawful microfinance and credit assessment services under the Malawi Data Protection Act (2023).
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span><strong>Identity Records:</strong> National ID, passport number, full legal name, date of birth.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span><strong>Contact Data:</strong> Residential address, phone numbers, email, next of kin contacts.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span><strong>Economic &amp; Payroll:</strong> Payslips, business turnover, employer details, bank statements.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl p-3">
                      <Check className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span><strong>Credit Bureau Data:</strong> Historical repayment records, facilities, default indicators.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 02: Purposes of Processing */}
              <section id="section-2" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Purposes of Personal Data Processing
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    We process your personal information strictly for legitimate commercial, operational, and statutory functions, including:
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Credit Underwriting:</strong> Assessing repayment capacity, risk scoring, debt service ratios, and affordability evaluations.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Account Administration:</strong> Generating payment schedules, issuing receipts, reconciling bank and mobile money disbursements.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Statutory AML/CFT Screening:</strong> Verification against domestic and international sanction lists under the Financial Crimes Act.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 03: Legal Grounds & Consent */}
              <section id="section-3" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Legal Grounds &amp; Consent Framework
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Our data handling activities are founded upon lawful processing bases outlined in Section 12 of the Malawi Data Protection Act:
                  </p>
                  <p>
                    <strong>Contractual Necessity:</strong> Processing required to evaluate and execute the loan agreement you entered into with Ufulu Finance.
                  </p>
                  <p>
                    <strong>Legal Obligation:</strong> Compliance with directives issued by the Reserve Bank of Malawi and the Financial Intelligence Authority.
                  </p>
                  <p>
                    <strong>Explicit Consent:</strong> Explicit borrower consent obtained during application submission for voluntary communication and credit score inquiries.
                  </p>
                </div>
              </section>

              {/* Section 04: Data Sharing & CRB Disclosures */}
              <section id="section-4" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Data Sharing &amp; Third-Party Disclosures
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Ufulu Finance does not sell, rent, or trade your personal data to advertisers. We share information only with authorized entities under strict confidentiality contracts:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Credit Reference Bureaus:</strong> Transmission of borrower credit exposure pursuant to the Credit Reference Bureau Act.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Regulatory Authorities:</strong> Reserve Bank of Malawi (RBM) and Financial Intelligence Authority (FIA) upon statutory demand.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Payment Switch Partners:</strong> Commercial banks, Airtel Money, and TNM Mpamba to complete disbursements and collection reconciliations.
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <strong>Legal &amp; Audit Advisors:</strong> Independent external financial auditors and legal counsel bound by professional non-disclosure duties.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 05: Data Security Standards */}
              <section id="section-5" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    05
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Technical &amp; Organisational Security Measures
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    We deploy enterprise-grade security controls to prevent unauthorised access, accidental disclosure, loss, or alteration of confidential borrower files:
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
                    <p>• <strong>Encryption:</strong> TLS 1.3 encryption for web portal transmissions and AES-256 encryption at rest for customer databases.</p>
                    <p>• <strong>Access Governance:</strong> Role-based access restrictions (RBAC) with mandatory multi-factor authentication (MFA) for staff systems.</p>
                    <p>• <strong>Vulnerability Audits:</strong> Periodic penetration testing, external security reviews, and continuous automated threat monitoring.</p>
                  </div>
                </div>
              </section>

              {/* Section 06: Retention Periods */}
              <section id="section-6" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    06
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Data Retention &amp; Disposal Schedules
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    In accordance with the Financial Crimes Act and Reserve Bank directives, borrower records and transaction files are retained for a minimum mandatory statutory duration of <strong>seven (7) years</strong> following final loan settlement and account closure.
                  </p>
                  <p>
                    Upon expiration of the statutory retention window, data records are securely purged or permanently anonymized in accordance with industry sanitization standards.
                  </p>
                </div>
              </section>

              {/* Section 07: Data Subject Rights */}
              <section id="section-7" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    07
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Your Rights as a Data Subject
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Under the Malawi Data Protection Act 2023, you hold enforceable rights regarding your personal records held in our registries:
                  </p>
                  <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Right of Access:</strong> Request certified copies of all personal records and ledger summaries maintained about you.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Right to Rectification:</strong> Require immediate correction of obsolete, inaccurate, or incomplete contact and income data.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Right to Object:</strong> Object to processing for direct marketing or automated profiling beyond credit assessment rules.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <strong>Right to Lodge a Complaint:</strong> Lodge formal concerns with the Malawi Data Protection Authority if rights are infringed.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 08: Cookies & Tracking Tech */}
              <section id="section-8" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    08
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Cookies &amp; Digital Analytics Tracking
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Our digital web platforms use essential cookies to sustain user authentication sessions, enforce CSRF security tokens, and maintain operational stability.
                  </p>
                  <p>
                    Optional analytics cookies are utilised to gather aggregated visit counts and interaction pathways. You can manage or disable optional cookie preferences through your web browser configuration settings.
                  </p>
                </div>
              </section>

              {/* Section 09: Cross-Border Transfers */}
              <section id="section-9" className="scroll-mt-28 py-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    09
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Cross-Border Data Transfers
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    Where customer cloud backup infrastructure or payment gateway processing involves secure transmission outside Malawi, Ufulu Finance guarantees that:
                  </p>
                  <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      The recipient jurisdiction enforces data protection standards comparable to the Malawi Data Protection Act 2023.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      Appropriate Standard Contractual Clauses (SCCs) and encryption mandates are strictly executed.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 10: DPO & Regulatory Inquiries */}
              <section id="section-10" className="scroll-mt-28 pt-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#00A3E0] bg-sky-50 px-2.5 py-1 rounded-md">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Data Protection Officer &amp; Inquiries
                  </h2>
                </div>
                <div className="text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-3.5 pl-0 sm:pl-10">
                  <p>
                    To exercise any of your data rights, request clarification regarding our privacy practices, or raise concerns, please reach out to our dedicated Data Protection Officer:
                  </p>
                  <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">Ufulu Finance Limited — Office of the DPO</p>
                    <p>Head Office: Victoria Avenue, Blantyre, Republic of Malawi</p>
                    <p>Email: <a href="mailto:ufulufinance@gmail.com" className="text-[#00A3E0] underline font-medium">ufulufinance@gmail.com</a> | Telephone: +265 994 485 444</p>
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
