/** Declared schema for site.json, the single source of site facts. */
import { z } from "zod"

const MAX_STATEMENT_WORDS = 20

const hex = z.string().regex(/^#[0-9a-f]{6}$/i, "expected a #rrggbb colour")
const httpsUrl = z.string().url().startsWith("https://")

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

const Screenshot = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const FeatureSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  statement: z.string().refine((text) => countWords(text) <= MAX_STATEMENT_WORDS, {
    message: `a statement holds ${MAX_STATEMENT_WORDS} words or fewer`,
  }),
  screenshot: Screenshot.nullable(),
})

const ThemeTokensSchema = z.object({
  background: hex,
  foreground: hex,
  card: hex,
  cardForeground: hex,
  popover: hex,
  popoverForeground: hex,
  primary: hex,
  primaryForeground: hex,
  secondary: hex,
  secondaryForeground: hex,
  muted: hex,
  mutedForeground: hex,
  accent: hex,
  accentForeground: hex,
  destructive: hex,
  destructiveForeground: hex,
  border: hex,
  input: hex,
  ring: hex,
})

const Brand = z.object({
  name: z.string().min(1),
  alias: z.string().min(1),
  fullName: z.string().min(1),
  maker: z.object({ name: z.string().min(1), url: httpsUrl }),
  markPath: z.string().min(1),
})

const Seo = z.object({
  crawlers: z.array(z.string().min(1)).min(1),
  pages: z.array(z.object({ path: z.string().startsWith("/") })).min(1),
  agentsMay: z.array(z.string().min(1)).min(1),
  agentsMayNot: z.array(z.string().min(1)).min(1),
  og: z.object({
    image: z.string().startsWith("/"),
    width: z.literal(1200),
    height: z.literal(630),
    alt: z.string().min(1),
  }),
})

export const SiteSchema = z.object({
  domain: z.string().min(1),
  url: httpsUrl.endsWith("/"),
  language: z.string().length(2),
  locale: z.string().regex(/^[a-z]{2}_[A-Z]{2}$/),
  brand: Brand,
  headline: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().min(50).max(160),
  links: z.object({ demo: httpsUrl, booking: httpsUrl, hub: httpsUrl }),
  features: z.array(FeatureSchema).min(4).max(6),
  theme: z.object({ light: ThemeTokensSchema, dark: ThemeTokensSchema }),
  seo: Seo,
})

export type Site = z.infer<typeof SiteSchema>
export type Feature = z.infer<typeof FeatureSchema>
export type ThemeTokens = z.infer<typeof ThemeTokensSchema>
