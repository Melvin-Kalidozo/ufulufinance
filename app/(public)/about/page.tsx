import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, Eye, HeartHandshake, Users } from "lucide-react";

const VALUES = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear terms, honest pricing and no hidden fees. You always know what you're paying for.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    description:
      "We believe financial inclusion lifts everyone. Our group models help whole communities grow.",
  },
  {
    icon: Users,
    title: "People first",
    description:
      "Every decision starts with the people we serve — individuals, families and small businesses.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="section-eyebrow">About us</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight">
            Empowering communities through access to finance
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Ufulu Finance is a microfinance institution built on the belief that
            everyone deserves fair access to financial services.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex items-center justify-center rounded-lg border bg-card p-10">
            <div className="flex size-16 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Landmark className="size-8" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Our story</h2>
            <p className="text-muted-foreground">
              Ufulu Finance started with a simple observation: too many people
              with great ideas and steady incomes were being left out of the
              financial system. We set out to close that gap with products
              designed for real life.
            </p>
            <p className="text-muted-foreground">
              Today we offer personal, business and group loans plus savings
              solutions — all built on trust, transparency and a deep
              understanding of the communities we serve.
            </p>
            <Button asChild>
              <Link href="/loans">See our loan products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-10 text-2xl font-bold tracking-tight">What we stand for</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title} className="card-lift">
                <CardContent className="space-y-3 pt-6">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <value.icon className="size-5" />
                  </div>
                  <h3 className="font-bold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
