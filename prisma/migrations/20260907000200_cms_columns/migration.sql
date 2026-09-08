-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "meta" JSONB;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "category" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "metrics" TEXT;

-- AlterTable
ALTER TABLE "SuccessStory" ADD COLUMN     "statsText" TEXT;

