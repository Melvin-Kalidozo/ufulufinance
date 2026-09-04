export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange?: string;
  experienceLevel?: string;
  deadline?: string;
  description: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  image: string;
  isFeatured?: boolean;
}

export const OPEN_ROLES: JobRole[] = [
  {
    id: "field-credit-officer",
    title: "Senior Field Credit Officer",
    department: "Branch Operations",
    location: "Lilongwe (Area 2 / Old Town)",
    type: "Full-Time",
    salaryRange: "Competitive + Monthly Performance Bonuses",
    experienceLevel: "Mid-Level (2+ years)",
    deadline: "December 31, 2026",
    description: "Lead field appraisals, build borrower relationships with market traders, and manage loan portfolio quality.",
    overview:
      "Join our Lilongwe field credit team serving bustling commercial hubs across Area 2, Area 25, and Tsoka market. You will be on the frontlines of financial inclusion, evaluating enterprise cashflows, guiding market vendors through ethical credit applications, and maintaining strong portfolio health.",
    responsibilities: [
      "Conduct in-person field appraisals of MSME businesses, market stalls, and trading operations",
      "Verify KYC identity, supplier invoices, and enterprise daily cash turnover records",
      "Structure appropriate loan amounts aligned with borrower repayment capacities",
      "Conduct financial literacy training for market trader clusters and borrower groups",
      "Monitor portfolio repayments, maintaining a Portfolio at Risk (PAR 30) below 2.5%",
      "Deliver compassionate, respectful customer relationship management at all times",
    ],
    requirements: [
      "Diploma or Bachelor's Degree in Banking, Finance, Business Administration, or related fields",
      "Minimum 1 to 2 years experience in microfinance field operations or retail lending",
      "Fluency in English and Chichewa; strong interpersonal and negotiation skills",
      "Clean credit bureau record and uncompromising personal integrity",
      "Valid motorcycle riding license is an added advantage",
    ],
    benefits: [
      "Competitive base salary with transparent monthly incentive bonuses",
      "Comprehensive medical cover including spouse and dependents",
      "Field transport allowance and corporate communication airtime",
      "Career progression ladder with annual leadership reviews",
    ],
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
  },
  {
    id: "credit-risk-analyst",
    title: "Senior Credit Risk Analyst",
    department: "Risk & Compliance",
    location: "Lilongwe HQ (Area 3)",
    type: "Full-Time",
    salaryRange: "Attractive Executive Package",
    experienceLevel: "Senior (3+ years)",
    deadline: "January 15, 2027",
    description: "Appraise MSME loan portfolios, evaluate repayment capacity, and ensure underwriting policy compliance.",
    overview:
      "Oversee credit portfolio risk indicators, monitor PAR thresholds, and refine automated scoring algorithms for digital mobile loan disbursements across Malawi.",
    responsibilities: [
      "Perform credit risk stress testing across seasonal agricultural and retail trading portfolios",
      "Evaluate non-performing loans and recommend ethical restructuring options for distressed borrowers",
      "Ensure regulatory alignment with Reserve Bank of Malawi microfinance prudential standards",
      "Collaborate with FinTech developers to optimize mobile scoring rules and delinquency alerts",
      "Prepare monthly risk reports for the Board Credit Committee",
    ],
    requirements: [
      "Bachelor's degree in Actuarial Science, Statistics, Economics, or Finance",
      "3+ years experience in credit risk modeling or microfinance underwriting",
      "Advanced Excel and financial modeling proficiency; SQL knowledge is a plus",
      "Deep understanding of Malawian microfinance regulatory environment",
    ],
    benefits: [
      "High-impact role shaping national credit policies",
      "Generous pension scheme and life insurance cover",
      "Professional development and certification sponsorship",
      "Flexible hybrid working options",
    ],
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
  },
  {
    id: "agri-credit-specialist",
    title: "Agri-Credit Field Specialist",
    department: "Agri-Finance",
    location: "Dedza / Mchinji Hub",
    type: "Full-Time",
    salaryRange: "Competitive Base + Seasonal Bonus",
    experienceLevel: "Mid-Level (2+ years)",
    deadline: "December 20, 2026",
    description: "Structure seasonal fertilizer and seed input facilities for smallholder cooperatives across central Malawi.",
    overview:
      "Work directly with farming clubs, cooperatives, and input agro-dealers to structure harvest-aligned credit packages that empower smallholders to achieve record yields.",
    responsibilities: [
      "Mobilize and assess agricultural producer clubs and village savings associations",
      "Monitor rain patterns, planting schedules, and crop disease indicators across the district",
      "Coordinate structured commodity aggregation with commercial off-takers and warehouse operators",
      "Ensure timely input delivery in collaboration with certified seed and fertilizer suppliers",
    ],
    requirements: [
      "Degree or Diploma in Agricultural Economics, Agronomy, or Rural Development",
      "Motorcycle riding competence with valid driver's license (mandatory)",
      "Familiarity with central Malawi agricultural farming belts and local farmer clubs",
      "Passionate about rural economic transformation",
    ],
    benefits: [
      "All-terrain motorcycle provided for field visits with full fuel allowance",
      "Comprehensive medical scheme and protective field gear",
      "Direct exposure to international development finance partners",
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
  },
  {
    id: "digital-finance-officer",
    title: "Digital Finance Systems Officer",
    department: "FinTech & IT",
    location: "Lilongwe HQ (Area 3)",
    type: "Full-Time",
    salaryRange: "Competitive Tech Package",
    experienceLevel: "Mid to Senior (2+ years)",
    deadline: "January 10, 2027",
    description: "Support mobile money rails (Airtel Money & Mpamba) and core banking transaction automation.",
    overview:
      "Maintain 99.9% uptime for digital loan disbursements, API integrations with telecommunications operators, and borrower SMS notification systems.",
    responsibilities: [
      "Manage core banking API gateways with Airtel Money and TNM Mpamba mobile money rails",
      "Ensure database security, end-to-end encryption, and customer data privacy protection",
      "Provide level 2 technical troubleshooting for branch loan disbursement portals",
      "Implement automated reconciliation tools between mobile switches and the general ledger",
    ],
    requirements: [
      "BSc in Computer Science, Information Technology, or Software Engineering",
      "Experience with REST APIs, SQL databases, Node.js or Python, and cloud infrastructure",
      "Familiarity with financial transaction systems or payment gateway integrations",
    ],
    benefits: [
      "Modern workstation setup and continuous training budget",
      "Full family medical cover and wellness allowance",
      "Collaborative, high-pace FinTech work culture",
    ],
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
  },
  {
    id: "branch-customer-relations",
    title: "Branch Customer Relations Officer",
    department: "Client Services",
    location: "Blantyre (Limbe Branch)",
    type: "Full-Time",
    salaryRange: "Competitive + Performance Bonus",
    experienceLevel: "Entry to Mid (1+ year)",
    deadline: "December 28, 2026",
    description: "Serve as the primary point of contact for loan onboarding, account balance inquiries, and walk-in clients.",
    overview:
      "Create a warm, welcoming, and judgment-free branch experience for every client seeking financial assistance, repayment schedules, or loan product guidance.",
    responsibilities: [
      "Welcome walk-in clients and explain loan product terms with complete transparency",
      "Verify initial KYC identity documentation, bank statements, and payslips",
      "Handle borrower queries and document feedback for branch management",
      "Assist borrowers with mobile wallet registration and digital repayment tokens",
    ],
    requirements: [
      "Diploma in Communication, Public Relations, or Business Administration",
      "Excellent verbal and written communication in English and Chichewa",
      "Friendly demeanour, active listening skills, and customer-first mindset",
    ],
    benefits: [
      "Full medical aid for employee and immediate dependents",
      "Annual leave allowance and airtime stipend",
      "Opportunities for promotion into Credit Officer tracks",
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
  },
  {
    id: "graduate-trainee",
    title: "Graduate Credit & Banking Trainee",
    department: "Early Career Program",
    location: "Lilongwe / Blantyre / Mzuzu",
    type: "12-Month Rotation",
    salaryRange: "Stipend + Housing Allowance",
    experienceLevel: "Entry Level (Fresh Graduate)",
    deadline: "January 31, 2027",
    description: "Structured 12-month rotation across credit assessment, customer service, and field loan appraisal.",
    overview:
      "A fast-track rotational development program designed for ambitious Malawian recent graduates seeking an accelerated leadership trajectory in development finance and microcredit.",
    responsibilities: [
      "Rotate through Field Underwriting, Risk Analytics, and Customer Experience divisions",
      "Participate in community financial literacy workshops and field market surveys",
      "Complete a mentored capstone project on microfinance innovation in Malawi",
      "Support branch teams with data verification and borrower documentation",
    ],
    requirements: [
      "Recent graduate (graduated within last 2 years) with minimum Credit or Distinction in Banking, Economics, Finance, or Agriculture",
      "High analytical curiosity, energy, and strong ethical work ethic",
      "Willingness to travel to rural branch hubs across Malawi",
    ],
    benefits: [
      "Structured mentorship with Senior Executives",
      "Guaranteed permanent placement consideration upon successful completion",
      "Rotational travel allowance and full health coverage",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
  },
];

export const PERKS = [
  {
    title: "Competitive Compensation & Performance Bonus",
    desc: "Rewarding portfolio excellence, customer satisfaction, and on-time repayment milestones with industry-leading monthly incentives.",
  },
  {
    title: "Comprehensive Medical & Family Health Aid",
    desc: "Robust outpatient and inpatient medical coverage for you, your spouse, and recognized dependents.",
  },
  {
    title: "Dedicated Training & Education Sponsorship",
    desc: "Generous tuition assistance for professional banking diplomas, risk management certifications, and tech qualifications.",
  },
  {
    title: "Field Mobility & Communication Support",
    desc: "Equipping our field credit teams with all-terrain motorbikes, smart tablets, and full data allowances.",
  },
  {
    title: "Meaningful Grassroots Impact",
    desc: "Every working day directly improves household livelihoods, expands women-owned businesses, and supports Malawian agriculture.",
  },
  {
    title: "Rapid Career Acceleration",
    desc: "We prioritize internal promotions, opening leadership pathways across our expanding nationwide branch network.",
  },
];

export function getJobById(id: string): JobRole | undefined {
  return OPEN_ROLES.find((job) => job.id === id);
}
