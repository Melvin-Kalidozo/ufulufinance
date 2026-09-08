import { cn } from "@/lib/utils";

export function BrandPageBanner({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a2540] via-[#034DA2] to-[#021833] p-6 text-white shadow-lg shadow-blue-950/10 sm:p-8",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(0,159,224,0.35)_0%,_transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(3,77,162,0.6)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          {eyebrow ? (
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#38bdf8]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm leading-relaxed text-slate-200/90">{subtitle}</p>
          ) : null}
        </div>
        {children ? <div className="flex items-center gap-3">{children}</div> : null}
      </div>
    </div>
  );
}
