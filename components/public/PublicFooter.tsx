import Link from "next/link";
import { Landmark } from "lucide-react";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/loans", label: "Loan products" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Accounts",
    links: [
      { href: "/signin", label: "Sign in" },
      { href: "/signup", label: "Create account" },
      { href: "/admin", label: "Admin portal" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Landmark className="size-4" />
            </div>
            <span className="text-base font-bold">Ufulu Finance</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Trusted microfinance solutions. Loans, savings and financial
            empowerment for every community.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t py-4">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          &copy; {new Date().getFullYear()} Ufulu Finance Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
