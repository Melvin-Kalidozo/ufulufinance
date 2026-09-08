import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { id } = await params;
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return new Response("Invalid id", { status: 400 });

  const application = await prisma.jobApplication.findUnique({ where: { id: numeric } });
  if (!application?.cvUrl) return new Response("CV not found", { status: 404 });

  const remote = await fetch(application.cvUrl, { cache: "no-store" }).catch(() => null);
  if (!remote || !remote.ok) return new Response("Could not load CV", { status: 502 });

  const body = await remote.arrayBuffer();
  const safeName =
    application.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `job-application-${application.id}`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${safeName}-cv.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
