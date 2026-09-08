import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { EnquiriesTabs } from "@/components/admin/EnquiriesTabs";

export default function AdminEnquiriesPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Admin Portal"
        title="Enquiries"
        subtitle="Manage loan applicants, company enquiries and job applications submitted through the website."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <EnquiriesTabs />
      </section>
    </div>
  );
}
