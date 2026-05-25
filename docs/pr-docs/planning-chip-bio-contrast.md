# Hero Origin, Bio, Contrast

## Scope

- Hero now leads with why CIMS exists: spreadsheets and generic inventory tools fail real chemistry workflows.
- Top chip now says CIMS was built inside real chemistry lab workflows.
- Hero body now says CIMS came from direct work in a commercial chemistry lab.
- Hero body now states impact: fewer admin errors, fewer delays, more room to scale.
- Low-contrast soft chips are darker with matching borders.
- Shaun bio is shorter, then lightly trimmed twice to fit the card better.
- `dcurves` downloads now use the Shields JSON endpoint directly.
- If the download count cannot be fetched, bio says `widely used` instead.
- Unit tests cover download parsing, missing-count fallback, and bio copy selection.
- CI runs tests before build on PRs and deploy runs.

## Checklist

- [x] Hero chip updated.
- [x] Hero origin copy added above the fold.
- [x] Top teal tag contrast no longer eye-strain light.
- [x] `Built With You` tag darker.
- [x] Border color adjusted with text.
- [x] Bio cut by 30-40%.
- [x] Bio trimmed an extra ~10%, then tightened by a few more words.
- [x] Bio keeps proof: AI systems, founding engineer, MSKCC, `dcurves`, chemistry context, degrees.
- [x] Download count shows `63k`.
- [x] Pepy scrape removed.
- [x] Shields JSON is the download source.
- [x] Missing download count falls back to `widely used` bio copy.
- [x] Unit tests added.
- [x] CI runs `npm test`.
- [x] PRs run test/build without deploying.
- [x] Build passes.
