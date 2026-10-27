/** Reads app/globals.css for tests: the rule bodies behind a selector and the block behind an at-rule query. */
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const css = readFileSync(join(__dirname, "..", "..", "app/globals.css"), "utf8")

function braceChange(char: string): number {
  if (char === "{") return 1
  return char === "}" ? -1 : 0
}

/** The text inside the braces that follow the query. Braces are counted, so nested rules stay inside. */
export function blockAfter(query: string): string {
  const open = css.indexOf(query) + query.length
  let depth = 1
  let at = open
  while (depth > 0 && at < css.length) depth += braceChange(css[at++])
  return css.slice(open, at - 1)
}

/** The body of every flat rule whose selector matches. */
export function bodiesFor(selector: RegExp): string[] {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  return rules.filter((rule) => selector.test(rule[1])).map((rule) => rule[2])
}
