import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import {
  productsDef,
  productAudiencesDef,
  productAdvantagesDef,
} from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "product", label: "Products", def: productsDef, resource: "product" },
  { value: "productAudience", label: "Who we serve", def: productAudiencesDef, resource: "productAudience" },
  { value: "productAdvantage", label: "Advantages", def: productAdvantagesDef, resource: "productAdvantage" },
];

export default function ContentProductsPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Products"
        subtitle="Manage the loan products shown on the Products and Home pages, including who we serve and our advantages."
      />
      
        <ResourceTabs tabs={tabs} />
      
    </div>
  );
}
