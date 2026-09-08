import { requireAdmin } from "@/lib/api-auth";
import { handleList, handleCreate } from "@/lib/admin-resource";
import { getDef, isValidResource } from "@/lib/admin-resources";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { resource } = await params;
  if (!isValidResource(resource)) return new Response("Unknown resource", { status: 400 });
  return handleList(getDef(resource), new URL(req.url));
}

export async function POST(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { resource } = await params;
  if (!isValidResource(resource)) return new Response("Unknown resource", { status: 400 });
  return handleCreate(getDef(resource), req);
}
