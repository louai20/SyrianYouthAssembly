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

export type NavItem = {
  id: number
  label: string
  href: string
  isButtonLink: boolean
  isExternal: boolean
  type: string
}

export type SocialLink = {
  id: number
  url: string
  image?: Image
}

export type Banner = {
  link: Link
  image?: Image
}

export type Footer = {
  logo?: Image
  navItems: NavItem[]
  socialLinks: SocialLink[]
}

export type GlobalData = {
  banner?: Banner
  navbar?: {
    navItems: NavItem[]
  }
  footer?: Footer
}

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
