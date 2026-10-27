# PR planned: Landing page cleanup and discovery files

Status: planned

Branch: `feature/landing-cleanup`

## Goal

Make the landing page look designed by a person. Remove the "software developed with your team" pitch. Add search and agent discovery files, all generated from one `site.json`.

## Context

- Shaun's note on the old page: remove the "developed with your team" pitch, look less AI-generated, cleaner theme, add `robots.txt`, `agents.txt` and other SEO files.
- The hero headline "The Operating System for Chemical Labs" comes from the [Labscape hero plan](./planned-labscape-hero.md). That plan states it as its goal, so this PR uses it.
- The hero right slot (`InventoryDashboard`) stays. The Labscape PR replaces it later.
- Deploy: GitHub Pages runs on every push to `main`. There is no preview deploy, so every check runs on a local build.

## Implementation Checklist

### Tier 1 - Source of truth and discovery files

- [ ] `site.json` holds the site facts. A zod schema validates it once at the edge.
- [ ] Generators write `robots.txt`, `sitemap.xml`, `llms.txt`, `agents.txt`, `CNAME`, `404.html`, `og.png` and the `<head>` block of `index.html`.
- [ ] `UI_LABELS` reads brand, links and features from `site.json`.
- [ ] A test fails when any generated file drifts from `site.json`.
- [ ] A test fails when a generated file holds an email address.

### Tier 2 - Copy

- [ ] Remove the `builtWithYou` section and the hero headline "Software Designed Directly With Your Team".
- [ ] Trim the features, benefits, team and pricing intros to one short line each.
- [ ] Keep product facts. Add no new claim, number or customer name.
- [ ] A test fails on filler words and on the removed pitch.

### Tier 3 - Theme and layout

- [ ] One accent colour on a neutral surface. A dark theme follows the OS setting.
- [ ] System font stack, one type scale, 8 px spacing, 12-column grid.
- [ ] Thin borders. No gradients, glows, blobs, pulses or shadows.
- [ ] Sticky nav, calm footer, equal-width or stacked buttons on phones.

### Tier 4 - Motion

- [ ] Scroll reveal, hover and press states, one card hover, a sliding nav indicator.
- [ ] Only `transform` and `opacity` animate. `prefers-reduced-motion` turns motion off.

### Tier 5 - Build and checks

- [ ] The build prerenders the page into `index.html`, so crawlers without JavaScript see the text.
- [ ] `npm test` and `npm run build` pass.
- [ ] The build output holds `CNAME`, `robots.txt`, `sitemap.xml`, `llms.txt`, `agents.txt`, `404.html` and the og image.
- [ ] Browser walk at 360, 390, 430, 820 and 1440 px in light and dark.

## Smoke Tests

- [ ] **Landing page** · as a visitor on a phone and a laptop
  1. Open the built site.

  **Pass if:**
  - The headline reads "The Operating System for Chemical Labs".
  - No section mentions software built with your team.
  - There is no sideways scroll at 360, 390 and 430 px.
  - Buttons share one width or stack full width.

- [ ] **Discovery files** · as a crawler
  1. Fetch `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/agents.txt`.

  **Pass if:**
  - Each file loads and matches `site.json`.
  - `robots.txt` allows all crawlers and names the sitemap.
  - No file holds an email address.

## Product Decisions

- The product name on the page is "ChemInventory", the domain and hub name. "CIMS" stays as the short alias.
- Dark theme follows the OS setting. The old dark variables existed but no code reached them.

## Non-Goals

- No edit to the Labscape plan or its files.
- No rewrite of `InventoryDashboard` internals. The Labscape PR replaces it.

## Related Docs

- [Planned: Labscape hero and new headline](./planned-labscape-hero.md)
