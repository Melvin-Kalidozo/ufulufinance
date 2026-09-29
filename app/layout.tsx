import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_OG_ALT, SITE_URL } from "@/lib/site";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Ufulu Finance | Transparent Microfinance in Malawi",
    template: "%s | Ufulu Finance",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Ufulu Finance Limited", url: SITE_URL }],
  creator: "Ufulu Finance Limited",
  publisher: "Ufulu Finance Limited",
  category: "Finance",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_MW",
    url: SITE_URL,
    title: "Ufulu Finance | Transparent Microfinance in Malawi",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ufulu Finance | Transparent Microfinance in Malawi",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#034DA2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} font-sans antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
