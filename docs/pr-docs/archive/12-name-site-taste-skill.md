# PR 12: Name the site-taste skill

Status: done

Branch: `docs/name-site-taste-skill`

## Goal

Tell every agent session that shared design rules live in the `site-taste` skill. This repo keeps its own choices in `docs/design.md`. The skill command `taste.py sites` finds drift between the two.

## Context

- Shaun, 2026-10-27: distill the design decisions so they do not get lost, and keep the skill and the sites in step.
- The skill lives in `agent-skills`, PR 33.

## Implementation Checklist

- [x] Add the pointer line to `AGENTS.md`.

## Smoke Tests

- [x] **No served file changes** · `npm test` passes with 128 tests. No layout walk applies.
