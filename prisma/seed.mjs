/**
 * Seed: Website Settings — Offices
 *
 * Updates (upserts) the singleton WebsiteSetting row with the full, current
 * list of Ufulu Finance branches including verified GPS coordinates (lat, lng).
 * Run with:
 *
 *   npx prisma db seed
 *
 * or directly:
 *
 *   node prisma/seed.mjs
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
    address: "Mandala Road, Area 3, Lilongwe, Malawi",
    phone: "+265 99 123 4567",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -13.98774,
    lng: 33.76651,
  },
  {
    city: "Blantyre",
    label: "Blantyre Commercial Branch",
    address: "Victoria Avenue, CBD, Blantyre, Malawi",
    phone: "+265 88 123 4567",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -15.78853,
    lng: 35.00483,
  },
  {
    city: "Mzuzu",
    label: "Mzuzu Regional Office",
    address: "Katoto Commercial Area, Mzuzu, Malawi",
    phone: "+265 99 876 5432",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -11.45916,
    lng: 34.00955,
  },
  {
    city: "Kasungu",
    label: "Kasungu Region Branch",
    address: "Kasungu City Offices, Kasungu, Malawi",
    phone: "+265 998 02 91 46",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -13.03199,
    lng: 33.48286,
  },
  {
    city: "Zomba",
    label: "Zomba Region Branch",
    address: "Zomba Post Office, Zomba, Malawi",
    phone: "+265 999 67 94 44",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -15.3858,
    lng: 35.319,
  },
  {
    city: "Karonga",
    label: "Karonga Region Branch",
    address: "Karonga Post Office, Karonga, Malawi",
    phone: "+265 994 37 54 44",
    email: "loans@ufulufinance.com",
    hours: "8:00 AM – 5:00 PM",
    lat: -9.9386,
    lng: 33.9269,
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
      officeHours: "Mon – Fri, 8:00 AM – 5:00 PM",
      mapEmbedUrl: "",
      offices,
    },
  });

  console.log("Updated WebsiteSetting id=" + result.id + " with " + offices.length + " offices:");
  offices.forEach((o) => console.log("  * " + o.label + " -- " + o.phone + " -- " + o.email + " (lat: " + o.lat + ", lng: " + o.lng + ")"));
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
