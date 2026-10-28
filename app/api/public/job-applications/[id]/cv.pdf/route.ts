import { prisma } from "@/lib/prisma";
import { verifyApplicationCvToken } from "@/lib/job-cv-token";

export const dynamic = "force-dynamic";

function safeName(name: string, id: number): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `job-application-${id}`
  );
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const applicationId = Number(id);
  const token = new URL(req.url).searchParams.get("token") ?? "";

  if (
    !Number.isInteger(applicationId) ||
    !verifyApplicationCvToken(applicationId, token)
  ) {
    return new Response("Not found", { status: 404 });
  }

  const application = await prisma.jobApplication.findUnique({
    where: { id: applicationId },
    select: { id: true, name: true, cvUrl: true },
  });
  if (!application?.cvUrl) {
    return new Response("CV not found", { status: 404 });
  }

  const remote = await fetch(application.cvUrl, { cache: "no-store" }).catch(
    () => null
  );
  if (!remote || !remote.ok) {
    return new Response("Could not load CV", { status: 502 });
  }

  const body = await remote.arrayBuffer();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${safeName(application.name, application.id)}-cv.pdf"`,
      "Cache-Control": "private, max-age=3600",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
