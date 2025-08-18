// /components/blocks/Newsletter.tsx
import { NewsletterBlock } from "@/types/strapi";

export function Newsletter({ title, description }: NewsletterBlock) {
  return (
    <section className="py-12 text-center border-t border-gray-200">
      <h3 className="text-2xl font-bold">{title}</h3>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
      <form className="mt-4 flex justify-center gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="px-4 py-2 border rounded-lg"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Subscribe</button>
      </form>
    </section>
  );
}
