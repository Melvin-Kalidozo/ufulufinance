import nodemailer, { type Transporter } from "nodemailer";

// Shared mailer following the makaztech pattern: a lazily-created SMTP
// transporter plus HTML-escaping helpers for building templates inline.
let transporter: Transporter | null = null;

const BRAND_PRIMARY = "#034DA2";
const BRAND_ACCENT = "#00A3E0";
const BRAND_DARK = "#0a2540";

function getTransporter(): Transporter | null {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Wraps branded email body content in a common light shell. */
export function brandShell(body: string): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f7fb;padding:24px 12px;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(90deg,${BRAND_DARK},${BRAND_PRIMARY});padding:22px 28px;">
          <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:800;">Ufulu Finance</h1>
          <p style="margin:4px 0 0;color:#bfe3ff;font-size:12px;">Loans, savings and financial freedom for every community.</p>
        </div>
        <div style="padding:26px 28px;color:#0f172a;font-size:14px;line-height:1.7;">${body}</div>
        <div style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:11px;">
          Ufulu Finance Limited &middot; City Centre, Area 3, Lilongwe, Malawi<br/>
          This is an automated message. Do not reply to this email.
        </div>
      </div>
    </div>`;
}

export async function sendMail(to: string, subject: string, html: string) {
  const t = getTransporter();
  if (!t) {
    console.log(
      `[mail:dev-fallback] To: ${to} | Subject: ${subject}\n${html.replace(/<[^>]+>/g, " ").trim()}`
    );
    return { devFallback: true };
  }
  await t.sendMail({
    from: process.env.MAIL_FROM || "Ufulu Finance <no-reply@ufulufinance.com>",
    to,
    subject,
    html,
  });
  return { devFallback: false };
}

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function verificationEmailHtml(code: string) {
  return brandShell(`
    <p style="margin:0 0 12px;color:${BRAND_DARK};font-weight:600;">Verify your email address</p>
    <p style="margin:0 0 16px;color:#475569;">Use the code below to activate your account. It expires in 15 minutes.</p>
    <div style="font-size:32px;font-weight:800;letter-spacing:10px;color:${BRAND_PRIMARY};background:#e8f2fc;border-radius:10px;padding:14px;text-align:center;">${escapeHtml(code)}</div>
    <p style="margin:16px 0 0;color:#94a3b8;font-size:12px;">If you did not request this, you can safely ignore this email.</p>
  `);
}
