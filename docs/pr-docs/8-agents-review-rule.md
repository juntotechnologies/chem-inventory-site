# PR 8: AGENTS.md with the review rule

Status: underway

Branch: `docs/agents-review-rule`

## Goal

Give this repo an `AGENTS.md` that says every change needs Shaun's review and merge. A production application serves other users, so no agent merges or pushes to `main` here.

## Context

- Shaun, 2026-10-27: "For anything that touches chem inventory, though, I don't want you to be able to push to main or merge to main. That should require review because there's a prod application that affects other users."
- This repo had no `AGENTS.md`. Earlier work merged pull requests 5, 6 and 7 here under an older authorization. That authorization is withdrawn.

## Implementation Checklist

### Tier 1 - Instructions

- [x] `AGENTS.md` states the delivery rule, the source of truth and the public-site rules.
- [x] The PR doc index lists this doc.

## Smoke Tests

- [ ] **Rule read** · as Shaun
  1. Read `AGENTS.md`.

  **Pass if:**
  - It says no agent pushes to `main` or merges a pull request.
  - It names you as the reviewer and the merger.

## Non-Goals

- No change to the site, the copy or the workflow.
- No branch protection. That is a GitHub setting and needs Shaun's yes.
