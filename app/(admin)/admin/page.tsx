import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/api-auth";
import { redirect } from "next/navigation";
import { UserRole, ContentStatus } from "@prisma/client";
import {
  Landmark,
  Newspaper,
  CalendarDays,
  Briefcase,
  Inbox,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { BrandPageBanner } from "@/components/admin/BrandPageBanner";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/signin");
  }

  const [
    publishedArticles,
    activeLoanProducts,
    upcomingEvents,
    openJobs,
    pendingLoan,
    pendingCompany,
    jobApplications,
    totalUsers,
  ] = await Promise.all([
    prisma.article.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.loanProduct.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.event.count({ where: { date: { gte: new Date() }, status: ContentStatus.PUBLISHED } }),
    prisma.job.count({ where: { status: ContentStatus.PUBLISHED } }),
    prisma.loanEnquiry.count({ where: { status: "PENDING" } }),
    prisma.companyEnquiry.count({ where: { status: "PENDING" } }),
    prisma.jobApplication.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Published Articles", value: publishedArticles, icon: Newspaper, href: "/admin/content/editorial" },
    { label: "Active Loan Products", value: activeLoanProducts, icon: Landmark, href: "/admin/content/loans" },
    { label: "Upcoming Events", value: upcomingEvents, icon: CalendarDays, href: "/admin/content/editorial" },
    { label: "Open Job Listings", value: openJobs, icon: Briefcase, href: "/admin/content/editorial" },
    { label: "Pending Loan Applicants", value: pendingLoan, icon: Inbox, href: "/admin/enquiries" },
    { label: "Pending Company Enquiries", value: pendingCompany, icon: MessageSquare, href: "/admin/enquiries" },
    { label: "Job Applications", value: jobApplications, icon: Briefcase, href: "/admin/enquiries" },
    { label: "Registered Users", value: totalUsers, icon: Landmark, href: "/admin/users" },
  ];

  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Admin Dashboard"
        title={`Welcome back, ${session.user.name}`}
        subtitle="Overview of your content, enquiries and applicants."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group card-lift rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all hover:border-blue-100"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#034DA2] transition-colors group-hover:bg-[#034DA2] group-hover:text-white">
                <stat.icon className="size-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#034DA2] opacity-0 transition-opacity group-hover:opacity-100">
              Manage <ArrowRight className="size-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
