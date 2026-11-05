# PR 17: Drop the cross-repo check workflow

Status: underway

Branch: `chore/drop-cross-repo-check`

## Goal

No workflow in this repo calls another repo. The check is `ops check` on the head commit, then `ops ship`.

## Context

- `.github/workflows/check.yml` called `juntotechnologies/agent-skills/.github/workflows/check.yml@main`, a floating call into another repo. It blocked archiving `agent-skills`.
- This repo is public. It cannot call the private `swarm-infra` workflow, and a deploy key readable by a public repo's workflows can read all of `swarm-infra`.
- Shared rules come from the installed `ops`. This repo's own settings stay in `ops-check.json`.
- `deploy.yml` stays: it runs `npm test` and `npm run build` on pull requests, publishes on `main`, and calls no other repo.

## Implementation Checklist

### Tier 1 - Gate

- [x] Delete `.github/workflows/check.yml`.
- [x] `AGENTS.md` names `ops check` and `ops ship` as the gate.

### Tier 2 - Checks

- [x] `ops check` passes on a clean tree at the head commit.

## Verification

| Check | Evidence | Result |
|---|---|---|
| `ops check` (shared lint, `npm run test`: 18 files, 128 tests) | clean tree at the head commit | pass |
| `deploy.yml` `build` job on the PR | PR checks | pending |
| No `uses:` of another repo | `grep -rn "uses: juntotechnologies" .github/workflows` | no match |

## Smoke Tests

Covered by the checks above; the PR changes no page.

## Product Decisions

- Local `ops check` plus `ops ship` is the only gate. There is no branch protection, so the removed workflow only decorated PRs.

## Scope

- One workflow file deleted, one line in `AGENTS.md`, this doc.
