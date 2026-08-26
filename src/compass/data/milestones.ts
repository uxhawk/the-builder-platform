/* ------------------------------------------------------------------
   Self-guided Compass — milestone straw man.
   Synthesised from: Compass Engagement Flow V2 (May 2026), the FSE
   departure analysis (Aug 2026), and the Aug 13 / Aug 19 / Aug 20 reviews:
   - Bookend calls (Kickoff, Synthesis) are load-bearing and human.
   - Milestones 1–5 are self-guided in the Gem; each ends with a
     question bank and produces a minimum viable artifact.
   - "Why not already?" is a mandatory gate with navigator review.
   - Sequential structure is scaffolding, not a mold: completed
     milestones stay open for revisiting.
   ------------------------------------------------------------------ */
import type { BrandColor } from "../../components/Primitives";

export type MilestoneId = "m0" | "m1" | "m2" | "m3" | "m4" | "m5" | "m6";

export interface Milestone {
  id: MilestoneId;
  code: string;
  title: string;
  shortTitle: string;
  kind: "bookend" | "self-guided" | "gate";
  color: BrandColor;
  purpose: string;          // one line — level 1 disclosure
  leaveWith: string;        // level 2
  time: string;
  artifact: string;
  prepare: string[];        // checklist: before you open the Gem
  inGem: string[];          // checklist: work in the Gem (or on the call)
  reflect: string[];        // checklist: after — what to do with the output
  questions: string[];      // five-bullet question bank (Aug 20: "post-chunk prompts")
  gemPrompt?: string;       // paste-able prompt; keeps landing page ↔ Gem integration light
  offRamp?: string;         // when to ask for a thought partner
  gate?: { label: string; description: string };
  deeper: string[];         // learn slugs — level 3 disclosure
  stressTest?: boolean;
  humanLabel?: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "m0", code: "00", title: "Kickoff", shortTitle: "Kickoff", kind: "bookend", color: "sky-blue", humanLabel: "Call with your Navigator + strategist",
    purpose: "Set your bearings with a navigator before any data is pulled.",
    leaveWith: "A configuration summary (industry codes, geography, peers), a first working hypothesis, a declared deadline, and a team that can carry the work.",
    time: "60–90 min call · ~1 hr prep", artifact: "Compass configuration summary",
    prepare: [
      "Gather what you already have: NSF proposal, strategic plan, any regional studies or industry definitions.",
      "List the industries you think you're in — in your own words. NAICS codes are optional; we translate together.",
      "Name your deadline: NSF site visit, renewal pitch, board retreat, budget cycle. The Compass works best pointed at a date.",
      "Identify who's in the room: a mid-senior deputy to own the process, plus someone with regional economic-development fluency.",
    ],
    inGem: [
      "Confirm core and enabling NAICS codes, county footprint, and 3–5 peer regions. These lock once your Gem is built.",
      "State your starting hypothesis — what you believe is holding your industry back — before you see any data.",
      "Agree which path fits: self-guided (Compass Light) or guided (Full Compass). You can switch later.",
    ],
    reflect: [
      "Your Gem is provisioned with your regional data packet (about one business day).",
      "Review the configuration summary. If a code or county is wrong, say so now — mid-journey changes mean a data rebuild.",
    ],
    questions: [
      "What are we trying to accomplish in the next 12–24 months, and what's getting in the way?",
      "Which three audiences do we most need to explain our industry to — and what do we want to say that we can't fully evidence yet?",
      "Which firms do target-industry work under non-target NAICS codes? (Defense primes, contract manufacturers, R&D labs of out-of-state HQs.)",
      "Who on our team can read a regional data table and say “that's wrong, here's why”?",
      "What would make this a “ninja” engagement — small, precise, aimed at a strike we can actually land?",
    ],
    deeper: ["what-is-compass", "who-in-the-room", "ninja-and-but-for", "how-the-gem-works", "self-serve-vs-guided"],
  },
  {
    id: "m1", code: "01", title: "Industry Definition", shortTitle: "Industry definition", kind: "self-guided", color: "evergreen",
    purpose: "Name your industry in terms partners can measure — and flag what the data can't see.",
    leaveWith: "An Industry Definition Statement (one paragraph + NAICS/SOC/CPC mapping) and a confirmed peer list.",
    time: "~2 hours", artifact: "Industry Definition Statement",
    prepare: [
      "Read the regional snapshot the Gem generated from your configuration: employment, firm count, GDP share, patents vs. peers.",
      "Pull your own list of known firms in the industry — the ones you'd name to a reporter.",
    ],
    inGem: [
      "Walk through the draft NAICS/SOC/CPC mapping and react: what fits, what misses, what's missing.",
      "Run the suppression check: where does the data show fewer jobs or establishments than you know exist?",
      "Cross-reference your known-firm list against the mapping. Note firms filed under non-target codes.",
    ],
    reflect: [
      "Save the Industry Definition Statement. It anchors every later data pull.",
      "If suppression or misclassification is material (defense-heavy regions especially), flag it for your navigator — a private-data pull may be warranted.",
    ],
    questions: [
      "Does this definition match the language we use with partners? Where does it diverge?",
      "Is our taxonomy a Venn diagram or clean buckets? Which firms sit in the overlap?",
      "Which peer regions would our funders accept as fair comparisons? Which would they dismiss?",
      "Where do we suspect federal data is hiding a large employer?",
      "Is our industry patent-oriented, or does innovation live in trade secrets and process?",
    ],
    gemPrompt: "Walk me through the draft industry definition for our Engine. For each NAICS code in the core and enabling lists, tell me what the regional snapshot shows (employment, establishments, 10-year change) and flag any code where establishment counts are low enough that federal suppression is likely. Then ask me which known firms are missing from the mapping.",
    offRamp: "Stuck on the taxonomy? This is a common place to want a second pair of eyes.",
    deeper: ["data-what-it-sees", "innovation-mode"],
  },
  {
    id: "m2", code: "02", title: "Industry Trajectory", shortTitle: "Trajectory", kind: "self-guided", color: "ultramarine",
    purpose: "Find out where your industry is actually heading — against your own past and against your peers.",
    leaveWith: "An Industry Trajectory Memo (1–2 pages) and a heatmap of where you lead peers vs. fall behind.",
    time: "~3 hours", artifact: "Industry Trajectory Memo + heatmap",
    prepare: [
      "Before opening the Gem, write your own read: which archetype do you think you are, and why? This protects you from anchoring on the robot's answer.",
      "Skim “Industry archetypes” so the frame is familiar before you see a draft assignment.",
    ],
    inGem: [
      "Ask for the performance packet across three dimensions — structure & output, innovation intensity, job growth & quality — benchmarked against ten years ago and against peers.",
      "Ask for the Gem's archetype hypothesis and the signals behind it. Push back with local knowledge the data can't capture: anchor-firm dynamics, recent shocks, adjacent industries.",
      "Ask: is our purpose to help the industry innovate more, or innovate differently?",
    ],
    reflect: [
      "Record where you agree, where you don't, and why. Disagreement is data.",
      "If the picture changes later (new source, corrected suppression), expect an explicit “revised read” — never a silent update.",
    ],
    questions: [
      "Are we improving in absolute terms while losing ground competitively — or the reverse?",
      "What do we know about our anchor firms that the data can't show?",
      "Does the data point to a sub-sector or value-chain stage we weren't focused on?",
      "Which single number would most surprise our board? Is it right?",
      "What's the one-sentence story we could tell a county commissioner from this memo?",
    ],
    gemPrompt: "Apply the industry performance archetypes to our Engine. Show the indicator values with percentile placements across core, enabling, and total frames, benchmarked against the same region ten years ago and against our peer set. State your archetype hypothesis, the three strongest supporting signals, and the strongest signal against it.",
    offRamp: "If the archetype feels wrong, don't argue with the robot — flag it. That argument is exactly what sharpens strategy.",
    deeper: ["industry-archetypes", "innovation-mode", "data-what-it-sees"],
  },
  {
    id: "m3", code: "03", title: "Ecosystem Assessment", shortTitle: "Ecosystem", kind: "self-guided", color: "magenta",
    purpose: "Explain the trajectory: which relationships are missing, thin, or blocked — in five themes people can actually discuss.",
    leaveWith: "An Ecosystem Assessment (1 page): 2–3 testable barrier hypotheses with the signals behind them.",
    time: "~4 hours · plus 1–2 local conversations", artifact: "Ecosystem Assessment (2–3 hypotheses)",
    prepare: [
      "Review the connectivity views for your region: People (talent flows), Ideas (patents, co-authorship), Relationships (firm-to-firm, leadership networks), Money (capital), Institutions (public & nonprofit alignment).",
      "Know the caveats: finance data is thin on public sources; firm-to-firm uses proxies. Treat those as suggestive, not diagnostic.",
    ],
    inGem: [
      "For each theme, ask what the data shows and what it can't. Then add what you know: which relationships genuinely don't exist vs. just aren't visible.",
      "Draft 2–3 barrier hypotheses in plain language. The Gem maps each to a barrier type (information, coordination, incentives, capacity, market infrastructure) as scaffolding.",
      "Name 2–3 relationships that should exist but don't — and why they haven't formed.",
    ],
    reflect: [
      "Have 1–2 short conversations with commercial actors the data points to — a firm, a supplier, a lab — not workforce boards or EDOs.",
      "Rank the hypotheses: binding vs. secondary. Flag any that need stakeholder validation.",
    ],
    questions: [
      "Which actors are not connected to our network at all — and why?",
      "Is our leadership network dense but nonprofit-heavy? Who from industry is actually at the table?",
      "Are our inventors collaborating in-region, or mostly with out-of-state partners?",
      "Where does demand exist that no one is aggregating?",
      "What did the last person we talked to not know about our industry?",
    ],
    gemPrompt: "Using the ecosystem connectivity data for our Engine, walk through five themes — people, ideas, relationships, money, institutions. For each, say what the data shows, what it cannot show, and what it suggests. Then help me draft 2–3 barrier hypotheses framed as how actors interact (or don't), not what resources are missing.",
    offRamp: "This is where a thought partner helps most. If you'd like a 30-minute check-in before committing to hypotheses, ask now.",
    deeper: ["barrier-types", "ecosystem-archetypes", "data-what-it-sees"],
  },
  {
    id: "m4", code: "04", title: "Diagnosis & Engine Role", shortTitle: "Diagnosis", kind: "gate", color: "deep-blue",
    purpose: "Test every hypothesis with “why not already?” and decide what kind of institution your Engine must be.",
    leaveWith: "A finalized Ecosystem Diagnosis (1–2 pages) and an Engine Role Assessment: barrier → capability required → status → gap or partner.",
    time: "~3 hours · then navigator review", artifact: "Ecosystem Diagnosis + Engine Role Assessment",
    prepare: [
      "Re-read your Milestone 3 hypotheses with fresh eyes. Which would you bet on?",
      "Read “The why-not-already test.” It is the single most important discipline in the Compass.",
    ],
    inGem: [
      "For each hypothesis answer: if this barrier is real and the fix is knowable, why hasn't someone already fixed it?",
      "Watch for the input-fallacy flag: if the answer is “because no one funded it,” the Gem challenges whether it's a structural barrier at all.",
      "Place your Engine on the five capabilities — Connect, Orient, Activate, Integrate, Mobilize — as nascent, established, or advanced.",
      "Ask for a draft Engine archetype. Treat it as a hypothesis for your navigator, not a verdict.",
    ],
    reflect: [
      "Request navigator review. Moonlight reviews the Gem's output first, annotates it, and brings it back alongside your own framing — three voices, not one.",
      "Milestone 5 unlocks after review.",
    ],
    questions: [
      "For each barrier: is it no one's job, a collective-action problem, wrong incentives, or missing capacity?",
      "What can we hold now (name the person, the relationship)? What must we build? Where do we need a partner?",
      "What is our Engine bridging — which two actors don't transact well today?",
      "What's the “but for”: what happens because of us that wouldn't otherwise?",
      "Which of our current programs are inputs to a pipeline rather than changes to the ecosystem?",
    ],
    gemPrompt: "Apply the “why not already?” test to each of my ecosystem barrier hypotheses. For each, give your preliminary answer, flag if it points to an unfunded gap rather than a structural barrier, and say what kind of institutional actor would be needed to fix it. Then help me place the Engine against the five capabilities and propose a draft Engine archetype with rationale.",
    gate: { label: "Navigator review before priorities", description: "A human reviews the diagnosis before first moves are set. This is by design: archetype prescriptions shouldn't reach your team unchallenged." },
    deeper: ["why-not-already", "input-fallacy", "engine-capabilities", "engine-archetypes"],
  },
  {
    id: "m5", code: "05", title: "Priorities, Narrative & Stress Test", shortTitle: "Priorities", kind: "self-guided", color: "verdant", stressTest: true,
    purpose: "Turn the diagnosis into 2–3 first moves and a story that survives skeptical audiences.",
    leaveWith: "An Integrated Diagnostic Document (4–5 pages) and a Priority Roadmap: 2–3 first moves with 6/12/24-month success markers.",
    time: "~4 hours", artifact: "Integrated Diagnostic Document + Priority Roadmap",
    prepare: [
      "Read the annotated diagnosis from your navigator. Note where you disagree.",
      "Skim the first-move menu for your archetype — options assessed on leverage, feasibility, and signal value.",
    ],
    inGem: [
      "Select 2–3 first moves. For each, define what success looks like at 6, 12, and 24 months.",
      "Ask the Gem to draft the narrative that connects industry → ecosystem → Engine → regional prosperity. Edit anything that doesn't sound like you.",
      "Run the stress test below. Answer every skeptic before marking this complete.",
    ],
    reflect: [
      "Share the draft with one internal skeptic and one external friendly before the synthesis call.",
      "Decide which audiences to engage first.",
    ],
    questions: [
      "Does each first move break a reinforcing cycle, or add an input?",
      "Which claim in the narrative would a state legislator challenge first?",
      "What are we asking a CTO to do — specifically — when we invite them “into the ecosystem”?",
      "Which audience could kill this with indifference?",
      "What would we cut if we could only do one thing this year?",
    ],
    gemPrompt: "Based on my finalized diagnosis and Engine archetype, present a first-move menu — each option assessed on leverage, feasibility, and signal value, with rough sequencing over 24 months. Then draft a three-paragraph narrative: our industry is underperforming in this way; because the ecosystem fails in these specific ways; our Engine is built to fix those failures — and here is what we are doing first.",
    deeper: ["skeptic-personas", "engine-archetypes"],
  },
  {
    id: "m6", code: "06", title: "Synthesis", shortTitle: "Synthesis", kind: "bookend", color: "sky-blue", humanLabel: "Closing call with your Navigator + strategist",
    purpose: "Close the loop: your narrative, the robot's read, and Moonlight's synthesis — side by side.",
    leaveWith: "A finalized document you can use with any partner, and a clear view of what to unlock next.",
    time: "60–90 min call", artifact: "Finalized Integrated Diagnostic Document",
    prepare: ["Send your draft document and roadmap three days before the call.", "List the 3–4 assertions you expect to be challenged."],
    inGem: ["Walk the three voices — your framing, the Gem's output, Moonlight's annotations. Where they diverge is where strategy sharpens.", "Agree what's finished, what's open, and whether a follow-on guided engagement is warranted."],
    reflect: ["Your Compass stays open. Come back when conditions change: new data, a new partner, a new deadline.", "Share what you learned with a peer Engine facing a similar archetype."],
    questions: ["Could any member of our team tell the three-paragraph story to a stranger?", "What would we say to NSF about how this shifted our strategy?", "Which open thread matters most in the next 90 days?"],
    deeper: ["what-is-compass", "self-serve-vs-guided"],
  },
];

export const milestoneById = (id: MilestoneId) => MILESTONES.find((m) => m.id === id)!;
export const nextMilestone = (id: MilestoneId) => MILESTONES[MILESTONES.findIndex((m) => m.id === id) + 1];
export const prevMilestone = (id: MilestoneId) => MILESTONES[MILESTONES.findIndex((m) => m.id === id) - 1];
