import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import { faqsDef } from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "faq", label: "FAQs", def: faqsDef, resource: "faq" },
];

export default function ContentFaqsPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="FAQs"
        subtitle="Manage frequently asked questions shown on the FAQ and About pages."
      />
      <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
        <ResourceTabs tabs={tabs} />
      </section>
    </div>
  );
}
