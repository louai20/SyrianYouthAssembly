// /app/[slug]/page.tsx
import { renderBlock } from "@/lib/strapi";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.STRAPI_API_URL}/pages?filters[slug][$eq]=${slug}`,
    { next: { revalidate: 10 } }
  );
  const json = await res.json();

  const pageData = json.data?.[0]; // directly the page object
  if (!pageData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Site under maintenance</h1>
        <p className="mt-4 text-lg">Please check back later.</p>
      </main>
    );
  }

  const blocks = pageData.blocks || [];

  return (
    <main>
      {blocks.map((block: any) => renderBlock(block))}
    </main>
  );
}

// Static paths for SSG
export async function generateStaticParams() {
  const res = await fetch(`${process.env.STRAPI_API_URL}/pages`);
  const json = await res.json();
  const pages = json.data || [];

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}
