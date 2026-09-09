// ─────────────────────────────────────────────────────────────────────────────
// Canonical CMS seed content.
// Source: the content that was previously hard-coded across the public pages
// (home, services, loans, about, impact, faqs, testimonials) plus the blog/news,
// events, and careers datasets. Blog/news + events import from lib/blogData,
// careers import from lib/jobsData — everything else is transcribed here.
// ─────────────────────────────────────────────────────────────────────────────
import { ARTICLES, EVENTS } from "../lib/blogData";
import { OPEN_ROLES, PERKS } from "../lib/jobsData";

export { ARTICLES, EVENTS, OPEN_ROLES, PERKS };

// ── Home ────────────────────────────────────────────────────────────────────
export const homeStats = [
  { value: "250+", label: "SMEs & Groups Financed", description: "Empowering small enterprises, community clusters, and public servants with accessible credit." },
  { value: "15,000+", label: "Loans Disbursed", description: "Delivering rapid financial support directly to mobile wallets and bank accounts nationwide." },
  { value: "100%", label: "Transparent Pricing", description: "Guaranteed clear terms, predictable payroll deductions, and zero hidden penalties." },
];

export const homeSectors = [
  { title: "Civil Servants & Public Officers", subtitle: "Ministries, Healthcare, Education & Uniformed Services", description: "Structured personal financing with automated, predictable payroll deductions that simplify debt management.", iconKey: "Landmark", link: "#facilities" },
  { title: "Private Sector Employees", subtitle: "Corporate, NGO & Commercial Enterprises", description: "Reliable salary-linked credit facilities arranged through approved employer participation and direct payroll linkage.", iconKey: "Building2", link: "#facilities" },
  { title: "Village Banking Groups", subtitle: "Solidarity Clusters & Savings Collectives", description: "Group-level credit facilities empowering community clusters to expand income-generating activities together.", iconKey: "Users", link: "#facilities" },
  { title: "Businesses & MSMEs", subtitle: "Retailers, Wholesalers & Growing Enterprises", description: "Expanding capital access to finance bulk stock replenishment, commercial machinery, and business expansion.", iconKey: "TrendingUp", link: "#facilities" },
];

export const homeWhyChoose = [
  { title: "Transparent Terms & Zero Hidden Fees", description: "Every fee and interest charge is declared upfront. No unexpected insurance deductions or hidden administration penalties." },
  { title: "Direct Mobile & Bank Disbursal", description: "Receive approved loan funds within minutes directly to your Airtel Money, TNM Mpamba, or commercial bank account." },
  { title: "Seasonal Cashflow Matching", description: "Repayment schedules customized to align with your business revenue cycles or agricultural harvest seasons." },
  { title: "Respectful & Ethical Advisory", description: "Our accredited credit officers provide dignified, professional guidance in English, Chichewa, and Tumbuka." },
];

export const homeImpactMetrics = [
  { value: "65%+", label: "Women Entrepreneurs", sub: "Directly empowering female traders, grocers, and farmers" },
  { value: "MWK 3.5B+", label: "Capital Disbursed", sub: "Injected into local Malawian grassroots economies" },
  { value: "15,000+", label: "Livelihoods Transformed", sub: "Supporting families, school fees, and community resilience" },
  { value: "98.4%", label: "Client Retention Rate", sub: "Borrowers returning to expand their businesses year after year" },
];

// ── Testimonials (home slider) ─────────────────────────────────────────────
export const testimonials = [
  { name: "Kondwani Gondwe", role: "Commercial Grain & Soya Farmer", category: "Agriculture", quote: "Financing certified seed and basal fertilizer upfront used to be our biggest struggle every planting season. Ufulu Finance disbursed directly to our agro-dealer within 24 hours, and structured repayments to match our harvest marketing cycles.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", meta: { location: "Mchinji District", facility: "Agri-Seasonal Input Credit", amount: "MWK 4,000,000", categoryLabel: "Agriculture", date: "1 month ago", highlight: "Direct Agro-Dealer Disbursal" } },
  { name: "Blessings Chirwa", role: "Building Materials & Timber Supplier", category: "Asset & Logistics", quote: "The zero hidden fee guarantee is 100% genuine. Every single kwacha was detailed upfront in my sanction letter. That transparent capital allowed us to procure a 3-ton delivery truck and double our regional distribution capacity.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", meta: { location: "Limbe Commercial Area, Blantyre", facility: "Asset & Logistics Expansion Facility", amount: "MWK 6,500,000", categoryLabel: "Asset & Logistics", date: "3 weeks ago", highlight: "Zero Hidden Fees Guarantee" } },
  { name: "Grace Phiri", role: "Retail Enterprise Owner", category: "MSME Working Capital", quote: "Before Ufulu Finance, informal lenders charged 30% per month, taking all our retail profits. With their MSME loan, I restocked my grocery shop, expanded to wholesale maize trade, and hired two full-time assistants in Area 25.", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", meta: { location: "Area 25, Lilongwe", facility: "MSME QuickGrowth Facility", amount: "MWK 2,500,000", categoryLabel: "MSME Working Capital", date: "2 weeks ago", highlight: "Disbursed in Under 24h" } },
  { name: "Tiwonge Mkandawire", role: "Senior Secondary Educator", category: "Civil Service", quote: "When my daughter needed urgent university tuition fees, commercial banks quoted a 3-week processing turnaround. Ufulu verified my payslip and deposited the tuition funds directly to my Airtel Money wallet in under 6 hours.", rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", meta: { location: "Mzuzu City", facility: "Civil Servant Salary FastAdvance", amount: "MWK 850,000", categoryLabel: "Civil Service", date: "Last month", highlight: "Disbursed via Airtel Money" } },
  { name: "Alinane Banda", role: "Solidarity Cluster Group Leader", category: "Village Banking", quote: "Our women's cooperative of 12 fish-smoking entrepreneurs needed collective working capital. Ufulu's credit officer visited our cluster in Salima, provided financial literacy guidance, and structured our group facility with dignity.", rating: 5, image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=400&q=80", meta: { location: "Salima District", facility: "Village Banking Group Credit", amount: "MWK 1,800,000", categoryLabel: "Village Banking", date: "3 weeks ago", highlight: "12-Member Cluster Financed" } },
  { name: "Dalitso Phiri", role: "Medical & Pharmaceutical Distributor", category: "MSME Working Capital", quote: "When supplying regional clinics, waiting 60 days for hospital invoice reconciliations choked our cash flow. Ufulu's trade finance bridge helped us keep inventory stocked without interrupting essential medical supply chains.", rating: 5, image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80", meta: { location: "Kanengo Industrial Area, Lilongwe", facility: "Commercial Trade & Invoice Bridge", amount: "MWK 8,000,000", categoryLabel: "MSME Working Capital", date: "2 months ago", highlight: "Invoice Discounting Bridge" } },
];

// ── Services page ───────────────────────────────────────────────────────────
export const services = [
  { slug: "civil-service", title: "Civil Service Loans", tagline: "Structured financing designed specifically for government employees.", description: "Our Civil Service Loans provide eligible government employees with access to financing to meet their personal and financial needs. We understand the unique needs of civil servants and provide structured loan solutions with convenient repayment arrangements through payroll deductions, subject to applicable eligibility and lending requirements.", limit: "Subject to assessment", tenure: "Flexible terms", turnaround: "Efficient processing", repayment: "Payroll deduction", collateral: "Employment confirmation", image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80", iconKey: "Wallet", isFeatured: true, idealFor: "Government employees seeking convenient access to personal financing." },
  { slug: "private-sector-payroll", title: "Private Sector Payroll Loans", tagline: "Payroll-based lending solutions for eligible private sector employees.", description: "Ufulu Finance provides payroll-based lending solutions to eligible employees working in the private sector. These loans are designed to give salaried employees access to financing while offering convenient repayment arrangements linked to their payroll, subject to employer participation, eligibility, and applicable lending requirements.", limit: "Subject to assessment", tenure: "Flexible terms", turnaround: "Efficient processing", repayment: "Linked to payroll", collateral: "Employer participation required", image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80", iconKey: "Briefcase", isFeatured: false, idealFor: "Employees of eligible private-sector organisations." },
  { slug: "village-banking", title: "Village Banking Loans", tagline: "Community-based financing supporting income-generating activities.", description: "Our Village Banking Loans support organised community groups that participate in village banking and other community-based financial activities. The facility helps groups access financing that can support income-generating activities, small businesses, and other productive financial needs.", limit: "Subject to group assessment", tenure: "Flexible terms", turnaround: "Group-based processing", repayment: "Community group schedule", collateral: "Group guarantee", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80", iconKey: "Users", isFeatured: false, idealFor: "Eligible village banking groups and community-based financial groups." },
  { slug: "business-loans", title: "Business Loans", tagline: "Financing solutions for businesses and entrepreneurs — expanding now.", description: "As part of our growth strategy, Ufulu Finance is expanding its lending portfolio to provide financing solutions for businesses and entrepreneurs. Our Business Loans are intended to help eligible businesses access capital for activities such as business expansion, working capital, purchasing equipment, and other legitimate business needs.", limit: "Subject to business assessment", tenure: "Flexible terms", turnaround: "Business assessment period", repayment: "Agreed repayment schedule", collateral: "Business assets / documentation", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", iconKey: "TrendingUp", isFeatured: false, idealFor: "Entrepreneurs, small businesses, and eligible established businesses seeking financing for growth and working capital." },
];

export const serviceAudiences = [
  { title: "Market Vendors & Retailers", subtitle: "Area 2, Tsoka Market, Limbe, and Regional Trade Hubs", description: "Fast working capital for bulk purchases, seasonal inventory build-up, and rapid stock turn.", iconKey: "Briefcase" },
  { title: "Smallholder Farmers & Growers", subtitle: "Mchinji, Dedza, Kasungu, and Central Food Belts", description: "Timely fertilizer and seed packages structured to match rainfall patterns and harvest commodity sales.", iconKey: "Wheat" },
  { title: "Civil Servants & Teachers", subtitle: "Ministries, District Councils, Health & Education Services", description: "Transparent salary advances with zero hidden fees and automated payroll deduction convenience.", iconKey: "Wallet" },
  { title: "Women Entrepreneurs & Savings Groups", subtitle: "Village Banking Clusters & Cooperative Federations", description: "Solidarity-backed credit lines supporting women-led micro-enterprises and community wealth building.", iconKey: "Users" },
];

export const serviceAdvantages = [
  { title: "Same-Day Mobile Payouts", description: "Funds pushed directly to Airtel Money or TNM Mpamba within minutes of agreement verification.", iconKey: "Zap" },
  { title: "Harvest-Aligned Grace Periods", description: "Repayment dates matched specifically to crop marketing cycles so farmers never struggle during growing seasons.", iconKey: "Wheat" },
  { title: "Transparent & Published Rates", description: "Every kwacha of interest and processing fee is clearly itemized with zero surprise deductions.", iconKey: "Percent" },
  { title: "Credit Limit Escalator", description: "Timely repayments automatically unlock higher credit limits up to MWK 15,000,000 for your business.", iconKey: "TrendingUp" },
];

// ── Loan products (unified: home showcase + loans page + enquiry picker) ───
export type LoanSeed = {
  slug: string;
  name: string;
  category?: string | null;
  categoryLabel?: string | null;
  badge?: string | null;
  tagline?: string | null;
  intro?: string | null;
  description?: string | null;
  image?: string | null;
  minAmount?: number | null;
  maxAmount?: number | null;
  minMonths?: number | null;
  maxMonths?: number | null;
  interestRateMonthly?: number | null;
  processingFeePercent?: number | null;
  amountText?: string | null;
  tenureText?: string | null;
  disbursementText?: string | null;
  repaymentText?: string | null;
  collateralText?: string | null;
  keyDetails?: string[];
  eligibility?: string[];
  kycRequirements?: string[];
  repaymentTerms?: string[];
  isFeatured?: boolean;
  isHomeFeatured?: boolean;
};

export const loanProducts: LoanSeed[] = [
  {
    slug: "civil-service",
    name: "Civil Service Loans",
    category: "civil-service",
    categoryLabel: "Government & Civil Service",
    tagline: "Structured financing designed specifically for government employees.",
    description: "Our Civil Service Loans provide eligible government employees with access to financing to meet their personal and financial needs. We understand the unique needs of civil servants and provide structured loan solutions with convenient repayment arrangements through payroll deductions.",
    amountText: "Subject to assessment",
    tenureText: "Flexible terms",
    disbursementText: "Efficient processing",
    repaymentText: "Payroll deduction",
    collateralText: "Employment confirmation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    isHomeFeatured: true,
  },
  {
    slug: "private-sector-payroll",
    name: "Private Sector Payroll Loans",
    category: "private-sector-payroll",
    categoryLabel: "Corporate & Enterprise",
    tagline: "Payroll-based lending solutions for eligible private sector employees.",
    description: "Our Private Sector Payroll Loans provide financing solutions for eligible employees working in vetted private sector organisations. Designed to assist with personal financial needs with structured repayments deducted directly or arranged through employer partnerships.",
    amountText: "Subject to assessment",
    tenureText: "Flexible terms",
    disbursementText: "Efficient processing",
    repaymentText: "Linked to payroll",
    collateralText: "Employer participation required",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    isHomeFeatured: true,
  },
  {
    slug: "village-banking-loans",
    name: "Village Banking Loans",
    category: "group",
    categoryLabel: "Community & Micro-Clusters",
    tagline: "Community-based financing supporting income-generating activities.",
    description: "Supporting organised community groups that participate in village banking and other community-based financial activities. The facility helps groups access financing that can support income-generating activities and small businesses.",
    amountText: "Subject to group assessment",
    tenureText: "Flexible terms",
    disbursementText: "Group-based processing",
    repaymentText: "Community group schedule",
    collateralText: "Group guarantee",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
    isHomeFeatured: true,
  },
  {
    slug: "business-loans",
    name: "Business Loans",
    category: "business",
    categoryLabel: "Commercial & MSME Growth",
    tagline: "Financing solutions for businesses and entrepreneurs — expanding now.",
    description: "As part of our growth strategy, Ufulu Finance is expanding its lending portfolio to provide financing solutions for businesses and entrepreneurs across Malawi, helping access capital for business expansion, working capital, and equipment.",
    amountText: "Subject to business assessment",
    tenureText: "Flexible terms",
    disbursementText: "Business assessment period",
    repaymentText: "Agreed repayment schedule",
    collateralText: "Business assets / documentation",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    isHomeFeatured: true,
  },
  {
    slug: "msme-quickgrowth",
    name: "MSME QuickGrowth Working Capital",
    category: "msme",
    categoryLabel: "MSME Business",
    badge: "Most Popular",
    tagline: "Speedy inventory and restocking cash for registered shops and market traders.",
    minAmount: 100000,
    maxAmount: 10000000,
    minMonths: 1,
    maxMonths: 12,
    interestRateMonthly: 3.5,
    processingFeePercent: 2.0,
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    intro: "A fast-response credit line created for active merchants, wholesalers, and stall operators. Avoid lost inventory sales and negotiate bulk supplier discounts with ready cash.",
    keyDetails: ["Disbursement within 24 hours of approval", "Flexible weekly or monthly repayment cycles", "Repeat borrowers qualify for credit limit increases up to MWK 10,000,000", "Direct mobile wallet (Airtel Money / TNM Mpamba) disbursement"],
    eligibility: ["Operating business location for a minimum of 6 months", "Demonstrable daily or weekly sales cashflow", "Malawian citizen aged 21 years and above"],
    kycRequirements: ["Valid National ID", "Proof of business (e.g. trading licence or business registration)", "Proof of residence", "Completed Ufulu Finance loan application and KYC forms", "Any additional information or documentation requested by Ufulu Finance Limited"],
    repaymentTerms: ["Flat monthly interest calculated transparently. Early repayment without penalties."],
  },
  {
    slug: "mlimi-harvest-input-booster",
    name: "Mlimi Harvest Input Booster",
    category: "agri",
    categoryLabel: "Agri-Finance",
    badge: "Seasonal Special",
    tagline: "Fertilizer, seed, and irrigation financing tailored to harvest cycles.",
    minAmount: 150000,
    maxAmount: 7500000,
    minMonths: 3,
    maxMonths: 9,
    interestRateMonthly: 3.0,
    processingFeePercent: 1.5,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    intro: "Engineered specifically for central Malawi smallholders cultivating maize, soya, groundnuts, and tobacco. Get inputs when rain falls, repay when you sell your crop.",
    keyDetails: ["Structured grace period during the growing window", "Bullet repayment options following commodity harvest sales", "Input delivery partnerships with accredited seed & fertilizer distributors", "Agronomic risk advisory included at zero cost"],
    eligibility: ["Cultivating minimum 1.5 acres of farmland", "Membership in an agricultural club or cooperative preferred", "Historical proof of crop production for at least 2 seasons"],
    kycRequirements: ["Valid National ID", "Proof of business", "Proof of residence", "Completed Ufulu Finance loan application and KYC forms", "Any additional information or documentation requested by Ufulu Finance Limited"],
    repaymentTerms: ["Flexible schedule with principal payable upon harvest commodity aggregation."],
  },
  {
    slug: "boma-civil-servant-express",
    name: "Boma Civil Servant Express",
    category: "payroll",
    categoryLabel: "Payroll Advances",
    badge: "Low Interest",
    tagline: "Low-stress salary advances for teachers, nurses, and government staff.",
    minAmount: 50000,
    maxAmount: 2500000,
    minMonths: 1,
    maxMonths: 24,
    interestRateMonthly: 2.8,
    processingFeePercent: 1.0,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    intro: "A dignified salary loan for civil servants facing school fee deadlines, hospital emergencies, or home improvements, protecting you from aggressive informal loan sharks.",
    keyDetails: ["Turnaround under 4 hours via Airtel Money or Mpamba", "Zero collateral required — salary backed", "Extended tenure up to 24 months for larger capital needs", "Strict compliance with maximum 1/3 net salary take-home regulations"],
    eligibility: ["Permanent employment with Government of Malawi or approved public agency", "Minimum 3 months confirmed service", "Salary paid via commercial bank account"],
    kycRequirements: ["Valid National ID", "Evidence of employment with the Government of Malawi", "Completed Ufulu Finance loan application and KYC documentation", "Any additional documents required during the assessment process"],
    repaymentTerms: ["Direct payroll deduction or bank stop-order on the official government salary date."],
  },
  {
    slug: "tikondane-solidarity-cluster-credit",
    name: "Tikondane Solidarity Cluster Credit",
    category: "group",
    categoryLabel: "Group Lending",
    badge: "Community First",
    tagline: "Solidarity-backed credit lines for women cooperatives and village banking.",
    minAmount: 50000,
    maxAmount: 500000,
    minMonths: 3,
    maxMonths: 6,
    interestRateMonthly: 3.2,
    processingFeePercent: 1.0,
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    intro: "Wholesale credit lines for established Village Savings and Loans Associations (VSLAs). Empowering female micro-entrepreneurs without demanding traditional real estate collateral.",
    keyDetails: ["Joint liability and peer support replace physical collateral", "Fortnightly field officer collection at your community meeting place", "Free financial literacy and cooperative governance training"],
    eligibility: ["Member of an active group with at least 5 to 25 verified members", "Group operating with consistent savings history for at least 6 months"],
    kycRequirements: ["Valid National ID for each borrower", "Proof of business", "Proof of residence", "Completed Ufulu Finance loan application and KYC documentation", "Any additional information or documentation requested by Ufulu Finance Limited"],
    repaymentTerms: ["Bi-weekly or monthly collection during standard cluster group meetings."],
  },
  {
    slug: "commercial-asset-equipment-credit",
    name: "Commercial Asset & Equipment Credit",
    category: "msme",
    categoryLabel: "MSME Business",
    badge: "Asset Backed",
    tagline: "Finance delivery motorcycles, trikes, solar pumps, and grain mills.",
    minAmount: 500000,
    maxAmount: 15000000,
    minMonths: 6,
    maxMonths: 36,
    interestRateMonthly: 2.9,
    processingFeePercent: 2.0,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    intro: "Acquire productive equipment that generates daily revenue. Ufulu Finance pays the vendor directly, and the asset secures the facility while you generate income.",
    keyDetails: ["Up to 80% financing of asset invoice value", "Asset itself serves as security", "Comprehensive insurance package structured into monthly payments"],
    eligibility: ["Verifiable existing enterprise in transport, logistics, or agro-processing", "Ability to contribute 20% down payment"],
    kycRequirements: ["Valid National ID", "Proof of confirmed monthly salary income for at least 6 months", "Employment information from a participating employer", "Completed Ufulu Finance loan application and KYC documentation", "Any additional information requested by Ufulu Finance Limited"],
    repaymentTerms: ["Equal monthly instalments matched to the asset's productive lifespan."],
  },
  {
    slug: "family-emergency-relief-credit",
    name: "Family Emergency Relief Credit",
    category: "other",
    categoryLabel: "Personal Credit",
    tagline: "Quick relief financing for verified family emergencies.",
    minAmount: 50000,
    maxAmount: 1000000,
    minMonths: 1,
    maxMonths: 12,
    isFeatured: false,
  },
  {
    slug: "commercial-trade-invoice-bridge",
    name: "Commercial Trade & Invoice Bridge",
    category: "business",
    categoryLabel: "Commercial Trade",
    tagline: "Invoice and trade bridging finance for growing enterprises.",
    minAmount: 200000,
    maxAmount: 20000000,
    minMonths: 1,
    maxMonths: 12,
    isFeatured: false,
  },
];

// ── FAQs ────────────────────────────────────────────────────────────────────
export const faqs = [
  { question: "Who is Ufulu Finance and is the institution regulated?", answer: "Ufulu Finance Limited is a registered Malawian microfinance institution established in Lilongwe. We operate under national microfinance prudential regulations and consumer credit protection standards, providing non-deposit credit facilities to micro, small, and medium enterprises (MSMEs), agricultural producers, and salaried civil servants.", category: "General Questions" },
  { question: "Where are your branch offices located?", answer: "Our Head Office is in Area 3, City Centre, Lilongwe. We operate regional branches in Blantyre (Limbe Commercial District) and Mzuzu (Orton Chirwa Avenue), with field officers active across Dedza, Mchinji, Kasungu, and surrounding districts.", category: "General Questions" },
  { question: "Who qualifies for an Ufulu Finance loan?", answer: "Malawian citizens aged 21 to 65 who own an active registered or informal enterprise operating for at least 6 months, smallholder farmers with verifiable land cultivation, or permanent civil servants and public sector employees with regular salary credits.", category: "Loan Eligibility" },
  { question: "What documents do I need to present when applying?", answer: "1. Valid Malawian National ID Card (Smart Card) or passport.\n2. Recent 3 to 6 months bank statement or mobile money (Airtel Money / TNM Mpamba) transaction history.\n3. Proof of business trading location or residential utility bill/chief's letter.\n4. For civil servants: Latest 3 months payslips and confirmation letter.\n5. Two recent passport-size photos.", category: "Loan Eligibility" },
  { question: "What is the minimum and maximum amount I can borrow?", answer: "First-time borrowers can access loans starting from MWK 50,000 up to MWK 2,500,000 depending on cashflow assessment. Established repeat borrowers with exemplary repayment track records can scale up to MWK 15,000,000 for asset and commercial facilities.", category: "Loan Eligibility" },
  { question: "What interest rates and fees does Ufulu Finance charge?", answer: "Our interest rates range between 2.8% and 3.5% flat monthly depending on the facility type, tenure, and collateral backing. We have a strict 'Zero Hidden Deductions' policy: all processing fees (1.0% to 2.0%) and insurance charges are disclosed upfront on your official sanction letter before disbursement.", category: "Repayments & Rates" },
  { question: "Can I repay my loan before the agreed tenure without penalty?", answer: "Yes! Ufulu Finance encourages early debt liquidation. Borrowers who settle their balance ahead of schedule are charged interest only for the duration the facility was active, with zero penalty surcharges.", category: "Repayments & Rates" },
  { question: "How do I make my monthly or weekly loan repayments?", answer: "Repayments can be made through:\n- Direct Mobile Money bill pay via Airtel Money or TNM Mpamba using your Loan Account Reference.\n- Direct bank transfer or branch deposit into our designated National Bank or Standard Bank accounts.\n- Automated payroll deduction (for registered civil servants and corporate partnerships).\n- In-person at any Ufulu Finance branch cashier.", category: "Repayments & Rates" },
  { question: "How quickly are funds disbursed to my mobile wallet?", answer: "Once your KYC documents are approved and your agreement is signed, funds are pushed to your registered Airtel Money or TNM Mpamba wallet within 15 to 30 minutes, or credited to your commercial bank within 24 hours.", category: "Mobile Wallet Payouts" },
  { question: "How is my personal financial data and credit record protected?", answer: "We strictly adhere to the Malawi Data Protection Act and Reserve Bank of Malawi confidentiality regulations. Your financial statements, phone numbers, and repayment histories are stored on encrypted servers and are never sold or shared with unauthorized commercial third parties.", category: "Security & Privacy" },
  { question: "Is Ufulu Finance a regulated microfinance institution in Malawi?", answer: "Yes. Ufulu Finance Limited operates in strict accordance with Malawian non-deposit microfinance regulations and Reserve Bank of Malawi consumer credit guidelines. We follow ethical lending protocols, responsible underwriting standards, and transparent client protection principles.", category: "About Ufulu" },
  { question: "Where are your physical branches located and what are the opening hours?", answer: "Our Head Office is in City Centre, Area 3, Lilongwe (+265 99 123 4567). We operate commercial branch hubs at Victoria Avenue, CBD, Blantyre (+265 88 123 4567), and Katoto Commercial Area, Mzuzu (info@ufulufinance.com). All branches are open Monday through Friday, 8:00 AM – 5:00 PM.", category: "About Ufulu" },
  { question: "How does Ufulu Finance ensure zero hidden fees?", answer: "Before signing any credit agreement, you receive a full sanction letter itemizing the principal amount, interest rate, administrative charges, and the exact weekly or monthly repayment sum. What you see is what you pay—with zero unexpected penalty markups.", category: "About Ufulu" },
  { question: "Who qualifies for an MSME or agricultural loan?", answer: "Malawian entrepreneurs, retail merchants, market vendors with at least 6 months of trading activity, smallholder farmers with verifiable cultivation acreage, and salaried public service employees qualify. We evaluate real cashflow and inventory turnover rather than demanding complex real estate collateral.", category: "About Ufulu" },
  { question: "How fast are funds disbursed once my application is approved?", answer: "Our streamlined assessment enables same-day approvals. Once approved, funds are disbursed within 24 hours directly to your registered Airtel Money wallet, TNM Mpamba account, or commercial bank account.", category: "About Ufulu" },
  { question: "How does Ufulu Finance protect clients from over-indebtedness?", answer: "We conduct compassionate, thorough debt-service ratio assessments. Loan officers ensure repayment instalments do not exceed 35%–40% of your verifiable net cash surplus, protecting your household livelihood and enterprise stability.", category: "About Ufulu" },
];

// ── About page ──────────────────────────────────────────────────────────────
export const aboutValues = [
  { title: "Transparency", description: "We are fully open about our fees, interest rates, and repayment terms. Clients receive complete information before signing any agreement — no hidden charges, ever.", iconKey: "ShieldCheck", badge: "Core Value", isFeatured: false },
  { title: "Efficiency & Timeliness", description: "We process applications and disburse funds swiftly because we understand that timely access to finance is what makes the difference for our customers.", iconKey: "Sparkles", badge: "Core Value", isFeatured: true },
  { title: "Dependability", description: "Customers, partners, and communities can count on us to deliver on our commitments consistently and reliably at every interaction.", iconKey: "BadgeCheck", badge: "Core Value", isFeatured: false },
  { title: "Effectiveness", description: "We pursue outcomes that genuinely improve the socio-economic wellbeing of our customers, measuring success by real impact on lives and livelihoods.", iconKey: "Target", badge: "Core Value", isFeatured: false },
  { title: "Flexibility", description: "We tailor our solutions to the diverse needs of different customer segments — from civil servants to village banking groups — rather than applying a one-size-fits-all approach.", iconKey: "Scale", badge: "Core Value", isFeatured: false },
  { title: "Ethicality", description: "We conduct our business with the highest standards of integrity, fairness, and responsibility — protecting our customers and the communities we serve.", iconKey: "HeartHandshake", badge: "Core Value", isFeatured: false },
];

export const aboutTimeline = [
  { year: "2016", title: "Ufulu Finance Established", description: "Ufulu Finance Limited commenced operations as a non-deposit-taking financial institution, with a core focus on providing accessible and reliable credit solutions to civil servants across Malawi." },
  { year: "2016–", title: "Civil Service Lending Focus", description: "Built a strong foundation in civil service lending, providing tailored loan products with structured repayment arrangements through payroll deductions for government employees." },
  { year: "Growing", title: "Expanding Into New Segments", description: "Progressively expanded into private sector payroll lending and village banking loans, broadening financial access for salaried private-sector employees and community groups." },
  { year: "Future", title: "Path to Deposit-Taking Institution", description: "Pursuing our long-term strategic ambition to progress into a deposit-taking financial institution, driving deeper financial inclusion for individuals and businesses across Malawi." },
];

export const regionalHubs = [
  { region: "Central Region (Head Office)", city: "Lilongwe", location: "Area 3, City Centre", focus: "MSME Wholesale Financing, Civil Servant Credit, Civil Service Payroll Operations", contacts: ["Phone: +265 99 123 4567", "lilongwe@ufulufinance.com"] },
  { region: "Southern Region Hub", city: "Blantyre", location: "Limbe Commercial Center", focus: "Cross-Border Merchant Trade, Vegetable Cluster Banking, Transport Asset Financing", contacts: ["Phone: +265 88 123 4567", "blantyre@ufulufinance.com"] },
  { region: "Northern Region Hub", city: "Mzuzu", location: "Orton Chirwa Avenue", focus: "Coffee & Grain Smallholder Facilities, Agro-dealer Bridging, Women Cooperative Groups", contacts: ["Phone: +265 99 876 5432", "mzuzu@ufulufinance.com"] },
];

export const leaders = [
  { name: "Dr. Matthews Phiri", title: "Board Chairperson", category: "board", credentials: "PhD Development Economics · F.IoD", experience: "25+ Yrs Governance", expertise: ["Development Banking", "SADC Monetary Policies", "Fiduciary Stewardship"], bio: "Over 25 years of development banking and corporate governance leadership across Sub-Saharan Africa and Southern Africa Development Community (SADC).", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Chifundo Banda", title: "Chief Executive Officer / Managing Director", category: "executive", credentials: "MBA Finance · B.Sc Banking", experience: "18+ Yrs Microfinance", expertise: ["Grassroots MSME Credit", "Digital Wallets", "Sustainable Inclusion"], bio: "Pioneered grassroots MSME financing frameworks and digital credit deployment with extensive microfinance institutional management experience.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Tamika Gondwe", title: "Head of Credit Risk & Compliance", category: "executive", credentials: "Chartered Risk Analyst (CRA) · MSc", experience: "14+ Yrs Credit Risk", expertise: ["Underwriting Rigor", "Consumer Protection", "RBM Regulatory Compliance"], bio: "Chartered risk specialist overseeing underwriting rigor, customer protection policies, and prudential microfinance regulations.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { name: "Kelvin Mwanza", title: "Head of Operations & Digital Banking", category: "executive", credentials: "MSc FinTech · B.Sc Computer Science", experience: "12+ Yrs Digital Systems", expertise: ["Core Banking Automation", "Mobile Disbursement", "Branch Ops"], bio: "Leads branch operational logistics, core banking automation, and mobile wallet payment integrations across all regional centers.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Grace Mkandawire", title: "Non-Executive Director (Audit & Risk)", category: "board", credentials: "FCCA · CA (Malawi)", experience: "20+ Yrs Financial Audit", expertise: ["Internal Controls", "Prudential Assurance", "Audit Governance"], bio: "Fellow Chartered Certified Accountant (FCCA) with two decades of financial sector auditing and internal governance experience.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
  { name: "Patrick Chimwala", title: "Head of Agricultural Lending", category: "executive", credentials: "MSc Rural Agronomy · B.Sc Ag Econ", experience: "15+ Yrs Agri-Finance", expertise: ["Harvest-Cycle Facilities", "Input Packages", "Cooperative Credit"], bio: "Agronomist and rural finance practitioner championing harvest cycle credit, smallholder input packages, and cooperative lending.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" },
];

// ── Impact / Portfolio page ─────────────────────────────────────────────────
export const projects = [
  { title: "Solar Irrigation Pilot for Smallholders", category: "Green Agri-Finance", location: "Dedza & Mchinji Districts", description: "Financed 280 solar-powered water pump kits for commercial horticulture smallholders, replacing expensive petrol generators and enabling continuous dry-season harvest cycles.", metrics: "280 Pumps Installed · 42% Cost Reduction", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80" },
  { title: "Urban Market Vendor Liquidity Corridor", category: "MSME Working Capital", location: "Lilongwe (Area 2, Tsoka) & Blantyre (Limbe)", description: "Provided revolving micro-inventory credit to over 4,500 market traders, protecting them from predatory informal lenders and sustaining essential food supply chains.", metrics: "4,500+ Traders · MWK 1.2B Capital Rotated", image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80" },
  { title: "Chikondi Women Cooperative Revolving Fund", category: "Village Banking", location: "Central & Southern Regions", description: "Structured solidarity wholesale loans for 120 village savings clusters, enabling rural women to aggregate produce, purchase commercial trikes, and invest in grain mills.", metrics: "120 Clusters · 68% Female Borrowers", image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80" },
];

export const communityInitiatives = [
  { title: "Grassroots Financial Literacy Clinics", description: "Delivered 140 free in-person workshops across trading centers on bookkeeping, pricing discipline, and cashflow separation.", iconKey: "GraduationCap" },
  { title: "Agro-Forestry & Soil Restoration Pledge", description: "Planted over 25,000 indigenous trees across farming communities in Dedza and Kasungu to mitigate seasonal flood risks.", iconKey: "Trees" },
  { title: "Emergency Educational Hardship Grants", description: "Provided short-term relief advances and zero-interest hardship deferrals for families impacted by seasonal weather shocks.", iconKey: "HeartHandshake" },
];

export const successStories = [
  { name: "Grace Banda", enterprise: "Maize & Legume Aggregation", location: "Mchinji Boma", quote: "Before Ufulu Finance, informal lenders charged 40% per month, consuming all my profits. With Ufulu's Mlimi Harvest loan, I purchased certified seeds and rented a warehouse. My seasonal turnover doubled within two harvest cycles.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", statsText: "Turnover: +110% | 4 Seasonal Employees Hired" },
  { name: "Chikondi Phiri", enterprise: "Secondary School Educator & Poultry Farmer", location: "Lilongwe City", quote: "The Civil Servant advance was approved on the same day via Airtel Money. I invested in 500 broiler chicks and automated drinkers. The predictable salary deductions make repayment effortless.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", statsText: "500 Broilers Financed | 0 Loan Delinquencies" },
  { name: "Tikondane Women's Cluster", enterprise: "Vegetable Trading & Processing", location: "Limbe Market, Blantyre", quote: "Our village banking group received joint credit within 48 hours. We pooled our capital to purchase wholesale tomatoes and onions directly from Ntcheu growers, increasing our group savings reserve by 65%.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", statsText: "18 Women Members | 100% Repayment Record" },
];

// ── Website settings (offices + socials + hero/cta) ────────────────────────
export const websiteSettings = {
  siteName: "Ufulu Finance",
  tagline: "Loans, savings and financial freedom for every community.",
  aboutLine: "Ufulu Finance Limited is a non-deposit-taking microfinance institution registered and operating in Malawi, founded in 2016 in Lilongwe. We specialize in structured civil service loan facilities, private sector payroll lending, village banking community facilities, and expanding business financing.",
  footerAbout: "Dedicated to empowering everyday Malawians with transparent financial solutions, ethical microfinance, and fair credit to cultivate sustainable prosperity.",
  primaryEmail: "info@ufulufinance.com",
  supportEmail: "support@ufulufinance.com",
  loansEmail: "loans@ufulufinance.com",
  phone: "+265 99 123 4567",
  addressLine1: "City Centre, Area 3",
  addressLine2: "Lilongwe, Malawi",
  officeHours: "Mon – Fri, 8:00 AM – 5:00 PM",
  offices: [
    { label: "Lilongwe Head Office", city: "Lilongwe", address: "City Centre, Area 3, Lilongwe, Malawi", phone: "+265 99 123 4567", email: "info@ufulufinance.com", hours: "8:00 AM – 5:00 PM" },
    { label: "Blantyre Commercial Branch", city: "Blantyre", address: "Victoria Avenue, CBD, Blantyre, Malawi", phone: "+265 88 123 4567", email: "", hours: "8:00 AM – 5:00 PM" },
    { label: "Mzuzu Regional Office", city: "Mzuzu", address: "Katoto Commercial Area, Mzuzu, Malawi", phone: "+265 99 876 5432", email: "info@ufulufinance.com", hours: "8:00 AM – 5:00 PM" },
  ],
  socialLinks: [
    { platform: "facebook", name: "Facebook", url: "https://facebook.com" },
    { platform: "twitter", name: "X", url: "https://twitter.com" },
    { platform: "linkedin", name: "LinkedIn", url: "https://linkedin.com" },
    { platform: "instagram", name: "Instagram", url: "https://instagram.com" },
  ],
};
