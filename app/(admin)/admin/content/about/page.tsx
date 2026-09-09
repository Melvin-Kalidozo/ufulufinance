import { BrandPageBanner } from "@/components/admin/BrandPageBanner";
import { ResourceTabs, type ResourceTab } from "@/components/admin/ResourceTabs";
import {
  aboutValuesDef,
  aboutTimelineDef,
  regionalHubsDef,
  leadersDef,
} from "@/lib/admin-resources";

const tabs: ResourceTab[] = [
  { value: "aboutValue", label: "Core values", def: aboutValuesDef, resource: "aboutValue" },
  { value: "aboutTimeline", label: "Timeline", def: aboutTimelineDef, resource: "aboutTimeline" },
  { value: "regionalHub", label: "Regional hubs", def: regionalHubsDef, resource: "regionalHub" },
  { value: "governanceMember", label: "Leadership", def: leadersDef, resource: "governanceMember" },
];

export default function ContentAboutPage() {
  return (
    <div className="space-y-6">
      <BrandPageBanner
        eyebrow="Content"
        title="About page"
        subtitle="Manage core values, institutional timeline, regional hubs and the leadership team."
      />
      
        <ResourceTabs tabs={tabs} />
      
    </div>
  );
}
