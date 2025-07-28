// components/blocks/Hero.tsx
import Image from "next/image";

export type Link = {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: 'PRIMARY' | 'SECONDARY' | string;
};

export type HeroBlockProps = {
  data: {
    heading: string;
    text: string;
    links: Link[];
    image?: {
      id: number;
      alternativeText: string | null;
      url: string;
    };
  };
};
export default function Hero({ data }: HeroBlockProps) {

return (
    <section className="hero">
      <h1>{data.heading}</h1>
      <p>{data.text}</p>

      <div className="links">
        {data.links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target={link.isExternal ? "_blank" : "_self"}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
            className={link.isButtonLink ? `btn btn-${link.type.toLowerCase()}` : ""}
          >
            {link.label}
          </a>
        ))}
      </div>

      {data.image && (
        <Image
          src={data.image.url}
          alt={data.image.alternativeText || "Hero image"}
          width={1200}
          height={600}
          priority
        />
      )}
    </section>
  );
}