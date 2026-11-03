/** Pure geometry for the pointer glow: where a pointer sits inside a box. */

export type Box = { left: number; top: number }
export type Point = { clientX: number; clientY: number }

export function offsetIn(box: Box, point: Point): { x: number; y: number } {
  return { x: point.clientX - box.left, y: point.clientY - box.top }
}

export function px(value: number): string {
  return `${Math.round(value)}px`
}
