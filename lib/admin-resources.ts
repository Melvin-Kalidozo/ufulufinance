import type { ResourceDef } from "@/lib/admin-resource";

const CONTENT_STATUS = ["DRAFT", "PUBLISHED"];

export const productsDef: ResourceDef = {
  model: "product",
  title: "Products",
  singular: "product",
  searchFields: ["title", "tagline"],
  folderPrefix: "products",
  slugFrom: "title",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, step: "Basics" },
    { name: "tagline", label: "Tagline", type: "textarea", step: "Basics" },
    { name: "description", label: "Description", type: "textarea", required: true, step: "Basics" },
    { name: "image", label: "Image", type: "image", folder: "products", step: "Media" },
    { name: "imageAlt", label: "Image alt text", type: "text", step: "Media" },
    { name: "idealFor", label: "Ideal for", type: "text", step: "Product details" },
    { name: "limit", label: "Limit", type: "text", step: "Product details" },
    { name: "tenure", label: "Tenure", type: "text", step: "Product details" },
    { name: "turnaround", label: "Turnaround", type: "text", step: "Product details" },
    { name: "repayment", label: "Repayment", type: "text", step: "Product details" },
    { name: "collateral", label: "Collateral", type: "text", step: "Product details" },
    { name: "isFeatured", label: "Featured on home page", type: "boolean", step: "Publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Publishing" },
    { name: "sortOrder", label: "Sort order", type: "number", step: "Publishing" },
  ],
};

export const productAudiencesDef: ResourceDef = {
  model: "productAudience",
  title: "Products — Who we serve",
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

export const productAdvantagesDef: ResourceDef = {
  model: "productAdvantage",
  title: "Products — Advantages",
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
  slugFrom: "title",
  fields: [
    { name: "kind", label: "Type", type: "select", required: true, options: ["BLOG", "NEWS"], step: "Basics" },
    { name: "title", label: "Title", type: "text", required: true, step: "Basics" },
    { name: "category", label: "Category", type: "text", step: "Basics" },
    { name: "excerpt", label: "Excerpt", type: "textarea", step: "Basics" },
    { name: "content", label: "Content (one paragraph per line)", type: "json-array", jsonWrapper: "paragraphs", rows: 8, step: "Content" },
    { name: "keyTakeaways", label: "Key takeaways (one per line)", type: "json-array", step: "Content" },
    { name: "author", label: "Author", type: "text", step: "Author" },
    { name: "authorRole", label: "Author role", type: "text", step: "Author" },
    { name: "authorImage", label: "Author image", type: "image", folder: "articles", step: "Author" },
    { name: "image", label: "Cover image", type: "image", folder: "articles", step: "Media & meta" },
    { name: "imageAlt", label: "Image alt text", type: "text", step: "Media & meta" },
    { name: "embedUrl", label: "Video embed (YouTube link, Facebook link, or iframe code)", type: "textarea", rows: 3, step: "Media & meta", help: "Paste a YouTube/Facebook share link or the full <iframe> embed code. When set, the video replaces the cover image." },
    { name: "date", label: "Publish date", type: "datetime", step: "Media & meta" },
    { name: "readTime", label: "Read time (minutes)", type: "number", min: 1, step: "Media & meta" },
    { name: "isFeatured", label: "Featured", type: "boolean", step: "Publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Publishing" },
  ],
};

export const eventsDef: ResourceDef = {
  model: "event",
  title: "Events",
  singular: "event",
  searchFields: ["title", "location"],
  folderPrefix: "events",
  defaultOrderBy: { date: "desc" },
  slugFrom: "title",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, step: "Basics" },
    { name: "date", label: "Date", type: "datetime", required: true, step: "Schedule" },
    { name: "time", label: "Time", type: "text", step: "Schedule" },
    { name: "location", label: "Location", type: "text", step: "Schedule" },
    { name: "description", label: "Description", type: "textarea", step: "Details" },
    { name: "details", label: "Details (one per line)", type: "json-array", step: "Details" },
    { name: "image", label: "Image", type: "image", folder: "events", step: "Publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Publishing" },
  ],
};

export const jobsDef: ResourceDef = {
  model: "job",
  title: "Job Listings",
  singular: "job",
  searchFields: ["title", "department", "location"],
  folderPrefix: "jobs",
  slugFrom: "title",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, step: "Basics" },
    { name: "department", label: "Department", type: "text", step: "Basics" },
    { name: "location", label: "Location", type: "text", step: "Basics" },
    { name: "type", label: "Type", type: "text", step: "Basics" },
    { name: "salaryRange", label: "Salary range", type: "text", step: "Compensation & timeline" },
    { name: "experienceLevel", label: "Experience level", type: "text", step: "Compensation & timeline" },
    { name: "deadline", label: "Deadline", type: "datetime", step: "Compensation & timeline" },
    { name: "overview", label: "Overview", type: "textarea", step: "Description" },
    { name: "description", label: "Description", type: "textarea", step: "Description" },
    { name: "responsibilities", label: "Responsibilities (one per line)", type: "json-array", step: "Requirements" },
    { name: "requirements", label: "Requirements (one per line)", type: "json-array", step: "Requirements" },
    { name: "benefits", label: "Benefits (one per line)", type: "json-array", step: "Requirements" },
    { name: "image", label: "Image", type: "image", folder: "jobs", step: "Media & publishing" },
    { name: "isFeatured", label: "Featured", type: "boolean", step: "Media & publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Media & publishing" },
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
    { name: "name", label: "Name", type: "text", required: true, step: "Person" },
    { name: "role", label: "Role / enterprise", type: "text", step: "Person" },
    { name: "category", label: "Category", type: "text", step: "Person" },
    { name: "quote", label: "Quote", type: "textarea", required: true, step: "Testimonial" },
    { name: "rating", label: "Rating (1-5)", type: "number", min: 1, max: 5, step: "Testimonial" },
    { name: "image", label: "Image", type: "image", folder: "testimonials", step: "Media & publishing" },
    { name: "meta", label: "Extra (JSON)", type: "json-object", help: "Optional JSON with location/facility/amount/highlight", step: "Media & publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Media & publishing" },
    { name: "sortOrder", label: "Sort order", type: "number", step: "Media & publishing" },
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
    { name: "name", label: "Name", type: "text", required: true, step: "Person" },
    { name: "title", label: "Position", type: "text", required: true, step: "Person" },
    { name: "bio", label: "Bio", type: "textarea", rows: 10, step: "Profile" },
    { name: "image", label: "Photo", type: "image", folder: "governance", step: "Media & publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Media & publishing" },
    { name: "sortOrder", label: "Sort order", type: "number", step: "Media & publishing" },
  ],
};

export const projectsDef: ResourceDef = {
  model: "project",
  title: "Impact — Projects",
  singular: "project",
  searchFields: ["title"],
  folderPrefix: "impact",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, step: "Basics" },
    { name: "category", label: "Category", type: "text", step: "Basics" },
    { name: "location", label: "Location", type: "text", step: "Basics" },
    { name: "description", label: "Description", type: "textarea", step: "Details" },
    { name: "metrics", label: "Metrics", type: "text", step: "Details" },
    { name: "image", label: "Image", type: "image", folder: "impact", step: "Media & publishing" },
    { name: "imageAlt", label: "Image alt text", type: "text", step: "Media & publishing" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Media & publishing" },
    { name: "sortOrder", label: "Sort order", type: "number", step: "Media & publishing" },
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
    { name: "name", label: "Name", type: "text", required: true, step: "Person" },
    { name: "enterprise", label: "Enterprise", type: "text", step: "Person" },
    { name: "location", label: "Location", type: "text", step: "Person" },
    { name: "quote", label: "Quote", type: "textarea", step: "Story" },
    { name: "image", label: "Image", type: "image", folder: "impact", step: "Story" },
    { name: "statsText", label: "Stats text", type: "text", step: "Story" },
    { name: "status", label: "Status", type: "select", options: CONTENT_STATUS, step: "Publishing" },
    { name: "sortOrder", label: "Sort order", type: "number", step: "Publishing" },
  ],
};


const DEFS: Record<string, ResourceDef> = {
  product: productsDef,
  productAudience: productAudiencesDef,
  productAdvantage: productAdvantagesDef,
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
