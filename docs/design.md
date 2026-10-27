# Design: motion and light

The page uses light and small motion to feel alive. Every effect sits on real content. No effect states a fact.

## Effects

| Effect | Where | Rule or keyframes | Property |
|---|---|---|---|
| Pointer light | Buttons, cards | `--glow`, `--gx`, `--gy` | Background image |
| Raised button | Default button | `.btn-raised` | Shadow |
| Press and lift | Buttons | `.btn:hover`, `active:translate-y-px` | Translate, transform |
| Card lift | Pricing and team cards | `.lift:hover` | Transform, opacity |
| Hero entrance | Hero text and screenshot | `rise`, `rise-text` | Opacity, transform, filter |
| Accent word | Hero headline | `shimmer` | Background position |
| Edge light | Main hero button | `sheen` | Rotate |
| Dot field | Hero | `.hero-field`, `drift` | Translate |
| Lit dots | Hero | `.hero-lit` | Opacity, mask |
| Header edge | Header after a scroll | `.site-header[data-scrolled="true"]` | Shadow |

## Rules

- A hover effect runs only where a pointer can hover. Tailwind `hover:` classes follow the same rule (`hoverOnlyWhenSupported`).
- A visitor who asks for reduced motion sees no loop. The pointer does not move the light. The edge light and the lit dots stay off.
- The accent word has no animation under forced colors. It takes the text color.
- A rule on `.btn` or `.lift` sets `background-image` or `background-color`. It never sets the `background` shorthand, because the shorthand removes the glow image.
- The hero screenshot does not blur on entry. Only text blurs, so the paint stays small.
- Colors come from `site.json`. `highlight` and `shade` are the two tokens for edge light and shadow. Timings and sizes sit in `:root` in `app/globals.css`.
- `tests/alive-css.test.ts` checks the hover gate, the reduced-motion rules, the background rule and the contrast of the accent word.

## Files

| File | Job |
|---|---|
| `lib/pointer-glow.ts` | Writes the pointer position onto the target under it |
| `lib/geometry.ts` | Pure helpers for the pointer position |
| `lib/heading.ts` | Splits the headline around the accent word (`hero.accentWord` in `site.json`) |
| `app/globals.css` | The rules and keyframes |
