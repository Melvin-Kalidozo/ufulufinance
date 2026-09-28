-- Teams simplified to photo (image), name, position (title) and bio.
-- Existing placeholder rows are cleared so the client can enter their own via the dashboard.
DELETE FROM "GovernanceMember";

ALTER TABLE "GovernanceMember" DROP COLUMN "category";
ALTER TABLE "GovernanceMember" DROP COLUMN "credentials";
ALTER TABLE "GovernanceMember" DROP COLUMN "experience";
ALTER TABLE "GovernanceMember" DROP COLUMN "expertise";
