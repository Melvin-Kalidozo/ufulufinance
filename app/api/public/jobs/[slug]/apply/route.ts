import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-helpers";
import { readDocument } from "@/lib/image-upload";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { isValidEmail, isValidPhone } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { brandShell, escapeHtml, sendMail } from "@/lib/mailer";
import { getNotificationRecipient } from "@/lib/notify";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ip = getClientIp(req) ?? "unknown";
  const rl = rateLimit(`job-app-${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) return fail("Too many submissions. Please try again later.", 429);

  const job = await prisma.job.findFirst({ where: { slug, status: "PUBLISHED" } });
  if (!job) return fail("Job listing not found.", 404);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid upload. Send the form as multipart data.");
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").toLowerCase().trim();
  const phone = String(form.get("phone") ?? "").trim();
  const coverNote = String(form.get("coverNote") ?? "").trim();
  const cv = form.get("cv");

  if (name.length < 2) return fail("Full name is required.");
  if (!isValidEmail(email)) return fail("A valid email address is required.");
  if (phone && !isValidPhone(phone)) return fail("A valid phone number is required.");

  let cvBuffer: Buffer;
  try {
    if (!cv || !(cv instanceof File)) throw new Error("missing");
    cvBuffer = await readDocument(cv);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Please attach your CV (PDF, DOC or DOCX, max 5 MB).");
  }

  let upload;
  try {
    upload = await uploadBufferToCloudinary(cvBuffer, "cvs", {
      resourceType: "raw",
      publicId: `cv-${Date.now()}`,
    });
  } catch {
    return fail("We could not upload your CV. Please try again.");
  }

  const application = await prisma.jobApplication.create({
    data: {
      jobId: job.id,
      name,
      email,
      phone: phone || null,
      coverNote: coverNote || null,
      cvUrl: upload.secureUrl,
      cvPublicId: upload.publicId,
    },
  });

  const html = brandShell(`
    <p style="margin:0 0 16px;color:#0f172a;font-size:16px;font-weight:700;">New job application — ${escapeHtml(job.title)}</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;width:180px;">Name</td><td style="padding:8px 12px;color:#0f172a;font-weight:600;">${escapeHtml(application.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">Email</td><td style="padding:8px 12px;color:#0f172a;font-weight:600;">${escapeHtml(application.email)}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">Phone</td><td style="padding:8px 12px;color:#0f172a;font-weight:600;">${escapeHtml(application.phone ?? "—")}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">CV</td><td style="padding:8px 12px;"><a href="${escapeHtml(upload.secureUrl)}" style="color:#034DA2;">Download CV</a></td></tr>
    </table>
    <p style="margin:16px 0 0;color:#475569;">${escapeHtml(application.coverNote || "")}</p>
  `);
  const adminTo = await getNotificationRecipient();
  void sendMail(
    adminTo,
    `New job application — ${job.title}`,
    html
  ).catch((e) => console.error("[mail]", e));

  const confirmHtml = brandShell(`
    <p style="margin:0 0 12px;color:#0f172a;font-weight:700;">Application received</p>
    <p style="margin:0;color:#475569;">Thank you for applying for <strong>${escapeHtml(job.title)}</strong> at Ufulu Finance. Our team will review your application and contact you directly if you are shortlisted.</p>
  `);
  void sendMail(email, `Application received — ${job.title}`, confirmHtml).catch((e) => console.error("[mail]", e));

  return ok({ id: application.id });
}
