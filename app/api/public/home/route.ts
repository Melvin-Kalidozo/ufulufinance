import { ok } from "@/lib/api-helpers";
import { getHomeContent } from "@/lib/cms-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getHomeContent();
  return ok(data);
}
