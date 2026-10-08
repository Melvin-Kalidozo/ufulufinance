/**
 * Seed: Website Settings — Offices
 *
 * Updates (upserts) the singleton WebsiteSetting row with the full, current
 * list of Ufulu Finance branches.  Run with:
 *
 *   npx prisma db seed
 *
 * or directly:
 *
 *   node prisma/seed.mjs
 *
 * NOTE: Coordinates (lat/lng) are resolved client-side from OFFICE_COORDINATES
 * in app/(public)/contact/page.tsx and are NOT stored in the database.
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

const offices = [
  {
    city: "Lilongwe",
    label: "Lilongwe Head Office",
    address: "City Centre, Area 3, Lilongwe, Malawi",
    phone: "+265 99 123 4567",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM \u2013 5:00 PM",
  },
  {
    city: "Blantyre",
    label: "Blantyre Commercial Branch",
    address: "Victoria Avenue, CBD, Blantyre, Malawi",
    phone: "+265 88 123 4567",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM \u2013 5:00 PM",
  },
  {
    city: "Mzuzu",
    label: "Mzuzu Regional Office",
    address: "Katoto Commercial Area, Mzuzu, Malawi",
    phone: "+265 99 876 5432",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM \u2013 5:00 PM",
  },
  {
    city: "Kasungu",
    label: "Kasungu Region Branch",
    address: "Kasungu City Offices, Kasungu, Malawi",
    phone: "+265 998 02 91 46",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM \u2013 5:00 PM",
  },
  {
    city: "Zomba",
    label: "Zomba Region Branch",
    address: "Zomba Post Office, Zomba, Malawi",
    phone: "+265 999 67 94 44",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM \u2013 5:00 PM",
  },
  {
    city: "Karonga",
    label: "Karonga Region Branch",
    address: "Karonga Post Office, Karonga, Malawi",
    phone: "+265 994 37 54 44",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM \u2013 5:00 PM",
  },
];

async function main() {
  const result = await prisma.websiteSetting.upsert({
    where: { id: 1 },
    update: { offices },
    create: {
      id: 1,
      supportEmail: "support@ufulufinance.com",
      loansEmail: "loans@ufulufinance.com",
      phone: "+265 99 123 4567",
      addressLine1: "City Centre, Area 3, Lilongwe, Malawi",
      addressLine2: "Lilongwe",
      officeHours: "Mon \u2013 Fri, 8:00 AM \u2013 5:00 PM",
      mapEmbedUrl: "",
      offices,
    },
  });

  console.log("Updated WebsiteSetting id=" + result.id + " with " + offices.length + " offices:");
  offices.forEach((o) => console.log("  * " + o.label + " -- " + o.phone + " -- " + o.email));
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
