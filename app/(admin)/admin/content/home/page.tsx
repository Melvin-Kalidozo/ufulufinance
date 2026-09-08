import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import {
  statsDef,
  sectorCardsDef,
  whyChooseDef,
  impactMetricsDef,
  testimonialsDef,
} from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "stat", label: "Stats", def: statsDef, resource: "stat" },
  { value: "sectorCard", label: "Who we empower", def: sectorCardsDef, resource: "sectorCard" },
  { value: "whyChooseItem", label: "Why choose us", def: whyChooseDef, resource: "whyChooseItem" },
  { value: "impactMetric", label: "Impact metrics", def: impactMetricsDef, resource: "impactMetric" },
  { value: "testimonial", label: "Testimonials", def: testimonialsDef, resource: "testimonial" },
];

export default function ContentHomePage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Home sections"
        subtitle="Manage the stats, sectors, values and testimonials displayed on the home page."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <ResourceTabs tabs={tabs} />
      </section>
    </div>
  );
}
