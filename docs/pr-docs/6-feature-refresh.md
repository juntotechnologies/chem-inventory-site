# PR 6: Feature refresh with verified copy and real screenshots

Status: underway

Branch: `feature/feature-refresh`

## Goal

Replace the placeholder feature copy with copy that matches the app. Show real screenshots from the static demo. Remove the stale mock dashboard from the hero.

## Context

- PR 5 shipped the new page with placeholder feature, benefit and video copy.
- An evidence review compared the page with the app code, the tests and the live demo. Five card claims and three benefits were wrong. Both lists are gone.
- The static demo at `demo.cheminventory.co` tracks production. Every screenshot comes from it.
- The hero right slot held the mock `InventoryDashboard`. Its sidebar and transaction types were stale. A real screenshot replaces it.
- [The Labscape plan](./planned-labscape-hero.md) still names `InventoryDashboard` as the component to replace. That component no longer exists. The hero right column in `app/components/hero.tsx` now holds a `ScreenshotFrame`. The Labscape PR swaps it for the scene.

## Implementation Checklist

### Tier 1 - Copy

- [x] Six feature groups in `site.json`. Each statement holds 20 words or fewer.
- [x] Three benefits in `app/ui-labels.tsx`. The change benefit says: "Changes to inventory, transactions and orders carry the user and the time."
- [x] Hero body: the factual line "Chemical inventory, orders and batch documents in one app." then one origin sentence.
- [x] The H1 stays "The Operating System for Chemical Labs".
- [x] Title, description, `llms.txt`, `agents.txt`, JSON-LD and Open Graph text name "chemical inventory, orders, contacts and batch documents". All derive from `site.json`.
- [x] The og image shows the factual line. Its alt text derives from the same fields.
- [x] The video section reads "Early walkthrough" with a dated caption and a visible Static demo button.

### Tier 2 - Screenshots

- [x] Seven screenshots (one hero, six feature groups) from the static demo, as WebP files under `public/images/app/`.
- [x] Each file is 150 KB or smaller. Each shows no price, balance, payment amount, email address or personal name.
- [x] The demo banner and the page header band are cropped out.
- [x] Each image has alt text that describes what it shows.
- [x] The mock `InventoryDashboard` and its dead code are deleted.

### Tier 3 - Layout

- [x] The features section uses a stacked layout so a screenshot spans the full content width.
- [x] One `ScreenshotFrame` component frames the hero image and every feature image.
- [x] Dialog crops never grow past their real width.

### Tier 4 - Tests

- [x] A test fails when a banned claim word returns in page text, generated files or the og image.
- [x] A test fails when a feature group has no screenshot.
- [x] A test fails when a screenshot file is missing, over 150 KB, not WebP, or a different size from `site.json`.
- [x] A test fails when an image in `public/images/app/` is unused.
- [x] The drift tests stay green after `npm run seo`.

### Tier 5 - Checks

- [x] `npm test`, `npm run seo` and `npm run build` pass.
- [x] Browser walk at 360, 390, 430, 820 and 1440 px in light and dark.
- [ ] Merge the PR. The deploy runs on merge.

## Smoke Tests

- [x] **Landing page** · as a visitor on a phone and a laptop
  1. Open the built site.

  **Pass if:**
  - The hero shows a real inventory table, not a mock.
  - Each of the six feature groups shows one screenshot.
  - The video section reads "Early walkthrough" and shows a Static demo button.
  - There is no sideways scroll at 360, 390 and 430 px.

- [x] **Banned words** · as a reviewer
  1. Search the built page and the generated files for the banned words.

  **Pass if:** none appears. `tests/claims.test.ts` runs the same search.

- [ ] **Live site** · as a visitor, after merge
  1. Open `https://cheminventory.co/`.

  **Pass if:** the page, the images and the link preview load over HTTPS.

## Feature statements

| Group | Statement | Basis |
|---|---|---|
| Inventory by batch | Track each batch by CAS number, location, quantity and unit. Search, sort and filter the list. | Shown in the demo |
| Stock ledger | Record purchases, sales, usage, disposal and corrections. Split a batch and keep the link to its parent. | Shown in the demo |
| Orders and contacts | Follow orders through partial deliveries and payments. Import or export orders as CSV. Keep contacts with people and addresses. | Shown in the demo |
| Batch and order documents | Attach COA, specification, GC, NMR, HPLC and IR files to a batch, and quotes, POs and invoices to an order. | In the app code and tests. The demo shows the type list only. |
| History and dashboard | See who changed inventory, transactions and orders, and when. Open a dashboard of counts and trends by area. | Shown in the demo |
| Roles and price privacy | Give each person an Admin, Manager or Chemist role, enforced on the server. Chemists do not see prices. | In the app code and tests. The demo shows the permission list only. |

## Benefits

| Benefit | Statement |
|---|---|
| One place for records | Keep stock, orders, contacts and batch documents in one app. |
| Clear order status | See what arrived, what remains and what is overdue on each order. |
| Traceable changes | Changes to inventory, transactions and orders carry the user and the time. |

## Screenshots

All files come from `https://demo.cheminventory.co`, taken on 2026-10-27. The method:

1. Playwright with Chromium, viewport 1440 px wide, device scale 2.
2. Table pages: crop from y = 134 px. This removes the orange banner and the page header band.
3. Dialogs: hide the page behind the dialog, then crop to the dialog.
4. Encode with `cwebp -preset text`, quality 70 (tables) or 80 (dialogs).

| File | Used for | Demo page and state | Size |
|---|---|---|---|
| `hero.webp` | Hero | Inventory, no filter, ten rows | 136,550 B |
| `inventory.webp` | Inventory by batch | Inventory, Filters panel open, Location list open | 133,732 B |
| `ledger.webp` | Stock ledger | Transactions, type filter open | 127,306 B |
| `orders.webp` | Orders and contacts | Orders, Pending view | 82,184 B |
| `documents.webp` | Batch and order documents | Inventory, Batch Documents dialog, type list open | 42,402 B |
| `history.webp` | History and dashboard | Audit Log, first page | 92,172 B |
| `roles.webp` | Roles and price privacy | Admin, permissions dialog for the Chemist role | 39,434 B |

Screenshots left out on purpose:

| Screenshot | Reason |
|---|---|
| Order details, payments, balance due, all-time order dashboard | They show prices or balances. |
| The "All" order view | Its status column shows "Balance Due". |
| Audit Log and Orders page headers | Their subtitles hold wrong claims. The crop removes them. |
| Users table | It shows email addresses. |

## Product Decisions

| Decision | Choice | Why |
|---|---|---|
| Headline | Keep "The Operating System for Chemical Labs" | Shaun's own planned headline. The factual line sits under it. |
| Roles screenshot | The Chemist dialog | It shows "View Commercial Details: Not Granted", which supports "Chemists do not see prices". |
| Features layout | Stacked, full width | At 7 columns a 1440 px screenshot shows text at half size. Full width keeps it readable. |
| Image density | 2x files, shown at 1x width | Sharp on high-density screens. |
| Image format | WebP | 40 to 140 KB per file. |
| Video | Keep it. Retitle and date it. | It is from April 2025. A new recording is open. |
| Banned words | One list in `tests/support/copy-rules.json` | One source for the test and the review. |

## Removed

| Item | Note |
|---|---|
| Five card claims: custom fields, "log every change", approvals, departments, forecasting | The app does not do them, or does them differently. |
| Three benefits: compliance records, waste and cost, simpler audits | The app has no such feature. |
| Mock `InventoryDashboard` (1,696 lines) | Stale sidebar and transaction types. |
| "suppliers, purchasers, users and an audit log" in the title text, `llms.txt`, `agents.txt`, JSON-LD and Open Graph | Replaced by "chemical inventory, orders, contacts and batch documents". |

## Open items

| Item | Owner |
|---|---|
| The early walkthrough video is from April 2025. Record a new one. | Shaun |
| Wording "Traceable changes" and "carry the user and the time" needs the compliance reviewer. | Compliance reviewer |
| The demo shows fictional prices to its admin. No screenshot shows them. | Shaun |

## Non-Goals

- No edit to the Labscape plan or its files.
- No change to the team or pricing sections.
- No claim for a held feature. A test bans the words.

## Related Docs

- [PR 5: Landing page cleanup and discovery files](./5-landing-cleanup.md)
- [Planned: Labscape hero and new headline](./planned-labscape-hero.md)
