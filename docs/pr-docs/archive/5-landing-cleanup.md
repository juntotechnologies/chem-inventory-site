# PR 5: Landing page cleanup and discovery files

Status: done (merged on 2026-10-27; archived the same day)

Branch: `feature/landing-cleanup`

## Goal

Make the landing page look designed by a person. Remove the "software developed with your team" pitch. Add search and agent discovery files, all generated from one `site.json`.

## Context

- Shaun's note on the old page: remove the "developed with your team" pitch, look less AI-generated, cleaner theme, add `robots.txt`, `agents.txt` and other SEO files.
- The hero headline "The Operating System for Chemical Labs" comes from the [Labscape hero plan](../planned-labscape-hero.md). That plan states it as its goal, so this PR uses it.
- The hero right slot (`InventoryDashboard`) stays. The Labscape PR replaces it later. This PR edits only its frame and two button labels.
- Deploy: GitHub Pages runs on every push to `main`. There is no preview deploy, so every check runs on a local build.
- Feature, benefit and video copy is placeholder. It holds the facts the old page stated, trimmed. An app research task replaces it.

## Implementation Checklist

### Tier 1 - Source of truth and discovery files

- [x] `site.json` holds the site facts. A zod schema (`lib/site-schema.ts`) validates it once at the edge.
- [x] `npm run seo` writes `robots.txt`, `sitemap.xml`, `llms.txt`, `agents.txt`, `CNAME`, `404.html`, `og.png`, icons, `app/color-palette.css` and the head block of `index.html`.
- [x] `UI_LABELS` reads brand, links, headline and features from `site.json`.
- [x] A test fails when any generated file drifts from `site.json`.
- [x] A test fails when a generated file holds an email address.

### Tier 2 - Copy

- [x] Remove the `builtWithYou` section and the hero headline "Software Designed Directly With Your Team".
- [x] Trim the features, benefits, team and pricing intros to one short line each.
- [x] Add no new claim, number or customer name.
- [x] A test fails on filler words, dashes, long sentences and the removed pitch.

### Tier 3 - Theme and layout

- [x] One accent colour on a neutral surface. A dark theme follows the OS setting.
- [x] System font stack, one type scale, 8 px spacing, 12-column grid.
- [x] Thin borders. No gradients, glows, blobs, pulses or shadows.
- [x] Sticky nav, calm footer, equal-width or stacked buttons on phones.
- [x] The features section holds 4 to 6 groups. Each has a title, one statement of 20 words or fewer and an optional screenshot.

### Tier 4 - Motion

- [x] Scroll reveal, hover and press states, one card hover, a sliding nav indicator.
- [x] Only `transform` and `opacity` animate. `prefers-reduced-motion` turns motion off.

### Tier 5 - Build and checks

- [x] The build prerenders the page into `index.html`, so crawlers without JavaScript see the text.
- [x] `npm test` and `npm run build` pass.
- [x] The build output holds `CNAME`, `robots.txt`, `sitemap.xml`, `llms.txt`, `agents.txt`, `404.html` and the og image.
- [x] Browser walk at 360, 390, 430, 820 and 1440 px in light and dark.
- [x] Merge the PR. The deploy runs on merge.

## Smoke Tests

- [x] **Landing page** · as a visitor on a phone and a laptop
  1. Open the built site.

  **Pass if:**
  - The headline reads "The Operating System for Chemical Labs".
  - No section mentions software built with your team.
  - There is no sideways scroll at 360, 390 and 430 px.
  - Buttons share one width or stack full width.

- [x] **Discovery files** · as a crawler
  1. Fetch `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/agents.txt`.

  **Pass if:**
  - Each file loads and matches `site.json`.
  - `robots.txt` allows all crawlers and names the sitemap.
  - No file holds an email address.

- [x] **Live site** · as a visitor, after merge (the agent checked the page, the images, the discovery files and the link image over HTTPS on 2026-10-27)
  1. Open `https://cheminventory.co/` and the four files above.

  **Pass if:**
  - The page and the files load over HTTPS on the custom domain.
  - A link preview shows the og image.

## Product Decisions

| Decision | Choice | Why |
|---|---|---|
| Headline | "The Operating System for Chemical Labs" | The Labscape plan states it as its goal. |
| Eyebrow and hero body | Keep the eyebrow. Trim the body to two sentences. | The plan leaves both open. One line about "running the whole lab" is a new claim. |
| Product name | "ChemInventory", with "CIMS" as the alias | It is the domain and hub name. The old page never used it. |
| Dark theme | Follows the OS setting | The old dark variables existed but no code reached them. |
| Hero actions | "Book a meeting" and "Static demo" | The old action was the "Custom Software Inquiry" email, which is the removed pitch. |
| Pricing actions | Keep both existing emails | The page keeps its email links. |
| Dev host | Read from the Tailscale CLI at run time | The repo is public. No tailnet name goes in a file. |
| Portrait | Crop to a 640 px square. 391 KB becomes 77 KB. | Page speed. The crop matches what the page showed. |
| `CNAME`, `404.html` | Add both | The repo had neither. GitHub ignores `CNAME` for Actions deploys, so it is harmless. |

## Removed

| Item | Note |
|---|---|
| Hero headline "Software Designed Directly With Your Team" | Replaced. |
| "Built With You" section, tiles 1738, 24, 12, slogan "Focused. Tailored. Practical." | Removed. The numbers were mock data. |
| Hero button "Discuss Your Workflow" and the `customSoftwareInquiry` email | Replaced by two new actions. |
| Hero line "fewer administrative errors, fewer delays" | Removed. The page gives no source. |
| "Tailored", "custom" and "white glove" lines in features, benefits, team and pricing | Trimmed. |
| Hidden second team card, unused v0 state and dialog in `page.tsx` | Dead code. |
| `maximum-scale=1.0` in the viewport tag | It blocked zoom. |
| `generator` meta tag and the placeholder favicon | Replaced by real icons. |
| Run-time fetch of the dcurves count | The count is now read at build time. Same file. |
| `ThemeProvider` | Unused. The `next-themes` dependency stays in `package.json`. |

## Regulatory-sounding claims that remain

A compliance reviewer must check each one. The page states no Part 11 claim and no certification.

| Claim | Where |
|---|---|
| "Keep accurate records for regulatory compliance and safety audits." | Benefits, `UI_LABELS.product.benefits` |
| "Generate audit-ready reports with change history, transaction visibility and user actions." | Benefits |
| "Log every change with its timestamp and the user who made it." | Features, `site.json`, `llms.txt` |
| "Set role-based access and permissions for people and departments." | Features, `site.json`, `llms.txt` |
| "an audit log" | Meta description, `llms.txt`, `agents.txt` |

Removed wording: "the audit trail your compliance process requires", "aligned to your internal standards", "controls designed around your environment".

## Swap in new feature copy

1. Edit `site.features` in `site.json`: 4 to 6 groups, one statement of 20 words or fewer each.
2. Add screenshots under `public/`. Set `screenshot` to `{ src, alt, width, height }`.
3. Edit the benefits, video and section lines in `app/ui-labels.tsx`.
4. Run `npm run seo`, then `npm test`.

## Non-Goals

- No edit to the Labscape plan or its files.
- No rewrite of `InventoryDashboard` internals. The Labscape PR replaces it.
- No new feature claim. The app research task supplies those.

## Related Docs

- [Planned: Labscape hero and new headline](../planned-labscape-hero.md)
