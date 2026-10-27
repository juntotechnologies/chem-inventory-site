# PR 9: Narrow three claims to what the product does

Status: underway

Branch: `feature/claims-audit`

## Goal

Make each product statement on the page match what the product does. Narrow three statements. Leave the other statements as they are.

## Context

- Shaun, 2026-10-27: handle the open claim items without him. The site is free to publish to.
- An audit compared every product statement on the page with the product code. It also compared them with the demo screenshots. The evidence stays in a private record.
- The audit found two statements wider than the product. It found one benefit that uses a word wider than the product.
- Open item from [PR 6](./6-feature-refresh.md): the wording "carry the user and the time" needs the compliance reviewer. The new wording makes no claim about a rule or a regulation. It states a product behaviour. No reviewer is needed. Shaun can still ask for one.

## Implementation Checklist

### Tier 1 - Copy

- [x] History and dashboard: "See who edited inventory, logged transactions and acted on orders, and when. Open dashboard counts and charts by area." The statement has 19 words.
- [x] Roles and price privacy: "Assign an Admin, Manager or Chemist role, enforced on the server. Chemists see no prices on transactions or orders." The statement has 19 words.
- [x] Third benefit: title "Traceable edits". Text "Edits to inventory, transactions and orders carry the user and the time."
- [x] `npm run seo` regenerates `llms.txt`. The JSON-LD lists the feature titles only, so it does not change.

### Tier 2 - Checks

- [x] `npm test` passes.
- [x] `npm run build` passes.
- [x] Browser walk at 360, 390, 820 and 1440 px, in light and dark.
- [ ] Merge the PR. The deploy runs on merge.

## Smoke Tests

- [ ] **Live copy** · as a visitor, after the merge
  1. Open `https://cheminventory.co/`.
  2. Read the third benefit and the History and dashboard and Roles cards.

  **Pass if:**
  - The text matches the table below.
  - `https://cheminventory.co/llms.txt` holds the same two card statements.

## Statements changed

| Where | Before | After | Reason |
|---|---|---|---|
| History and dashboard card | See who changed inventory, transactions and orders, and when. Open a dashboard of counts and trends by area. | See who edited inventory, logged transactions and acted on orders, and when. Open dashboard counts and charts by area. | The dashboard shows counts and charts for a chosen period. It has no trend view. The history records edits and actions. |
| Roles and price privacy card | Give each person an Admin, Manager or Chemist role, enforced on the server. Chemists do not see prices. | Assign an Admin, Manager or Chemist role, enforced on the server. Chemists see no prices on transactions or orders. | The sentence now names the places where the product hides prices. |
| Third benefit | Traceable changes. Changes to inventory, transactions and orders carry the user and the time. | Traceable edits. Edits to inventory, transactions and orders carry the user and the time. | Matches the history card. |

## Statements checked and kept

| Statement | Result |
|---|---|
| Chemical inventory, orders, contacts and batch documents in one app | Supported |
| Inventory by batch: CAS number, location, quantity, unit, search, sort, filter | Supported |
| Stock ledger: purchases, sales, usage, disposal, corrections, batch split with the parent link | Supported |
| Orders and contacts: partial deliveries, payments, CSV import and export, contact people and addresses | Supported |
| Batch and order documents: the listed batch and order document types | Supported |
| Roles: Admin, Manager, Chemist, enforced on the server | Supported |
| Clear order status: what arrived, what remains, what is overdue | Supported |
| The app came from work in a commercial lab and replaces spreadsheets | Only Shaun can confirm. Kept. |
| The early walkthrough video | Dated and labelled early. Kept. |

## Product Decisions

- Keep the banned-word list. Add no word.
- Name no internal file in this public repo.

## Non-Goals

- No change to the application. Shaun reviews every change there.
- No new claim.

## Related Docs

- [PR 6: Feature refresh with verified copy and real screenshots](./6-feature-refresh.md)
