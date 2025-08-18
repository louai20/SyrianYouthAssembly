// /components/blocks/FAQs.tsx
import { FAQsBlock } from "@/types/strapi";

export function FAQs({ faq }: FAQsBlock) {
  return (
    <section className="py-12">
      {faq.map((item) => (
        <div key={item.id} className="mb-4">
          <h4 className="font-semibold">{item.question}</h4>
          <p className="text-gray-600">{item.answer}</p>
        </div>
      ))}
    </section>
  );
}
