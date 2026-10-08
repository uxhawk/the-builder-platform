# My Compass — version A vs. version B

Two takes on the per-Engine portal, built to be reviewed side by side. On the `my-compass-b` branch both are deployed together: **A at `/engine-a/:slug`**, **B at `/engine-b/:slug`**, and the Compass nav dropdown lists both so a reviewer can flip between them without leaving the site (`/engine/:slug` resolves to B, hash included, so Learn's related-milestone links still land on the right card). Header, working-hypothesis box, nav and footer are shared; the milestone timeline and the Gem dock differ.

| | **A** (`/engine-a/:slug`) | **B** (`/engine-b/:slug`) |
| --- | --- | --- |
| The bet | Scaffold the journey: one milestone at a time, with a hard gate | Trust the reader: the whole journey is on the table, open whatever you need |
| Milestone state | Complete · Up next · Available · Locked · In review, with a progress count in the header | None. Every card is the same accordion, closed by default, opened and closed freely |
| Marking progress | "Done" button per milestone (m4: "Done · request review"); reopen later | No done button, no counter. Nothing to mark |
| Locks and gates | Each milestone unlocks after the previous one; 05 waits on the navigator's review of 04, shown as a pink gate node on the timeline | Nothing is locked and the gate node is gone; the review is not mentioned on the page |
| Card header | Kicker with time estimate, title, purpose, status pill | Kicker ("Milestone 1" / "Call", no time estimate), title, purpose, an Open/Close button; calls keep their "With a navigator" pill |
| The Gem prompt | Lives in the dock, for the current milestone only | None. No prompt box, no copy-and-open button; the reader opens the Gem from the dock and starts the milestone there |
| Gem dock | "Now · 0x" with the current prompt, plus the "Stuck? Talk to a human" card | "Open your Gem" only; no provisioned pill, no people card |
| Go deeper | Learn chips on every card; locked cards say "Read ahead" | Removed. Learn is reachable from the nav |
| Thought partner | Flag button on every card | Removed |
| Stress test on 05 | Six skeptic personas with a self-check per persona; gates the Done button | Removed, along with the "run the stress test below" bullet |
| Page header | Engine name, "0 / 7 milestones" count, "reset prototype state"; hypothesis box labelled "Working hypothesis · v3" | Engine name only; hypothesis box labelled "Hypothesis" |
| Still shared | Hypothesis revision request (same localStorage record per Engine); calls keep their Book / Schedule button | Same |

## What B responds to

- "Sequential structure is scaffolding, not a mold" (milestones.ts header note) → B drops the scaffolding entirely and lets the reader move freely.
- Users arriving "curious" or "obligated" want to see the whole shape before committing to step one → every milestone reads at a glance and opens on demand.
- The dock's "Now" panel assumed one current milestone; without one, the dock is just the link to the Gem.

## What B gives up

- Legible state. There is no answer to "where am I, what's next" on the page (progressive-disclosure rule 7); the reader keeps that in their head or in the Gem.
- The hard gate. It is neither enforced nor shown; the navigator review has to be scheduled and explained by a human.
- Off-ramps into Learn from the work itself. The library still exists, but no card points into it.
- Paste-able prompts and the ambient help (thought-partner flag, people card). The Gem does the guiding; the page only says what each milestone is for.

## Questions to put to reviewers

1. With nothing marked done, do people know where they are on a return visit, or does B need a lightweight "last opened" memory?
2. Does removing the 04 gate read as freedom or as a missing guardrail?
3. Without a prompt on the page, do people know what to say to the Gem when they open it?
4. Which page would you hand to an Engine that is mid-journey? Which to one that is deciding whether to start?
