// /components/blocks/HeroSection.tsx
import Image from "next/image";
import { HeroBlock } from "@/types/strapi";

export function HeroSection({ heading, text, links, image }: HeroBlock) {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold">{heading}</h1>
      {text && <p className="mt-4 text-lg">{text}</p>}

      {image && (
        <div className="mx-auto mt-6 max-w-xl relative w-full h-64">
          <Image
            src={image.url.startsWith("http") ? image.url : `${"http://192.168.1.180:1337"}${image.url}`}
            alt={image.alternativeText ?? ""}
            width={image.width}
            height={image.height}
            style={{ objectFit: "cover", float: "right" }}
            priority
          />
        </div>
      )}

      {links?.length > 0 && (
        <div className="mt-6 flex justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
