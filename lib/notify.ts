import { prisma } from "@/lib/prisma";

/** Single notification recipient for admin alerts (enquiries, job applications). */
export async function getNotificationRecipient(): Promise<string> {
  const settings = await prisma.websiteSetting.findFirst();
  const configured = settings?.notificationEmail?.trim();
  if (configured) return configured;
  return process.env.SMTP_USER || "info@ufulufinance.com";
}
