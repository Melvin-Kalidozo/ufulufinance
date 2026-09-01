"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const LOAN_OPTIONS = {
  personal: { label: "Personal", annualRate: 0.08, months: 12 },
  business: { label: "Business", annualRate: 0.06, months: 24 },
  group: { label: "Group", annualRate: 0.05, months: 12 },
} as const;

type LoanType = keyof typeof LOAN_OPTIONS;

function formatMwK(value: number) {
  return `MWK ${Math.round(value).toLocaleString("en-US")}`;
}

function monthlyPayment(amount: number, annualRate: number, months: number) {
  const r = annualRate / 12;
  if (r === 0) return amount / months;
  return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function LoanEstimateForm() {
  const [loanType, setLoanType] = useState<LoanType>("personal");
  const [amount, setAmount] = useState("");

  const amountValue = Math.max(0, Number(amount) || 0);
  const { annualRate, months } = LOAN_OPTIONS[loanType];
  const estimate = amountValue > 0 ? monthlyPayment(amountValue, annualRate, months) : 0;

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Chisomo Banda"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+265 99 123 4567"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="loanType">Loan type</Label>
          <Select value={loanType} onValueChange={(v) => setLoanType(v as LoanType)}>
            <SelectTrigger id="loanType">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LOAN_OPTIONS).map(([key, opt]) => (
                <SelectItem key={key} value={key}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="amount">Amount (MWK)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            inputMode="numeric"
            placeholder="500,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mono tabular-nums"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md border bg-muted/40 px-4 py-3 text-sm">
        <span className="text-muted-foreground">Estimated monthly payment</span>
        <span className="font-mono font-bold tabular-nums">
          {estimate > 0 ? formatMwK(estimate) : "MWK —"}
        </span>
      </div>

      <Button type="submit" className="w-full">
        Apply now
        <ArrowRight className="size-4" />
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        No fees to apply. Response within 24 hours.
      </p>
    </form>
  );
}
