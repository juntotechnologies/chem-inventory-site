/** Splits a heading around one accent word, so the page can give that word its own look. */

export function splitAccent(heading: string, word: string): [string, string, string] {
  const at = word ? heading.lastIndexOf(word) : -1
  if (at < 0) return [heading, "", ""]
  return [heading.slice(0, at), word, heading.slice(at + word.length)]
}
