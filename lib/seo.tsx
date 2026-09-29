import {
  SITE_CONTACT,
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

type JsonLdData = Record<string, unknown>;

/** Render a JSON-LD structured-data script tag. */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; no user-controlled values are interpolated raw.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon-512.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/og-image.png"),
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    foundingDate: SITE_CONTACT.foundingYear,
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONTACT.streetAddress,
      addressLocality: SITE_CONTACT.addressLocality,
      addressRegion: SITE_CONTACT.addressRegion,
      addressCountry: SITE_CONTACT.addressCountry,
    },
    areaServed: {
      "@type": "Country",
      name: "Malawi",
    },
  };
}

export function websiteJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function articleJsonLd(input: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? [absoluteUrl(input.image)] : [absoluteUrl("/og-image.png")],
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.author
      ? { "@type": "Person", name: input.author }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export function jobPostingJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string;
  location?: string;
  salaryRange?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    validThrough: input.validThrough,
    employmentType: input.employmentType || "FULL_TIME",
    hiringOrganization: { "@id": `${SITE_URL}/#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: input.location || SITE_CONTACT.addressLocality,
        addressCountry: SITE_CONTACT.addressCountry,
      },
    },
    ...(input.salaryRange
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "MWK",
            value: { "@type": "QuantitativeValue", description: input.salaryRange },
          },
        }
      : {}),
    url: input.url,
  };
}

export function eventJsonLd(input: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  startDate?: string;
  location?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.title,
    description: input.description,
    startDate: input.startDate,
    image: input.image ? [absoluteUrl(input.image)] : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: input.location || SITE_CONTACT.addressLocality,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.location || SITE_CONTACT.addressLocality,
        addressCountry: SITE_CONTACT.addressCountry,
      },
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
    url: input.url,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
