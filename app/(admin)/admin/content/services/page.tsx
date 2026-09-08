import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import {
  servicesDef,
  serviceAudiencesDef,
  serviceAdvantagesDef,
} from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "service", label: "Services", def: servicesDef, resource: "service" },
  { value: "serviceAudience", label: "Who we serve", def: serviceAudiencesDef, resource: "serviceAudience" },
  { value: "serviceAdvantage", label: "Advantages", def: serviceAdvantagesDef, resource: "serviceAdvantage" },
];

export default function ContentServicesPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Services"
        subtitle="Manage the services shown on the Services page, including who we serve and our advantages."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <ResourceTabs tabs={tabs} />
      </section>
    </div>
  );
}
