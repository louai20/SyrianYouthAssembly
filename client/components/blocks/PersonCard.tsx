// /components/blocks/PersonCard.tsx
import Image from "next/image";
import { PersonCardBlock } from "@/types/strapi";

export function PersonCard({ name, role, image }: PersonCardBlock) {
  return (
    <div className="p-6 border rounded-lg text-center">
      {image && (
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
          <Image src={image.url} alt={image.alternativeText ?? ""} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-4 text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
