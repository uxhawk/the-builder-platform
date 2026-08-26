# The Builder Platform — Compass design ideation

Design ideation home for the **self-guided Compass** program: a landing / portal experience that walks NSF Engine teams through the Compass regional diagnostic and hands off to a pre-loaded Gemini Gem.

Built to be reviewed with The Builder Platform (TBP). `main` is the reference concept; feature branches explore alternatives.

## Run it

```bash
nvm use 25.9.0      # Vite 8 needs a current Node; default v20 is too old
npm install
npm run dev         # http://localhost:5173
npm run build       # type-check + production build
```

## What's here

| Route | What it is |
| --- | --- |
| `/` | Cohort-facing landing page: "where are you right now?", outcomes, three layers, seven milestones, two paths, the Gem, who's in the room, FAQ, kickoff CTA |
| `/compass` | Redirects to the signed-in user's Engine (`SIGNED_IN_ENGINE` in `src/config.ts`) — stand-in for auth |
| `/engine/:slug` | Per-Engine portal (FSE seeded at M4; `sample-cohort-two` shows the empty state): stepper, progressively disclosed milestone cards, working-hypothesis box, Gem link, forcing-function deadline, team roster, live help, artifacts, locked configuration |
| `/learn` · `/learn/:slug` | Dive-deeper library (16 topics) linked from every milestone |
| `/styleguide` | Side-by-side parity page for components ported from builderplatform.engine.xyz |

Progress, checklists, mood, deadline and review state persist in `localStorage` per Engine (`tbp-compass:<slug>`). There is no back-end and no Gem integration beyond deep links and paste-able prompts — by design (Aug 6 / Aug 19 decisions).

## Structure

```
public/            fonts, icons, logos and 3D "modular shift" art pulled from the live site
src/styles/        tokens.css (1:1 Webflow variables) · fonts · base · tbp.css (site parity) · compass.css
src/components/    Icons, Primitives (Badge/Button/ArrowLink/BoxCta/WideHero/Notice), Chrome (Banner/Navbar/Footer), Interactive, HelpDrawer
src/compass/data/  milestones.ts · engines.ts · learn.ts · personas.ts · moods.ts   ← all content lives here
src/compass/state/ progress.ts (localStorage hook + unlock rules)
src/compass/components/  Stepper, MilestoneCard, HypothesisBox, MoodPicker, StressTest, SideCards
src/pages/         Landing, EnginePortal, Learn, Styleguide, NotFound
docs/              feature analysis from the meeting notes; the progressive-disclosure model
```

## Design notes

- **Brand**: tokens, type (Neue Haas Grotesk Display + Sometype Mono), color balance and the "modular shift" art follow the Brand Book (Aug 2025) and the live Webflow CSS. Class names mirror the site's so parity is easy to check.
- **Fonts**: Neue Haas is a licensed Monotype face; the TTFs here are TBP's own files served by their site, included for internal review only.
- **Content**: milestone copy, question banks, prompts and Learn topics are condensed from the Compass guide, the V2 engagement flow, the data-layer spec, the FSE departure analysis and 29 meeting notes (Mar–Aug 2026). Treat as a straw man for TBP to react to.

See `docs/feature-analysis.md` for how meeting-note requests map to the UI, and `docs/progressive-disclosure.md` for the disclosure model.

## Branching

- `main` — reference concept, styles as close to the live site as possible.
- `concept/<name>` — alternative explorations (e.g. `concept/single-page-timeline`, `concept/gem-first`). Open a PR to compare against `main`.
