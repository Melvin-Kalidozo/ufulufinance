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
      
        <LegalManager />
      
    </div>
  );
}
