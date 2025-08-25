// src/types/strapi.ts

export type Image = {
  url: string
  alternativeText?: string
  width?: number;
  height?: number;
}


export type Link = {
  id: number
  label: string
  href: string
  isButtonLink: boolean
​​​​  isExternal: boolean
  type: string
}



// Global types for Strapi

export type Banner = {
  id: number
  isVisible: boolean
  description?: string
  image?: Image
}


export type Header = {
  id: number;
  logo: {
    id: number;
    label: string;
    href: string;
    // add image if needed
  };
  navItems: NavItem[];
  login_sys: any[]; // refine later if needed
};



export type SocialLink = {
  id: number
  url: string
  image?: Image
}


export type Footer = {
  logo?: Image
  navItems: NavItem[]
  socialLinks: SocialLink[]
}

// Single navigation item
export type NavItem = {
  id: number;
  href: string;
  label: string;
  isExternal?: boolean;
  isButtonLink?: boolean;
};

type GlobalResponse = {
  data: {
    id: number;
    documentId: string;
    title: string;
    banner: Banner;
    footer: Footer;
    header: Header;
  };
  meta: {};
};
// Block Types

export type HeroBlock = {
  id: number
  __component: "blocks.hero"
  heading: string          
  text?: string            
  links: Link[]
  image?: Image
}

export type SectionHeadingBlock = {
  id: number
  __component: "blocks.section-heading"
  heading: string
  subheading?: string
}

export type CardGridBlock = {
  id: number
  __component: "blocks.card-grid"
  cards: { id: number; title: string; description?: string }[]
}

export type ContentWithImageBlock = {
  id: number
  __component: "blocks.content-with-image"
  content: string
  link?: Link
  image?: Image
}

export type MarkdownBlock = {
  id: number
  __component: "blocks.markdown"
  body: string
}

export type PersonCardBlock = {
  id: number
  __component: "blocks.person-card"
  name: string
  role: string
  image?: Image
}

export type FAQsBlock = {
  id: number
  __component: "blocks.faqs"
  faq: { id: number; question: string; answer: string }[]
}

export type NewsletterBlock = {
  id: number
  __component: "blocks.newsletter"
  title: string
  description?: string
}

export type FeaturedArticlesBlock = {
  id: number
  __component: "blocks.featured-articles"
  articles: {
    id: number
    title: string
    featuredImage?: Image
    author?: { id: number; name: string }
  }[]
}

// Union of all blocks
export type PageBlock =
  | HeroBlock
  | SectionHeadingBlock
  | CardGridBlock
  | ContentWithImageBlock
  | MarkdownBlock
  | PersonCardBlock
  | FAQsBlock
  | NewsletterBlock
  | FeaturedArticlesBlock

export type Page = {
  id: number
  title: string
  slug: string
  blocks: PageBlock[]
}
