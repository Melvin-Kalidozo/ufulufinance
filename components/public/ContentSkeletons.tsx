"use client";

import { cn } from "@/lib/utils";
import { FileQuestion } from "lucide-react";

/** Brand-toned shimmer block used by the marketing pages while content loads. */
export function Shimmer({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-slate-200/70", className)} />;
}

/** Static, default hero content (no loading) shown while below-hero content streams in. */
export function StaticHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-36 sm:pt-44 pb-20 sm:pb-28">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-[#01214A]/90 to-slate-950/90" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#38bdf8]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200/90 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function EmptyState({
  title = "No published content yet",
  description = "New content will appear here once it is published from the admin portal.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-14 text-center">
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#034DA2]">
        <FileQuestion className="size-6" />
      </div>
      <p className="text-sm font-bold text-slate-700">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}

export function CardGridSkeleton({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >
          <Shimmer className="h-44 w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TextCardGridSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <div className="space-y-3">
            <Shimmer className="size-10 rounded-xl" />
            <Shimmer className="h-4 w-2/3" />
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SectionHeadingSkeleton({
  align = "center",
}: {
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-12 space-y-3",
        center ? "mx-auto max-w-2xl text-center" : "max-w-xl"
      )}
    >
      <Shimmer
        className={cn("h-3 w-28 rounded-full", center && "mx-auto")}
      />
      <Shimmer
        className={cn("h-8 w-2/3 rounded-full", center && "mx-auto")}
      />
      <Shimmer
        className={cn("h-3 w-1/2 rounded-full", center && "mx-auto")}
      />
    </div>
  );
}

export function StatStripSkeleton() {
  return (
    <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-200/80 bg-white lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3 px-6 py-8 text-center">
          <Shimmer className="mx-auto h-8 w-16" />
          <Shimmer className="mx-auto h-3 w-24" />
          <Shimmer className="mx-auto h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function TwoColumnSkeleton({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={cn(
          "space-y-4",
          reverse ? "lg:col-span-5 lg:order-2" : "lg:col-span-6"
        )}
      >
        <Shimmer className="h-3 w-28 rounded-full" />
        <Shimmer className="h-7 w-3/4 rounded-full" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <Shimmer className="h-3 w-2/3" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Shimmer className="h-10 rounded-xl" />
          <Shimmer className="h-10 rounded-xl" />
        </div>
      </div>
      <div
        className={cn(
          reverse ? "lg:col-span-7 lg:order-1" : "lg:col-span-6"
        )}
      >
        <Shimmer className="aspect-[4/3] w-full rounded-3xl" />
      </div>
    </div>
  );
}

export function ListRowSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white p-3"
        >
          <Shimmer className="size-9 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3 w-2/3 rounded-full" />
            <Shimmer className="h-3 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Shimmer className="h-64 w-full sm:h-80" />
      <div className="mx-auto max-w-3xl space-y-4 px-4">
        <Shimmer className="h-3 w-32" />
        <Shimmer className="h-7 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
        <div className="space-y-3 pt-4">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
