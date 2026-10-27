import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import { TEXT_FILES } from "../lib/seo/files"
import { buildJsonLd } from "../lib/seo/json-ld"
import { renderAgents } from "../lib/seo/agents"
import { renderAgentsJson } from "../lib/seo/agents-json"
import { renderLlms } from "../lib/seo/llms"
import { renderRobots } from "../lib/seo/robots"
import { renderSitemap } from "../lib/seo/sitemap"

const ROOT = join(__dirname, "..")
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/
const FORBIDDEN_LD_KEYS = ["aggregateRating", "offers", "review", "price", "ratingValue", "interactionStatistic"]

function typeOf(node: { "@type": string }): string {
  return node["@type"]
}

function indexHtml(): string {
  return readFileSync(join(ROOT, "index.html"), "utf8")
}

function jsonLdFromIndex(): ReturnType<typeof buildJsonLd> {
  const match = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(indexHtml())
  return JSON.parse(match![1])
}

describe("robots.txt", () => {
  const robots = renderRobots(site)

  it("allows every named crawler", () => {
    for (const agent of ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"]) {
      expect(robots).toContain(`User-agent: ${agent}\nAllow: /`)
    }
  })

  it("never disallows a path", () => {
    expect(robots).not.toMatch(/^Disallow:/m)
  })

  it("names the sitemap on the canonical origin", () => {
    expect(robots).toContain("Sitemap: https://cheminventory.co/sitemap.xml")
  })
})

const TOPICS = "chemical inventory, orders, contacts and batch documents"
const STALE_LIST = /suppliers, purchasers, users and an audit log/i

function carriersOfDescription(): string[] {
  const files = [...TEXT_FILES.map((file) => file.render(site)), indexHtml(), JSON.stringify(buildJsonLd(site))]
  return files.filter((text) => text.includes(site.description))
}

describe("product description", () => {
  it("names inventory, orders, contacts and batch documents", () => {
    expect(site.description.toLowerCase()).toContain(TOPICS)
  })

  it("reaches llms.txt, agents.txt, the head tags and the JSON-LD", () => {
    expect(carriersOfDescription().length).toBeGreaterThanOrEqual(3)
  })

  it("never says the stale list again", () => {
    for (const text of [site.description, renderLlms(site), renderAgents(site), indexHtml()]) expect(text).not.toMatch(STALE_LIST)
  })
})

describe("sitemap.xml", () => {
  it("holds the canonical page in a urlset", () => {
    const sitemap = renderSitemap(site)
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(sitemap).toContain("<loc>https://cheminventory.co/</loc>")
  })
})

describe("llms.txt and agents.txt", () => {
  it("lists every feature and the demo link", () => {
    const llms = renderLlms(site)
    for (const feature of site.features) expect(llms).toContain(feature.title)
    expect(llms).toContain(site.links.demo)
  })

  it("forbids form posting and names a contact link", () => {
    const agents = renderAgents(site)
    expect(agents).toContain("Disallow: submit forms")
    expect(agents).toContain(`Contact: ${site.links.booking}`)
  })

  it("gives the agent rules as JSON with the booking link as the contact", () => {
    const rules = JSON.parse(renderAgentsJson(site))
    expect(rules.mayNotDo).toContain("submit forms")
    expect(rules.contact).toBe(site.links.booking)
    expect(rules.llms).toBe("https://cheminventory.co/llms.txt")
    expect(renderAgentsJson(site)).not.toMatch(EMAIL)
  })
})

describe("index.html head", () => {
  it("holds the canonical link, both theme colours and the social tags", () => {
    const html = indexHtml()
    expect(html).toContain('<link rel="canonical" href="https://cheminventory.co/" />')
    expect(html).toContain('media="(prefers-color-scheme: light)"')
    expect(html).toContain('media="(prefers-color-scheme: dark)"')
    expect(html).toContain('property="og:image" content="https://cheminventory.co/og.png"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
  })

  it("holds JSON-LD with an Organization and a SoftwareApplication", () => {
    const types = jsonLdFromIndex()["@graph"].map(typeOf)
    expect(types).toEqual(["Organization", "SoftwareApplication"])
  })

  it("holds no rating, price or count in the JSON-LD", () => {
    const text = JSON.stringify(jsonLdFromIndex())
    for (const key of FORBIDDEN_LD_KEYS) expect(text).not.toContain(`"${key}"`)
  })
})

describe("email addresses", () => {
  it("never appear in a generated or SEO file", () => {
    for (const file of TEXT_FILES) expect(file.render(site)).not.toMatch(EMAIL)
    expect(indexHtml()).not.toMatch(EMAIL)
  })
})
