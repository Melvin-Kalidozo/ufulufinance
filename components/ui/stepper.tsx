"use client";

import { cn } from "@/lib/utils";

export type StepperStep = {
  label: string;
};

export function Stepper({
  steps,
  current,
  onSelect,
  isSelectable,
  className,
}: {
  steps: StepperStep[];
  /** 0-based index of the active step */
  current: number;
  onSelect?: (index: number) => void;
  isSelectable?: (index: number) => boolean;
  className?: string;
}) {
  if (steps.length <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, idx) => {
        const isActive = current === idx;
        const isCompleted = current > idx;
        const selectable = !onSelect || !isSelectable || isSelectable(idx);

        return (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              disabled={!onSelect || !selectable}
              onClick={() => onSelect?.(idx)}
              className={cn(
                "group flex items-center gap-2",
                onSelect && selectable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-[11px] font-bold transition-all",
                  isCompleted
                    ? "bg-[#034DA2] text-[#38bdf8]"
                    : isActive
                    ? "bg-[#034DA2] font-extrabold text-white shadow-xs ring-3 ring-[#034DA2]/20"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold whitespace-nowrap",
                  isActive
                    ? "font-bold text-[#034DA2]"
                    : isCompleted
                    ? "text-slate-800"
                    : "text-slate-600"
                )}
              >
                {step.label}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-0.5 flex-1 rounded-full transition-colors",
                  current > idx ? "bg-[#034DA2]" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
