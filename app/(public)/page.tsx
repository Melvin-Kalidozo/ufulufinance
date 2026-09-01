import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthBackground } from "@/components/auth/AuthBackground";
import { LoanEstimateForm } from "@/components/public/LoanEstimateForm";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  HandCoins,
  PiggyBank,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";

const FEATURES = [
  {
    icon: HandCoins,
    title: "Quick loans",
    description:
      "Access small business and personal loans with simple application and fast approval.",
  },
  {
    icon: PiggyBank,
    title: "Flexible savings",
    description:
      "Save with confidence using accounts designed around your goals and income cycles.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & trusted",
    description:
      "Your money and data are protected with industry-standard security practices.",
  },
  {
    icon: Wallet,
    title: "Group lending",
    description:
      "Community group borrowing that spreads risk and grows together.",
  },
];

const LOAN_PRODUCTS = [
  {
    name: "Personal Loan",
    amount: "up to MWK 2,000,000",
    rate: "From 8%",
    term: "3 – 24 months",
    icon: Wallet,
  },
  {
    name: "Business Loan",
    amount: "up to MWK 10,000,000",
    rate: "From 6%",
    term: "6 – 36 months",
    icon: Target,
  },
  {
    name: "Group Loan",
    amount: "per member",
    rate: "From 5%",
    term: "Flexible",
    icon: HandCoins,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Create an account",
    description: "Sign up and verify your email to get started.",
  },
  {
    number: "02",
    title: "Apply for a loan",
    description: "Choose the right product and submit your application.",
  },
  {
    number: "03",
    title: "Get funded",
    description: "Receive approval and access funds quickly.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <AuthBackground grid={false} />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="space-y-6">
            <p className="section-eyebrow">Microfinance for every community</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Financial freedom, <span className="text-primary">one step</span>{" "}
              at a time
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Ufulu Finance provides accessible loans, savings and group lending
              solutions that help individuals and small businesses grow.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/loans">Explore loans</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div>
                <p className="font-mono text-2xl font-bold tabular-nums">
                  12,000+
                </p>
                <p className="text-xs text-muted-foreground">Members served</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-mono text-2xl font-bold tabular-nums">
                  MWK 2.4B
                </p>
                <p className="text-xs text-muted-foreground">Disbursed</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-mono text-2xl font-bold tabular-nums">98%</p>
                <p className="text-xs text-muted-foreground">Approval rate</p>
              </div>
            </div>
          </div>

          <Card className="relative border shadow-none">
            <div className="h-1 w-full bg-primary" />
            <CardHeader>
              <CardTitle className="text-lg">
                Get a quick loan estimate
              </CardTitle>
              <CardDescription>
                Tell us a bit about what you need no commitment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoanEstimateForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="section-eyebrow">Why Ufulu Finance</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Built around your community
          </h2>
          <p className="mt-3 text-muted-foreground">
            Simple products, transparent terms and support you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="card-lift">
              <CardContent className="space-y-3 pt-6">
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Loan products */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="section-eyebrow">Loan products</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Financing for every goal
            </h2>
            <p className="mt-3 text-muted-foreground">
              Transparent rates and flexible terms tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {LOAN_PRODUCTS.map((product) => (
              <Card key={product.name} className="card-lift">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <product.icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold">{product.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-semibold">{product.rate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Term</span>
                    <span className="font-semibold">{product.term}</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Request this loan</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="section-eyebrow">How it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Three simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="relative rounded-md border p-6">
              <span className="text-4xl font-bold text-primary/20">
                {step.number}
              </span>
              <h3 className="mt-3 font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {[
            { icon: Banknote, label: "Licensed microfinance" },
            { icon: BadgePercent, label: "Transparent rates" },
            { icon: ShieldCheck, label: "Secure platform" },
            { icon: HandCoins, label: "Community focused" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="size-5 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-lg bg-primary px-6 py-16 text-center text-primary-foreground">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
            Ready to take the next step?
          </h2>
          <p className="max-w-xl text-primary-foreground/90">
            Create your account today and start your journey to financial
            freedom.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Create an account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
