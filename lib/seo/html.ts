/** Small HTML helpers shared by the generated pages. */
const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }

function escapeChar(char: string): string {
  return ESCAPES[char]
}

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, escapeChar)
}

export function metaTag(attribute: "name" | "property", key: string, value: string): string {
  return `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`
}

export function safeJson(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c")
}
