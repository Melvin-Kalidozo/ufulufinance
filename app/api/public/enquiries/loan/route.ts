import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-helpers";
import { generateRef, isValidEmail, isValidPhone } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { optimizeImage, UploadError } from "@/lib/image-upload";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { sendAdminEnquiryEmail, sendCustomerEnquiryConfirmation } from "@/lib/enquiry-emails";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req) ?? "unknown";
  const rl = rateLimit(`loan-enq-${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) return fail("Too many submissions. Please try again later.", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid request. Send the form as multipart data.");
  }

  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const emailRaw = String(form.get("email") ?? "").trim().toLowerCase();
  const productName = String(form.get("productName") ?? "").trim();
  const idImage = form.get("idImage");

  if (name.length < 2) return fail("Full name is required.");
  if (!phone || !isValidPhone(phone)) return fail("A valid phone number is required.");
  if (emailRaw && !isValidEmail(emailRaw)) return fail("Please enter a valid email address.");
  if (!productName) return fail("Please select the loan product you are interested in.");
  if (String(form.get("consent") ?? "") !== "true") {
    return fail("Please consent to processing your information.");
  }
  if (!idImage || !(idImage instanceof File) || idImage.size === 0) {
    return fail("Please upload a clear photo of your National ID (front).");
  }

  let optimized;
  try {
    optimized = await optimizeImage(idImage);
  } catch (e) {
    return fail(
      e instanceof UploadError ? e.message : "Only JPG, PNG or WebP images are accepted (no PDFs)."
    );
  }

  let upload;
  try {
    upload = await uploadBufferToCloudinary(optimized.buffer, "loan-enquiries");
  } catch {
    return fail("We could not upload your ID image. Please try again.");
  }

  const refNumber = await generateRef("UFL-LN", async (r) =>
    Boolean(await prisma.loanEnquiry.findUnique({ where: { refNumber: r } }))
  );

  const product = await prisma.loanProduct.findFirst({
    where: { name: productName, status: "PUBLISHED" },
  });

  const email = emailRaw || null;

  const enquiry = await prisma.loanEnquiry.create({
    data: {
      refNumber,
      name,
      phone,
      email,
      location: form.get("location") ? String(form.get("location")) : null,
      productId: product?.id ?? null,
      productName,
      amountRequested: form.get("amountRequested") ? String(form.get("amountRequested")) : null,
      purpose: form.get("purpose") ? String(form.get("purpose")) : null,
      employment: form.get("employment") ? String(form.get("employment")) : null,
      preferredContact: form.get("preferredContact") ? String(form.get("preferredContact")) : null,
      consent: true,
      message: form.get("message") ? String(form.get("message")) : null,
      idImageUrl: upload.secureUrl,
      idImagePublicId: upload.publicId,
    },
  });

  const fields = [
    { label: "Reference", value: enquiry.refNumber },
    { label: "Full name", value: enquiry.name },
    { label: "Phone", value: enquiry.phone },
    { label: "Email", value: enquiry.email },
    { label: "Location", value: enquiry.location },
    { label: "Loan product", value: enquiry.productName },
    { label: "Amount requested", value: enquiry.amountRequested },
    { label: "Purpose", value: enquiry.purpose },
    { label: "Employment / business", value: enquiry.employment },
    { label: "Preferred contact", value: enquiry.preferredContact },
    { label: "ID image", value: enquiry.idImageUrl },
    { label: "Message", value: enquiry.message },
  ];

  // Admin alert always; applicant confirmation only when they provided an email.
  void sendAdminEnquiryEmail("loan enquiry", enquiry.refNumber, fields).catch((e) =>
    console.error("[mail]", e)
  );
  if (email) {
    void sendCustomerEnquiryConfirmation(email, "loan enquiry", enquiry.refNumber).catch((e) =>
      console.error("[mail]", e)
    );
  }

  return ok({ refNumber: enquiry.refNumber });
}
