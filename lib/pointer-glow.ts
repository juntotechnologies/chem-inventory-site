/** Pointer glow: writes the pointer position onto the button, card or hero under it. CSS draws and eases the light. */
import { useEffect } from "react"

import { offsetIn, px } from "@/lib/geometry"

type Target = { selector: string; x: string; y: string }

const TARGETS: Target[] = [
  { selector: ".btn, .lift", x: "--gx", y: "--gy" },
  { selector: ".hero", x: "--hx", y: "--hy" },
]
const HOVER = "(hover: hover) and (pointer: fine)"
const STILL = "(prefers-reduced-motion: reduce)"

function canFollow(): boolean {
  return window.matchMedia(HOVER).matches && !window.matchMedia(STILL).matches
}

function place(event: PointerEvent, element: HTMLElement, target: Target): void {
  const { x, y } = offsetIn(element.getBoundingClientRect(), event)
  element.style.setProperty(target.x, px(x))
  element.style.setProperty(target.y, px(y))
}

function follow(event: PointerEvent, target: Target): void {
  const element = event.target instanceof Element ? event.target.closest<HTMLElement>(target.selector) : null
  if (element) place(event, element, target)
}

function aim(event: PointerEvent): void {
  for (const target of TARGETS) follow(event, target)
}

function stopListening(): void {
  document.removeEventListener("pointermove", aim)
}

function listen(): (() => void) | undefined {
  if (!canFollow()) return undefined
  document.addEventListener("pointermove", aim, { passive: true })
  return stopListening
}

export function usePointerGlow(): void {
  useEffect(listen, [])
}
