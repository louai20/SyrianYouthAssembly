// /components/blocks/CardGrid.tsx
import { CardGridBlock } from "@/types/strapi";

export function CardGrid({ cards }: CardGridBlock) {
  return (
    <section className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">{card.title}</h3>
          {card.description && <p className="mt-2 text-gray-600">{card.description}</p>}
        </div>
      ))}
    </section>
  );
}
