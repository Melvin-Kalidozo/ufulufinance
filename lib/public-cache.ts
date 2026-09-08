import { unstable_cache } from "next/cache";

/**
 * Caches the result of an expensive public read (prisma query) across requests.
 * Values are JSON-sanitized so Date/Decimal fields survive cache round-trips.
 * Invalidated from the admin by revalidateTag("cms", { expire: 0 }).
 */
export function cachedPublic<T>(
  name: string,
  keyParts: string[],
  compute: () => Promise<T>,
  opts: { revalidate?: number; tags?: string[] } = {}
): Promise<T> {
  const cached = unstable_cache(
    async () => {
      const value = await compute();
      return JSON.parse(JSON.stringify(value)) as T;
    },
    [name, ...keyParts],
    {
      revalidate: opts.revalidate ?? 60,
      tags: opts.tags ?? ["cms"],
    }
  );
  return cached();
}
