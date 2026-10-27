/** WCAG contrast helpers for tests: relative luminance, contrast ratio and an sRGB mix of two hex colours. */
import { hexToChannels } from "../../lib/seo/palette"

function linear(channel: number): number {
  const value = channel / 255
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const [r, g, b] = hexToChannels(hex).map(linear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

function channelHex(value: number): string {
  return Math.round(value).toString(16).padStart(2, "0")
}

/** CSS color-mix(in srgb, first share%, second) as a hex colour. */
export function mix(first: string, second: string, share: number): string {
  const [a, b] = [hexToChannels(first), hexToChannels(second)]
  return `#${a.map((value, index) => channelHex(value * share + b[index] * (1 - share))).join("")}`
}
