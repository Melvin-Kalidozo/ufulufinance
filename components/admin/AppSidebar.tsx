"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ArrowUpRight,
  Landmark,
  Building2,
  FileText,
  HelpCircle,
  Home,
  Target,
  Settings,
  Inbox,
  Newspaper,
  BadgeCheck,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean };
type Group = { label?: string; items: NavItem[] };

const GROUPS: Group[] = [
  {
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/content/loans", label: "Loan Products", icon: Landmark },
      { href: "/admin/content/services", label: "Services", icon: Building2 },
      { href: "/admin/content/editorial", label: "Blog, News & Jobs", icon: Newspaper },
      { href: "/admin/content/home", label: "Home Sections", icon: Home },
      { href: "/admin/content/about", label: "About", icon: BadgeCheck },
      { href: "/admin/content/impact", label: "Impact & Stories", icon: Target },
      { href: "/admin/content/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/legal", label: "Legal", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200/90 px-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              alt="Ufulu Finance - Financial Freedom in Reach"
              width={120}
              height={40}
              priority
              className="h-6 w-auto object-contain"
            />
          </div>
        </Link>
        <div className="leading-tight">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#009FE0]">
            Admin Portal
          </p>
        </div>
      </div>

      <nav className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
        {GROUPS.map((group, i) => (
          <div key={i}>
            {group.label && (
              <p className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                      active
                        ? "bg-[#034DA2] text-white shadow-md shadow-blue-950/15"
                        : "text-slate-500 hover:bg-blue-50 hover:text-[#034DA2]"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200/90 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-blue-50 hover:text-[#034DA2]"
        >
          <ArrowUpRight className="size-4" />
          View public site
        </Link>
      </div>
    </div>
  );
}
