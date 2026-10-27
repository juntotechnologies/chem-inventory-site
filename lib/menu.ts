/** The phone menu glue: close on a link, make the page inert while the menu is open, focus the first link, close when the screen widens. */
import type { MouseEvent, ToggleEvent } from "react"

export const MENU_ID = "mobile-menu"
/** The same width as the Tailwind `md` breakpoint, where the burger gives way to the header links. A test compares the two. */
export const WIDE_QUERY = "(min-width: 768px)"

const PAGE_REGIONS = ":scope > :not(header)"

type Inertable = { inert: boolean }

export function closeMenuOnLink(event: MouseEvent<HTMLElement>): void {
  const target = event.target
  if (target instanceof Element && target.closest("a")) event.currentTarget.hidePopover()
}

export function isOpening(event: { newState: string }): boolean {
  return event.newState === "open"
}

export function setInert(regions: Iterable<Inertable>, inert: boolean): void {
  for (const region of regions) region.inert = inert
}

function pageBehind(panel: HTMLElement): Iterable<HTMLElement> {
  return panel.closest("header")?.parentElement?.querySelectorAll<HTMLElement>(PAGE_REGIONS) ?? []
}

/** On open: the page behind turns inert and focus moves into the menu. On close: the page wakes again and the browser returns focus to the button. */
export function syncPage(event: ToggleEvent<HTMLElement>): void {
  const opening = isOpening(event)
  setInert(pageBehind(event.currentTarget), opening)
  if (opening) event.currentTarget.querySelector("a")?.focus()
}

function closeAtWide(event: MediaQueryListEvent): void {
  if (event.matches) document.getElementById(MENU_ID)?.hidePopover()
}

function stopWatching(wide: MediaQueryList): void {
  wide.removeEventListener("change", closeAtWide)
}

/** A wide screen hides the burger, so an open menu must close with it. Otherwise the page stays inert and locked. */
export function watchWidth(): () => void {
  const wide = window.matchMedia(WIDE_QUERY)
  wide.addEventListener("change", closeAtWide)
  return stopWatching.bind(null, wide)
}
