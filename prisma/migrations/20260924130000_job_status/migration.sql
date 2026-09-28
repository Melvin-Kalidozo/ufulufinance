-- Job visibility: replace the shared ContentStatus (DRAFT|PUBLISHED) on Job with
-- a dedicated JobStatus (OPEN|CLOSED|UNPUBLISHED), preserving existing data.
--   PUBLISHED -> OPEN
--   DRAFT     -> UNPUBLISHED
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'CLOSED', 'UNPUBLISHED');

ALTER TABLE "Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobStatus" USING (
  CASE "status"
    WHEN 'PUBLISHED' THEN 'OPEN'
    WHEN 'DRAFT' THEN 'UNPUBLISHED'
    ELSE 'OPEN'
  END
)::"JobStatus";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'OPEN';
