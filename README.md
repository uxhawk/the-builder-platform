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
| `/` · `/compass` | Redirect to `/compass-b`, this branch's default landing page |
| `/compass-a` | Compass landing page **version A (mood-led)** — the page on `main`, brought over in full: mood picker, outcomes, three layers, the Gem, FAQ. Listed in the Compass nav dropdown so reviewers can flip between the two. |
| `/compass-b` | Compass landing page **version B (proof-led)**: the deliverable in the hero, a three-step viewer (kickoff call · self-paced in My Compass · synthesis call) showing what each step leaves behind, who does what, FAQ, kickoff band. |
| `/engine/:slug` | Per-Engine portal (FSE seeded at M4; `sample-cohort-two` shows the empty state): stepper, progressively disclosed milestone cards, working-hypothesis box, Gem link, forcing-function deadline, team roster, artifacts, locked configuration |
| `/learn` · `/learn/:slug` | Dive-deeper library (16 topics) linked from every milestone |
| `/styleguide` | Side-by-side parity page for components ported from builderplatform.engine.xyz |

Progress, checklists, mood, deadline and review state persist in `localStorage` per Engine (`tbp-compass:<slug>`). There is no back-end and no Gem integration beyond deep links and paste-able prompts — by design (Aug 6 / Aug 19 decisions).

## Structure

```
public/            fonts, icons, logos and 3D "modular shift" art pulled from the live site
src/styles/        tokens.css (1:1 Webflow variables) · fonts · base · tbp.css (site parity) · compass.css · landing.css (landing B)
src/components/    Icons, Primitives (Badge/Button/ArrowLink/BoxCta/WideHero/Notice), Chrome (Banner/Navbar/Footer), Interactive
src/compass/data/  milestones.ts · engines.ts · learn.ts · personas.ts · moods.ts · artifacts.ts   ← all content lives here
src/compass/state/ progress.ts (localStorage hook + unlock rules)
src/compass/components/  Stepper, MilestoneCard, HypothesisBox, MoodPicker, StressTest, SideCards, ArtifactViewer (landing B)
src/pages/         LandingA (main's page), LandingB (this branch), EnginePortal, Learn, Styleguide, NotFound
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
- `homepage-version-b` — alternative landing page (proof-led, written for a pre-kickoff Engine lead) at `/compass-b`, with `main`'s page kept alongside at `/compass-a` so both can be reviewed from one deploy. Everything else is identical to `main`; see `docs/homepage-a-vs-b.md` for the comparison.
