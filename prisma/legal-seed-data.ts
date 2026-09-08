// Structured seed content for the CMS-managed Privacy Policy & Terms of Service.
// Each page: { title, sections: [{ heading, body?, bullets?: string[] }] }

export type LegalSeedSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type LegalSeedPage = {
  slug: string;
  title: string;
  sections: LegalSeedSection[];
};

export const legalSeedPages: LegalSeedPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    sections: [
      {
        heading: "Categories of Information We Collect",
        body: "Ufulu Finance Limited collects personal and financial data necessary to deliver lawful microfinance and credit assessment services under the Malawi Data Protection Act (2023).",
        bullets: [
          "Identity Records: National ID, passport number, full legal name, date of birth.",
          "Contact Data: Residential address, phone numbers, email, next of kin contacts.",
          "Economic & Payroll: Payslips, business turnover, employer details, bank statements.",
          "Credit Bureau Data: Historical repayment records, facilities, default indicators.",
        ],
      },
      {
        heading: "Purposes of Personal Data Processing",
        body: "We process your personal information strictly for legitimate commercial, operational, and statutory functions, including:",
        bullets: [
          "Credit Underwriting: Assessing repayment capacity, risk scoring, debt service ratios, and affordability evaluations.",
          "Account Administration: Generating payment schedules, issuing receipts, reconciling bank and mobile money disbursements.",
          "Statutory AML/CFT Screening: Verification against domestic and international sanction lists under the Financial Crimes Act.",
        ],
      },
      {
        heading: "Legal Grounds & Consent Framework",
        body: "Our data handling activities are founded upon lawful processing bases outlined in Section 12 of the Malawi Data Protection Act:",
        bullets: [
          "Contractual Necessity: Processing required to evaluate and execute the loan agreement you entered into with Ufulu Finance.",
          "Legal Obligation: Compliance with directives issued by the Reserve Bank of Malawi and the Financial Intelligence Authority.",
          "Explicit Consent: Explicit borrower consent obtained during application submission for voluntary communication and credit score inquiries.",
        ],
      },
      {
        heading: "Data Sharing & Third-Party Disclosures",
        body: "Ufulu Finance does not sell, rent, or trade your personal data to advertisers. We share information only with authorized entities under strict confidentiality contracts:",
        bullets: [
          "Credit Reference Bureaus: Transmission of borrower credit exposure pursuant to the Credit Reference Bureau Act.",
          "Regulatory Authorities: Reserve Bank of Malawi (RBM) and Financial Intelligence Authority (FIA) upon statutory demand.",
          "Payment Switch Partners: Commercial banks, Airtel Money, and TNM Mpamba to complete disbursements and collection reconciliations.",
          "Legal & Audit Advisors: Independent external financial auditors and legal counsel bound by professional non-disclosure duties.",
        ],
      },
      {
        heading: "Technical & Organisational Security Measures",
        body: "We deploy enterprise-grade security controls to prevent unauthorised access, accidental disclosure, loss, or alteration of confidential borrower files:",
        bullets: [
          "Encryption: TLS 1.3 encryption for web portal transmissions and AES-256 encryption at rest for customer databases.",
          "Access Governance: Role-based access restrictions (RBAC) with mandatory multi-factor authentication (MFA) for staff systems.",
          "Vulnerability Audits: Periodic penetration testing, external security reviews, and continuous automated threat monitoring.",
        ],
      },
      {
        heading: "Data Retention & Disposal Schedules",
        body: "In accordance with the Financial Crimes Act and Reserve Bank directives, borrower records and transaction files are retained for a minimum mandatory statutory duration of seven (7) years following final loan settlement and account closure.\n\nUpon expiration of the statutory retention window, data records are securely purged or permanently anonymized in accordance with industry sanitization standards.",
      },
      {
        heading: "Your Rights as a Data Subject",
        body: "Under the Malawi Data Protection Act 2023, you hold enforceable rights regarding your personal records held in our registries:",
        bullets: [
          "Right of Access: Request certified copies of all personal records and ledger summaries maintained about you.",
          "Right to Rectification: Require immediate correction of obsolete, inaccurate, or incomplete contact and income data.",
          "Right to Object: Object to processing for direct marketing or automated profiling beyond credit assessment rules.",
          "Right to Lodge a Complaint: Lodge formal concerns with the Malawi Data Protection Authority if rights are infringed.",
        ],
      },
      {
        heading: "Cookies & Digital Analytics Tracking",
        body: "Our digital web platforms use essential cookies to sustain user authentication sessions, enforce CSRF security tokens, and maintain operational stability.\n\nOptional analytics cookies are utilised to gather aggregated visit counts and interaction pathways. You can manage or disable optional cookie preferences through your web browser configuration settings.",
      },
      {
        heading: "Cross-Border Data Transfers",
        body: "Where customer cloud backup infrastructure or payment gateway processing involves secure transmission outside Malawi, Ufulu Finance guarantees that:",
        bullets: [
          "The recipient jurisdiction enforces data protection standards comparable to the Malawi Data Protection Act 2023.",
          "Appropriate Standard Contractual Clauses (SCCs) and encryption mandates are strictly executed.",
        ],
      },
      {
        heading: "Data Protection Officer & Inquiries",
        body: "To exercise any of your data rights, request clarification regarding our privacy practices, or raise concerns, please reach out to our dedicated Data Protection Officer:\n\nUfulu Finance Limited — Office of the DPO\nHead Office: Victoria Avenue, Blantyre, Republic of Malawi\nEmail: privacy@ufulufinance.com | Telephone: +265 (0) 1 772 400",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    sections: [
      {
        heading: "Acceptance of Terms & Agreement Framework",
        body: "By submitting a credit application, accessing the Ufulu Finance Limited digital portals, signing a facility sanction letter, or accepting loan proceeds (collectively, the \u201cServices\u201d), you expressly agree to be bound by these Terms of Service (\u201cTerms\u201d).\n\nThese Terms constitute a legally enforceable credit contract between you (the \u201cBorrower\u201d) and Ufulu Finance Limited (the \u201cLender\u201d). If you do not agree to these conditions, you must decline the credit offer and discontinue use of our facilities immediately.\n\nBinding Agreement Notice: Acceptance of loan proceeds through bank transfer or registered mobile money constitutes affirmative consent and irrevocable execution of the facility contract terms detailed herein.",
      },
      {
        heading: "Applicant Eligibility Criteria",
        body: "Credit facilities are offered strictly to applicants meeting our prudential assessment criteria. All applicants must fulfill the following baseline requirements at the date of loan underwriting:",
        bullets: [
          "Must be at least 18 years of age at submission",
          "Valid National ID card or biometric passport",
          "Verifiable income or operating business cash flows",
          "Clean or regularised Credit Reference Bureau standing",
        ],
      },
      {
        heading: "Transparent Interest, Fees & Disclosure",
        body: "In full compliance with Reserve Bank of Malawi consumer financial protection principles, every borrower receives a Key Facts Statement (KFS) prior to loan disbursement detailing:",
        bullets: [
          "Nominal Interest Rate & APR: Calculated transparently with no hidden administrative fees or unannounced compound levies.",
          "Processing & Statutory Charges: Upfront administration fees and loan insurance costs are explicitly disclosed prior to signature.",
          "Total Cost of Credit: The aggregate figure representing principal plus total accrued interest and statutory charges is signed off by both parties.",
        ],
      },
      {
        heading: "Authorised Repayment Channels & Verification",
        body: "Borrowers must remit all scheduled loan instalments through official, verifiable enterprise accounts. Ufulu Finance never solicits payments to individual employee accounts or non-registered phone numbers.",
        bullets: [
          "Bank Account Transfers: Direct deposit or EFT to designated commercial bank corporate accounts.",
          "Airtel Money Merchant: Official till code and merchant pay-bill with instant SMS transaction receipts.",
          "TNM Mpamba Biller: Verified biller name \u201cUFULU FINANCE\u201d with automated loan ledger reconciliation.",
        ],
      },
      {
        heading: "Facility Disbursement & Account Crediting",
        body: "Upon satisfactory document appraisal, identity validation, and execution of the facility agreement, approved funds are released directly to the borrower\u2019s verified Malawian commercial bank account or registered mobile money wallet.\n\nDisbursements are completed within 24 to 48 business hours post-approval. Ufulu Finance will transmit an electronic disbursement advice via SMS and email confirmation. The borrower is responsible for verifying receipt immediately and notifying us of any discrepancies within 2 business days.",
      },
      {
        heading: "Statutory MFI Governance & Regulatory Compliance",
        body: "Ufulu Finance Limited conducts microfinance operations under the Financial Services Act, the Microfinance Act, and relevant circulars promulgated by the Reserve Bank of Malawi.\n\nWe strictly enforce anti-money laundering (AML) and combating the financing of terrorism (CFT) obligations pursuant to the Financial Crimes Act. Any transactions deemed suspicious or contradictory to declared economic profiles will be flagged for compliance investigation and reporting to the Financial Intelligence Authority (FIA).",
      },
      {
        heading: "Credit Reference Bureau (CRB) Reporting",
        body: "Under the Credit Reference Bureau Act, licensed lenders are legally mandated to furnish performance histories of all credit facilities to licensed credit reference bureaus, including Credit Data CRB Ltd and Metropol CRB.",
        bullets: [
          "Positive Reporting: Timely payments enhance your credit score, facilitating higher limits and preferential future pricing.",
          "Default Notification: Accounts remaining in arrears beyond 60 calendar days are classified as non-performing and reported, which impairs access to borrowing across all Malawian financial institutions.",
        ],
      },
      {
        heading: "Early Repayment & Facility Settlement",
        body: "Borrowers retain the right to settle their outstanding facility balances in advance of the agreed contractual tenure. Ufulu Finance does not impose penal charges on early principal liquidations.\n\nTo request an early payoff calculation, the borrower should contact our accounts office for an official Full Settlement Statement. Unearned interest for future unexpired months is discounted in accordance with regulatory rebate schedules.",
      },
      {
        heading: "Client Grievances & Dispute Resolution",
        body: "We maintain an independent complaints procedure ensuring every borrower grievance is reviewed impartially:",
        bullets: [
          "Internal Lodgment: Submit your dispute in writing to our Customer Care Desk or via compliance@ufulufinance.com. We provide an acknowledgment ticket within 24 hours.",
          "Investigation Window: Our compliance team investigates and delivers a formal resolution determination within 14 calendar days.",
          "Escalation Authority: If dissatisfied, clients retain the right to appeal to the Registrar of Financial Institutions at the Reserve Bank of Malawi.",
        ],
      },
      {
        heading: "Governing Law & Legal Inquiries",
        body: "These Terms of Service and any loan facilities extended hereunder are governed by and construed in accordance with the substantive laws of the Republic of Malawi.\n\nBoth the borrower and Ufulu Finance Limited submit to the exclusive jurisdiction of the competent courts of Malawi in respect of any litigation or claims arising out of this agreement.\n\nUfulu Finance Limited — Legal Secretariat\nHead Office: Victoria Avenue, Blantyre, Republic of Malawi\nEmail: compliance@ufulufinance.com | Telephone: +265 (0) 1 772 400",
      },
    ],
  },
];
