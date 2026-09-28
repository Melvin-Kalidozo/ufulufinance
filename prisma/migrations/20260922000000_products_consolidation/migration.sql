-- Consolidate Services + Loan Products into a single "Product" model.
-- 1) Detach enquiries from LoanProduct (productId values become invalid once it is dropped).
-- 2) Drop the LoanProduct table.
-- 3) Rename Service* tables to Product*.
-- 4) Re-point the LoanEnquiry FK at Product.

ALTER TABLE "LoanEnquiry" DROP CONSTRAINT IF EXISTS "LoanEnquiry_productId_fkey";
UPDATE "LoanEnquiry" SET "productId" = NULL;
DROP TABLE "LoanProduct";

ALTER TABLE "Service" RENAME TO "Product";
ALTER TABLE "Product" RENAME CONSTRAINT "Service_pkey" TO "Product_pkey";
ALTER INDEX "Service_slug_key" RENAME TO "Product_slug_key";

ALTER TABLE "ServiceAudience" RENAME TO "ProductAudience";
ALTER TABLE "ProductAudience" RENAME CONSTRAINT "ServiceAudience_pkey" TO "ProductAudience_pkey";

ALTER TABLE "ServiceAdvantage" RENAME TO "ProductAdvantage";
ALTER TABLE "ProductAdvantage" RENAME CONSTRAINT "ServiceAdvantage_pkey" TO "ProductAdvantage_pkey";

ALTER TABLE "LoanEnquiry" ADD CONSTRAINT "LoanEnquiry_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
