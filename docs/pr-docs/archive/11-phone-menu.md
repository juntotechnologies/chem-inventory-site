# PR 11: Phone Menu Covers the Page

Status: done

Branch: `fix/phone-menu`

## Goal

Fix the phone menu. The open menu now covers the whole screen below the header. The page behind it cannot scroll, show or take focus. The menu shows each action only once.

## Context

- Shaun, 2026-10-27, on a phone with Brave: "the menu options overlap with the options on the page... how come the same options are duplicated on the page? It looks a little weird."
- Cause: the menu panel was only as tall as its content. The hero buttons and the app preview showed below it. The menu and the hero both held "Static demo" and "Book a meeting".
- WebKit (Safari and Brave on iPhone) stretches grid rows inside a taller box. The new CSS keeps the menu content at its own height.

## Implementation Checklist

### Tier 1 - Menu content

- [x] The menu holds the three section links and one action: "Book a meeting", as the main button.
- [x] Removed from the menu: "Static demo" and "Contact us".

### Tier 2 - Behavior

- [x] The panel fills the screen below the header with an opaque background (`inset: 4rem 0 0 0`).
- [x] Page scroll locks while the menu is open (`html:has(.menu-panel:popover-open)`). The panel keeps its own scroll (`overscroll-behavior: contain`).
- [x] The page behind turns `inert` while the menu is open. Taps, Tab and screen readers do not reach it.
- [x] Focus moves to the first menu link on open. Escape and the close button close the menu. The browser returns focus to the button.
- [x] A wider screen (768 px) closes an open menu, so the page never stays locked after a rotation.

### Tier 3 - Checks and ship

- [x] Tests for the pure helpers, the menu markup, the menu CSS and the 768 px match with Tailwind.
- [x] `npm test` and `npm run build` pass.
- [x] Walk at 360, 390, 820 and 1440 px, light and dark (76 checks, Chromium). No page button is visible or reachable behind the open menu.
- [x] Merge the PR. Walk the live site.

## Smoke Tests

- [ ] **Phone menu** · as a visitor on a phone, after the merge
  1. Open `https://cheminventory.co/` on a phone.
  2. Tap the menu button.

  **Pass if:**
  - The menu covers the screen below the header. No hero button or screenshot shows.
  - The menu has Features, Team, Pricing and "Book a meeting".
  - The page does not scroll behind the menu.
  - A tap on "Team" closes the menu and shows the Team section.

## Product Decisions

- One action in the menu, not three. "Book a meeting" is the main action of the page. The page already has "Static demo" in the hero and the video section, and "Contact us" in the pricing section.
- Not changed: the header on wide screens shows "Book a meeting" and "Contact us" while the hero shows "Book a meeting" too. The sticky header keeps its action after the hero scrolls away.

## Scope

- Phone menu only (below 768 px).
- No new package.

## Non-Goals

- No change to the header on wide screens.
- No test on real WebKit. The sandbox has Chromium only. The CSS uses features that Safari 17 and later support.

## Related Docs

- [Design: motion and light](../../design.md)
- [PR 10: Light and motion on the landing page](./10-alive-effects.md)
