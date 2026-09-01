import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { getSession } from "@/lib/api-auth";
import { UsersManager } from "@/components/admin/users-manager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("/signin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">User management</h2>
        <p className="text-sm text-muted-foreground">
          Create, edit, activate or remove users on the platform.
        </p>
      </div>
      <UsersManager />
    </div>
  );
}
