-- Website settings: multiple contact phone numbers (string[]).
ALTER TABLE "WebsiteSetting" ADD COLUMN "phones" JSONB;
