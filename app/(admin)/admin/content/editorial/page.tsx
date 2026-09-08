import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import {
  articlesDef,
  eventsDef,
  jobsDef,
  perksDef,
} from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "article", label: "Blog & News", def: articlesDef, resource: "article" },
  { value: "event", label: "Events", def: eventsDef, resource: "event" },
  { value: "job", label: "Job listings", def: jobsDef, resource: "job" },
  { value: "perk", label: "Career perks", def: perksDef, resource: "perk" },
];

export default function ContentEditorialPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Editorial"
        subtitle="Publish and manage articles, news, events and careers content."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <ResourceTabs tabs={tabs} />
      </section>
    </div>
  );
}
