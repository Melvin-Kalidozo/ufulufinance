-- Legal (Privacy & Terms) content as CMS-managed structured pages.
CREATE TABLE "LegalPage" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LegalPage_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "LegalPage_slug_key" ON "LegalPage"("slug");
