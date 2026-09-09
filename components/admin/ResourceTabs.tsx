"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceManager } from "@/components/admin/ResourceManager";
import type { ResourceDef } from "@/lib/admin-resource";

export type ResourceTab = {
  value: string;
  label: string;
  def: ResourceDef;
  resource: string;
};

export function ResourceTabs({ tabs }: { tabs: ResourceTab[] }) {
  const [active, setActive] = useState(tabs[0]?.value);
  const current = tabs.find((t) => t.value === active) ?? tabs[0];

  if (!current) return null;

  return (
    <div className="space-y-4">
      <Tabs value={current.value} onValueChange={setActive}>
        <div className="overflow-x-auto pb-1">
          <TabsList className="h-10 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="whitespace-nowrap rounded-lg px-3 text-xs font-bold text-slate-500 data-active:bg-[#034DA2] data-active:text-white data-active:shadow-sm hover:text-[#034DA2]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {tabs.map((tab) =>
        tab.value === current.value ? (
          <ResourceManager key={tab.value} def={tab.def} apiBase={`/api/admin/content/${tab.resource}`} />
        ) : null
      )}
    </div>
  );
}
