"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "hello@ufulufinance.com" },
  { icon: Phone, label: "Phone", value: "+265 000 000 000" },
  { icon: MapPin, label: "Office", value: "Lilongwe, Malawi" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Sample contact handler — wire to your messaging backend later.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSending(false);
    toast.success("Message received! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="section-eyebrow">Contact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Questions about loans, savings or partnerships? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {CONTACT_DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <detail.icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="font-medium">{detail.value}</p>
                </div>
              </div>
            ))}

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="space-y-2 pt-6">
                <h3 className="font-bold">Visit us</h3>
                <p className="text-sm text-primary-foreground/90">
                  Our team is available Monday to Friday, 8:00am – 5:00pm.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={sending}>
                  <Send className="size-4" />
                  {sending ? "Sending..." : "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
