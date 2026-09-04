export interface Article {
  id: string;
  type: "blog" | "news";
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  authorImage?: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways?: string[];
  quote?: { text: string; author: string };
  image: string;
  isFeatured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "Upcoming" | "Past";
  description: string;
  details: string[];
  image: string;
}

export const ARTICLES: Article[] = [
  {
    id: "sme-working-capital-2026",
    type: "blog",
    title: "5 Working Capital Strategies for Malawian SMEs in 2026",
    category: "MSME Business",
    date: "November 17, 2026",
    author: "Chifundo Banda",
    authorRole: "Chief Executive Officer, Ufulu Finance",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    readTime: "5 min read",
    excerpt:
      "Managing liquidity during supplier lead times can determine small business survival. Here is how traders in Lilongwe balance seasonal stock purchases with predictable cash reserves.",
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    keyTakeaways: [
      "Separate business ledger from personal household accounts to track true inventory yield.",
      "Cash discounts from suppliers (5–8%) frequently outpace the nominal borrowing cost of short-term liquidity.",
      "Maintain a 30-day liquid reserve buffer against regional transport corridor delays.",
      "Utilize transparent microfinance facilities with no hidden fees rather than high-interest informal lenders.",
    ],
    quote: {
      text: "A business cannot grow on sporadic inventory. The traders who win in Malawi are those who secure predictable wholesale terms when everyone else is starved of liquidity.",
      author: "Chifundo Banda, CEO",
    },
    content: [
      "Working capital is the undisputed lifeblood of retail, wholesale, and agro-processing businesses across Malawi. For urban merchants in Lilongwe's Area 2, Area 25, or Limbe market in Blantyre, erratic freight cycles and unexpected supplier payment terms can bring thriving operations to a sudden standstill.",
      "1. Separate personal household finances from enterprise accounts. One of the most common pitfalls facing Malawian business owners is cash mingling. When family expenses draw directly from the daily sales till, understanding true gross profit margins versus turnover becomes impossible. Establishing a dedicated mobile money wallet or business bank account creates instant financial clarity.",
      "2. Negotiate supplier early-settlement discounts. Using a short-term microfinance line to pay wholesale suppliers in cash often unlocks a 5% to 8% discount on bulk orders. In fast-moving consumer goods (FMCG) and building materials, these savings far exceed the affordable interest charged on a 30-to-60 day microfinance facility.",
      "3. Avoid tying all free cash into slow-moving stock. Maintain an active inventory turnover ratio. Analyze your weekly top performers—whether edible cooking oil, maize flour, or construction hardware—and keep working capital focused strictly on high-velocity stock.",
      "4. Plan ahead for seasonal spikes. Whether stocking stationery ahead of school terms or fertilizer prior to planting windows, anticipatory borrowing 2 to 3 weeks before demand peaks ensures you secure the lowest supplier quotes.",
      "At Ufulu Finance, our MSME QuickGrowth credit line is designed specifically to bridge these liquidity intervals, disbursing approved funds directly to your Airtel Money or TNM Mpamba account within 24 hours.",
    ],
  },
  {
    id: "harvest-seasonal-credit",
    type: "blog",
    title: "Navigating Input Financing: How Farmers Maximize Harvest Yields",
    category: "Agri-Finance",
    date: "November 14, 2026",
    author: "Patrick Chimwala",
    authorRole: "Head of Agri-Finance & Field Operations",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    readTime: "4 min read",
    excerpt:
      "Timely fertilizer and hybrid seed distribution is essential for commercial smallholders. Understand structured repayment schedules aligned directly with harvest cycles.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Basal fertilizer applied within 14 days of germination increases maize output by up to 45%.",
      "Balloon harvest repayments relieve smallholders from monthly cash pressure during crop growth.",
      "Aggregating crops through farmer clubs unlocks premium bulk pricing from commercial off-takers.",
    ],
    quote: {
      text: "When credit aligns with the agricultural calendar rather than rigid monthly bank schedules, Malawian smallholders transform into resilient commercial agribusinesses.",
      author: "Patrick Chimwala, Agri Lead",
    },
    content: [
      "Timing represents over 60% of crop yield outcomes in rain-fed Malawian agriculture. Farmers who apply basal fertilizer within the first 14 days of germination experience significantly higher bag outputs per hectare compared to those delayed by cash shortages.",
      "Traditional commercial bank loans demand monthly cash repayments—a structure fundamentally misaligned with agricultural production cycles where crops take 4 to 6 months to mature and sell.",
      "Ufulu Finance's Mlimi Harvest facility offers complete repayment grace periods until harvesting and market aggregation take place. By partnering directly with certified agro-dealers, we ensure inputs reach farm gates on schedule.",
      "We also support farmer clubs with structured off-taker contracts, eliminating predatory middlemen and ensuring farmers retain the full value of their harvest.",
    ],
  },
  {
    id: "digital-money-disbursements",
    type: "news",
    title: "Ufulu Finance Upgrades Instant Mobile Settlement System",
    category: "Company News",
    date: "November 10, 2026",
    author: "Corporate Communications",
    authorRole: "Ufulu Media Team",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    readTime: "3 min read",
    excerpt:
      "Borrowers can now receive loan funds directly into their Airtel Money or TNM Mpamba wallets within 15 minutes of digital contract signing.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Direct integration with Airtel Money and TNM Mpamba core switches.",
      "Disbursement turnaround reduced to under 15 minutes post-approval.",
      "Zero transport costs or branch queues for rural borrowers.",
    ],
    content: [
      "In our ongoing commitment to eliminate unnecessary branch queues and transportation expenses for rural clients, Ufulu Finance has deployed a next-generation core banking integration with Malawi's leading mobile network operators.",
      "Under this system, once a credit application is approved and digitally acknowledged by the applicant, loan proceeds are credited directly into the borrower's registered Airtel Money or TNM Mpamba wallet within minutes.",
      "This upgrade removes the burden of travelling to urban centres to collect paper cheques or cash payouts, allowing entrepreneurs in rural trading hubs to put their financing to work immediately.",
    ],
  },
  {
    id: "village-banking-dynamics",
    type: "blog",
    title: "Village Banking Best Practices: Group Dynamics & Social Collateral",
    category: "Financial Literacy",
    date: "November 05, 2026",
    author: "Tamika Gondwe",
    authorRole: "Head of Credit Risk & Compliance",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    readTime: "6 min read",
    excerpt:
      "Community group lending succeeds when built on social trust, clear record-keeping, and mutual accountability. Read our field officer guide to group governance.",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Group sizes between 10 to 15 members deliver the optimal balance of peer support and accountability.",
      "Weekly or bi-weekly meetings reinforce transparent ledger updates and community solidarity.",
      "Clear emergency contingency funds protect group credit scores when unforeseen hardships arise.",
    ],
    quote: {
      text: "Social collateral is the most powerful financial asset in Africa. When neighbors hold each other's trust, capital flows without the need for land titles or vehicle logbooks.",
      author: "Tamika Gondwe, Credit Risk",
    },
    content: [
      "Group lending turns community solidarity into an asset. When 10 to 15 women co-guarantee each other's loans, the need for conventional collateral like land titles or vehicle logbooks disappears.",
      "The foundation of successful village banking is absolute transparency. Maintaining open ledger records during every group gathering ensures complete clarity on balances, repayments, and accrued emergency reserves.",
      "Ufulu Finance supports over 450 village banking clusters across Lilongwe, Dedza, and Blantyre with structured financial literacy training, assisting groups to graduate into higher-tier institutional credit facilities.",
    ],
  },
  {
    id: "mzuzu-branch-launch",
    type: "news",
    title: "Official Launch of Ufulu Finance Northern Regional Hub in Mzuzu",
    category: "Company News",
    date: "October 28, 2026",
    author: "Corporate Communications",
    authorRole: "Ufulu Media Team",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    readTime: "3 min read",
    excerpt:
      "Expanding our footprint to serve agro-dealers, coffee growers, and cross-border traders across the Northern Region with dedicated advisory.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Full-service branch established on Katoto Commercial Area / Orton Chirwa Avenue, Mzuzu.",
      "Multilingual credit team fluent in Tumbuka, Tonga, and English.",
      "Tailored financing packages for Northern Region coffee farmers and cross-border traders.",
    ],
    content: [
      "Ufulu Finance has officially opened its full-service regional hub in Mzuzu, located at Katoto Commercial Area along Orton Chirwa Avenue.",
      "The new branch is staffed by dedicated loan officers fluent in Tumbuka and English, equipped to serve agricultural producers from Rumphi, Mzimba, and Nkhatabay, as well as retail merchants in Mzuzu Central Market.",
      "With this Northern opening, Ufulu Finance now maintains a physical operational hub in all three regions of Malawi, backed by nationwide mobile money delivery channels.",
    ],
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "lilongwe-sme-clinic",
    title: "Lilongwe MSME Cashflow & Tax Record Clinic",
    date: "December 12, 2026",
    time: "9:00 AM – 1:00 PM",
    location: "Ufulu Conference Hall, Area 3, Lilongwe",
    status: "Upcoming",
    description:
      "A free, hands-on workshop for retail traders and stall operators on separating business cashflow from personal expenses, preparing basic cashbooks, and managing supplier credit.",
    details: [
      "Led by chartered accountants and SME advisors",
      "Complimentary cashbook and budgeting template provided",
      "One-on-one credit assessment pre-qualification available",
      "Refreshments provided for registered attendees",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dedza-agri-fair",
    title: "Dedza Smallholder Input & Cooperative Forum",
    date: "January 15, 2027",
    time: "10:00 AM – 3:30 PM",
    location: "Dedza Community Center",
    status: "Upcoming",
    description:
      "Bringing certified seed producers, soil fertility specialists, and Ufulu credit officers together to structure seasonal financing for farming clubs.",
    details: [
      "Seed supplier exhibition and soil testing vouchers",
      "Club credit pre-approvals for the upcoming crop window",
      "Session on commodity aggregation and price hedging",
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "blantyre-women-summit",
    title: "Southern Region Women in Enterprise Symposium",
    date: "September 24, 2026",
    time: "9:00 AM – 4:00 PM",
    location: "Mount Soche Hotel, Blantyre",
    status: "Past",
    description:
      "Celebrating the graduation of 350 women entrepreneurs from Ufulu’s 12-week financial management masterclass.",
    details: [
      "Keynote by Ministry of Gender officials",
      "Over MWK 80M in cooperative enterprise credit disbursed",
      "Networking and business trade exhibition",
    ],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
];

export function getArticleById(id: string): Article | undefined {
  return ARTICLES.find((art) => art.id === id);
}

export function getRelatedArticles(currentId: string, limit = 3): Article[] {
  return ARTICLES.filter((art) => art.id !== currentId).slice(0, limit);
}

export function getEventById(id: string): EventItem | undefined {
  return EVENTS.find((evt) => evt.id === id);
}

export function getOtherEvents(currentId: string, limit = 2): EventItem[] {
  return EVENTS.filter((evt) => evt.id !== currentId).slice(0, limit);
}
