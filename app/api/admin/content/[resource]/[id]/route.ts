import { requireAdmin } from "@/lib/api-auth";
import { handleUpdate, handleDelete } from "@/lib/admin-resource";
import { getDef, isValidResource } from "@/lib/admin-resources";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { resource, id } = await params;
  const numeric = Number(id);
  if (!isValidResource(resource) || !Number.isInteger(numeric)) {
    return new Response("Invalid resource or id", { status: 400 });
  }
  return handleUpdate(getDef(resource), req, numeric);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { resource, id } = await params;
  const numeric = Number(id);
  if (!isValidResource(resource) || !Number.isInteger(numeric)) {
    return new Response("Invalid resource or id", { status: 400 });
  }
  return handleDelete(getDef(resource), numeric);
}
