-- Heroes are strictly static front-end content; remove CMS-driven hero/CTA fields.
ALTER TABLE "WebsiteSetting" DROP COLUMN "heroEyebrow";
ALTER TABLE "WebsiteSetting" DROP COLUMN "heroTitle";
ALTER TABLE "WebsiteSetting" DROP COLUMN "heroSubtitle";
ALTER TABLE "WebsiteSetting" DROP COLUMN "heroImage";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaEyebrow";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaTitle";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaSubtitle";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaImage";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaPrimaryLabel";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaPrimaryLink";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaSecondaryLabel";
ALTER TABLE "WebsiteSetting" DROP COLUMN "ctaSecondaryLink";
