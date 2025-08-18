// /components/blocks/SectionHeading.tsx
import { SectionHeadingBlock } from "@/types/strapi";

export function SectionHeading({ heading, subheading }: SectionHeadingBlock) {
  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold">{heading}</h2>
      {subheading && <p className="mt-2 text-lg text-gray-600">{subheading}</p>}
    </section>
  );
}
