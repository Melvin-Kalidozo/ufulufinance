import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { getSession } from "@/lib/api-auth";
import { UsersManager } from "@/components/admin/users-manager";
import { BrandPageBanner } from "@/components/admin/BrandPageBanner";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/signin");
  }

  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Admin Portal"
        title="User management"
        subtitle="Create, edit, activate or remove users on the platform."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <UsersManager />
      </section>
    </div>
  );
}
