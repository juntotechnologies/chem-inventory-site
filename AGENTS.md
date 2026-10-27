# chem-inventory-site

The public site of ChemInventory, at `https://cheminventory.co/`. It is a Vite and React page. GitHub Pages serves it. It links to the ChemInventory demo, which runs from the private `chem-inventory` repository.

The global rules in `~/AGENTS.md` apply here. This file adds the rules for this repo.

## Delivery

- Work on a branch. Open a pull request with a doc in `docs/pr-docs/`. Run `npm test` and `npm run build`.
- Never push to `main`. Never merge a pull request. Never turn on auto-merge. Shaun reviews and merges every change.
- Reason: this site and the ChemInventory application serve other users. Shaun, 2026-10-27: "you should not be allowed to merge to main without my oversight."
- A merge to `main` publishes the site through `.github/workflows/deploy.yml`.

## Source of truth

| Fact | Lives in | Derived into |
| --- | --- | --- |
| Brand, headline, links, features, theme, crawler and agent rules | `site.json` | `UI_LABELS`, `index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `agents.txt`, `.well-known/agents.json`, the images, `app/color-palette.css` |

Never edit a generated file. Edit `site.json`, then run `npm run seo`. See `README.md` for the list.

## Rules

- Say "designed to support validation". Make no claim of Part 11 compliance. A claim about a DEA or FDA rule needs a compliance reviewer.
- State no price. The demo and every screenshot show sample data.
- Never write Shaun's email address in a generated or discovery file. The contact link is the booking link.
- Each code file starts with one `/** ... */` line. `tests/code-shape.test.ts` holds the code to the shape limits.
