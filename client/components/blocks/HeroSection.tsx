// /components/blocks/HeroSection.tsx
import Image from "next/image";
import { HeroBlock } from "@/types/strapi";

export function HeroSection({ heading, text, links, image }: HeroBlock) {
  return (
    <section
      className="relative bg-cover text-white rounded-lg overflow-hidden min-h-[600px] md:min-h-[500px]"
      style={{
        backgroundImage: `url(${image?.url?.startsWith("http") ? image?.url : `http://192.168.1.180:1337${image?.url}`})`,
        backgroundPosition: "-10% center", // move image down
        backgroundSize: "100% 100%",  
        backgroundRepeat: "no-repeat",  // prevents tiling
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 z-0"></div>

      {/* Hero content aligned right */}
      <div className="relative z-10 text-right max-w-2xl ml-auto mr-4 md:mr-8 py-30">
        <h1 className="text-7xl md:text-5xl font-extrabold mb-4">{heading}</h1>
        <p className="text-xl md:text-1xl mb-10 leading-relaxed font-bold ">{text}</p>

        {/* Links */}
        {links?.length > 0 && (
          <div className="flex justify-end gap-4">
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
      </div>
    </section>
  );
}
