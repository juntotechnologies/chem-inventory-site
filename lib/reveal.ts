/** Scroll reveal: elements marked data-reveal-item fade in once, the first time they scroll into view. */
import { useLayoutEffect } from "react"

const ITEM_SELECTOR = "[data-reveal-item]"
const REVEAL_MARGIN = "0px 0px -8% 0px"
const VIEWPORT_FRACTION = 0.92
let observer: IntersectionObserver | null = null

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function isInView(element: HTMLElement): boolean {
  return element.getBoundingClientRect().top < window.innerHeight * VIEWPORT_FRACTION
}

function isEntering(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting
}

function onIntersect(entries: IntersectionObserverEntry[], source: IntersectionObserver): void {
  for (const entry of entries.filter(isEntering)) markShown(entry.target as HTMLElement, source)
}

function markShown(element: HTMLElement, source: IntersectionObserver): void {
  element.dataset.reveal = "shown"
  source.unobserve(element)
}

function armItem(element: HTMLElement): void {
  if (isInView(element)) return
  element.dataset.reveal = "pending"
  observer?.observe(element)
}

function disarmAll(): void {
  observer?.disconnect()
  observer = null
}

function armAll(): () => void {
  if (prefersReducedMotion()) return disarmAll
  observer = new IntersectionObserver(onIntersect, { rootMargin: REVEAL_MARGIN })
  for (const element of document.querySelectorAll<HTMLElement>(ITEM_SELECTOR)) armItem(element)
  return disarmAll
}

export function useRevealOnScroll(): void {
  useLayoutEffect(armAll, [])
}
