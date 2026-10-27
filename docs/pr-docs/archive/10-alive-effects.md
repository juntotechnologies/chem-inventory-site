# PR 10: Light and Motion on the Landing Page

Status: done

Branch: `feature/alive-effects`

## Goal

Make the page feel alive with a small set of effects on real content. The hub (`juntotechnologies.com`) got the same set. One visual language runs across the Junto sites.

## Context

- Shaun, 2026-10-27: make the sites look alive and modern. Take the idea from two designer sites. Use no code from them.
- A library study found no outside component worth adding. This PR adds no package. It writes each effect in plain CSS and a small hook.
- The hub change is PR 12 in `juntotechnologies/juntotechnologies.github.io`.
- [PR 3](../planned-labscape-hero.md) is a draft that changes the hero. This PR does not depend on it.

## Implementation Checklist

### Tier 1 - Tokens and helpers

- [x] `site.json` gets two color tokens per scheme (`highlight`, `shade`) and `hero.accentWord`. `npm run seo` writes them into `app/color-palette.css`.
- [x] Test, then add `lib/geometry.ts`, `lib/heading.ts` and `lib/pointer-glow.ts`.

### Tier 2 - Effects

- [x] Pointer light on buttons and cards. Raised default button. Press and lift.
- [x] Hero: staged entrance, one accent word, edge light on the main button, dot field with lit dots near the pointer.
- [x] Header shadow after a scroll.
- [x] Hover effects only where a pointer can hover. Reduced motion stops every loop.

### Tier 3 - Checks and ship

- [x] `npm test` passes (120 tests) and `npm run build` passes.
- [x] Walk at 360, 390, 820 and 1440 px, light and dark. No sideways scroll. No console error.
- [x] Merge the PR. Walk the live site.

## Smoke Tests

- [ ] **Hero** · as a visitor with a mouse, after the merge
  1. Open `https://cheminventory.co/` on a desktop browser.
  2. Move the pointer over the hero and over "Book a meeting".

  **Pass if:**
  - Dots light up near the pointer.
  - The headline ends with a moving accent word.
  - A light circles the edge of "Book a meeting".

- [ ] **Phone** · as a visitor on a phone
  1. Open the page on a phone.

  **Pass if:** the page shows no hover state and no sideways scroll.

## Product Decisions

- One hero effect per screen group: the dot field is the idle motion. No video and no 3D tilt.
- The accent word is "Chemical Labs". It is part of the existing headline.

## Scope

- Page weight, measured with `gzip -9` on the built files (bytes):

| File | Before | After |
|---|---|---|
| `index.html` | 5529 | 5577 |
| CSS | 5845 | 6821 |
| JS | 89982 | 90489 |

- Total gain: 1.5 KB gzip. No new package.

## Non-Goals

- No new copy, no new claim, no count, no price.
- No change to the application repository.

## Related Docs

- [Design: motion and light](../../design.md)
- [PR 9: Narrow three claims](./9-claims-narrowed.md)
