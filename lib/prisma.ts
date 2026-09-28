import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const raw = process.env.DATABASE_URL?.trim();
const connectionString =
  raw && (raw.startsWith("postgresql://") || raw.startsWith("postgres://")) && raw.includes("@")
    ? raw
    : "postgresql://postgres:1234@localhost:5432/ufulufinance";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  transactionOptions: {
    maxWait: 10000,
    timeout: 15000,
  },
});

export { prisma };
