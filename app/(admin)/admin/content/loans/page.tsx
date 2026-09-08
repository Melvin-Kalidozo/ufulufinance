import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import { loanProductsDef } from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "loanProduct", label: "Loan products", def: loanProductsDef, resource: "loanProduct" },
];

export default function ContentLoansPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Loan Products"
        subtitle="Manage loan products shown on the Loans and Home pages and used by the enquiry picker."
      />
      
        <ResourceTabs tabs={tabs} />
      
    </div>
  );
}
