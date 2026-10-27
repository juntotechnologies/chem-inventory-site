# ChemInventory landing page

Static marketing site for ChemInventory. Built with Vite, React 19 and Tailwind CSS. GitHub Pages serves it at `cheminventory.co`.

## Run

```bash
npm install --legacy-peer-deps
npm run dev
```

`npm run dev` binds to all interfaces and prints one tailnet link. Open that link.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server. Print the tailnet link only. |
| `npm test` | Run the tests. They fail when a generated file drifts from `site.json`. |
| `npm run build` | Build to `dist/`. Then prerender the page into `dist/index.html`. |
| `npm run preview` | Serve `dist/`. |
| `npm run seo` | Regenerate every file that derives from `site.json`. |

## One source of truth

`site.json` holds the site facts. A zod schema in `lib/site-schema.ts` validates it once.

| Fact | Where it appears |
|---|---|
| Brand, headline, links | `UI_LABELS`, `index.html`, `llms.txt`, `agents.txt` |
| Feature groups (4 to 6) | Features section, `llms.txt`, JSON-LD |
| Theme colours | `app/color-palette.css`, `theme-color` tags, the og image |
| Crawlers and agent rules | `robots.txt`, `agents.txt` |

Generated files. Do not edit them by hand.

| File | Purpose |
|---|---|
| `public/robots.txt` | Allow all crawlers. Name the sitemap. |
| `public/sitemap.xml` | List the pages. |
| `public/llms.txt` | Short summary for language models. |
| `public/agents.txt` | What an automated agent may do. |
| `public/CNAME`, `public/404.html` | Custom domain and the not-found page. |
| `public/og.png`, `public/apple-touch-icon.png`, `public/favicon.svg` | Share image and icons. |
| `app/color-palette.css` | Colour variables for light and dark. |
| `index.html` (between the `seo:` markers) | Title, description, canonical, social tags, JSON-LD. |

To change a fact: edit `site.json`, run `npm run seo`, commit the result. The PNG files come from the SVG sources with system fonts, so run `npm run seo` on a Mac.

## Feature groups

Each group in `site.features` has an `id`, a `title`, one `statement` of 20 words or fewer, and an optional `screenshot`.

```json
{ "src": "/screens/audit-log.png", "alt": "The audit log", "width": 1600, "height": 1000 }
```

Put screenshot files under `public/`. The section shows 4 to 6 groups.
