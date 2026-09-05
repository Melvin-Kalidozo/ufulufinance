import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById, OPEN_ROLES } from "@/lib/jobsData";
import { JobApplicationDialog } from "@/components/public/JobApplicationDialog";
import { ShareJobButton } from "@/components/public/ShareJobButton";
import {
  MapPin,
  Briefcase,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Check,
  Building2,
  Send,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Coins,
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/jobs/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const job = getJobById(id);
  if (!job) {
    return { title: "Job Not Found — Ufulu Finance" };
  }
  return {
    title: `${job.title} — Careers at Ufulu Finance`,
    description: job.description,
  };
}

export default async function DedicatedJobPage(props: PageProps<"/jobs/[id]">) {
  const { id } = await props.params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  const otherJobs = OPEN_ROLES.filter((r) => r.id !== job.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-900 antialiased">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* Background photo & ambient radial lights */}
        <div className="absolute inset-0 z-0">
          <Image
            src={job.image}
            alt={job.title}
            fill
            priority
            className="object-cover object-center scale-105 opacity-20 blur-xs"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#0d281a]/90 to-slate-950/95" />
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(132,204,22,0.18)_0%,_transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb Navigation */}
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="size-3.5 text-[#a3e635]" />
              <span>Back to All Positions</span>
            </Link>
          </div>

          {/* Role Header Banner Content */}
          <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#84cc16] text-slate-950 uppercase tracking-wider shadow-sm">
                  {job.department}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-xs border border-white/10">
                  {job.type}
                </span>
                {job.isFeatured && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#a3e635] text-slate-950 flex items-center gap-1 shadow-sm">
                    <Sparkles className="size-3" />
                    Priority Vacancy
                  </span>
                )}
              </div>

              {/* Job Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {job.title}
              </h1>

              {/* Quick Meta Pills */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-emerald-100/90 font-medium pt-1">
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

            {/* Header Action Buttons — always side-by-side */}
            <div className="flex flex-row items-center gap-3 shrink-0">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#84cc16] hover:bg-[#a3e635] text-slate-950 font-extrabold px-7 py-3.5 text-sm transition-all hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap"
                  >
                    <span>Apply for this Role</span>
                    <Send className="size-4" />
                  </button>
                }
              />

              <ShareJobButton jobTitle={job.title} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN JOB CONTENT & APPLICATION SIDEBAR ────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Job Description & Detailed Criteria (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* 2.1 Role Overview & Purpose */}
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center shrink-0">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#65a30d] block">
                    Role Summary
                  </span>
                  <h2 className="text-xl font-bold text-slate-950">
                    About This Opportunity
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
                {job.overview}
              </p>

              <div className="mt-2 p-5 rounded-2xl bg-[#fafbfc] border border-slate-200/70 flex items-start gap-3.5">
                <HeartHandshake className="size-5 text-[#84cc16] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Our Grassroots Mission: </strong>
                  At Ufulu Finance, every team member contributes directly to closing the SME credit deficit across Malawi with transparent and compassionate microcredit services.
                </p>
              </div>
            </section>

            {/* 2.2 Key Responsibilities */}
            <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center shrink-0">
                  <Briefcase className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#65a30d] block">
                    Daily Impact &amp; Scope
                  </span>
                  <h2 className="text-xl font-bold text-slate-950">
                    Key Responsibilities &amp; Deliverables
                  </h2>
                </div>
              </div>

              <ul className="space-y-3.5 pt-1">
                {job.responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafbfc] hover:bg-emerald-50/50 border border-slate-100 transition-colors text-xs sm:text-sm text-slate-700 leading-relaxed"
                  >
                    <div className="size-5 rounded-full bg-[#1b4332] text-[#a3e635] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="size-3" />
                    </div>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 2.3 Candidate Requirements & Qualifications */}
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center shrink-0">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#65a30d] block">
                    Ideal Candidate Profile
                  </span>
                  <h2 className="text-xl font-bold text-slate-950">
                    Qualifications &amp; Requirements
                  </h2>
                </div>
              </div>

              <ul className="space-y-3.5 pt-1">
                {job.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafbfc] hover:bg-emerald-50/50 border border-slate-100 transition-colors text-xs sm:text-sm text-slate-700 leading-relaxed"
                  >
                    <div className="size-2 rounded-full bg-[#84cc16] shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 2.4 Compensation & Package */}
            {job.salaryRange && (
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-4">
                  <div className="size-11 rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center shrink-0">
                    <Coins className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#65a30d] block">
                      Financial Package
                    </span>
                    <h2 className="text-xl font-bold text-slate-950">
                      Remuneration &amp; Bonuses
                    </h2>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1b4332] block">
                      Base Salary &amp; Incentives
                    </span>
                    <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {job.salaryRange}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Includes monthly collection performance rewards and transparent milestone payouts.
                    </p>
                  </div>
                  <div className="size-10 rounded-full bg-[#1b4332] text-[#84cc16] flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-5" />
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* Right Column: Sticky Application Card (5 cols) */}
          <div className="lg:col-span-5" id="apply-now">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md sticky top-28 space-y-6">
              {/* Header */}
              <div className="space-y-1.5 pb-2 border-b border-slate-100">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  Official Application
                </span>
                <h3 className="text-xl font-extrabold text-slate-950">
                  Ready to Apply?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Submit your credentials online. Our Talent Acquisition team evaluates all submissions.
                </p>
              </div>

              {/* Vacancy Details Box */}
              <div className="p-4 rounded-2xl bg-[#fafbfc] border border-slate-200/70 space-y-2.5 text-xs">
                <div className="flex justify-between items-start text-slate-600 gap-2">
                  <span className="text-slate-500 shrink-0">Role:</span>
                  <span className="font-bold text-slate-900 text-right">{job.title}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-900">{job.department}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">{job.location}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-slate-500">Type:</span>
                  <span className="font-semibold text-slate-900">{job.type}</span>
                </div>
                {job.deadline && (
                  <div className="flex justify-between items-center text-slate-600 border-t border-slate-200/70 pt-2">
                    <span className="text-slate-500">Deadline:</span>
                    <span className="font-bold text-[#1b4332]">{job.deadline}</span>
                  </div>
                )}
              </div>

              {/* Application Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Application Checklist
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-[#84cc16] shrink-0 mt-0.5" />
                    <span>Updated Curriculum Vitae / Resume (PDF format, max 5MB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-[#84cc16] shrink-0 mt-0.5" />
                    <span>Brief Statement of Motivation / Cover Note</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-[#84cc16] shrink-0 mt-0.5" />
                    <span>Valid Malawian Phone & WhatsApp number</span>
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
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1b4332] hover:bg-[#143225] text-white font-extrabold py-3.5 text-xs sm:text-sm uppercase tracking-wide transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Open Application Form</span>
                      <Send className="size-4 text-[#84cc16]" />
                    </button>
                  }
                />
              </div>

              {/* Ethical Standards Guarantee */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Zero Fee Guarantee:</strong> Ufulu Finance does not charge any application or interview fees.
                </p>
                <div className="text-xs text-slate-500 pt-1">
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

        {/* ── 2.5 BENEFITS — FULL WIDTH ────────────────────────────────── */}
        {job.benefits && job.benefits.length > 0 && (
          <section className="mt-12 bg-gradient-to-br from-[#1b4332] via-[#143d28] to-[#0d281a] text-white rounded-3xl p-10 sm:p-14 shadow-md space-y-8 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[radial-gradient(circle,_rgba(132,204,22,0.15)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,_rgba(132,204,22,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#a3e635]">
                  Why Join Our Team
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">Employee Benefits &amp; Growth</h2>
                <p className="text-sm text-emerald-100/80 leading-relaxed max-w-xl">
                  We invest heavily in the professional wellness and livelihood of our staff across Malawi.
                </p>
              </div>
            </div>

            <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {job.benefits.map((b, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/10 transition-colors text-sm text-emerald-50 leading-relaxed"
                >
                  <CheckCircle2 className="size-4 text-[#a3e635] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── 3. OTHER OPEN POSITIONS (Matching Jobs Page Aesthetic) ─── */}
        {otherJobs.length > 0 && (
          <section className="mt-20 pt-14 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <span className="size-2 rounded-full bg-[#84cc16]" />
                  <span>Explore More Careers</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Other Open Roles at Ufulu Finance
                </h3>
              </div>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4332] hover:text-[#84cc16] transition-colors"
              >
                <span>Browse All Opportunities</span>
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherJobs.map((oj) => (
                <div
                  key={oj.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                        {oj.department}
                      </span>
                      <Link
                        href={`/jobs/${oj.id}`}
                        className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-colors"
                      >
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug mt-3">
                      {oj.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {oj.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-slate-400" /> {oj.location}
                      </span>
                      <span>&bull;</span>
                      <span>{oj.type}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/jobs/${oj.id}`}
                      className="text-xs font-bold text-[#1b4332] hover:underline"
                    >
                      View Job Details
                    </Link>
                    <JobApplicationDialog
                      job={oj}
                      triggerButton={
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Apply Now
                          <ChevronRight className="size-3.5" />
                        </button>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
