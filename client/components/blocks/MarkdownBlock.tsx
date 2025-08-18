// /components/blocks/MarkdownBlock.tsx
import { MarkdownBlock } from "@/types/strapi";

export function Markdown({ body }: MarkdownBlock) {
  return <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: body }} />;
}
