import Link from "next/link";
import Image from "next/image";
import { Home, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

const TRUST_POINTS = [
  "Transparent terms with zero hidden fees",
  "Payroll, village banking & business lending",
  "Fast mobile & bank disbursement",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] bg-white">
      {/* ── Brand panel (public-facing hero grammar) ── */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-b from-[#0a2540] via-[#034DA2] to-[#021833] lg:flex lg:flex-col">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(0,159,224,0.25)_0%,_transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 bg-[radial-gradient(circle,_rgba(3,77,162,0.5)_0%,_transparent_70%)]" />

        <div className="relative z-10 flex h-full flex-col p-8 lg:p-12 xl:p-16">
          <Link href="/" className="w-fit">
            <div className="rounded-2xl bg-white p-2 shadow-md transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="Ufulu Finance - Financial Freedom in Reach"
                width={175}
                height={55}
                priority
                className="h-8 w-auto object-contain sm:h-10"
              />
            </div>
          </Link>

          <div className="mt-auto max-w-md space-y-6">
            {/* <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#38bdf8]">
              Ufulu Finance
            </p> */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
              Loans, savings and financial freedom for every community.
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Empowering Malawian civil servants, private sector employees,
              community groups and entrepreneurs with transparent credit and
              respectful financial guidance.
            </p>

            <ul className="space-y-2.5 pt-2">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-100"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#38bdf8]" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-white/15 pt-6 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#38bdf8]" />
                City Centre, Area 3, Lilongwe, Malawi
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="tel:+265991234567"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="size-3.5 text-[#38bdf8]" />
                  +265 99 123 4567
                </a>
                <a
                  href="mailto:info@ufulufinance.com"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="size-3.5 text-[#38bdf8]" />
                  info@ufulufinance.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-[#f8fafc]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,159,224,0.08),transparent_60%)]" />

        <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
          {/* Mobile brand */}
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <Link href="/" className="mb-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Ufulu Finance - Financial Freedom in Reach"
                  width={175}
                  height={55}
                  priority
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Admin &amp; Customer Portal
            </h1>
            <p className="text-sm text-slate-500">
              Loans, savings and financial freedom for every community.
            </p>
          </div>

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/[0.06] sm:p-8">
            {children}
          </div>

          <p className="relative mt-8 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Ufulu Finance Limited. All rights
            reserved.
          </p>
        </div>

        {/* Back to home */}
        <div className="relative flex items-center justify-end p-4 sm:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-[#034DA2]"
          >
            <Home className="size-3.5" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
