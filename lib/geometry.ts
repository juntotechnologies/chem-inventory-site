/** Pure geometry for the pointer glow: where a pointer sits inside a box. */

export type Box = { left: number; top: number }
export type Point = { clientX: number; clientY: number }

/** The pointer position in pixels, measured from the top left corner of the box. */
export function offsetIn(box: Box, point: Point): { x: number; y: number } {
  return { x: point.clientX - box.left, y: point.clientY - box.top }
}

/** The CSS length for one axis of an offset. */
export function px(value: number): string {
  return `${Math.round(value)}px`
}
