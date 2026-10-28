/**
 * Upserts the current Ufulu Finance vacancies.
 *
 * Safe for production: it only creates/updates these four job rows by slug.
 * It does not delete records or touch any other table (unlike prisma/seed.mjs,
 * which updates WebsiteSetting.offices).
 *
 * Run with:
 *   node scripts/seed-vacancies.mjs
 */

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const raw = process.env.DATABASE_URL?.trim();
const connectionString =
  raw &&
  (raw.startsWith("postgresql://") || raw.startsWith("postgres://")) &&
  raw.includes("@")
    ? raw
    : "postgresql://postgres:1234@localhost:5432/ufulufinance";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const deadline = new Date("2026-11-04T00:00:00.000Z");
const location = "Lilongwe Head Office";
const type = "Full-Time";
const salaryRange = "Competitive salary + comprehensive healthcare";
const image = "/images/hero-jobs.jpg";

const vacancies = [
  {
    slug: "administration-and-hr-officer",
    title: "Administration and HR Officer",
    department: "Administration",
    reportsTo: "Administration and HR Manager",
    overview:
      "The Administration and HR Officer is responsible for the smooth day-to-day running of the office and the organization’s human resource functions. The role combines general administrative support, such as managing office operations, records, procurement, and logistics, with core HR duties, including recruitment, onboarding, employee records, leave and attendance management, payroll inputs, and staff welfare. The post holder will ensure that policies are applied consistently and that the organization complies with labor laws and internal procedures.",
    description:
      "Keep office operations running smoothly while supporting recruitment, employee records, payroll inputs, and staff welfare.",
    responsibilities: [
      {
        heading: "Administration",
        items: [
          "Oversee general office operations, including office supplies, utilities, security, cleaning, transport, and maintenance services.",
          "Manage the fixed asset register, including asset tagging, periodic verification and disposal processes.",
          "Record asset movements, losses, damage, and disposals, ensuring appropriate approvals.",
          "Manage the vehicle fleet, fuel logs, and coordinate office equipment maintenance, ensuring proper authorisation and documentation.",
          "Coordinate staff travel, accommodation and logistics for meetings, workshops and events.",
          "Oversee service contracts and renewals, thus, insurance, licences, internet, equipment servicing, leases, etc.",
          "Coordinate procurement of goods and services in line with approved budgets and procurement procedures.",
          "Source, evaluate and shortlist suppliers; obtain competitive quotations and prepare comparative analyses to ensure competitive pricing, quality, and value for money.",
          "Support the procurement committee by preparing evaluation reports and minutes, and communicating award decisions.",
          "Prepare purchase orders and contracts, and follow up with suppliers on delivery schedules, quality and compliance.",
          "Verify supplier invoices against orders and delivery records before passing them to Finance for payment.",
          "Ensure all procurement activities are appropriately authorized and supported by complete documentation and fully comply with organizational policy and procurement best practices.",
        ],
      },
      {
        heading: "Human Resources",
        items: [
          "Recruitment and onboarding.",
          "Managing employee relations.",
          "HR administration and employee records management.",
          "Working with the HR Manager in compensation and benefits management.",
          "Ensuring that there are adequate up-to-date HR policies and full compliance.",
        ],
      },
      {
        heading: "Reporting and Compliance",
        items: [
          "Ensure compliance with HR, administration, asset management and all relevant company policies and applicable regulations.",
          "Support internal and external audits by providing complete and well-organized HR and Administration documentation.",
          "Prepare periodic HR and administration reports.",
          "Contribute to reviewing and improving HR and administrative procedures.",
        ],
      },
    ],
    kpis: [],
    skills: [
      "High integrity and a strong commitment to ethical, transparent practice.",
      "Strong attention to detail and accuracy in documentation.",
      "Good negotiation skills.",
      "Planning, organization and the ability to manage competing deadlines.",
      "Numerical skills, including the ability to compare costs and analyze quotations.",
    ],
    requirements: [
      "Bachelor’s degree in Business Administration, Human Resource Management, Procurement and Supply Chain Management, Accounting or a related field.",
      "Minimum of 4 years’ experience in an Administration and HR role.",
      "Good knowledge of procurement, labor law and HR practices.",
      "Proficiency in Microsoft Office and HR systems.",
      "Integrity and discretion in handling confidential information.",
    ],
    experienceLevel: "Minimum 4 years",
  },
  {
    slug: "marketing-officer",
    title: "Marketing Officer",
    department: "Marketing",
    reportsTo: null,
    overview:
      "The Marketing Officer is responsible for promoting Ufulu Finance Limited’s products and services, managing the company’s digital presence, maintaining brand consistency and supporting marketing campaigns to increase brand awareness and generate customer leads.",
    description:
      "Promote Ufulu Finance products, manage our digital presence, protect brand consistency and generate qualified customer leads.",
    responsibilities: [
      {
        heading: "Digital Marketing and Content Creation",
        items: [
          "Manage the company’s website and social media platforms, ensuring information is accurate and up to date.",
          "Create and publish engaging content, including product promotions, company updates and customer education materials.",
          "Maintain a content calendar to ensure consistent online communication.",
          "Monitor online enquiries and refer sales-related leads to the Business Development Officer or relevant branches.",
          "Track social media engagement and website performance and prepare periodic reports.",
        ],
      },
      {
        heading: "Marketing Campaigns and Brand Management",
        items: [
          "Coordinate marketing campaigns to promote the company’s financial products and services.",
          "Prepare and distribute marketing materials, including brochures, posters, flyers and banners.",
          "Ensure consistent use of the company’s logo, colours and branding across all communication channels.",
          "Support product launches, promotional events, community outreach and branch marketing activities.",
          "Liaise with designers, printers and other service providers to produce approved marketing materials.",
        ],
      },
      {
        heading: "Market Research and Customer Awareness",
        items: [
          "Gather information on customer preferences, competitor activities and market trends.",
          "Support customer education and financial literacy campaigns.",
          "Collect customer feedback and recommend improvements to marketing messages and promotional activities.",
          "Identify opportunities to improve brand awareness and reach new customer segments.",
        ],
      },
      {
        heading: "Lead Generation and Coordination",
        items: [
          "Implement approved marketing activities aimed at generating customer enquiries and leads.",
          "Record and forward marketing-generated leads to the Business Development Officer or relevant branches.",
          "Work with the Business Development Officer to align marketing campaigns with sales priorities.",
          "Obtain feedback on campaign results and use it to improve future marketing activities.",
        ],
      },
      {
        heading: "Reporting and Compliance",
        items: [
          "Prepare monthly marketing activity and performance reports.",
          "Maintain records of marketing campaigns, materials and related expenditure.",
          "Ensure all marketing materials are approved before publication or distribution.",
          "Ensure that marketing communications accurately represent the company’s products, pricing, terms and conditions.",
          "Comply with company policies, applicable regulations, privacy requirements and approved brand guidelines.",
          "Perform other related duties assigned by management.",
        ],
      },
    ],
    kpis: [
      "Consistency and growth of social media activity and engagement.",
      "Timely updating of the company website and digital platforms.",
      "Number of marketing campaigns and promotional activities completed.",
      "Number of qualified leads generated through marketing activities.",
      "Timeliness of lead referral to the Business Development Officer and branches.",
      "Timely production and distribution of marketing materials.",
      "Consistency and accuracy of company branding.",
      "Timeliness and accuracy of monthly marketing reports.",
      "Performance of marketing campaigns against agreed objectives and budgets.",
      "Compliance with approved marketing and communication policies.",
    ],
    skills: [],
    requirements: [
      "A bachelor's degree in Marketing, Business Administration, Communications, Digital Marketing or a related field.",
      "Minimum of 4 years’ experience in Marketing.",
      "Integrity and discretion in handling confidential information.",
    ],
    experienceLevel: "Minimum 4 years",
  },
  {
    slug: "risk-and-compliance-officer",
    title: "Risk and Compliance Officer",
    department: "Risk & Compliance",
    reportsTo: null,
    overview:
      "To ensure that Ufulu Finance Limited complies with applicable laws, regulations, regulatory directives, and internal policies. The officer will identify, assess, and mitigate business risks, develop and review company policies, and advise management on regulatory changes and necessary updates to policies, procedures, and controls.",
    description:
      "Safeguard regulatory compliance, identify and mitigate business risks, and strengthen internal controls across the company.",
    responsibilities: [
      {
        heading: "Regulatory Compliance and Policy Management",
        items: [
          "Monitor applicable laws, regulations, and regulatory directives affecting the company.",
          "Develop, review, and update company policies and procedures to ensure they remain relevant and compliant with regulatory requirements.",
          "Advise management on regulatory changes and recommend necessary updates to company policies, procedures, and controls.",
          "Monitor implementation of approved policies and ensure compliance across all branches and departments.",
          "Coordinate regulatory reporting and support regulatory inspections and reviews.",
        ],
      },
      {
        heading: "Risk Management",
        items: [
          "Identify and assess operational, financial, credit, fraud, regulatory, and other business risks.",
          "Maintain an updated risk register and recommend appropriate risk mitigation measures.",
          "Monitor the effectiveness of risk controls and report significant risks to management.",
        ],
      },
      {
        heading: "Internal Controls and Monitoring",
        items: [
          "Review compliance with internal policies, procedures, and established controls.",
          "Identify control weaknesses, irregularities, and potential fraud or misconduct.",
          "Follow up on audit findings, compliance gaps, and implementation of corrective actions.",
        ],
      },
      {
        heading: "Reporting and Staff Awareness",
        items: [
          "Prepare regular reports on compliance, risks, control weaknesses, and corrective actions.",
          "Advise management on emerging risks and compliance matters.",
          "Educate staff on company policies, regulatory requirements, and risk management practices.",
        ],
      },
    ],
    kpis: [
      "Compliance with applicable laws and regulatory requirements.",
      "Timely review and updating of company policies and procedures.",
      "Timeliness of advice to management on regulatory changes.",
      "Number and severity of unresolved compliance issues.",
      "Timely identification and mitigation of business risks.",
      "Resolution of audit findings and internal control weaknesses.",
      "Accuracy and timeliness of compliance and risk reports.",
    ],
    skills: [
      "Regulatory compliance and policy development.",
      "Risk identification, assessment, and mitigation.",
      "Analytical thinking and attention to detail.",
      "Internal controls and problem-solving.",
      "Integrity, independence, and confidentiality.",
      "Communication and report writing.",
    ],
    requirements: [
      "Bachelor’s degree in Risk Management, Compliance, Law, Finance, Accounting, Business Administration, or a related field.",
      "A minimum of 3 years of experience in risk management, compliance, auditing, or financial services is an advantage.",
      "Knowledge of regulatory requirements and internal control principles.",
      "Strong analytical, communication, report-writing, and computer skills.",
    ],
    experienceLevel: "Minimum 3 years",
  },
  {
    slug: "sales-officers-2",
    title: "Sales Officers (2)",
    department: "Sales",
    reportsTo: null,
    overview:
      "To promote Ufulu Finance Limited’s financial products and services, acquire new customers, maintain customer relationships, and achieve assigned sales targets to support business growth and profitability.",
    description:
      "Grow the loan book by acquiring customers, building relationships and consistently meeting assigned sales targets.",
    responsibilities: [
      {
        heading: "Sales and Business Development",
        items: [
          "Identify and approach potential customers to promote the company’s financial products and services.",
          "Conduct field visits and sales activities to generate new business opportunities.",
          "Develop and maintain a pipeline of prospective customers.",
          "Identify new markets and opportunities to expand the company’s customer base.",
          "Achieve assigned daily, weekly, and monthly sales targets.",
        ],
      },
      {
        heading: "Customer Acquisition and Relationship Management",
        items: [
          "Attract new customers through referrals, networking, field visits, and other approved sales channels.",
          "Explain the company’s products and services to prospective customers.",
          "Build and maintain positive relationships with existing and prospective customers.",
          "Follow up with prospective customers to convert enquiries into sales.",
          "Respond to customer enquiries and refer complex issues to the appropriate officer.",
        ],
      },
      {
        heading: "Sales Reporting and Performance Monitoring",
        items: [
          "Prepare and submit daily, weekly, and monthly sales reports as required.",
          "Maintain accurate records of customer leads, sales activities, and completed transactions.",
          "Monitor progress against assigned sales targets and identify areas requiring improvement.",
          "Report on new customers acquired, sales achieved, and potential business opportunities.",
          "Provide management with customer feedback, market information, and recommendations to improve sales performance.",
        ],
      },
    ],
    kpis: [
      "Achievement of assigned sales targets.",
      "Number of new customers acquired.",
      "Growth in sales volume and revenue.",
      "Number of prospective customers converted into active customers.",
      "Accuracy and timeliness of sales reports.",
    ],
    skills: [
      "Good communication and interpersonal skills.",
      "Strong selling and negotiation skills.",
      "Customer service and relationship management skills.",
      "Ability to work independently and meet sales targets.",
      "Good organisational, reporting, and time management skills.",
      "Honesty, professionalism, and a results-oriented attitude.",
    ],
    requirements: [
      "Degree in Marketing, Business Administration, Sales, or a related field.",
      "A minimum of 5 years of experience in sales, marketing, or customer service is an advantage.",
      "Experience in microfinance or financial services is an added advantage.",
    ],
    experienceLevel: "Minimum 5 years",
  },
];

async function main() {
  for (const vacancy of vacancies) {
    const data = {
      ...vacancy,
      location,
      type,
      salaryRange,
      deadline,
      image,
      isFeatured: false,
      status: "OPEN",
    };

    const job = await prisma.job.upsert({
      where: { slug: vacancy.slug },
      update: data,
      create: data,
      select: { id: true, slug: true, title: true },
    });

    console.log(`Upserted job #${job.id}: ${job.title} (${job.slug})`);
  }

  console.log(`\nDone. ${vacancies.length} vacancies are live.`);
}

main()
  .catch((error) => {
    console.error("Vacancy seed failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
