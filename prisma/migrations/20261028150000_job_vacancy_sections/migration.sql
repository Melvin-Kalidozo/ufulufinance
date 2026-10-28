-- Additive vacancy fields: grouped responsibilities are stored in the existing
-- "responsibilities" JSON column; these columns add the remaining doc sections.
ALTER TABLE "Job" ADD COLUMN "reportsTo" TEXT;
ALTER TABLE "Job" ADD COLUMN "skills" JSONB;
ALTER TABLE "Job" ADD COLUMN "kpis" JSONB;
