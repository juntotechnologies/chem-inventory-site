import { describe, expect, it } from "vitest"

import { UI_LABELS } from "../app/ui-labels"

describe("hub backlink", () => {
  const hub = new URL(UI_LABELS.links.hub)

  it("points at the ChemInventory card on the Junto hub", () => {
    expect(hub.origin).toBe("https://juntotechnologies.com")
    expect(hub.hash).toBe("#cheminventory")
  })

  it("has a label that names Junto Technologies", () => {
    expect(UI_LABELS.brand.hubLink).toContain("Junto Technologies")
  })
})
