# Feature requests mined from the meeting notes → how the prototype answers them

Source: `tbp_meetings_compilation.md` (29 meetings, Mar 19 – Aug 20 2026), the V2 engagement flow, and the FSE departure analysis. Grouped by theme. "Where" points at the prototype.

## 1. Entry & framing

| Request (source) | Where in the prototype |
| --- | --- |
| Users arrive panicked, curious, obligated, or motivated; speak to people where they are (Elizabeth, Aug 20) | Landing → "Where are you right now?" mood picker; tailors the first step, hides nothing |
| Landing page should state concretely what users get out of it (Aug 6) | Landing → hero "What it takes" card + "What you'll walk away with" |
| Spell out: what is it, why it matters, what to do with the output (Karen/Elizabeth, Aug 6) | Landing → three layers, seven milestones; every milestone's "You'll leave with" + "Reflect & decide" column |
| One-pager on how an Engine differs from a research grant (Pat, Aug 20) | `/learn/engine-vs-grant`, surfaced for the "I was told to do this" state |
| Constant "sales" — ROI messaging every 10 minutes (Apr 30) | Outcome facts in every milestone card; Learn callouts |
| Most Engine users already know TBP; heavy intro not needed (Elizabeth, Jul 30) | No "about TBP" section; brand carried by chrome, not copy |
| Link to TBP's existing resources to reframe the value proposition (Aug 19) | Nav + footer links to the live site; CTA band |

## 2. Structure & progression

| Request | Where |
| --- | --- |
| Bookend calls are load-bearing; middle is self-guided with off-ramps (Aug 6, Aug 19, Aug 20) | Milestones 00 and 06 are human calls (sky-blue, "With a navigator" pill); 01–05 self-guided |
| Kickoff must be a real product: framework intro, expectation setting, deadline anchoring, intake (departure analysis) | Milestone 00 checklists: gather materials, name deadline, identify roles, lock codes/peers, state hypothesis, choose path |
| Grayed-out timeline; later calls locked until Call 0 is done; gamified progression (Jul 30) | Stepper + unlock rules in `progress.ts`; locked cards still readable (preview) |
| Milestone framing borrowed from self-paced course models; each ends with a question bank (Ryan, Aug 19) | "Questions for your team" per milestone; five bullets each |
| Post-chunk prompts to prevent "bender" mode (Aug 20) | Question banks + "Reflect & decide" checklists |
| Between-milestone work needs structure (departure analysis) | "Prepare / In the Gem / Reflect & decide" columns with persisted checklists |
| Sequential structure is scaffolding, not a mold; allow non-linear revisiting (departure analysis, Aug 13) | Completed cards stay fully open with "Reopen"; stepper jumps anywhere |
| Mandatory gates vs flexible order (departure analysis, open decision) | One hard gate: 04 → navigator review → 05. Everything else sequential-but-revisitable |
| Each milestone produces a minimum viable artifact (Aug 13) | Artifact named on every card; "Your artifacts" sidebar with saved/pending |

## 3. Diagnosis discipline

| Request | Where |
| --- | --- |
| "Why not already?" is the single most important discipline; must be explicit and mandatory in self-serve | Milestone 04 is a gate; prompt and checklist force the test; input-fallacy flag called out |
| Archetype prescription should not reach the team before human review; three voices (Elizabeth, Aug 13) | "Mark complete & request review" on 04; 05 shows "Waiting on navigator review" until approved |
| Archetypes are nice-to-have, tease lightly (Ryan, Aug 19) | Archetypes live in Learn; cards say "treat as hypothesis"; no archetype badges on the portal |
| "Live hypothesis box" — sticky, tracks the evolving thesis; revised only via navigator (Aug 19) | `HypothesisBox` in the sticky sidebar with version history and "Request a revision" |
| Explicit "the picture changed; revised read" mechanism (departure analysis) | Hypothesis version notes (FSE v2 shows the Lightcast reframe); copy in 02 Reflect |
| Reorganize ecosystem analysis around themes, not taxonomies (departure analysis) | 03 uses People / Ideas / Relationships / Money / Institutions; barrier taxonomy is scaffolding in Learn |
| Stress test against skeptic personas should be required (V2 Call 5, departure analysis) | `StressTest` in 05; six personas must be answered before completion |
| Have the team state their own archetype read before seeing TBP's (V2 Call 2) | 02 Prepare checklist item |

## 4. Data & the Gem

| Request | Where |
| --- | --- |
| Landing page ↔ Gem: two surfaces, light integration, redirect not iframe (Aug 6, Aug 19) | "Open your Compass Gem" deep links + paste-able prompts with copy button; no data exchange |
| NAICS codes precomputed and locked; changes go back to Moonlight (Aug 13) | "Configuration (locked at kickoff)" card; 00/01 copy |
| Flag suppression risk and prompt for misclassified firms (departure analysis) | 01 In-the-Gem checklist + prompt; `/learn/data-what-it-sees` |
| Gem writes a report at each milestone → Drive for async review (Aug 20) | "Artifacts folder" link; artifacts sidebar; copy in Learn → how the Gem works |
| Pre-produced visualizations revealed at the right moment (Aug 13) | Noted in Learn; not mocked in this pass (candidate for a feature branch) |
| Finance dimension is thin; frame expectations upfront (data spec) | 03 Prepare checklist + Learn |

## 5. People & help

| Request | Where |
| --- | --- |
| Describe the type of person to recruit before starting; assume the "Andrea role" is missing (Aug 13, departure analysis) | "Who's in the room" card with required/optional roles; landing section; `/learn/who-in-the-room` |
| Engines should be able to flag they want a thought partner at any point (Elizabeth, Aug 13) | "I want a thought partner here" on every card; floating "Get help"; help drawer with navigator / strategist / email |
| TBP prescribes the path; fluidity between self-serve and guided (Karen + Elizabeth, Aug 13) | Two-paths section; Learn comparison; path chosen in 00; drawer copy on switching |
| Ryan joins every kickoff; navigator role must be defined (Aug 19) | Help card lists Navigator, Strategist, Data steward with roles |
| Should Engines declare an external forcing function to enroll? (departure analysis) | "Your forcing function" card — declare a deadline, days-to-go chip in hero |
| Navigators actively route; self-serve isn't for everyone (Pat, Aug 20) | Copy in mood panel + FAQ + Learn |

## Not built yet (good feature-branch candidates)

- Auth / member-login gating (Jul 30 open question) — placeholder copy only.
- Where landing pages live (engine site vs TBP site vs standalone) — this prototype assumes TBP-hosted.
- Pre-produced network-graph reveals per milestone.
- Cross-Engine archetype discovery ("Engines like yours").
- Navigator/admin view (Sid's back-end persona: provisioning, review queue).
