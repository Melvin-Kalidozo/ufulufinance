import { brandShell, escapeHtml, sendMail } from "@/lib/mailer";
import { getNotificationRecipient } from "@/lib/notify";

type Field = { label: string; value: string | number | null | undefined };

function rows(fields: Field[]): string {
  return fields
    .filter((f) => f.value !== null && f.value !== undefined && String(f.value).trim() !== "")
    .map(
      (f) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;width:180px;">${escapeHtml(f.label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:600;">${escapeHtml(String(f.value))}</td></tr>`
    )
    .join("");
}

function tableHtml(fields: Field[]): string {
  return `<table role="presentation" style="width:100%;border-collapse:collapse;">${rows(fields)}</table>`;
}

export async function sendAdminEnquiryEmail(kind: string, ref: string, fields: Field[]) {
  const html = brandShell(`
    <p style="margin:0 0 16px;color:#0f172a;font-size:16px;font-weight:700;">New ${kind} — ${escapeHtml(ref)}</p>
    ${tableHtml(fields)}
    <p style="margin:18px 0 0;color:#94a3b8;font-size:12px;">Open the Ufulu Finance admin portal to review and respond.</p>
  `);
  const to = await getNotificationRecipient();
  return sendMail(to, `New ${kind} ${ref}`, html);
}

export async function sendCustomerEnquiryConfirmation(
  to: string,
  kind: string,
  ref: string
) {
  const html = brandShell(`
    <p style="margin:0 0 12px;color:#0f172a;font-weight:700;">We received your ${kind}</p>
    <p style="margin:0 0 16px;color:#475569;">Thank you for contacting Ufulu Finance. Your enquiry has been received and is being reviewed.</p>
    <p style="margin:0 0 6px;color:#475569;">Your reference number is:</p>
    <div style="font-size:26px;font-weight:800;letter-spacing:2px;color:#034DA2;background:#e8f2fc;border-radius:10px;padding:12px;text-align:center;">${escapeHtml(ref)}</div>
    <p style="margin:16px 0 0;color:#64748b;font-size:13px;">Please quote this reference if you follow up with us. No further automatic updates will be sent — a member of our team will contact you directly.</p>
  `);
  return sendMail(to, `We received your ${kind} (${ref})`, html);
}
