// /components/blocks/MarkdownBlock.tsx
import { MarkdownBlock } from "@/types/strapi";
import { remark } from "remark";
import html from "remark-html";

export async function Markdown(block: MarkdownBlock) {
  console.log("Markdown content:", block.content); // log it to see

  if (!block.content) return null; // skip empty blocks
  
  const processedContent = await remark().use(html).process(block.content);

  const htmlContent = processedContent.toString();
 
  return (
    <div className="flex py-8 bg-gray-50 markdown">
      <div
        className="w-full max-w-[1200px] mx-auto text-right px-6 md:px-10 py-10 bg-white rounded-xl shadow-md markdown"
        dir="rtl"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};
  

