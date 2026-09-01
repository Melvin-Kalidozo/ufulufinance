import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { UserRole } from "@prisma/client";

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  const admins = [
    {
      name: "System Admin",
      email: "admin@ufulufinance.com",
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  ];

  for (const user of admins) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!existing) {
      await prisma.user.create({ data: user });
      console.log(`Created admin: ${user.email}`);
    } else {
      console.log(`Admin already exists: ${user.email}`);
    }
  }

  const demoCustomer = await prisma.user.findUnique({
    where: { email: "customer@ufulufinance.com" },
  });
  if (!demoCustomer) {
    await prisma.user.create({
      data: {
        name: "Demo Customer",
        email: "customer@ufulufinance.com",
        passwordHash,
        role: UserRole.CUSTOMER,
        isActive: true,
        emailVerifiedAt: new Date(),
        phone: "+265 000 000 000",
      },
    });
    console.log("Created demo customer: customer@ufulufinance.com");
  } else {
    console.log("Demo customer already exists");
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
