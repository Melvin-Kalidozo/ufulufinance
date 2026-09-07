"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { JobApplicationDialog } from "@/components/public/JobApplicationDialog";
import {
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
  Sliders,
  HeartHandshake,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Laptop,
  GraduationCap,
  Scale,
  Sparkles,
  CheckCircle2,
  X,
  Upload,
  Send,
  Check,
} from "lucide-react";

import { OPEN_ROLES, PERKS, JobRole } from "@/lib/jobsData";

export default function JobsPage() {
  return (
    <div className="bg-[#fcfdfd] text-slate-900 antialiased min-h-screen">
      {/* ── 1. FULL-WIDTH HERO BANNER (Edge-to-Edge) ────────────────── */}
      <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80"
            alt="Careers at Ufulu Finance"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#01214A]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Careers at Ufulu
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Why Work With Us &middot; Open Positions &middot; Growth Opportunities &middot; Apply Online
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#009FE0] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#009FE0] font-semibold">Careers</span>
          </div>
        </div>
      </section>

      {/* ── 2. CAREERS INTRODUCTION ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#009FE0]" />
              <span>Careers Introduction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Build a Career That Directly Transforms Communities
            </h2>

            <p className="text-sm font-semibold text-[#034DA2] bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              We are a team of ethical bankers, agronomists, risk analysts, and technology developers passionate about expanding financial freedom across Malawi.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              At Ufulu Finance, working here means more than processing transactions. Every day, our team helps a market vendor restock their store, a smallholder farmer purchase certified fertilizer, or a teacher finance their child’s university tuition without being exploited by loan sharks.
            </p>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
                What We Look For in Every Teammate
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Uncompromising Personal Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Empathy &amp; Respect for Everyday Borrowers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Curiosity &amp; Drive to Learn Continuously</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#00A3E0] shrink-0" />
                  <span>Prudent Risk Assessment Discipline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY WORK WITH US ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="size-2 rounded-full bg-[#009FE0]" />
                <span>Why Work With Us</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Empowering People, Rewarding Excellence
              </h2>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Ufulu Finance Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#00A3E0] shadow-lg">
                    <HeartHandshake className="size-7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {PERKS.map((p) => (
                <div
                  key={p.title}
                  className="bg-[#fafbfc] hover:bg-white hover:shadow-md transition-all rounded-2xl p-5 border border-slate-200/60 flex items-start gap-4"
                >
                  <div className="size-11 rounded-full bg-[#009FE0] flex items-center justify-center shrink-0 text-white shadow-sm">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. AVAILABLE POSITIONS (4x2 Grid matching Rudra) ─────────── */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#009FE0]" />
              <span>Available Positions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Explore Open Roles &amp; Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Click any position below to view responsibilities, qualification criteria, and submit your application.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPEN_ROLES.map((role) => {
              if (role.isFeatured) {
                return (
                  <div
                    key={role.id}
                    className="rounded-3xl p-6 bg-[#034DA2] text-white shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wide">
                          {role.department}
                        </span>
                        <div className="size-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold leading-snug mt-3">
                        <Link href={`/jobs/${role.id}`} className="hover:underline">
                          {role.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-900 font-medium mt-2 leading-relaxed">
                        {role.description}
                      </p>

                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-950 font-bold">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" /> {role.location}
                        </span>
                        <span>&bull;</span>
                        <span>{role.type}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-950/10 flex items-center justify-between">
                      <Link
                        href={`/jobs/${role.id}`}
                        className="text-xs font-bold underline hover:text-slate-800"
                      >
                        View Job Details
                      </Link>
                      <JobApplicationDialog
                        job={role}
                        triggerButton={
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#034DA2] text-xs font-bold hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            Apply Now
                            <ArrowRight className="size-3.5" />
                          </button>
                        }
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={role.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide">
                        {role.department}
                      </span>
                      <Link
                        href={`/jobs/${role.id}`}
                        className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-colors"
                      >
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug mt-3">
                      <Link href={`/jobs/${role.id}`} className="hover:text-[#034DA2] hover:underline transition-colors">
                        {role.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-slate-400" /> {role.location}
                      </span>
                      <span>&bull;</span>
                      <span>{role.type}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/jobs/${role.id}`}
                      className="text-xs font-bold text-[#034DA2] hover:underline"
                    >
                      View Job Details
                    </Link>
                    <JobApplicationDialog
                      job={role}
                      triggerButton={
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Apply Now
                          <ArrowRight className="size-3.5" />
                        </button>
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
