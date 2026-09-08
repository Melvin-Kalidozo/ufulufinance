import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-helpers";
import { generateRef, isValidEmail, isValidPhone } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendAdminEnquiryEmail, sendCustomerEnquiryConfirmation } from "@/lib/enquiry-emails";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req) ?? "unknown";
  const rl = rateLimit(`loan-enq-${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) return fail("Too many submissions. Please try again later.", 429);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").toLowerCase().trim();
  const productName = String(body.productName ?? "").trim();

  if (name.length < 2) return fail("Full name is required.");
  if (!phone || !isValidPhone(phone)) return fail("A valid phone number is required.");
  if (!isValidEmail(email)) return fail("A valid email address is required.");
  if (!productName) return fail("Please select the loan product you are interested in.");
  if (body.consent !== true) return fail("Please consent to processing your information.");

  const refNumber = await generateRef("UFL-LN", async (r) =>
    Boolean(await prisma.loanEnquiry.findUnique({ where: { refNumber: r } }))
  );

  const product = await prisma.loanProduct.findFirst({
    where: { name: productName, status: "PUBLISHED" },
  });

  const enquiry = await prisma.loanEnquiry.create({
    data: {
      refNumber,
      name,
      phone,
      email,
      location: body.location ? String(body.location) : null,
      productId: product?.id ?? null,
      productName,
      amountRequested: body.amountRequested ? String(body.amountRequested) : null,
      purpose: body.purpose ? String(body.purpose) : null,
      employment: body.employment ? String(body.employment) : null,
      preferredContact: body.preferredContact ? String(body.preferredContact) : null,
      consent: true,
      message: body.message ? String(body.message) : null,
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
    { label: "Message", value: enquiry.message },
  ];

  // Fire-and-forget notifications (makaztech pattern)
  void sendAdminEnquiryEmail("loan enquiry", enquiry.refNumber, fields).catch(() => {});
  void sendCustomerEnquiryConfirmation(email, "loan enquiry", enquiry.refNumber).catch(() => {});

  return ok({ refNumber: enquiry.refNumber });
}
