import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-helpers";
import { readDocument } from "@/lib/image-upload";
import {
  deleteCloudinaryAsset,
  uploadBufferToCloudinary,
} from "@/lib/cloudinary";
import { isValidEmail, isValidPhone } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { brandShell, escapeHtml, sendMail } from "@/lib/mailer";
import { getNotificationRecipient } from "@/lib/notify";
import { SITE_URL } from "@/lib/site";
import {
  signApplicationCoverLetterToken,
  signApplicationCvToken,
} from "@/lib/job-cv-token";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ip = getClientIp(req) ?? "unknown";
  const rl = rateLimit(`job-app-${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) return fail("Too many submissions. Please try again later.", 429);

  const job = await prisma.job.findFirst({ where: { slug, status: "OPEN" } });
  if (!job) return fail("This position is not accepting applications.", 404);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid upload. Send the form as multipart data.");
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").toLowerCase().trim();
  const phone = String(form.get("phone") ?? "").trim();
  const cv = form.get("cv");
  const coverLetter = form.get("coverLetter");

  if (name.length < 2) return fail("Full name is required.");
  if (!isValidEmail(email)) return fail("A valid email address is required.");
  if (phone && !isValidPhone(phone)) return fail("A valid phone number is required.");

  let cvBuffer: Buffer;
  try {
    if (!cv || !(cv instanceof File)) throw new Error("missing");
    cvBuffer = await readDocument(cv, "CV");
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Please attach your CV (PDF, max 5 MB).");
  }

  let coverLetterBuffer: Buffer;
  try {
    if (!coverLetter || !(coverLetter instanceof File)) throw new Error("missing");
    coverLetterBuffer = await readDocument(coverLetter, "Cover letter");
  } catch (e) {
    return fail(
      e instanceof Error
        ? e.message
        : "Please attach your cover letter (PDF, max 5 MB)."
    );
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

  let coverLetterUpload;
  try {
    coverLetterUpload = await uploadBufferToCloudinary(
      coverLetterBuffer,
      "cover-letters",
      {
        resourceType: "raw",
        publicId: `cover-letter-${Date.now()}`,
      }
    );
  } catch {
    void deleteCloudinaryAsset(upload.publicId, "raw").catch(() => {});
    return fail("We could not upload your cover letter. Please try again.");
  }

  let application;
  try {
    application = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        name,
        email,
        phone: phone || null,
        coverNote: null,
        coverLetterUrl: coverLetterUpload.secureUrl,
        coverLetterPublicId: coverLetterUpload.publicId,
        cvUrl: upload.secureUrl,
        cvPublicId: upload.publicId,
      },
    });
  } catch (e) {
    console.error("[job-application]", e);
    void deleteCloudinaryAsset(upload.publicId, "raw").catch(() => {});
    void deleteCloudinaryAsset(coverLetterUpload.publicId, "raw").catch(() => {});
    return fail("We could not save your application. Please try again.", 500);
  }

  const safeName =
    application.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `applicant-${application.id}`;
  const dashboardUrl = `${SITE_URL}/admin/enquiries?tab=applications`;

  let cvViewUrl = upload.secureUrl;
  try {
    const cvToken = signApplicationCvToken(application.id);
    cvViewUrl = `${SITE_URL}/api/public/job-applications/${application.id}/cv.pdf?token=${encodeURIComponent(cvToken)}`;
  } catch (e) {
    console.error("[cv-link]", e);
  }

  let coverLetterViewUrl = coverLetterUpload.secureUrl;
  try {
    const coverLetterToken = signApplicationCoverLetterToken(application.id);
    coverLetterViewUrl = `${SITE_URL}/api/public/job-applications/${application.id}/cover-letter.pdf?token=${encodeURIComponent(coverLetterToken)}`;
  } catch (e) {
    console.error("[cover-letter-link]", e);
  }

  const html = brandShell(`
    <p style="margin:0 0 16px;color:#0f172a;font-size:16px;font-weight:700;">New job application — ${escapeHtml(job.title)}</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;width:180px;">Name</td><td style="padding:8px 12px;color:#0f172a;font-weight:600;">${escapeHtml(application.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">Email</td><td style="padding:8px 12px;color:#0f172a;font-weight:600;">${escapeHtml(application.email)}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">Phone</td><td style="padding:8px 12px;color:#0f172a;font-weight:600;">${escapeHtml(application.phone ?? "—")}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">CV</td><td style="padding:8px 12px;"><a href="${escapeHtml(cvViewUrl)}" style="color:#034DA2;font-weight:600;">View CV (PDF)</a></td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:12px;">Cover Letter</td><td style="padding:8px 12px;"><a href="${escapeHtml(coverLetterViewUrl)}" style="color:#034DA2;font-weight:600;">View Cover Letter (PDF)</a></td></tr>
    </table>
    <p style="margin:16px 0 0;color:#475569;font-size:12px;">The applicant's CV and cover letter are attached to this email as PDFs.</p>
    <div style="margin:24px 0 0;">
      <a href="${escapeHtml(dashboardUrl)}" style="display:inline-block;background-color:#034DA2;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;">View in Dashboard</a>
    </div>
    <p style="margin:14px 0 0;color:#64748b;font-size:12px;">Open the Job Applications tab and search for ${escapeHtml(application.name)} or ${escapeHtml(application.email)}.</p>
  `);
  const adminTo = await getNotificationRecipient("job");
  after(() =>
    sendMail(adminTo, `New job application — ${job.title}`, html, {
      attachments: [
        {
          filename: `${safeName}-cv.pdf`,
          content: cvBuffer,
          contentType: "application/pdf",
        },
        {
          filename: `${safeName}-cover-letter.pdf`,
          content: coverLetterBuffer,
          contentType: "application/pdf",
        },
      ],
    }).catch((e) => console.error("[mail]", e))
  );

  const confirmHtml = brandShell(`
    <p style="margin:0 0 12px;color:#0f172a;font-weight:700;">Application received</p>
    <p style="margin:0;color:#475569;">Thank you for applying for <strong>${escapeHtml(job.title)}</strong> at Ufulu Finance. Our team will review your application and contact you directly if you are shortlisted.</p>
  `);
  after(() =>
    sendMail(email, `Application received — ${job.title}`, confirmHtml).catch((e) => console.error("[mail]", e))
  );

  return ok({ id: application.id });
}
