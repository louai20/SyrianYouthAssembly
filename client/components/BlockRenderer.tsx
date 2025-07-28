// components/BlockRenderer.tsx
import SectionHeading from "./blocks/SectionHeading";
import Hero from "@/components/blocks/Hero";
// ...import other blocks

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const { __component } = block;

        switch (__component) {
          case "blocks.hero":
            return <Hero key={index} data={block} />;
          case "blocks.section-heading":
            return <SectionHeading key={index} data={block} />;
          case "blocks.card-grid":
            return <CardGrid key={index} data={block} />;
          // Add other blocks similarly...
          default:
            return null;
        }
      })}
    </>
  );
}
