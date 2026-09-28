import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/cms-data";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

function str(row: Record<string, unknown>, key: string): string | undefined {
  const value = row[key];
  if (value === undefined || value === null || String(value) === "") return undefined;
  return String(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = (await getArticleBySlug(slug).catch(() => null)) as Record<
    string,
    unknown
  > | null;

  if (!raw) {
    return { title: "Article Not Found", robots: { index: false, follow: false } };
  }

  const title = str(raw, "title") ?? "Insights & News";
  const description =
    str(raw, "excerpt") ?? "Insights and news from Ufulu Finance Malawi.";

  return pageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    image: str(raw, "image"),
    type: "article",
  });
}

export default async function ArticleLayout({ children, params }: Props) {
  const { slug } = await params;
  const raw = (await getArticleBySlug(slug).catch(() => null)) as Record<
    string,
    unknown
  > | null;

  return (
    <>
      {raw && (
        <>
          <JsonLd
            data={articleJsonLd({
              title: str(raw, "title") ?? "",
              description: str(raw, "excerpt"),
              url: absoluteUrl(`/blog/${slug}`),
              image: str(raw, "image"),
              datePublished: str(raw, "date")
                ? new Date(String(raw.date)).toISOString()
                : undefined,
              dateModified: str(raw, "updatedAt")
                ? new Date(String(raw.updatedAt)).toISOString()
                : undefined,
              author: str(raw, "author"),
            })}
          />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Insights & News", path: "/blog" },
              { name: str(raw, "title") ?? "Article", path: `/blog/${slug}` },
            ])}
          />
        </>
      )}
      {children}
    </>
  );
}
