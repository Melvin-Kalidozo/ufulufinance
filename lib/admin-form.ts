import type { FieldDef } from "@/lib/admin-resource";

export type FieldStep = {
  label: string;
  fields: FieldDef[];
};

/** Groups fields by their `step` label, preserving first-appearance order. */
export function fieldSteps(fields: FieldDef[]): FieldStep[] {
  const order: string[] = [];
  for (const field of fields) {
    const label = field.step ?? "";
    if (!order.includes(label)) order.push(label);
  }
  return order.map((label) => ({
    label: label || "Details",
    fields: fields.filter((f) => (f.step ?? "") === label),
  }));
}
