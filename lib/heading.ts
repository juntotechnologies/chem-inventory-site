/** Splits a heading around one accent word, so the page can give that word its own look. */

/** The text before the last match of the word, the word, and the text after it. A missing word leaves the heading whole. */
export function splitAccent(heading: string, word: string): [string, string, string] {
  const at = word ? heading.lastIndexOf(word) : -1
  if (at < 0) return [heading, "", ""]
  return [heading.slice(0, at), word, heading.slice(at + word.length)]
}
