// /components/blocks/HeroSection.tsx
import Image from "next/image";
import { HeroBlock } from "@/types/strapi";

export function HeroSection({ heading, text, links, image }: HeroBlock) {
  return (
  <section
    className="relative bg-cover bg-center text-white py-20 px-4 rounded-lg overflow-hidden"
    style={{ backgroundImage: `url(${image?.url.startsWith("http") ? image?.url : `${"http://192.168.1.180:1337"}${image?.url}`})` }}
  >
    <div className="absolute inset-0 bg-primary-700 opacity-75 pointer-events-none"></div>
    <div className="relative z-10 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{heading}</h1>
      <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">{text}</p>
    </div>
    
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
