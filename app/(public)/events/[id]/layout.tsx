import type { Metadata } from "next";
import { getEventBySlug } from "@/lib/cms-data";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbJsonLd, eventJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

function str(row: Record<string, unknown>, key: string): string | undefined {
  const value = row[key];
  if (value === undefined || value === null || String(value) === "") return undefined;
  return String(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const raw = (await getEventBySlug(id).catch(() => null)) as Record<
    string,
    unknown
  > | null;

  if (!raw) {
    return { title: "Event Not Found", robots: { index: false, follow: false } };
  }

  const title = str(raw, "title") ?? "Community Event";
  const description =
    str(raw, "description") ?? "A community event hosted by Ufulu Finance Malawi.";

  return pageMetadata({
    title,
    description,
    path: `/events/${id}`,
    image: str(raw, "image"),
    type: "article",
  });
}

export default async function EventLayout({ children, params }: Props) {
  const { id } = await params;
  const raw = (await getEventBySlug(id).catch(() => null)) as Record<
    string,
    unknown
  > | null;

  return (
    <>
      {raw && (
        <>
          <JsonLd
            data={eventJsonLd({
              title: str(raw, "title") ?? "",
              description: str(raw, "description"),
              url: absoluteUrl(`/events/${id}`),
              image: str(raw, "image"),
              startDate: str(raw, "date")
                ? new Date(String(raw.date)).toISOString()
                : undefined,
              location: str(raw, "location"),
            })}
          />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Insights & News", path: "/blog" },
              { name: str(raw, "title") ?? "Event", path: `/events/${id}` },
            ])}
          />
        </>
      )}
      {children}
    </>
  );
}
