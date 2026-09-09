-- Normalize content visibility: status DRAFT|PUBLISHED only, drop isActive booleans.
-- 1) Guard against any legacy UNPUBLISHED/ARCHIVED rows on existing status columns.
UPDATE "Service"   SET "status" = 'DRAFT' WHERE "status" IN ('UNPUBLISHED', 'ARCHIVED');
UPDATE "Article"   SET "status" = 'DRAFT' WHERE "status" IN ('UNPUBLISHED', 'ARCHIVED');
UPDATE "Event"     SET "status" = 'DRAFT' WHERE "status" IN ('UNPUBLISHED', 'ARCHIVED');
UPDATE "Job"       SET "status" = 'DRAFT' WHERE "status" IN ('UNPUBLISHED', 'ARCHIVED');

-- 2) Recreate enum with only DRAFT | PUBLISHED.
ALTER TYPE "ContentStatus" RENAME TO "ContentStatus_old";
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');

ALTER TABLE "Service" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Service" ALTER COLUMN "status" TYPE "ContentStatus" USING ("status"::text)::"ContentStatus";
ALTER TABLE "Service" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';

ALTER TABLE "Article" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Article" ALTER COLUMN "status" TYPE "ContentStatus" USING ("status"::text)::"ContentStatus";
ALTER TABLE "Article" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';

ALTER TABLE "Event" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Event" ALTER COLUMN "status" TYPE "ContentStatus" USING ("status"::text)::"ContentStatus";
ALTER TABLE "Event" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';

ALTER TABLE "Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "ContentStatus" USING ("status"::text)::"ContentStatus";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';

DROP TYPE "ContentStatus_old";

-- 3) Add status + migrate data + drop isActive for the 16 boolean-gated models.
ALTER TABLE "Stat"               ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "Stat"               SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "Stat"               DROP COLUMN "isActive";

ALTER TABLE "SectorCard"         ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "SectorCard"         SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "SectorCard"         DROP COLUMN "isActive";

ALTER TABLE "WhyChooseItem"      ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "WhyChooseItem"      SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "WhyChooseItem"      DROP COLUMN "isActive";

ALTER TABLE "ImpactMetric"       ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "ImpactMetric"       SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "ImpactMetric"       DROP COLUMN "isActive";

ALTER TABLE "Testimonial"        ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "Testimonial"        SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "Testimonial"        DROP COLUMN "isActive";

ALTER TABLE "ServiceAudience"    ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "ServiceAudience"    SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "ServiceAudience"    DROP COLUMN "isActive";

ALTER TABLE "ServiceAdvantage"   ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "ServiceAdvantage"   SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "ServiceAdvantage"   DROP COLUMN "isActive";

ALTER TABLE "LoanProduct"        ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "LoanProduct"        SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "LoanProduct"        DROP COLUMN "isActive";

ALTER TABLE "Faq"                ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "Faq"                SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "Faq"                DROP COLUMN "isActive";

ALTER TABLE "Perk"               ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "Perk"               SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "Perk"               DROP COLUMN "isActive";

ALTER TABLE "GovernanceMember"   ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "GovernanceMember"   SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "GovernanceMember"   DROP COLUMN "isActive";

ALTER TABLE "AboutValue"         ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "AboutValue"         SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "AboutValue"         DROP COLUMN "isActive";

ALTER TABLE "RegionalHub"        ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "RegionalHub"        SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "RegionalHub"        DROP COLUMN "isActive";

ALTER TABLE "Project"            ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "Project"            SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "Project"            DROP COLUMN "isActive";

ALTER TABLE "CommunityInitiative" ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "CommunityInitiative" SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "CommunityInitiative" DROP COLUMN "isActive";

ALTER TABLE "SuccessStory"       ADD COLUMN "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED';
UPDATE "SuccessStory"       SET "status" = CASE WHEN "isActive" THEN 'PUBLISHED'::"ContentStatus" ELSE 'DRAFT'::"ContentStatus" END;
ALTER TABLE "SuccessStory"       DROP COLUMN "isActive";
