"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { EventItem } from "@/lib/blogData";
import { usePublicData } from "@/lib/content-store";
import { StaticHero } from "@/components/public/ContentSkeletons";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Users,
  CalendarCheck2,
  Phone,
  Mail,
  Building2,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function toEvent(r: Record<string, unknown>): EventItem {
  const isUpcoming = r.date ? new Date(String(r.date)) >= new Date() : true;
  return {
    id: String(r.slug ?? ""),
    title: String(r.title ?? ""),
    date: r.date
      ? new Date(String(r.date)).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "",
    time: String(r.time ?? ""),
    location: String(r.location ?? ""),
    status: (isUpcoming ? "Upcoming" : "Past") as "Upcoming" | "Past",
    description: String(r.description ?? ""),
    details: Array.isArray(r.details)
      ? (r.details as unknown[]).map((x) => String(x))
      : [],
    image: String(r.image ?? ""),
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { body: detail, loading } = usePublicData<{ data?: Record<string, unknown> }>(
    `/api/public/events/${encodeURIComponent(id)}`
  );
  const { body: list } = usePublicData<{ data: unknown[] }>("/api/public/events?limit=20");

  const event: EventItem | undefined = detail?.data ? toEvent(detail.data) : undefined;
  const others = (list?.data ?? [])
    .filter((r) => String((r as Record<string, unknown>).slug ?? "") !== id)
    .slice(0, 2)
    .map((r) => toEvent(r as Record<string, unknown>));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <StaticHero
          title="Community Clinics & Events"
          subtitle="Upcoming and past Ufulu Finance workshops, forums and gatherings."
        />
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-10">
          <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-200/70" />
          <div className="h-7 w-3/4 animate-pulse rounded-full bg-slate-200/70" />
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200/70" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded-full bg-slate-200/70" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!event) return notFound();

  const isUpcoming = event.status === "Upcoming";

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#011632] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            className="object-cover object-center opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#01214A]/90 via-[#011632]/95 to-[#01214A]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-10 sm:pt-32 sm:pb-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-medium text-sky-300/70 mb-5 flex-wrap">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Home</Link>
            <ChevronRight className="size-3 text-sky-700 shrink-0" />
            <Link href="/blog" className="hover:text-[#38bdf8] transition-colors">Blog & Insights</Link>
            <ChevronRight className="size-3 text-sky-700 shrink-0" />
            <span className="text-sky-400/80">Events</span>
            <ChevronRight className="size-3 text-sky-700 shrink-0" />
            <span className="text-sky-400/80 truncate max-w-[160px] sm:max-w-xs">{event.title}</span>
          </nav>

          {/* Status + meta pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
              isUpcoming ? "bg-[#00A3E0] text-slate-950" : "bg-white/15 text-white"
            }`}>
              {event.status}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-sky-300/80 font-medium">
              <Calendar className="size-3 text-[#38bdf8]" />
              {event.date}
            </span>
            <span className="text-sky-700">·</span>
            <span className="flex items-center gap-1.5 text-[11px] text-sky-300/80 font-medium">
              <Clock className="size-3 text-[#38bdf8]" />
              {event.time}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.2] max-w-4xl mb-3">
            {event.title}
          </h1>

          {/* Location */}
          <p className="flex items-center gap-2 text-sm text-sky-200/70 mb-6">
            <MapPin className="size-4 text-[#38bdf8] shrink-0" />
            {event.location}
          </p>

          {/* Back link */}
          <div className="flex items-center gap-3 pt-5 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white text-[11px] font-bold transition-all hover:bg-white/15"
            >
              <ArrowLeft className="size-3.5 text-[#38bdf8]" />
              Back to Insights
            </Link>
            {isUpcoming && (
              <Link
                href={`/contact?subject=Event%20Registration%20–%20${encodeURIComponent(event.title)}`}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#00A3E0] text-slate-950 text-[11px] font-black transition-all hover:bg-[#38bdf8]"
              >
                Register Attendance
                <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-8 relative z-20">
        <div className="relative h-[180px] sm:h-[280px] rounded-2xl overflow-hidden shadow-xl border border-white/40 bg-slate-900">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10 items-start">

          {/* ── LEFT: Event Body ── */}
          <article className="space-y-7 min-w-0">

            {/* About this event */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-[#00A3E0] flex items-center justify-center shrink-0">
                  <Sparkles className="size-3.5 text-slate-950" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#01214A]">About This Event</span>
              </div>
              <p className="text-base text-slate-700 leading-[1.8]">{event.description}</p>
            </div>

            {/* Event Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col gap-2">
                <Calendar className="size-5 text-[#01214A]" />
                <p className="text-[10px] font-black uppercase tracking-wider text-[#01214A]">Date</p>
                <p className="text-sm font-bold text-slate-900">{event.date}</p>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col gap-2">
                <Clock className="size-5 text-[#01214A]" />
                <p className="text-[10px] font-black uppercase tracking-wider text-[#01214A]">Time</p>
                <p className="text-sm font-bold text-slate-900">{event.time}</p>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col gap-2">
                <MapPin className="size-5 text-[#01214A]" />
                <p className="text-[10px] font-black uppercase tracking-wider text-[#01214A]">Location</p>
                <p className="text-sm font-bold text-slate-900">{event.location}</p>
              </div>
            </div>

            {/* Agenda & Highlights */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-4">
              <h2 className="text-base font-black uppercase tracking-wider text-[#01214A]">
                Event Agenda & Highlights
              </h2>
              <ul className="space-y-3">
                {event.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="size-4 text-[#00A3E0] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Banner */}
            {isUpcoming ? (
              <div className="rounded-2xl bg-slate-950 border border-sky-900/30 p-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,163,224,0.15),_transparent_65%)] pointer-events-none" />
                <div className="relative space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00A3E0] text-slate-950">
                    Upcoming Event
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    Secure Your Spot Today
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Places are limited. Register now to confirm your attendance and receive pre-event briefing materials from our advisory team.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={`/contact?subject=Event%20Registration%20–%20${encodeURIComponent(event.title)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#00A3E0] hover:bg-[#38bdf8] text-slate-950 font-bold px-6 py-2.5 text-xs tracking-wide uppercase transition-all shadow-sm"
                    >
                      Register for Attendance
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 hover:bg-white/15 text-white font-semibold px-5 py-2.5 text-xs transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-100 border border-slate-200 p-7 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-300 text-slate-700">
                  Past Event
                </span>
                <h3 className="text-lg font-extrabold text-slate-800">Missed This Event?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Stay informed about our upcoming workshops, clinics, and borrower forums by subscribing to our monthly bulletin.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full bg-[#034DA2] hover:bg-[#023877] text-white font-bold px-6 py-2.5 text-xs uppercase tracking-wide transition-all"
                >
                  View Upcoming Events
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            )}
          </article>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* Quick event summary card */}
            <div className="bg-[#01214A] text-white rounded-2xl p-5 space-y-4 border border-sky-900/40">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  isUpcoming ? "bg-[#00A3E0] text-slate-950" : "bg-white/15 text-white/80"
                }`}>
                  {event.status}
                </span>
                <CalendarCheck2 className="size-4 text-[#38bdf8]" />
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Calendar className="size-3.5 text-[#38bdf8] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-sky-300/70 font-medium uppercase tracking-wider">Date</p>
                    <p className="text-xs font-bold">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="size-3.5 text-[#38bdf8] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-sky-300/70 font-medium uppercase tracking-wider">Time</p>
                    <p className="text-xs font-bold">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-3.5 text-[#38bdf8] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-sky-300/70 font-medium uppercase tracking-wider">Venue</p>
                    <p className="text-xs font-bold">{event.location}</p>
                  </div>
                </div>
              </div>
              {isUpcoming && (
                <Link
                  href={`/contact?subject=Event%20Registration%20–%20${encodeURIComponent(event.title)}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs transition-colors"
                >
                  Reserve My Seat
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>

            {/* Office contacts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-[#01214A]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">Our Offices</span>
              </div>
              <div className="space-y-2.5">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Lilongwe Head Office</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="size-3 text-[#00A3E0] shrink-0" />City Centre, Area 3
                  </p>
                  <a href="tel:+265991234567" className="flex items-center gap-1.5 text-[11px] text-[#01214A] font-semibold hover:underline">
                    <Phone className="size-3 shrink-0" />+265 99 123 4567
                  </a>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Blantyre Commercial</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="size-3 text-[#00A3E0] shrink-0" />Victoria Avenue, CBD
                  </p>
                  <a href="tel:+265881234567" className="flex items-center gap-1.5 text-[11px] text-[#01214A] font-semibold hover:underline">
                    <Phone className="size-3 shrink-0" />+265 88 123 4567
                  </a>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Mzuzu Regional Office</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="size-3 text-[#00A3E0] shrink-0" />Katoto Commercial Area
                  </p>
                  <a href="mailto:info@ufulufinance.com" className="flex items-center gap-1.5 text-[11px] text-[#01214A] font-semibold hover:underline">
                    <Mail className="size-3 shrink-0" />info@ufulufinance.com
                  </a>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#01214A] font-bold text-xs py-2.5 transition-colors"
              >
                Full Contact Directory
                <ArrowRight className="size-3" />
              </Link>
            </div>

            {/* Other events */}
            {others.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">Other Events</span>
                <div className="space-y-3">
                  {others.map((evt) => (
                    <Link
                      key={evt.id}
                      href={`/events/${evt.id}`}
                      className="group flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="relative size-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <Image src={evt.image} alt={evt.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <span className={`text-[10px] font-black uppercase ${evt.status === "Upcoming" ? "text-[#034DA2]" : "text-slate-400"}`}>
                          {evt.status}
                        </span>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#034DA2] transition-colors line-clamp-2 leading-snug">
                          {evt.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{evt.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog?tab=events"
                  className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#01214A] hover:text-[#00A3E0] transition-colors"
                >
                  All Events <ArrowRight className="size-3" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
