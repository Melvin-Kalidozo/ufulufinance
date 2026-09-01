import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet, Target, HandCoins, Check } from "lucide-react";

const PRODUCTS = [
  {
    icon: Wallet,
    name: "Personal Loan",
    description:
      "Flexible financing for personal needs — school fees, home improvements, emergencies and more.",
    amount: "Up to MWK 2,000,000",
    rate: "From 8% per annum",
    term: "3 – 24 months",
    features: ["No collateral required", "Fast approval", "Flexible repayment"],
  },
  {
    icon: Target,
    name: "Business Loan",
    description:
      "Working capital and asset financing to help your business grow and scale.",
    amount: "Up to MWK 10,000,000",
    rate: "From 6% per annum",
    term: "6 – 36 months",
    features: ["Business growth capital", "Seasonal repayment options", "Dedicated support"],
  },
  {
    icon: HandCoins,
    name: "Group Loan",
    description:
      "Community group lending where members support each other and grow together.",
    amount: "Per member",
    rate: "From 5% per annum",
    term: "Flexible",
    features: ["Group liability", "Social guarantee", "Build group credit"],
  },
];

export default function LoansPage() {
  return (
    <div>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="section-eyebrow">Loan products</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight">
            Loans designed around your goals
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Transparent rates, clear terms and repayment plans that fit your
            income cycle.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <Card key={product.name} className="card-lift">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <product.icon className="size-5" />
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground">{product.description}</p>

                <div className="space-y-2 rounded-md border p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold">{product.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-semibold">{product.rate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Term</span>
                    <span className="font-semibold">{product.term}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full" asChild>
                  <Link href="/signup">
                    Apply for this loan
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
