import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { LegalManager } from "@/components/admin/LegalManager";

export default function AdminLegalPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Legal pages"
        subtitle="Edit the Privacy Policy and Terms of Service shown on the public website."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <LegalManager />
      </section>
    </div>
  );
}
