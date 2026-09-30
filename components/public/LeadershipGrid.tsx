"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function LeadershipGrid({ leaders }: { leaders: Leader[] }) {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  if (leaders.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="text-sm font-semibold text-slate-700">Leadership profiles coming soon</p>
        <p className="mt-1 text-xs text-slate-500">Our team details will be published shortly.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((lead) => (
          <button
            type="button"
            key={lead.name}
            onClick={() => setSelectedLeader(lead)}
            className="group bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden text-left cursor-pointer"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              {lead.image ? (
                <>
                  <Image
                    src={lead.image}
                    alt=""
                    fill
                    aria-hidden
                    className="object-cover blur-xl scale-125 opacity-40 pointer-events-none"
                  />
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    fill
                    className="relative z-10 object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#034DA2]/10 to-[#009FE0]/10 text-4xl font-extrabold text-[#034DA2]">
                  {initials(lead.name)}
                </div>
              )}
            </div>

            <div className="p-5 flex flex-1 flex-col">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#034DA2] transition-colors leading-snug tracking-tight">
                {lead.name}
              </h3>
              <p className="text-xs font-bold text-[#034DA2] mt-0.5 leading-snug">
                {lead.role}
              </p>

              {lead.bio && (
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {lead.bio}
                </p>
              )}

              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#034DA2]">
                Read full profile
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={selectedLeader !== null}
        onOpenChange={(o) => {
          if (!o) setSelectedLeader(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selectedLeader && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 text-left">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                    {selectedLeader.image ? (
                      <Image
                        src={selectedLeader.image}
                        alt={selectedLeader.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-lg font-extrabold text-[#034DA2]">
                        {initials(selectedLeader.name)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="text-lg font-extrabold tracking-tight text-slate-900">
                      {selectedLeader.name}
                    </DialogTitle>
                    <DialogDescription className="mt-0.5 text-xs font-bold text-[#034DA2]">
                      {selectedLeader.role}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {selectedLeader.bio || "Profile details coming soon."}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
