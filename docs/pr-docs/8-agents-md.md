# PR 8: AGENTS.md with the delivery rule

Status: underway

Branch: `docs/agents-review-rule`

## Goal

Give this repo an `AGENTS.md` with its delivery rule. An agent merges a pull request here after the checks pass. The `chem-inventory` application repo stays under Shaun's review.

## Context

- Shaun, 2026-10-27: "For anything that touches chem inventory, though, I don't want you to be able to push to main or merge to main." The reason: the application serves other users.
- Asked whether the rule covers this site, Shaun answered: "No. So chem inventory you can freely publish to, so that's totally fine." The rule now covers the `chem-inventory` application repo and its demo only.
- This repo had no `AGENTS.md`. Pull requests 5, 6 and 7 were merged under the first authorization.

## Implementation Checklist

### Tier 1 - Instructions

- [x] `AGENTS.md` states the delivery rule, the source of truth and the public-site rules.
- [x] The PR doc index lists this doc.

## Smoke Tests

- [ ] **Rule read** · as Shaun
  1. Read `AGENTS.md`.

  **Pass if:**
  - It lets an agent merge a pull request here after the checks pass.
  - It says the application repo needs your review and merge.

## Non-Goals

- No change to the site, the copy or the workflow.
- No branch protection. Shaun declined it because it costs money.
