/** Moves the sliding underline to the hovered, focused or current nav link. Only transform and opacity change. */
import type { FocusEvent, PointerEvent } from "react"

const NAV_SELECTOR = "[data-nav-links]"

function enableAt(nav: HTMLElement, link: HTMLElement): void {
  nav.style.setProperty("--indicator-x", `${link.offsetLeft}px`)
  nav.style.setProperty("--indicator-w", String(link.offsetWidth))
  if (nav.dataset.indicator !== "on") void nav.offsetWidth
  nav.dataset.indicator = "on"
}

function moveIndicator(nav: HTMLElement, link: HTMLElement | null): void {
  if (link) enableAt(nav, link)
  else nav.dataset.indicator = "off"
}

export function previewLink(event: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>): void {
  const link = event.currentTarget
  const nav = link.closest<HTMLElement>(NAV_SELECTOR)
  if (nav) moveIndicator(nav, link)
}

export function settleIndicator(): void {
  const nav = document.querySelector<HTMLElement>(NAV_SELECTOR)
  if (nav) moveIndicator(nav, nav.querySelector<HTMLElement>("[aria-current]"))
}
