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

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  image: string;
  icon: any;
  isFeatured?: boolean;
}

const OPEN_ROLES: JobRole[] = [
  {
    id: "loan-officer-msme",
    title: "Loan Officer — MSME Lending",
    department: "Field Credit Operations",
    location: "Lilongwe (Area 2 & City Centre)",
    type: "Full-Time",
    description: "Originate and appraise business working capital loans with active field client visits and portfolio growth.",
    overview:
      "As an MSME Loan Officer, you will be the direct bridge between Ufulu Finance and local entrepreneurs. You will appraise market traders, structure working capital facilities, and coach clients on cashflow discipline.",
    responsibilities: [
      "Conduct field visits to assess business inventory, daily cashflow, and trading viability",
      "Appraise loan applications under our responsible underwriting guidelines",
      "Manage customer repayment relationships to achieve portfolio collection targets above 98%",
      "Conduct introductory financial literacy coaching for new borrowers",
    ],
    requirements: [
      "Diploma or Degree in Business Administration, Banking, Finance, or related discipline",
      "Minimum 1 to 2 years experience in microfinance field operations or retail sales",
      "Fluency in English and Chichewa; strong interpersonal and negotiation skills",
      "Clean credit bureau record and high personal integrity",
    ],
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
    icon: Briefcase,
    isFeatured: true, // Featured Lime Card
  },
  {
    id: "credit-risk-analyst",
    title: "Senior Credit Risk Analyst",
    department: "Risk & Compliance",
    location: "Lilongwe HQ",
    type: "Full-Time",
    description: "Appraise MSME loan portfolios, evaluate repayment capacity, and ensure underwriting policy compliance.",
    overview:
      "Oversee credit portfolio risk indicators, monitor PAR (Portfolio at Risk) thresholds, and refine automated scoring algorithms for digital loan disbursements.",
    responsibilities: [
      "Perform credit risk stress testing across seasonal agricultural and trade portfolios",
      "Evaluate non-performing loans and recommend ethical restructuring options",
      "Ensure regulatory alignment with Reserve Bank of Malawi microfinance prudential standards",
    ],
    requirements: [
      "Bachelor's degree in Actuarial Science, Statistics, Economics, or Finance",
      "3+ years experience in risk management within a financial institution",
      "Advanced Excel and financial modeling proficiency",
    ],
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    icon: Scale,
    isFeatured: false,
  },
  {
    id: "agri-credit-specialist",
    title: "Agri-Credit Field Specialist",
    department: "Agri-Finance",
    location: "Dedza / Mchinji Hub",
    type: "Full-Time",
    description: "Structure seasonal fertilizer and seed input facilities for smallholder cooperatives across central Malawi.",
    overview:
      "Work directly with farming clubs, cooperatives, and input agro-dealers to structure harvest-aligned credit packages.",
    responsibilities: [
      "Mobilize and assess agricultural producer clubs and village savings associations",
      "Monitor rain patterns, planting schedules, and crop disease indicators",
      "Coordinate structured commodity aggregation with commercial off-takers",
    ],
    requirements: [
      "Degree or Diploma in Agricultural Economics, Agronomy, or Rural Development",
      "Motorcycle riding competence with valid driver's license",
      "Familiarity with central Malawi agricultural farming belts",
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    icon: Sparkles,
    isFeatured: false,
  },
  {
    id: "digital-finance-officer",
    title: "Digital Finance Systems Officer",
    department: "FinTech & IT",
    location: "Lilongwe HQ",
    type: "Full-Time",
    description: "Support mobile money rails (Airtel Money & Mpamba) and core banking transaction automation.",
    overview:
      "Maintain 99.9% uptime for digital loan disbursements, API integrations with telecommunications operators, and borrower SMS notification systems.",
    responsibilities: [
      "Manage core banking API gateways with Airtel Money and TNM Mpamba",
      "Ensure database security, end-to-end encryption, and customer data privacy",
      "Provide level 2 technical troubleshooting for branch loan disbursement portals",
    ],
    requirements: [
      "BSc in Computer Science, Information Technology, or Software Engineering",
      "Experience with REST APIs, SQL databases, and cloud infrastructure",
    ],
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    icon: Laptop,
    isFeatured: false,
  },
  {
    id: "branch-customer-relations",
    title: "Branch Customer Relations Officer",
    department: "Client Services",
    location: "Blantyre (Limbe Branch)",
    type: "Full-Time",
    description: "Serve as the primary point of contact for loan onboarding, account balance inquiries, and walk-in clients.",
    overview:
      "Create a warm, welcoming, and judgment-free branch experience for every client seeking financial assistance or loan repayment guidance.",
    responsibilities: [
      "Welcome walk-in clients and explain loan product terms with complete transparency",
      "Verify initial KYC identity documentation and payslips",
      "Handle borrower queries and document feedback for branch management",
    ],
    requirements: [
      "Diploma in Communication, Public Relations, or Business Studies",
      "Excellent verbal and written communication in English and Chichewa",
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    icon: Users,
    isFeatured: false,
  },
  {
    id: "graduate-trainee",
    title: "Graduate Credit & Banking Trainee",
    department: "Early Career Program",
    location: "Lilongwe / Blantyre / Mzuzu",
    type: "12-Month Rotation",
    description: "Structured 12-month rotation across credit assessment, customer service, and field loan appraisal.",
    overview:
      "A fast-track rotational development program designed for ambitious Malawian recent graduates seeking a leadership trajectory in development finance.",
    responsibilities: [
      "Rotate through Field Underwriting, Risk Analytics, and Customer Experience",
      "Participate in community financial literacy workshops",
      "Complete a mentored capstone project on microfinance innovation",
    ],
    requirements: [
      "Recent graduate (graduated within last 2 years) with minimum Credit or Distinction",
      "High analytical curiosity, energy, and strong work ethic",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    icon: GraduationCap,
    isFeatured: false,
  },
];

const PERKS = [
  {
    title: "Competitive Compensation & Performance Bonus",
    desc: "Rewarding portfolio excellence, customer satisfaction, and on-time repayment milestones with industry-leading monthly incentives.",
  },
  {
    title: "Health & Medical Cover for You & Dependents",
    desc: "Comprehensive private medical insurance providing hospital, outpatient, dental, and optical benefits across Malawi.",
  },
  {
    title: "Continuous Professional Development",
    desc: "Tuition support for professional accreditations (CPA, FCCA, Risk Certifications) and structured internal leadership academies.",
  },
  {
    title: "Supportive, Purpose-Driven Culture",
    desc: "Work with a high-integrity team genuinely committed to lifting everyday Malawians out of financial hardship.",
  },
];

export default function JobsPage() {
  const [selectedRoleForDetails, setSelectedRoleForDetails] = useState<JobRole | null>(null);

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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#0d281a]/85 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Careers at Ufulu
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Why Work With Us &middot; Open Positions &middot; Growth Opportunities &middot; Apply Online
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-medium text-white shadow-xs">
            <Link href="/" className="hover:text-[#a3e635] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">&rarr;</span>
            <span className="text-[#a3e635] font-semibold">Careers</span>
          </div>
        </div>
      </section>

      {/* ── 2. CAREERS INTRODUCTION ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              <span className="size-2 rounded-full bg-[#84cc16]" />
              <span>Careers Introduction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Build a Career That Directly Transforms Communities
            </h2>

            <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
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
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Uncompromising Personal Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Empathy &amp; Respect for Everyday Borrowers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
                  <span>Curiosity &amp; Drive to Learn Continuously</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#65a30d] shrink-0" />
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
                <span className="size-2 rounded-full bg-[#84cc16]" />
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
                  <div className="size-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#65a30d] shadow-lg">
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
                  <div className="size-11 rounded-full bg-[#a3e635] flex items-center justify-center shrink-0 text-slate-950 shadow-sm">
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
              <span className="size-2 rounded-full bg-[#84cc16]" />
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
              const Icon = role.icon;

              if (role.isFeatured) {
                return (
                  <div
                    key={role.id}
                    className="rounded-3xl p-6 bg-[#84cc16] text-slate-950 shadow-xl flex flex-col justify-between transition-transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-950 text-[#84cc16] text-[10px] font-extrabold uppercase tracking-wide">
                          {role.department}
                        </span>
                        <div className="size-8 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0">
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold leading-snug mt-3">
                        {role.title}
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
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 text-[#84cc16] text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
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
                      {role.title}
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
                      className="text-xs font-bold text-[#1b4332] hover:underline"
                    >
                      View Job Details
                    </Link>
                    <JobApplicationDialog
                      job={role}
                      triggerButton={
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold transition-colors cursor-pointer"
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

      {/* ── 5. INDIVIDUAL JOB DETAILS MODAL (Job Title → Overview → Responsibilities → Requirements → Application Form) ── */}
      {selectedRoleForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedRoleForDetails(null)}
              className="absolute top-5 right-5 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wide">
                  {selectedRoleForDetails.department}
                </span>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedRoleForDetails.location}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                {selectedRoleForDetails.title}
              </h3>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Role Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedRoleForDetails.overview}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Responsibilities
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedRoleForDetails.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-[#65a30d] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Candidate Requirements
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedRoleForDetails.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#65a30d] font-bold">&bull;</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedRoleForDetails(null)}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <JobApplicationDialog
                job={selectedRoleForDetails}
                triggerButton={
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Apply for Position
                    <ArrowRight className="size-3.5" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
