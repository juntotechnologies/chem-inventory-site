/** Fills {name} slots in a label with values. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  let result = template
  for (const [name, value] of Object.entries(values)) result = result.replaceAll(`{${name}}`, value)
  return result
}
