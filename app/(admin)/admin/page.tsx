import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/api-auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShieldCheck, UserRound, UserCheck } from "lucide-react";
import { RecentUsers } from "@/components/admin/recent-users";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/signin");
  }

  const [totalUsers, totalAdmins, totalCustomers, activeUsers, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      }),
    ]);

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
    },
    {
      label: "Admins",
      value: totalAdmins,
      icon: ShieldCheck,
    },
    {
      label: "Customers",
      value: totalCustomers,
      icon: UserRound,
    },
    {
      label: "Active Accounts",
      value: activeUsers,
      icon: UserCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Welcome back, {session.user.name}</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your microfinance platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="card-lift">
            <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <stat.icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent users</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentUsers users={recentUsers} />
        </CardContent>
      </Card>
    </div>
  );
}
