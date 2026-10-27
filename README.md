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
| Brand, headline, tagline, links | `UI_LABELS`, `index.html`, `llms.txt`, `agents.txt`, `.well-known/agents.json`, the og image |
| Feature groups (4 to 6), hero screenshot | Hero, features section, `llms.txt`, JSON-LD |
| Theme colours | `app/color-palette.css`, `theme-color` tags, the og image |
| Crawlers and agent rules | `robots.txt`, `agents.txt`, `.well-known/agents.json` |

Generated files. Do not edit them by hand.

| File | Purpose |
|---|---|
| `public/robots.txt` | Allow all crawlers. Name the sitemap. |
| `public/sitemap.xml` | List the pages. |
| `public/llms.txt` | Short summary for language models. |
| `public/agents.txt`, `public/.well-known/agents.json` | What an automated agent may do, as text and as JSON. |
| `public/CNAME`, `public/404.html` | Custom domain and the not-found page. |
| `public/og.png`, `public/apple-touch-icon.png`, `public/favicon.svg` | Share image and icons. |
| `app/color-palette.css` | Colour variables for light and dark. |
| `index.html` (between the `seo:` markers) | Title, description, canonical, social tags, JSON-LD. |

To change a fact: edit `site.json`, run `npm run seo`, commit the result. The PNG files come from the SVG sources with system fonts, so run `npm run seo` on a Mac.

## Feature groups and screenshots

Each group in `site.features` has an `id`, a `title`, one `statement` of 20 words or fewer, and a `screenshot`. The hero has one `screenshot` too (`site.hero`).

```json
{ "src": "/images/app/history.webp", "alt": "The Audit Log page.", "width": 2880, "height": 1500, "density": 2 }
```

| Field | Meaning |
|---|---|
| `src` | WebP file under `public/`. 150 KB or smaller. |
| `width`, `height` | Pixel size of the file. A test compares them with the file. |
| `density` | Pixels per CSS pixel. A 2x file shows at half its pixel width. |

Take screenshots from the static demo. Crop out the demo banner and the page header band. Show no price, balance, email address or personal name.

## Banned words

`tests/support/copy-rules.json` lists words the site must not use. `tests/claims.test.ts` searches page text, generated files and the og image for them.
