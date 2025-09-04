// /src/app/LandingPage/page.tsx
import { renderBlock } from "@/lib/strapi";
import { PageBlock } from "@/types/strapi";

async function getLandingPageData(): Promise<PageBlock[] | null> {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/landing-page`, {
      next: { revalidate: 10 } // ISR caching
    });
    if (!res.ok) return null;
    const data = await res.json();

    // access blocks directly from data.data
    return data?.data?.blocks || null;
  } catch (err) {
    console.error("Error fetching scholarships page:", err);
    return null;
  }
}

export default async function LandingPage() {
  const blocks = await getLandingPageData();
  console.log("Home page blocks:", blocks);

  if (!blocks || blocks.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">الصفحة قيد الإنشاء</h1>
        <p className="mt-4 text-lg">يرجى التحقق لاحقاً.</p>
      </main>
    );
  }

  return (
    <main>
      {await Promise.all(blocks.map(block => renderBlock(block)))}
    </main>
  );
}
