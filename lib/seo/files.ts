/** The table of generated files: where each one lives and what renders it. */
import type { Site } from "../site-schema"
import { renderAgents } from "./agents"
import { renderAgentsJson } from "./agents-json"
import { renderCname } from "./cname"
import { renderFaviconSvg, renderOgSvg, renderTouchIconSvg } from "./graphics"
import { renderLlms } from "./llms"
import { renderNotFound } from "./not-found"
import { renderPaletteCss } from "./palette"
import { renderRobots } from "./robots"
import { renderSitemap } from "./sitemap"

export type TextFile = { path: string; render: (site: Site) => string }
export type ImageFile = { path: string; width: number; svg: (site: Site) => string }

function renderPaletteFile(site: Site): string {
  return renderPaletteCss(site.theme)
}

export const INDEX_HTML_PATH = "index.html"

export const TEXT_FILES: TextFile[] = [
  { path: "public/robots.txt", render: renderRobots },
  { path: "public/sitemap.xml", render: renderSitemap },
  { path: "public/llms.txt", render: renderLlms },
  { path: "public/agents.txt", render: renderAgents },
  { path: "public/.well-known/agents.json", render: renderAgentsJson },
  { path: "public/CNAME", render: renderCname },
  { path: "public/404.html", render: renderNotFound },
  { path: "public/favicon.svg", render: renderFaviconSvg },
  { path: "app/color-palette.css", render: renderPaletteFile },
]

export const IMAGE_FILES: ImageFile[] = [
  { path: "public/og.png", width: 1200, svg: renderOgSvg },
  { path: "public/apple-touch-icon.png", width: 180, svg: renderTouchIconSvg },
]
