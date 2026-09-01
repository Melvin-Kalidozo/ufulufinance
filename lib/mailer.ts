import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
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
  return `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #dee2e6;border-radius:8px;">
      <h2 style="color:#007bff;margin:0 0 8px;">Ufulu Finance</h2>
      <p style="color:#343a40;font-size:15px;line-height:1.6;">Your verification code is:</p>
      <div style="font-size:32px;font-weight:700;letter-spacing:8px;color:#007bff;padding:12px 0;">${code}</div>
      <p style="color:#6c757d;font-size:13px;">This code expires in 15 minutes. If you did not request this, you can ignore this email.</p>
    </div>
  `;
}
