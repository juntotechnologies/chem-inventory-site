/** Renders 404.html, the page GitHub Pages serves for unknown paths. */
import type { Site, ThemeTokens } from "../site-schema"
import { escapeHtml } from "./html"

function colourVars(tokens: ThemeTokens): string {
  return `--bg:${tokens.background};--fg:${tokens.foreground};--muted:${tokens.mutedForeground};--accent:${tokens.primary}`
}

function styles(site: Site): string {
  const { light, dark } = site.theme
  return [
    `:root{${colourVars(light)};color-scheme:light dark}`,
    `@media (prefers-color-scheme:dark){:root{${colourVars(dark)}}}`,
    "body{margin:0;min-height:100vh;display:grid;place-content:center;gap:16px;padding:24px;",
    "background:var(--bg);color:var(--fg);font:16px/1.5 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}",
    "h1{margin:0;font-size:2rem;letter-spacing:-.02em}p{margin:0;color:var(--muted)}",
    "a{color:var(--accent);font-weight:500}",
  ].join("")
}

function documentHead(site: Site): string {
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Page not found | ${escapeHtml(site.brand.name)}</title>
    <style>${styles(site)}</style>
  </head>`
}

function documentBody(site: Site): string {
  return `<body>
    <h1>Page not found</h1>
    <p>This page does not exist.</p>
    <a href="/">Go to ${escapeHtml(site.brand.name)}</a>
  </body>`
}

export function renderNotFound(site: Site): string {
  return `<!doctype html>\n<html lang="${site.language}">\n  ${documentHead(site)}\n  ${documentBody(site)}\n</html>\n`
}
