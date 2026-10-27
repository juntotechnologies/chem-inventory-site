# PR 7: Agent rules as JSON at /.well-known/agents.json

Status: underway

Branch: `feature/agents-json`

## Goal

Publish the agent rules of `cheminventory.co` as JSON at `/.well-known/agents.json`. The Junto hub, Bench Bridge and ClinPharmStats already publish this file. A tool that reads the file then finds it on every Junto site.

## Context

- `agents.txt` already states what an automated agent may do. The JSON states the same rules from the same `site.json` fields.
- The file keeps the key names of the hub file: `name`, `url`, `summary`, `mayDo`, `mayNotDo`, `contact`, `sitemap`, `llms`. It adds `demo`.
- The contact is the booking link. No file holds an email address.

## Implementation Checklist

### Tier 1 - Generator

- [x] `lib/seo/agents-json.ts` renders the file from `site.json`.
- [x] `lib/seo/files.ts` lists `public/.well-known/agents.json`.
- [x] `npm run seo` writes it. The existing drift test checks it.

### Tier 2 - Checks

- [x] A test reads the JSON. It checks the rules, the contact link, the `llms` address and that no email address is present.
- [x] `npm test` passes: 109 tests.
- [x] `npm run build` copies the file to `dist/.well-known/agents.json`.

## Smoke Tests

- [ ] **Live file** · as an agent, after the merge and the deploy
  1. Fetch `https://cheminventory.co/.well-known/agents.json`.

  **Pass if:**
  - The answer is HTTP 200 with a JSON content type.
  - `mayNotDo` holds "submit forms".
  - `contact` is the booking link.
  - The text holds no email address.

## Product Decisions

- The file repeats `agents.txt` on purpose. Each reader picks the format it parses.

## Non-Goals

- No change to the page, the copy or the other discovery files.
