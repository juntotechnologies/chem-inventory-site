# PR 3: Labscape Hero and New Headline

Status: underway

Branch: `feature/labscape-hero`

## Goal

Replace the mock inventory dashboard in the landing-page hero with the Labscape 3D scene: trucks, chemists, the warehouse and the R&D lab, with a live audit log written the way the real app records it. The hero headline becomes "The Operating System for Chemical Labs". Visitors who want the real tool use the existing Static Demo link and the video further down the page.

## Context

- The hero lives in `app/page.tsx`: copy on the left from `UI_LABELS.hero` in `app/ui-labels.tsx` (eyebrow, title lines, accent, body), and on the right the `InventoryDashboard` component (`app/components/inventory-dashboard.tsx`), a mock inventory.
- The scene is built in the Labscape repo, which exports a self-contained module, a still image and a version stamp (see Related Docs). This repo embeds them; it does not build the scene.
- Deploys: `.github/workflows/deploy.yml` runs tests and the build on pull requests, and deploys to GitHub Pages on every push to `main`. Merging this PR publishes it.

## Implementation Checklist

Ordered UI first, then wiring, and least to most consequential.

### Tier 1 - Headline

- [ ] `UI_LABELS.hero`: title becomes "The Operating System for Chemical Labs". Eyebrow and body per the open question below.
- [ ] Tests first: the hero copy renders from `UI_LABELS`, with the new title.

### Tier 2 - Embed the scene

- [ ] A `LabscapeHero` component in place of `InventoryDashboard` in the hero's right column: shows the still image at once, then loads the module from `public/labscape/` with a dynamic import and mounts it; cleans up on unmount; keeps the still image if WebGL is unavailable.
- [ ] Remove `InventoryDashboard` (and anything only it uses) if nothing else needs it.
- [ ] Sizing: the scene fills the hero column on desktop and keeps the headline readable on phones; the audit log stays legible at each breakpoint.
- [ ] Tests first: the component renders the still image before the module loads, mounts once, and cleans up on unmount.

### Tier 3 - Assets and checks

- [ ] Commit `public/labscape/` (module, still image, version stamp) as exported by Labscape's `scripts/export-hero.mjs`.
- [ ] A test that the version stamp exists and matches the committed module, so a half-updated export fails CI.
- [ ] `npm test` and `npm run build` pass; record the hero's load cost and Lighthouse performance with the method used.

## Smoke Tests

- [ ] **New hero** · as a visitor on a laptop
  1. Open the landing page.

  **Pass if:**
  - The headline reads "The Operating System for Chemical Labs"
  - The 3D scene shows where the mock dashboard used to be, and comes alive within a moment
  - The audit log beside it fills in as things happen
  - The Static Demo link and the video section still work

- [ ] **Phone** · as a visitor on a phone
  1. Open the landing page.

  **Pass if:**
  - Headline and scene both fit without sideways scrolling
  - The page scrolls smoothly past the hero

## Product Decisions

- The hero shows a lab at work, not product claims; the only feature it depicts is the audit log, which the app really has.
- The mock inventory dashboard goes: it is not real data, and the real app is one click away in the Static Demo.
- The scene arrives as a committed, pre-built file from Labscape, so this repo needs no credentials or private packages.

## Open Questions

Recommendations in brackets; to be confirmed by Shaun before Tier 1 and Tier 2.

- Does the new title replace only the title, or also the eyebrow ("Built Inside Real Chemistry Lab Workflows") and the body? The page's meta title still leads with compliance. [Replace the title; keep the eyebrow; shorten the body to one line about running the whole lab.]
- Layout: headline left and scene right (today's grid), or the scene full-width behind the headline? [Keep today's two-column grid.]
- Phones: live scene or still image only? [Live with a tighter camera, unless phone frame times are poor.]

## Non-Goals

- No interactivity in the hero.
- No changes to sections below the hero.
- No building of the scene here; that is Labscape's job.

## Related Docs

- [Labscape: hero scene with a live audit log](https://github.com/juntotechnologies/labscape/blob/main/docs/pr-docs/7-hero-scene.md)
- [Hero origin, bio and contrast](./planning-chip-bio-contrast.md)
