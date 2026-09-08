/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../lib/prisma";
import {
  ARTICLES,
  EVENTS,
  OPEN_ROLES,
  PERKS,
  homeStats,
  homeSectors,
  homeWhyChoose,
  homeImpactMetrics,
  testimonials,
  services,
  serviceAudiences,
  serviceAdvantages,
  loanProducts,
  faqs,
  aboutValues,
  aboutTimeline,
  regionalHubs,
  leaders,
  projects,
  communityInitiatives,
  successStories,
  websiteSettings,
} from "./cms-static-data";
import { legalSeedPages } from "./legal-seed-data";

type Delegate = { findFirst: any; update: any; create: any };

async function upsertBy(delegate: Delegate, where: any, data: any) {
  const existing = await delegate.findFirst({ where });
  if (existing) {
    return delegate.update({ where: { id: existing.id }, data });
  }
  return delegate.create({ data });
}

async function seedWebsiteSettings() {
  await upsertBy(
    prisma.websiteSetting as any,
    { id: 1 },
    {
      id: 1,
      siteName: websiteSettings.siteName,
      tagline: websiteSettings.tagline,
      aboutLine: websiteSettings.aboutLine,
      footerAbout: websiteSettings.footerAbout,
      primaryEmail: websiteSettings.primaryEmail,
      supportEmail: websiteSettings.supportEmail,
      loansEmail: websiteSettings.loansEmail,
      phone: websiteSettings.phone,
      addressLine1: websiteSettings.offices[0]?.address ?? "",
      addressLine2: websiteSettings.offices[0]?.city ?? "",
      officeHours: websiteSettings.officeHours,
      offices: websiteSettings.offices,
      socialLinks: websiteSettings.socialLinks,
    }
  );
}

async function seedHomeContent() {
  for (const [i, s] of homeStats.entries()) {
    await upsertBy(
      prisma.stat as any,
      { value: s.value, label: s.label },
      { ...s, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, s] of homeSectors.entries()) {
    await upsertBy(
      prisma.sectorCard as any,
      { title: s.title },
      { ...s, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, w] of homeWhyChoose.entries()) {
    await upsertBy(
      prisma.whyChooseItem as any,
      { title: w.title },
      { ...w, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, m] of homeImpactMetrics.entries()) {
    await upsertBy(
      prisma.impactMetric as any,
      { value: m.value, label: m.label },
      { ...m, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, t] of testimonials.entries()) {
    await upsertBy(
      prisma.testimonial as any,
      { name: t.name },
      { ...t, sortOrder: i, status: "PUBLISHED" }
    );
  }
}

async function seedServices() {
  for (const [i, s] of services.entries()) {
    await upsertBy(
      prisma.service as any,
      { slug: s.slug },
        {
        title: s.title,
        slug: s.slug,
        tagline: s.tagline ?? null,
        description: s.description,
        image: s.image ?? null,
        idealFor: s.idealFor ?? null,
        limit: s.limit ?? null,
        tenure: s.tenure ?? null,
        turnaround: s.turnaround ?? null,
        repayment: s.repayment ?? null,
        collateral: s.collateral ?? null,
        isFeatured: s.isFeatured ?? false,
        status: "PUBLISHED",
        sortOrder: i,
      }
    );
  }
  for (const [i, a] of serviceAudiences.entries()) {
    await upsertBy(
      prisma.serviceAudience as any,
      { title: a.title },
      { ...a, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, a] of serviceAdvantages.entries()) {
    await upsertBy(
      prisma.serviceAdvantage as any,
      { title: a.title },
      { title: a.title, description: a.description, sortOrder: i, status: "PUBLISHED" }
    );
  }
}

async function seedLoanProducts() {
  for (const [i, p] of loanProducts.entries()) {
    const data: any = {
      slug: p.slug,
      name: p.name,
      category: p.category ?? null,
      categoryLabel: p.categoryLabel ?? null,
      badge: p.badge ?? null,
      tagline: p.tagline ?? null,
      intro: p.intro ?? null,
      description: p.description ?? null,
      image: p.image ?? null,
      minAmount: p.minAmount ?? null,
      maxAmount: p.maxAmount ?? null,
      minMonths: p.minMonths ?? null,
      maxMonths: p.maxMonths ?? null,
      interestRateMonthly: p.interestRateMonthly ?? null,
      processingFeePercent: p.processingFeePercent ?? null,
      amountText: p.amountText ?? null,
      tenureText: p.tenureText ?? null,
      disbursementText: p.disbursementText ?? null,
      repaymentText: p.repaymentText ?? null,
      collateralText: p.collateralText ?? null,
      keyDetails: p.keyDetails ?? null,
      eligibility: p.eligibility ?? null,
      kycRequirements: p.kycRequirements ?? null,
      repaymentTerms: p.repaymentTerms ?? null,
      isFeatured: p.isFeatured ?? false,
      isHomeFeatured: p.isHomeFeatured ?? false,
      status: "PUBLISHED",
      sortOrder: i,
    };
    await upsertBy(prisma.loanProduct as any, { slug: p.slug }, data);
  }
}

async function seedFaqs() {
  for (const [i, f] of faqs.entries()) {
    await upsertBy(
      prisma.faq as any,
      { question: f.question },
      { ...f, sortOrder: i, status: "PUBLISHED" }
    );
  }
}

async function seedArticlesAndEvents() {
  for (const a of ARTICLES) {
    const content: any = { paragraphs: a.content };
    if (a.quote) content.quote = a.quote;
    const readTimeMatch = a.readTime.match(/\d+/);
    await upsertBy(
      prisma.article as any,
      { slug: a.id },
      {
        kind: a.type === "news" ? "NEWS" : "BLOG",
        slug: a.id,
        title: a.title,
        category: a.category,
        excerpt: a.excerpt,
        content,
        keyTakeaways: a.keyTakeaways ?? null,
        author: a.author,
        authorRole: a.authorRole ?? null,
        authorImage: a.authorImage ?? null,
        image: a.image,
        date: new Date(a.date),
        readTime: readTimeMatch ? Number(readTimeMatch[0]) : null,
        isFeatured: a.isFeatured ?? false,
        status: "PUBLISHED",
      }
    );
  }
  for (const e of EVENTS) {
    await upsertBy(
      prisma.event as any,
      { slug: e.id },
      {
        slug: e.id,
        title: e.title,
        date: new Date(e.date),
        time: e.time,
        location: e.location,
        description: e.description,
        details: e.details,
        image: e.image,
        status: "PUBLISHED",
      }
    );
  }
}

async function seedJobs() {
  for (const [i, j] of OPEN_ROLES.entries()) {
    await upsertBy(
      prisma.job as any,
      { slug: j.id },
      {
        slug: j.id,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type,
        salaryRange: j.salaryRange ?? null,
        experienceLevel: j.experienceLevel ?? null,
        deadline: j.deadline ? new Date(j.deadline) : null,
        description: j.description,
        overview: j.overview,
        responsibilities: j.responsibilities,
        requirements: j.requirements,
        benefits: j.benefits ?? null,
        image: j.image,
        isFeatured: j.isFeatured ?? false,
        status: "PUBLISHED",
      }
    );
  }
  for (const [i, p] of PERKS.entries()) {
    await upsertBy(
      prisma.perk as any,
      { title: p.title },
      { title: p.title, description: (p as any).desc ?? p.title, sortOrder: i, status: "PUBLISHED" }
    );
  }
}

async function seedAbout() {
  for (const [i, v] of aboutValues.entries()) {
    await upsertBy(
      prisma.aboutValue as any,
      { title: v.title },
      { ...v, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, t] of aboutTimeline.entries()) {
    await upsertBy(
      prisma.aboutTimeline as any,
      { year: t.year, title: t.title },
      { ...t, sortOrder: i }
    );
  }
  for (const [i, h] of regionalHubs.entries()) {
    await upsertBy(
      prisma.regionalHub as any,
      { city: h.city },
      { ...h, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, l] of leaders.entries()) {
    await upsertBy(
      prisma.governanceMember as any,
      { name: l.name },
      { ...l, sortOrder: i, status: "PUBLISHED" }
    );
  }
}

async function seedImpact() {
  for (const [i, p] of projects.entries()) {
    await upsertBy(
      prisma.project as any,
      { title: p.title },
      { ...p, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, c] of communityInitiatives.entries()) {
    await upsertBy(
      prisma.communityInitiative as any,
      { title: c.title },
      { title: c.title, description: c.description, sortOrder: i, status: "PUBLISHED" }
    );
  }
  for (const [i, s] of successStories.entries()) {
    await upsertBy(
      prisma.successStory as any,
      { name: s.name },
      { ...s, sortOrder: i, status: "PUBLISHED" }
    );
  }
}

async function seedLegalPages() {
  for (const page of legalSeedPages) {
    await upsertBy(
      prisma.legalPage as any,
      { slug: page.slug },
      { slug: page.slug, title: page.title, content: { sections: page.sections } }
    );
  }
}

export async function seedContent() {
  await seedWebsiteSettings();
  await seedHomeContent();
  await seedServices();
  await seedLoanProducts();
  await seedFaqs();
  await seedArticlesAndEvents();
  await seedJobs();
  await seedAbout();
  await seedImpact();
  await seedLegalPages();
}
