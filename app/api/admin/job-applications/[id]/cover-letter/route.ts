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
  if (!Number.isInteger(numeric)) {
    return new Response("Invalid id", { status: 400 });
  }

  const application = await prisma.jobApplication.findUnique({
    where: { id: numeric },
  });
  if (!application?.coverLetterUrl) {
    return new Response("Cover letter not found", { status: 404 });
  }

  const remote = await fetch(application.coverLetterUrl, {
    cache: "no-store",
  }).catch(() => null);
  if (!remote || !remote.ok) {
    return new Response("Could not load cover letter", { status: 502 });
  }

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
      "Content-Disposition": `inline; filename="${safeName}-cover-letter.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
