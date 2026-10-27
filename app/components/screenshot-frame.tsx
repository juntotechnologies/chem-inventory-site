/** A real app screenshot in a window frame. The hero and every feature group use it. */
import type { CSSProperties } from "react"

import type { Screenshot } from "@/lib/site-schema"

type FrameProps = { screenshot: Screenshot; priority?: boolean }

const DOTS = [0, 1, 2]

function renderDot(index: number) {
  return <span key={index} className="h-2 w-2 rounded-full bg-border" />
}

function FrameBar() {
  return (
    <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b bg-muted px-3">
      {DOTS.map(renderDot)}
    </div>
  )
}

/** The image shows at its own size on a 1x screen, so a dialog crop never grows past its real width. */
function widthLimit({ width, density }: Screenshot): CSSProperties {
  return { maxWidth: width / density }
}

function imageProps({ src, alt, width, height }: Screenshot, priority: boolean) {
  const loading = priority ? "eager" : "lazy"
  const fetchPriority = priority ? "high" : "auto"
  return { src, alt, width, height, loading, fetchPriority, decoding: "async" } as const
}

function FrameImage({ screenshot, priority }: Required<FrameProps>) {
  return <img {...imageProps(screenshot, priority)} className="block h-auto w-full" />
}

export function ScreenshotFrame({ screenshot, priority = false }: FrameProps) {
  return (
    <figure className="mx-auto w-full overflow-hidden rounded-lg border bg-card" style={widthLimit(screenshot)}>
      <FrameBar />
      <FrameImage screenshot={screenshot} priority={priority} />
    </figure>
  )
}
