-- Remove unused website settings and the orphaned Perk resource.
--   siteName/tagline/aboutLine/footerAbout/primaryEmail: never rendered publicly.
--   legal: legal pages are served by the LegalPage model, not this column.
ALTER TABLE "WebsiteSetting"
  DROP COLUMN "siteName",
  DROP COLUMN "tagline",
  DROP COLUMN "aboutLine",
  DROP COLUMN "footerAbout",
  DROP COLUMN "primaryEmail",
  DROP COLUMN "legal";

-- Career perks section was removed from the public jobs page.
DROP TABLE "Perk";
