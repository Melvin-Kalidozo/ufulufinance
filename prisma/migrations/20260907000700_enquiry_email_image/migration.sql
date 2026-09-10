-- Loan enquiry: optional email + required front ID image storage; company enquiry: optional email.
ALTER TABLE "LoanEnquiry" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "LoanEnquiry" ADD COLUMN "idImageUrl" TEXT;
ALTER TABLE "LoanEnquiry" ADD COLUMN "idImagePublicId" TEXT;

ALTER TABLE "CompanyEnquiry" ALTER COLUMN "email" DROP NOT NULL;
