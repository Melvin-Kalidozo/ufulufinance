-- Per-type notification recipients for loans, jobs and complaints.
ALTER TABLE "WebsiteSetting" ADD COLUMN "loanNotificationEmail" TEXT;
ALTER TABLE "WebsiteSetting" ADD COLUMN "jobNotificationEmail" TEXT;
ALTER TABLE "WebsiteSetting" ADD COLUMN "complaintsNotificationEmail" TEXT;
