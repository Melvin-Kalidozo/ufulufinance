import { prisma } from "@/lib/prisma";

export type NotificationKind = "loan" | "job" | "complaints" | "general";

/** Notification recipient for admin alerts, resolved per type. */
export async function getNotificationRecipient(
  kind: NotificationKind = "general",
): Promise<string> {
  const settings = await prisma.websiteSetting.findFirst();
  const configured =
    kind === "loan"
      ? settings?.loanNotificationEmail?.trim()
      : kind === "job"
        ? settings?.jobNotificationEmail?.trim()
        : kind === "complaints"
          ? settings?.complaintsNotificationEmail?.trim()
          : settings?.notificationEmail?.trim();
  if (configured) return configured;
  return process.env.SMTP_USER || "info@ufulufinance.com";
}
