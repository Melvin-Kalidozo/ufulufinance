import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { EnquiriesTabs } from "@/components/admin/EnquiriesTabs";

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; jobId?: string }>;
}) {
  const { tab, jobId } = await searchParams;

  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Admin Portal"
        title="Enquiries"
        subtitle="Manage loan applicants, company enquiries and job applications submitted through the website."
      />

      <EnquiriesTabs initialTab={tab} initialJobId={jobId} />
    </div>
  );
}
