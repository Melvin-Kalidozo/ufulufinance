"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById, OPEN_ROLES } from "@/lib/jobsData";
import {
  MapPin,
  Briefcase,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Share2,
  Check,
  Building2,
  Send,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { JobApplicationDialog } from "@/components/public/JobApplicationDialog";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DedicatedJobPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const job = getJobById(resolvedParams.id);

  const [copied, setCopied] = useState(false);

  if (!job) {
    return notFound();
  }

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const otherJobs = OPEN_ROLES.filter((r) => r.id !== job.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-16 sm:pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={job.image}
            alt={job.title}
            fill
            priority
            className="object-cover object-center scale-105 opacity-25 blur-xs"
            sizes="100vw"
          />
          {/* Vignette / gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d281a]/95 via-[#0f2e1e]/90 to-[#0b2115]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <nav className="flex items-center gap-2 text-xs font-medium text-emerald-200/80">
              <Link href="/" className="hover:text-[#a3e635] transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3 text-emerald-400/60" />
              <Link href="/jobs" className="hover:text-[#a3e635] transition-colors">
                Careers
              </Link>
              <ChevronRight className="size-3 text-emerald-400/60" />
              <span className="text-[#a3e635] font-semibold">{job.department}</span>
            </nav>

            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
            >
              <ArrowLeft className="size-3.5 text-[#a3e635]" />
              <span>Back to All Positions</span>
            </Link>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#84cc16] text-slate-950 uppercase tracking-wider">
                  {job.department}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-xs">
                  {job.type}
                </span>
                {job.isFeatured && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#a3e635] text-slate-950 flex items-center gap-1">
                    <Sparkles className="size-3" />
                    Priority Vacancy
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-emerald-100/90 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-[#a3e635]" />
                  {job.location}
                </span>
                {job.experienceLevel && (
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="size-4 text-[#a3e635]" />
                    {job.experienceLevel}
                  </span>
                )}
                {job.deadline && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4 text-[#a3e635]" />
                    Application Deadline: {job.deadline}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Apply / Share CTA */}
            <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-center gap-3 shrink-0">
              <JobApplicationDialog
                job={{
                  id: job.id,
                  title: job.title,
                  department: job.department,
                  location: job.location,
                  type: job.type,
                }}
                triggerButton={
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-slate-950 font-bold px-8 py-3.5 text-sm transition-all hover:scale-105 shadow-lg w-full sm:w-auto cursor-pointer"
                  >
                    <span>Apply for this Role</span>
                    <Send className="size-4" />
                  </button>
                }
              />

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 text-xs backdrop-blur-sm transition-all cursor-pointer hover:scale-105 w-full sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-[#a3e635]" />
                    <span className="text-[#a3e635] font-bold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="size-3.5 text-emerald-300" />
                    <span>Share Vacancy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT & APPLICATION GRID ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Role Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Role Overview */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Building2 className="size-5 text-[#1b4332]" />
                <span>Role Overview</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {job.overview}
              </p>
              {job.salaryRange && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1b4332]">
                      Compensation Package
                    </p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5">
                      {job.salaryRange}
                    </p>
                  </div>
                  <ShieldCheck className="size-5 text-[#65a30d]" />
                </div>
              )}
            </section>

            {/* Key Responsibilities */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Briefcase className="size-5 text-[#1b4332]" />
                <span>Key Responsibilities</span>
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="size-4 text-[#65a30d] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements & Qualifications */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <GraduationCap className="size-5 text-[#1b4332]" />
                <span>Qualifications &amp; Requirements</span>
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div className="size-1.5 rounded-full bg-[#1b4332] shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What We Offer */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a3e635]">
                  Employee Benefits
                </span>
                <h2 className="text-xl font-bold">What We Offer at Ufulu Finance</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {job.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100/90 leading-snug">
                      <Check className="size-4 text-[#a3e635] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right: Embedded Application Card */}
          <div className="lg:col-span-5" id="apply-form">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md sticky top-28 space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#65a30d] bg-emerald-50 px-2.5 py-1 rounded-md">
                  Official Vacancy Application
                </span>
                <h3 className="text-xl font-bold text-slate-950">
                  Ready to Apply?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Complete your application online. Our Talent Acquisition panel reviews all verified submissions.
                </p>
              </div>

              {/* Vacancy Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Position:</span>
                  <span className="font-bold text-slate-900 text-right">{job.title}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Department:</span>
                  <span className="font-semibold text-slate-900">{job.department}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Location:</span>
                  <span className="font-semibold text-slate-900">{job.location}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Employment Type:</span>
                  <span className="font-semibold text-slate-900">{job.type}</span>
                </div>
                {job.deadline && (
                  <div className="flex justify-between items-center text-slate-600 border-t border-slate-200/60 pt-2">
                    <span>Deadline:</span>
                    <span className="font-bold text-[#1b4332]">{job.deadline}</span>
                  </div>
                )}
              </div>

              {/* Mandatory Requirements Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Application Checklist
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#84cc16] shrink-0 mt-0.5" />
                    <span>Curriculum Vitae / Resume (Strictly PDF format, max 5MB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#84cc16] shrink-0 mt-0.5" />
                    <span>Cover Letter / Brief Statement of Motivation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-[#84cc16] shrink-0 mt-0.5" />
                    <span>Malawian Phone / WhatsApp contact number</span>
                  </li>
                </ul>
              </div>

              {/* Main Dialog Trigger Button */}
              <div>
                <JobApplicationDialog
                  job={{
                    id: job.id,
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    type: job.type,
                  }}
                  triggerButton={
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1b4332] hover:bg-[#143225] text-white font-bold py-3.5 text-sm uppercase tracking-wide transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Open Application Form</span>
                      <Send className="size-4 text-[#84cc16]" />
                    </button>
                  }
                />
              </div>

              {/* Recruitment Standards Assurance */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                  <strong className="text-slate-700">Fair Recruitment Guarantee:</strong> Ufulu Finance never charges application or interview fees.
                </p>
                <div className="text-center text-xs text-slate-500">
                  <span>Questions regarding this vacancy?</span>
                  <a
                    href="mailto:careers@ufulufinance.com"
                    className="block text-[#1b4332] font-semibold hover:underline mt-0.5"
                  >
                    careers@ufulufinance.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── OTHER OPEN POSITIONS ── */}
        {otherJobs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#65a30d]">
                  More Opportunities
                </p>
                <h3 className="text-2xl font-bold text-slate-950 mt-1">
                  Other Open Roles at Ufulu Finance
                </h3>
              </div>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4332] hover:text-[#65a30d] transition-colors"
              >
                <span>View All Roles</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherJobs.map((oj) => (
                <Link
                  key={oj.id}
                  href={`/jobs/${oj.id}`}
                  className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
                      {oj.department}
                    </span>
                    <h4 className="text-base font-bold text-slate-950 group-hover:text-[#1b4332] transition-colors">
                      {oj.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {oj.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <MapPin className="size-3.5 text-[#65a30d]" />
                      <span>{oj.location}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1b4332] group-hover:text-[#65a30d]">
                    <span>View Details</span>
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
