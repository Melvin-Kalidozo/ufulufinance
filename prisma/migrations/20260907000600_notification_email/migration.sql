-- Single configurable notification recipient for enquiries & job applications.
ALTER TABLE "WebsiteSetting" ADD COLUMN "notificationEmail" TEXT;
