/**
 * Single source of truth for site-wide SEO/metadata values.
 *
 * `SITE_URL` is resolved from `NEXT_PUBLIC_SITE_URL` so the sitemap, robots,
 * canonical links and Open Graph images always point at the deployed origin.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ufulufinance.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Ufulu Finance";

export const SITE_LEGAL_NAME = "Ufulu Finance Limited";

export const SITE_TAGLINE = "Financial Freedom in Reach";

export const SITE_DESCRIPTION =
  "Ufulu Finance is a Malawi microfinance institution offering transparent civil service loans, private sector payroll loans, village banking facilities, and MSME business lending. Fast mobile disbursement and zero hidden fees.";

export const SITE_KEYWORDS = [
  "microfinance Malawi",
  "loans in Malawi",
  "civil service loans Malawi",
  "civil servant loan",
  "payroll loans Malawi",
  "private sector payroll loan",
  "village banking Malawi",
  "community savings groups",
  "MSME loans Malawi",
  "small business loans Malawi",
  "agriculture loans Malawi",
  "loan financing Lilongwe",
  "loans Blantyre",
  "loans Mzuzu",
  "Ufulu Finance",
  "financial inclusion Malawi",
  "mobile money loan disbursement",
];

export const SITE_OG_IMAGE = "/og-image.png";
export const SITE_OG_SQUARE = "/og-square.png";
export const SITE_OG_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const SITE_LOCALE = "en_MW";

export const SITE_CONTACT = {
  email: "support@ufulufinance.com",
  loansEmail: "loans@ufulufinance.com",
  phone: "+265 99 123 4567",
  addressLocality: "Lilongwe",
  addressRegion: "Lilongwe",
  addressCountry: "MW",
  streetAddress: "City Centre, Area 3",
  foundingYear: "2016",
};

/** Build an absolute URL from a site-relative path (or pass through absolutes). */
export const absoluteUrl = (path = "/"): string => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
