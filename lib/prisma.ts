import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const raw = process.env.DATABASE_URL?.trim();
const connectionString =
  raw && (raw.startsWith("postgresql://") || raw.startsWith("postgres://")) && raw.includes("@")
    ? raw
    : "postgresql://postgres:1234@localhost:5432/ufulufinance";

// Global singleton — prevents Turbopack HMR from spawning multiple PrismaClient
// instances in dev, which causes the driver adapter model delegates to be lost.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

if (!globalForPrisma.prisma || !("product" in globalForPrisma.prisma)) {
  const adapter = new PrismaPg({ connectionString });
  globalForPrisma.prisma = new PrismaClient({
    adapter,
    transactionOptions: {
      maxWait: 10000,
      timeout: 15000,
    },
  });
}

export const prisma = globalForPrisma.prisma;
