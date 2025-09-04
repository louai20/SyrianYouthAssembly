// /src/lib/strapi.tsx
import { PageBlock } from "@/types/strapi";
import { HeroSection } from "@/components/blocks/HeroSection";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import { CardGrid } from "@/components/blocks/CardGrid";
import { ContentWithImage } from "@/components/blocks/ContentWithImage";
import { Markdown } from "@/components/blocks/MarkdownBlock";
import { PersonCard } from "@/components/blocks/PersonCard";
import { FAQs } from "@/components/blocks/FAQs";
import { Newsletter } from "@/components/blocks/Newsletter";
import { FeaturedArticles } from "@/components/blocks/FeaturedArticles";
import { GlobalResponse } from "@/types/strapi";

export async function renderBlock(block: PageBlock) {
  switch (block.__component) {
    case "blocks.hero":
      return <HeroSection key={block.id} {...block} />
    case "blocks.section-heading":
      return <SectionHeading key={block.id} {...block} />
    case "blocks.card-grid":
      return <CardGrid key={block.id} {...block} />
    case "blocks.content-with-image":
      return <ContentWithImage key={block.id} {...block} />
    case "blocks.markdown":
      return await <Markdown key={block.id} {...block} />
    case "blocks.person-card":
      return <PersonCard key={block.id} {...block} />
    case "blocks.faqs":
      return <FAQs key={block.id} {...block} />
    case "blocks.newsletter":
      return <Newsletter key={block.id} {...block} />
    case "blocks.featured-articles":
      return <FeaturedArticles key={block.id} {...block} />
    default:
      return null
  }
}

export async function fetchPage(slug: string) {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/pages/?filters[slug][$eq]=${slug}`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) return null; // return null instead of throwing

    const data = await res.json();

    // Strapi usually returns data -> attributes -> blocks
    const blocks: PageBlock[] = data?.data?.attributes?.blocks || [];

    return blocks.length > 0 ? blocks : null; // return null if empty
  } catch (err) {
    console.error("Error fetching page:", err);
    return null;
  }
}

export async function fetchGlobalData(): Promise<GlobalResponse> {
  const res = await fetch(`${process.env.STRAPI_API_URL}/global`, {
      next: { revalidate: 10 },
    });
  if (!res.ok) return null;
  const data = await res.json();
  console.log("Global data fetched:", data);
  return data.data;
}