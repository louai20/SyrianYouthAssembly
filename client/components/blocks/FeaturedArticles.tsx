// /components/blocks/FeaturedArticles.tsx
import Image from "next/image";
import { FeaturedArticlesBlock } from "@/types/strapi";

export function FeaturedArticles({ articles }: FeaturedArticlesBlock) {
  return (
    <section className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="border rounded-lg overflow-hidden">
          {article.featuredImage && (
            <div className="relative w-full h-48">
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alternativeText ?? ""}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            {article.author && <p className="text-gray-600 mt-1">{article.author.name}</p>}
          </div>
        </div>
      ))}
    </section>
  );
}
