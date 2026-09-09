import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { SettingsManager } from "@/components/admin/SettingsManager";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Admin Portal"
        title="Website settings"
        subtitle="Update company contact details, offices, social links and home hero/CTA content."
      />
      <SettingsManager />
    </div>
  );
}
