import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/api-helpers";
import { cachedPublic } from "@/lib/public-cache";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await cachedPublic("public:settings", [], async () =>
    prisma.websiteSetting.findFirst()
  );
  return ok(settings ?? null);
}
