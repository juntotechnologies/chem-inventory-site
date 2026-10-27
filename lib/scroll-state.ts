/** Scroll state as an external store: true once the page scrolls past a few pixels. */
import { useSyncExternalStore } from "react"

const SCROLLED_AFTER_PX = 8
const listeners = new Set<() => void>()

function notifyAll(): void {
  for (const listener of listeners) listener()
}

function removeListener(listener: () => void): void {
  listeners.delete(listener)
  if (listeners.size === 0) window.removeEventListener("scroll", notifyAll)
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("scroll", notifyAll, { passive: true })
  listeners.add(listener)
  return removeListener.bind(null, listener)
}

function getSnapshot(): boolean {
  return window.scrollY > SCROLLED_AFTER_PX
}

function getServerSnapshot(): boolean {
  return false
}

export function useScrolled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
