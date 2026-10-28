-- Additive PDF cover letter fields. The legacy "coverNote" text column is kept
-- so existing applications remain readable.
ALTER TABLE "JobApplication" ADD COLUMN "coverLetterUrl" TEXT;
ALTER TABLE "JobApplication" ADD COLUMN "coverLetterPublicId" TEXT;
