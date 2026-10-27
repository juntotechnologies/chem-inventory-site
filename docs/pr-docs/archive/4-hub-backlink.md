# PR 4: Backlink to the Junto Technologies hub

Status: done (merged on 2026-10-27; archived the same day)

Branch: `feature/hub-backlink`

## Goal

Add a small link in the footer: "A Junto Technologies project". It opens the ChemInventory card on the Junto hub, `juntotechnologies.com`, in the same tab. A visitor can then find the other Junto work.

## Context

- The hub now lists ChemInventory and Bench Bridge. Each card has an `id`. The ChemInventory card is `#cheminventory`.
- The hub rule: a first-party link opens in the same tab. This link has no `target`.
- Release dependency: the hub pull request must merge first. Before that, the link opens the old hub, which has no card to scroll to.
- Labels live in `app/ui-labels.tsx`. The footer is in `app/page.tsx`.

## Implementation Checklist

### Tier 1 - Labels and test

- [x] Test first: `links.hub` is on the `juntotechnologies.com` origin and ends with `#cheminventory`. `brand.hubLink` names Junto Technologies.
- [x] Add `links.hub` and `brand.hubLink` to `UI_LABELS`.

### Tier 2 - Footer

- [x] Render the link below the copyright line. Use the labels. Add no `target`.
- [x] The link is at least 44 px tall. It has an underline, so it reads as a link.

### Tier 3 - Checks

- [x] `npm test` passes.
- [x] `npm run build` passes.

## Smoke Tests

- [x] **Footer link** · as a visitor on a laptop and on a phone
  1. Open the landing page. Scroll to the footer.

  **Pass if:**
  - The footer shows "A Junto Technologies project" below the copyright line.
  - The page has no sideways scroll on a phone.
  - A click opens `juntotechnologies.com` in the same tab. No new tab opens.

- [ ] **Hub card** · as a visitor, after the hub pull request merges (not walked: the agent checked only that the footer link points to `#cheminventory` and that the hub has that anchor)
  1. Click the footer link.

  **Pass if:**
  - The hub opens and scrolls to the ChemInventory card.
  - The card has a blue outline.

## Product Decisions

- The link is small. It must not compete with the page's own calls to action.
- The label is a fact, not a claim: Junto Technologies makes the product.

## Non-Goals

- No change to the header, the hero or the pricing section.
- No new tab. The back button returns the visitor to this page.

## Related Docs

- [Planned: Labscape hero and new headline](../planned-labscape-hero.md). It changes the hero only. It does not touch the footer.
