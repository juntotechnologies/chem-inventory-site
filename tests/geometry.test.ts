import { describe, expect, it } from "vitest"

import { offsetIn, px } from "../lib/geometry"

const BOX = { left: 100, top: 40 }

describe("offsetIn", () => {
  it("measures from the top left corner of the box", () => {
    expect(offsetIn(BOX, { clientX: 130, clientY: 90 })).toEqual({ x: 30, y: 50 })
  })

  it("is negative when the pointer sits left of or above the box", () => {
    expect(offsetIn(BOX, { clientX: 90, clientY: 30 })).toEqual({ x: -10, y: -10 })
  })
})

describe("px", () => {
  it("rounds to a whole pixel and adds the unit", () => {
    expect(px(12.6)).toBe("13px")
    expect(px(-0.4)).toBe("0px")
  })
})
