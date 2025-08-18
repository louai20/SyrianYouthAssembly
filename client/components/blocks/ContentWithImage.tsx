// /components/blocks/ContentWithImage.tsx
import Image from "next/image";
import { ContentWithImageBlock } from "@/types/strapi";

export function ContentWithImage({ content, link, image }: ContentWithImageBlock) {
  return (
    <section className="py-12 flex flex-col md:flex-row items-center gap-6">
      <div className="md:w-1/2" dangerouslySetInnerHTML={{ __html: content }} />
      {image && (
        <div className="md:w-1/2 relative w-full h-64">
          <Image src={image.url} alt={image.alternativeText ?? ""} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      {link && (
        <a href={link.url} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          {link.title}
        </a>
      )}
    </section>
  );
}
