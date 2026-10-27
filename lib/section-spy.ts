/** Scroll spy as an external store: the id of the page section under the reading line. */
import { useSyncExternalStore } from "react"

const SECTION_SELECTOR = "main > section[id]"
const READING_LINE = "-40% 0px -55% 0px"
const listeners = new Set<() => void>()
let observer: IntersectionObserver | null = null
let activeId = ""

function notifyAll(): void {
  for (const listener of listeners) listener()
}

function isEntering(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting
}

function onSections(entries: IntersectionObserverEntry[]): void {
  const entering = entries.filter(isEntering).at(-1)
  if (!entering) return
  activeId = entering.target.id
  notifyAll()
}

function startObserving(): void {
  observer = new IntersectionObserver(onSections, { rootMargin: READING_LINE })
  for (const section of document.querySelectorAll(SECTION_SELECTOR)) observer.observe(section)
}

function removeListener(listener: () => void): void {
  listeners.delete(listener)
  if (listeners.size > 0) return
  observer?.disconnect()
  observer = null
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) startObserving()
  listeners.add(listener)
  return removeListener.bind(null, listener)
}

function getSnapshot(): string {
  return activeId
}

function getServerSnapshot(): string {
  return ""
}

export function useActiveSection(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
