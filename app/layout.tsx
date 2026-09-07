import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ufulu Finance",
    template: "%s | Ufulu Finance",
  },
  description:
    "Ufulu Finance — trusted microfinance solutions. Loans, savings and financial empowerment for every community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} font-sans antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
