/** Closes the phone menu popover when a link inside it is chosen. */
import type { MouseEvent } from "react"

export function closeMenuOnLink(event: MouseEvent<HTMLElement>): void {
  const target = event.target
  if (target instanceof Element && target.closest("a")) event.currentTarget.hidePopover()
}
