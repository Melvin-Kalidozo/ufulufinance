"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnquiriesManager } from "@/components/admin/EnquiriesManager";
import { JobApplicationsManager } from "@/components/admin/JobApplicationsManager";

const TABS = [
  { value: "loan", label: "Loan Applicants" },
  { value: "company", label: "Company Enquiries" },
  { value: "applications", label: "Job Applications" },
];

export function EnquiriesTabs() {
  const [active, setActive] = useState("loan");
  return (
    <div className="space-y-4">
      <Tabs value={active} onValueChange={setActive}>
        <div className="overflow-x-auto pb-1">
          <TabsList className="h-10 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="whitespace-nowrap rounded-lg px-3 text-xs font-bold text-slate-500 data-active:bg-[#034DA2] data-active:text-white data-active:shadow-sm hover:text-[#034DA2]"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
      {active === "loan" && <EnquiriesManager kind="loan" />}
      {active === "company" && <EnquiriesManager kind="company" />}
      {active === "applications" && <JobApplicationsManager />}
    </div>
  );
}
