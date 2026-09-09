import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import { projectsDef, initiativesDef, storiesDef } from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "project", label: "Projects", def: projectsDef, resource: "project" },
  { value: "communityInitiative", label: "Initiatives", def: initiativesDef, resource: "communityInitiative" },
  { value: "successStory", label: "Success stories", def: storiesDef, resource: "successStory" },
];

export default function ContentImpactPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="Impact & Portfolio"
        subtitle="Manage projects, community initiatives and client success stories."
      />
      
        <ResourceTabs tabs={tabs} />
      
    </div>
  );
}
