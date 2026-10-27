/** Builds the matchers for the banned claim words and finds them in a text. */
import rules from "./copy-rules.json"

const SUFFIXES = "(s|es|d|ed|ing|ment|ments)?"

function isAcronym(term: string): boolean {
  return term === term.toUpperCase() && !/[\s-]/.test(term)
}

function escapeTerm(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s-]+/g, "[- ]")
}

function buildMatcher(term: string): RegExp {
  if (isAcronym(term)) return new RegExp(`\\b${term}\\b`)
  return new RegExp(`\\b${escapeTerm(term)}${SUFFIXES}\\b`, "i")
}

const MATCHERS = rules.bannedClaims.map((term) => ({ term, matcher: buildMatcher(term) }))

export function bannedClaimsIn(text: string): string[] {
  return MATCHERS.filter(({ matcher }) => matcher.test(text)).map(({ term }) => term)
}
