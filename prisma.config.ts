import "dotenv/config";
import { defineConfig } from "prisma/config";

// Neon pooler appends &channel_binding=require, which Prisma's migration engine
// cannot negotiate. Runtime uses the @prisma/adapter-pg driver (lib/prisma.ts)
// which handles it fine, so here we strip it for CLI/migrate/seed only.
const dbUrl = (process.env["DATABASE_URL"] ?? "").replace(
  "&channel_binding=require",
  ""
);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: dbUrl,
  },
});
