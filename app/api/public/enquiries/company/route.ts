import { prisma } from "@/lib/prisma";
import { fail, ok } from "@/lib/api-helpers";
import { generateRef, isValidEmail, isValidPhone } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendAdminEnquiryEmail, sendCustomerEnquiryConfirmation } from "@/lib/enquiry-emails";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  "General Information",
  "Loan Info",
  "Partnership",
  "Complaints",
  "Careers",
  "Media",
  "Other",
];

export async function POST(req: Request) {
  const ip = getClientIp(req) ?? "unknown";
  const rl = rateLimit(`company-enq-${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) return fail("Too many submissions. Please try again later.", 429);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").toLowerCase().trim();
  const phone = body.phone ? String(body.phone).trim() : "";
  const category = String(body.category ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2) return fail("Your name is required.");
  if (!isValidEmail(email)) return fail("A valid email address is required.");
  if (phone && !isValidPhone(phone)) return fail("A valid phone number is required.");
  if (!CATEGORIES.includes(category)) return fail("Please select an enquiry category.");
  if (message.length < 10) return fail("Please enter a message (at least 10 characters).");

  const refNumber = await generateRef("UFL-EN", async (r) =>
    Boolean(await prisma.companyEnquiry.findUnique({ where: { refNumber: r } }))
  );

  const enquiry = await prisma.companyEnquiry.create({
    data: { refNumber, name, email, phone: phone || null, category, message },
  });

  const fields = [
    { label: "Reference", value: enquiry.refNumber },
    { label: "Name", value: enquiry.name },
    { label: "Email", value: enquiry.email },
    { label: "Phone", value: enquiry.phone },
    { label: "Category", value: enquiry.category },
    { label: "Message", value: enquiry.message },
  ];

  void sendAdminEnquiryEmail("company enquiry", enquiry.refNumber, fields).catch(() => {});
  void sendCustomerEnquiryConfirmation(email, "company enquiry", enquiry.refNumber).catch(() => {});

  return ok({ refNumber: enquiry.refNumber });
}
