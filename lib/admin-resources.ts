import type { ResourceDef } from "@/lib/admin-resource";

const CONTENT_STATUS = ["DRAFT", "PUBLISHED"];

export const loanProductsDef: ResourceDef = {
  model: "loanProduct",
  title: "Loan Products",
  singular: "loan product",
  searchFields: ["name", "tagline"],
  folderPrefix: "loan-products",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", required: true, help: "e.g. civil-service-loans" },
    { name: "category", label: "Category key", type: "select", options: ["msme", "agri", "payroll", "group", "civil-service", "business", "other"] },
    { name: "categoryLabel", label: "Category label", type: "text" },
    { name: "badge", label: "Badge", type: "text" },
    { name: "tagline", label: "Tagline", type: "textarea" },
    { name: "image", label: "Image", type: "image", folder: "loan-products" },
    { name: "imageAlt", label: "Image alt text", type: "text" },
    { name: "intro", label: "Short intro", type: "textarea" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "minAmount", label: "Min amount (MWK)", type: "number", min: 0 },
    { name: "maxAmount", label: "Max amount (MWK)", type: "number", min: 0 },
    { name: "minMonths", label: "Min tenure (months)", type: "number", min: 0 },
    { name: "maxMonths", label: "Max tenure (months)", type: "number", min: 0 },
    { name: "interestRateMonthly", label: "Monthly interest rate (%)", type: "number" },
    { name: "processingFeePercent", label: "Processing fee (%)", type: "number" },
    { name: "amountText", label: "Amount display text", type: "text" },
    { name: "tenureText", label: "Tenure display text", type: "text" },
    { name: "disbursementText", label: "Disbursement text", type: "text" },
    { name: "repaymentText", label: "Repayment text", type: "text" },
    { name: "collateralText", label: "Collateral text", type: "text" },
    { name: "keyDetails", label: "Key details (one per line)", type: "json-array" },
    { name: "eligibility", label: "Eligibility (one per line)", type: "json-array" },
    { name: "kycRequirements", label: "KYC requirements (one per line)", type: "json-array" },
    { name: "repaymentTerms", label: "Repayment terms (one per line)", type: "json-array" },
    { name: "isFeatured", label: "Featured on loans page", type: "boolean" },
    { name: "isHomeFeatured", label: "Featured on home page", type: "boolean" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const servicesDef: ResourceDef = {
  model: "service",
  title: "Services",
  singular: "service",
  searchFields: ["title", "tagline"],
  folderPrefix: "services",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", required: true },
    { name: "tagline", label: "Tagline", type: "textarea" },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "image", label: "Image", type: "image", folder: "services" },
    { name: "imageAlt", label: "Image alt text", type: "text" },
    { name: "idealFor", label: "Ideal for", type: "text" },
    { name: "limit", label: "Limit", type: "text" },
    { name: "tenure", label: "Tenure", type: "text" },
    { name: "turnaround", label: "Turnaround", type: "text" },
    { name: "repayment", label: "Repayment", type: "text" },
    { name: "collateral", label: "Collateral", type: "text" },
    { name: "isFeatured", label: "Featured", type: "boolean" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const serviceAudiencesDef: ResourceDef = {
  model: "serviceAudience",
  title: "Service — Who we serve",
  singular: "audience",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "iconKey", label: "Icon", type: "text", help: "Lucide icon name, e.g. Users, Briefcase" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const serviceAdvantagesDef: ResourceDef = {
  model: "serviceAdvantage",
  title: "Service — Advantages",
  singular: "advantage",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const articlesDef: ResourceDef = {
  model: "article",
  title: "Articles",
  singular: "article",
  searchFields: ["title", "category"],
  folderPrefix: "articles",
  defaultOrderBy: { date: "desc" },
  fields: [
    { name: "kind", label: "Type", type: "select", required: true, options: ["BLOG", "NEWS"] },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", required: true },
    { name: "category", label: "Category", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "content", label: "Content (one paragraph per line)", type: "json-array", jsonWrapper: "paragraphs", rows: 8 },
    { name: "keyTakeaways", label: "Key takeaways (one per line)", type: "json-array" },
    { name: "author", label: "Author", type: "text" },
    { name: "authorRole", label: "Author role", type: "text" },
    { name: "authorImage", label: "Author image", type: "image", folder: "articles" },
    { name: "image", label: "Cover image", type: "image", folder: "articles" },
    { name: "imageAlt", label: "Image alt text", type: "text" },
    { name: "date", label: "Publish date", type: "datetime" },
    { name: "readTime", label: "Read time (minutes)", type: "number", min: 1 },
    { name: "isFeatured", label: "Featured", type: "boolean" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
  ],
};

export const eventsDef: ResourceDef = {
  model: "event",
  title: "Events",
  singular: "event",
  searchFields: ["title", "location"],
  folderPrefix: "events",
  defaultOrderBy: { date: "desc" },
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", required: true },
    { name: "date", label: "Date", type: "datetime", required: true },
    { name: "time", label: "Time", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "details", label: "Details (one per line)", type: "json-array" },
    { name: "image", label: "Image", type: "image", folder: "events" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
  ],
};

export const jobsDef: ResourceDef = {
  model: "job",
  title: "Job Listings",
  singular: "job",
  searchFields: ["title", "department", "location"],
  folderPrefix: "jobs",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", required: true },
    { name: "department", label: "Department", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "type", label: "Type", type: "text" },
    { name: "salaryRange", label: "Salary range", type: "text" },
    { name: "experienceLevel", label: "Experience level", type: "text" },
    { name: "deadline", label: "Deadline", type: "datetime" },
    { name: "overview", label: "Overview", type: "textarea" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "responsibilities", label: "Responsibilities (one per line)", type: "json-array" },
    { name: "requirements", label: "Requirements (one per line)", type: "json-array" },
    { name: "benefits", label: "Benefits (one per line)", type: "json-array" },
    { name: "image", label: "Image", type: "image", folder: "jobs" },
    { name: "isFeatured", label: "Featured", type: "boolean" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
  ],
};

export const perksDef: ResourceDef = {
  model: "perk",
  title: "Careers Perks",
  singular: "perk",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "iconKey", label: "Icon", type: "text" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const faqsDef: ResourceDef = {
  model: "faq",
  title: "FAQs",
  singular: "FAQ",
  searchFields: ["question", "category"],
  fields: [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Answer", type: "textarea", required: true, rows: 5 },
    { name: "category", label: "Category", type: "text" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const statsDef: ResourceDef = {
  model: "stat",
  title: "Home — Stats",
  singular: "stat",
  searchFields: ["label"],
  fields: [
    { name: "value", label: "Value", type: "text", required: true },
    { name: "label", label: "Label", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const sectorCardsDef: ResourceDef = {
  model: "sectorCard",
  title: "Home — Who we empower",
  singular: "card",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "iconKey", label: "Icon", type: "text", help: "Lucide icon name" },
    { name: "link", label: "Link (anchor)", type: "text" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const whyChooseDef: ResourceDef = {
  model: "whyChooseItem",
  title: "Home — Why choose us",
  singular: "item",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const impactMetricsDef: ResourceDef = {
  model: "impactMetric",
  title: "Home — Impact metrics",
  singular: "metric",
  searchFields: ["label"],
  fields: [
    { name: "value", label: "Value", type: "text", required: true },
    { name: "label", label: "Label", type: "text", required: true },
    { name: "sub", label: "Sub text", type: "text" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const testimonialsDef: ResourceDef = {
  model: "testimonial",
  title: "Testimonials",
  singular: "testimonial",
  searchFields: ["name"],
  folderPrefix: "testimonials",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "role", label: "Role / enterprise", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "quote", label: "Quote", type: "textarea", required: true },
    { name: "rating", label: "Rating (1-5)", type: "number", min: 1, max: 5 },
    { name: "image", label: "Image", type: "image", folder: "testimonials" },
    { name: "meta", label: "Extra (JSON)", type: "json-object", help: "Optional JSON with location/facility/amount/highlight" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const aboutValuesDef: ResourceDef = {
  model: "aboutValue",
  title: "About — Core values",
  singular: "value",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "iconKey", label: "Icon", type: "text" },
    { name: "badge", label: "Badge", type: "text" },
    { name: "isFeatured", label: "Featured", type: "boolean" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const aboutTimelineDef: ResourceDef = {
  model: "aboutTimeline",
  title: "About — Timeline",
  singular: "milestone",
  searchFields: ["title"],
  fields: [
    { name: "year", label: "Year", type: "text", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const regionalHubsDef: ResourceDef = {
  model: "regionalHub",
  title: "About — Regional hubs",
  singular: "hub",
  searchFields: ["region", "city"],
  fields: [
    { name: "region", label: "Region", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "location", label: "Location", type: "text" },
    { name: "focus", label: "Focus", type: "text" },
    { name: "contacts", label: "Contacts (one per line)", type: "json-array" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const leadersDef: ResourceDef = {
  model: "governanceMember",
  title: "About — Leadership",
  singular: "leader",
  searchFields: ["name", "title"],
  folderPrefix: "governance",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "title", label: "Title", type: "text" },
    { name: "category", label: "Category", type: "select", options: ["board", "executive"] },
    { name: "credentials", label: "Credentials", type: "text" },
    { name: "experience", label: "Experience", type: "text" },
    { name: "expertise", label: "Expertise (one per line)", type: "json-array" },
    { name: "bio", label: "Bio", type: "textarea" },
    { name: "image", label: "Image", type: "image", folder: "governance" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const projectsDef: ResourceDef = {
  model: "project",
  title: "Impact — Projects",
  singular: "project",
  searchFields: ["title"],
  folderPrefix: "impact",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "category", label: "Category", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "metrics", label: "Metrics", type: "text" },
    { name: "image", label: "Image", type: "image", folder: "impact" },
    { name: "imageAlt", label: "Image alt text", type: "text" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const initiativesDef: ResourceDef = {
  model: "communityInitiative",
  title: "Impact — Community initiatives",
  singular: "initiative",
  searchFields: ["title"],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};

export const storiesDef: ResourceDef = {
  model: "successStory",
  title: "Impact — Success stories",
  singular: "story",
  searchFields: ["name", "enterprise"],
  folderPrefix: "impact",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "enterprise", label: "Enterprise", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "quote", label: "Quote", type: "textarea" },
    { name: "image", label: "Image", type: "image", folder: "impact" },
    { name: "statsText", label: "Stats text", type: "text" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ],
};


const DEFS: Record<string, ResourceDef> = {
  loanProduct: loanProductsDef,
  service: servicesDef,
  serviceAudience: serviceAudiencesDef,
  serviceAdvantage: serviceAdvantagesDef,
  article: articlesDef,
  event: eventsDef,
  job: jobsDef,
  perk: perksDef,
  faq: faqsDef,
  stat: statsDef,
  sectorCard: sectorCardsDef,
  whyChooseItem: whyChooseDef,
  impactMetric: impactMetricsDef,
  testimonial: testimonialsDef,
  aboutValue: aboutValuesDef,
  aboutTimeline: aboutTimelineDef,
  regionalHub: regionalHubsDef,
  governanceMember: leadersDef,
  project: projectsDef,
  communityInitiative: initiativesDef,
  successStory: storiesDef,
};

export function getDef(resource: string): ResourceDef {
  return DEFS[resource];
}
export function isValidResource(resource: string): boolean {
  return resource in DEFS;
}
