/* Learn library — the “dive deeper” layer. Content condensed from the
   Ecosystem Readiness Compass guide, the V2 engagement flow, the data-layer
   spec, and the FSE departure analysis. Plain language first; framework
   vocabulary second (per open question #6 in V2). */
import type { MilestoneId } from "./milestones";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "h4"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "callout"; text: string }
  | { t: "table"; cols: string[]; rows: string[][] };

export interface LearnTopic {
  slug: string; title: string; group: "Start here" | "Frameworks" | "Process" | "Data & the Gem";
  summary: string; body: Block[]; related: MilestoneId[];
}

export const LEARN: LearnTopic[] = [
  {
    slug: "what-is-compass", group: "Start here", title: "What the Compass is (and isn't)", related: ["m0", "m6"],
    summary: "A regional decision system: evidence first, then alignment, then two or three moves you can defend.",
    body: [
      { t: "p", text: "Engines default to talking about their work at two levels: the macro case (“this technology matters for national security and jobs”) and the micro case (“here are our twelve sub-awards”). What's missing is the middle layer — a concrete account of how the regional ecosystem actually works or doesn't, and how the Engine intends to change it. That middle layer is where the real theory of change lives." },
      { t: "p", text: "The Compass builds that layer from the inside out: first define the target industry in terms partners already use; then establish where it's heading relative to peers; then identify the specific ecosystem barriers that explain that trajectory — and only then name what the Engine is built to fix." },
      { t: "h", text: "What you walk away with" },
      { t: "ul", items: [
        "An industry definition in NAICS, SOC and CPC terms that is legible to partners and measurable.",
        "A clear, data-grounded account of how your industry is performing and why — benchmarked, not described in isolation.",
        "Clarity on the ecosystem barriers holding it back, tested against a “why not already?” filter that separates structural failures from unfunded gaps.",
        "A narrative you can use directly with partners and funders — written about your region, not a template with blanks.",
        "A set of first-move priorities tied to your specific diagnosis, with a 24-month horizon.",
      ] },
      { t: "h", text: "What it isn't" },
      { t: "ul", items: ["A 190-page report. The pilot aimed for nineteen slides.", "A verdict. Every archetype is a hypothesis; every claim is editable.", "A blank strategy exercise. You already have a strategy; this sharpens your first moves within it."] },
      { t: "callout", text: "TBP does the analytical heavy lifting. Roughly two-thirds of the output comes from analysis of public and large-scale regional data; one-third from what the process surfaces — local knowledge and your team's own strategic judgment that no dataset captures." },
    ],
  },
  {
    slug: "engine-vs-grant", group: "Start here", title: "How an Engine differs from a research grant", related: ["m0"],
    summary: "The one-pager most Engines wish they'd had six months in.",
    body: [
      { t: "p", text: "An Engine is not a grant program with a bigger budget. It is a small, precisely targeted intervention team — roughly $10–15M a year — trying to shape how much larger sums ($500M a year or more) get spent on research, education, and economic development in a region." },
      { t: "p", text: "A grant adds raw material to an innovation pipeline: more funding, more facilities, more trained scientists, more startup programs. An Engine changes the ecosystem: how information flows (startups now know what large firms need), what actors are incentivized to do (agencies see that deploying new technology is a cheaper way to meet their goals), and what market infrastructure exists (financing mechanisms, procurement pathways, testbeds)." },
      { t: "h", text: "The five things an ecosystem builder does" },
      { t: "table", cols: ["Capability", "What it means"], rows: [
        ["Connect", "Bring together actors who wouldn't normally interact — across institutional pillars, not just within them."],
        ["Orient", "Create a shared problem definition and buy-in for a strategy grounded in the region's competitive position."],
        ["Activate", "Mobilize industry as co-investors and co-designers, not beneficiaries of services."],
        ["Integrate", "Build cross-sector teams that create new delivery systems, not just coordinate activities."],
        ["Mobilize", "Attract state, local, philanthropic and private resources in multiple forms to sustain the work."],
      ] },
      { t: "callout", text: "The test: what specifically happens because of the Engine that wouldn't happen otherwise? Not “we support semiconductor manufacturing” — but “this contract, this capability, this capital flow exists because of us.”" },
    ],
  },
  {
    slug: "ninja-and-but-for", group: "Start here", title: "The “ninja” framing and the “but for” question", related: ["m0", "m4"],
    summary: "Small, surgical, aimed at a strike you can actually land.",
    body: [
      { t: "p", text: "In the first pilot kickoff, the Engine's CEO adopted a framing that stuck: an Engine is a ninja. Not a broad transformation program — a small team with a modest budget that has to be precise about where it acts. “When we fire our bullets, let's do it where we think we'll get our biggest strike.”" },
      { t: "p", text: "The analogy from the strategist: grid-enhancing technologies. Small transmission investments that yield 20–40% more capacity from existing infrastructure, versus building new lines. Chronically underinvested because they're unglamorous — and exactly where an Engine's leverage lives." },
      { t: "h", text: "The “but for” question" },
      { t: "p", text: "For every proposed move: which specific connection, contract, capability, or capital flow will exist because of us that wouldn't exist otherwise? If you can't answer with a concrete example, the move is probably an input, not an intervention." },
      { t: "callout", text: "The Compass is designed to get you from grandiose industry-transformation claims to specific, bounded interventions with a “but for” attached to each." },
    ],
  },
  {
    slug: "input-fallacy", group: "Frameworks", title: "The input fallacy", related: ["m3", "m4"],
    summary: "Why “we need more X” is usually the wrong diagnosis.",
    body: [
      { t: "p", text: "The input fallacy is the assumption that innovation output is a function of the quantity and quality of inputs: more funding, more facilities, more trained scientists, more startup programs. It is the default trap for Engines because inputs are countable, so political and reporting pressure always bends toward buying inputs that are already relatively abundant." },
      { t: "p", text: "The Compass forces a stop between “our industry is underperforming” and “we need more inputs.” The question in between: what ecosystem behaviors — who interacts with whom, where linkages are missing, where demand isn't being aggregated — produced this trajectory?" },
      { t: "h", text: "How to catch yourself" },
      { t: "ul", items: [
        "If the proposed fix is a fund, a facility, or a program, ask what relationship it changes.",
        "If the barrier “persists because no one funded it,” it's probably not a structural barrier.",
        "If a region already has a large industry in jobs or GDP but no cluster in the traditional sense, adding inputs won't build one.",
      ] },
    ],
  },
  {
    slug: "industry-archetypes", group: "Frameworks", title: "Industry archetypes", related: ["m2"],
    summary: "Four patterns for where a regional industry is heading. Hypotheses, not labels.",
    body: [
      { t: "p", text: "Milestone 2 benchmarks your industry twice — against the same region ten years ago and against peer regions. A region can be improving in absolute terms while losing ground competitively, or holding steady while the landscape shifts beneath it. Each pattern demands a different response. The archetype is a shorthand for the pattern, and it's presented as a hypothesis with the signals behind it." },
      { t: "table", cols: ["Archetype", "The story", "Data signal"], rows: [
        ["Specialized Powerhouse", "“We're a global leader in this industry but face an efficiency trap: massive output, aging technology.”", "Location quotient > 1.5 in a specific NAICS; flat innovation intensity."],
        ["Emerging Contender", "“A steady, diverse economy with a spark growing 3× faster than our traditional sectors.”", "Highest % growth in jobs or earnings over 5–10 years in a young NAICS code."],
        ["Unintentional Exporter", "“World-class research and R&D spend, but local industry isn't capturing the value. We export our best ideas.”", "High innovation index or BERD paired with low or stagnant GDP growth in related industries."],
        ["Resilient Rebounder", "“Hit hard by a legacy industry's decline, but with a reusable asset: skilled workforce and specialized infrastructure.”", "Declining employment in a core sector, high concentration of occupation clusters that overlap the Engine's technology."],
      ] },
      { t: "callout", text: "Before you see the Gem's read, write your own. The pilot built this into the process on purpose: it protects the team's own mental model from being overwritten by the first authoritative-sounding answer." },
      { t: "h", text: "Why archetypes are a “nice to have,” not the goal" },
      { t: "p", text: "Leading with archetypes risks an Engine deciding none fit and disengaging. Their best use is cross-Engine discovery: a maritime Engine may share more with a bio-manufacturing Engine than with other maritime hubs. Tease lightly; reveal as a guide, not a label." },
    ],
  },
  {
    slug: "ecosystem-archetypes", group: "Frameworks", title: "Ecosystem archetypes", related: ["m3"],
    summary: "Five patterns of assets and connectivity — how to recognize your region.",
    body: [
      { t: "table", cols: ["Archetype", "How to recognize your region", "What indicators typically show"], rows: [
        ["Asset-rich, lightly connected", "Many relevant assets; coordination is informal or episodic.", "Universities, firms, workforce orgs and funders exist; limited cross-sector programs; reliance on personal relationships rather than systems."],
        ["Functionally connected but fragmented", "Active partnerships exist, but only within parts of the ecosystem.", "Strong linkages in select industries or institutions; uneven participation across the region or across firm sizes."],
        ["Research-forward, industry-light", "Strong research and invention signals; limited uptake by local firms.", "High patenting or research output but few local licensees or spinoffs; weak industry pull."],
        ["Industry-forward, talent- or research-constrained", "Firms are driving demand, but pipelines from research or talent are thin.", "Strong firm activity and job demand; meaningful skills gaps; limited research collaboration."],
        ["Integrated innovation system", "Research, industry, workforce, capital and government aligned around shared priorities.", "Repeatable collaboration; clear pathways from research to industry to market; dense firm-to-firm and talent pipelines."],
      ] },
      { t: "p", text: "In the pilot, the ecosystem conversation organized itself around themes the team could engage with — talent, patents, leadership networks — rather than the analytical taxonomy. The taxonomy is still underneath; the themes are how it's presented." },
    ],
  },
  {
    slug: "engine-archetypes", group: "Frameworks", title: "Engine archetypes", related: ["m4", "m5"],
    summary: "Five ways an Engine can sit in its ecosystem — and what each primarily does.",
    body: [
      { t: "table", cols: ["Archetype", "How to recognize the fit", "What the Engine primarily does"], rows: [
        ["Academic Anchor", "Strong universities and R&D; weak commercialization and firm scaling; startups and talent leave.", "Orients the ecosystem around frontier technologies; connects researchers to industry and funders; legitimizes emerging domains for external partners."],
        ["Industry-Led", "A critical mass of firms with shared workforce, innovation or supply-chain challenges; limited collective action among competitors.", "Activates firms as co-owners of shared platforms (workforce pipelines, pilots, testbeds); mobilizes private capital; makes market needs legible."],
        ["Civic Systems Integrator", "Many public, workforce and education institutions misaligned with innovation priorities — “program rich, system poor.”", "Aligns civic systems around emerging-industry priorities; translates technology needs into public-system action."],
        ["Market-Maker", "Promising technologies stall on weak demand, financing gaps, or early-stage risk; few first customers or procurement pathways.", "Structures demand and finance — pooled capital, guarantees, advance purchase commitments, procurement mechanisms."],
        ["Strategic Integrator", "Many assets, weak connectivity, fragmented initiatives; no actor responsible for diagnosing system-level failures.", "Diagnoses ecosystem failures; integrates across research, industry, workforce, capital and sites; selectively convenes, funds, or operates missing functions."],
      ] },
      { t: "callout", text: "The archetype call emerges from the combination of the industry diagnosis, the ecosystem diagnosis, and the Engine's organizational reality. It arrives with a first-move menu attached — but it arrives after a human has reviewed it, never before." },
    ],
  },
  {
    slug: "barrier-types", group: "Frameworks", title: "The six kinds of ecosystem barrier", related: ["m3", "m4"],
    summary: "Plain-language vocabulary for what's actually broken — none of which is “not enough money.”",
    body: [
      { t: "p", text: "A real ecosystem diagnosis names a specific failure in how actors relate to each other or how markets function. This vocabulary separates that from a generic “we need more collaboration” claim — and from a “we need more inputs” claim." },
      { t: "table", cols: ["Barrier", "What it looks like"], rows: [
        ["Information gaps", "Actors who would benefit from transacting can't see each other. A manufacturer doesn't know a lab is working on a relevant technology; a college doesn't know which skills firms will need in three years."],
        ["Coordination failures", "Everyone is waiting for everyone else to move first. No firm will fund a shared testbed because returns accrue to competitors; no program will specialize because enrollment depends on commitments that depend on the program existing."],
        ["Misaligned incentives / free-riding", "Actors can see the opportunity but won't act because they can't capture enough of the return. A firm won't train workers who may leave."],
        ["Absorptive capacity gaps", "Actors lack the internal capability to engage even when everything else is in place. Firms that can't evaluate new technologies; agencies that can't procure novel products."],
        ["Regulatory and institutional barriers", "The rules prevent actors from doing what they otherwise would. A funding formula that rewards enrollment, not sectoral alignment; a rate case that can't accommodate a pilot."],
        ["Missing market infrastructure", "The structural layer beneath the others: no financing mechanism, procurement pathway, testbed, certification standard, or data-sharing agreement that would let transactions happen at all."],
      ] },
      { t: "p", text: "In Milestone 3 you write hypotheses in plain language; the Gem maps them to these types as scaffolding. In Milestone 4, each one meets the “why not already?” test." },
    ],
  },
  {
    slug: "why-not-already", group: "Frameworks", title: "The “why not already?” test", related: ["m4"],
    summary: "The single most important discipline in the Compass — and the one self-guided teams are most likely to skip.",
    body: [
      { t: "p", text: "Once you've named an ecosystem barrier, ask: if this failure is real and the solution is knowable, why hasn't someone already fixed it?" },
      { t: "h", text: "It does two things" },
      { t: "ul", items: [
        "Filters out false diagnoses. If the answer is “someone could, they just haven't prioritized it,” the Engine's move is to catalyze that actor (connect, orient), not duplicate their function.",
        "Defines the Engine's value proposition. The Engine exists to hold functions nothing else in the ecosystem can hold — and the answer is the evidence that those functions need a new institution rather than a new program inside an existing one.",
      ] },
      { t: "callout", text: "The sharpest version: if the answer is “because no one has funded it yet,” the barrier is probably not a real ecosystem failure. Real failures persist because the conditions for resolving them don't exist — not because the resolution is unfunded. An Engine that answers “it wasn't funded” is about to fall into the input fallacy." },
      { t: "h", text: "Why it's a gate in the self-guided track" },
      { t: "p", text: "In the guided pilot, the team's domain experts ran this test implicitly, live, on every hypothesis. Self-guided teams won't have that check in the room — so the tool makes it explicit and mandatory, and a navigator reviews the result before priorities are set." },
    ],
  },
  {
    slug: "engine-capabilities", group: "Frameworks", title: "The five capabilities — nascent, established, advanced", related: ["m4"],
    summary: "A qualitative self-assessment of what your Engine can hold today — and what to build or partner for.",
    body: [
      { t: "p", text: "Analysis of an Engine's capabilities is necessarily qualitative. These tiers illustrate what a candid self-assessment looks like; the purpose is to understand the strengths and limits of your organizational position — a university has capabilities an EDO lacks and vice versa — and plan to bolster weaknesses by building or partnering." },
      { t: "table", cols: ["Capability", "Nascent", "Established", "Advanced"], rows: [
        ["Connect", "Convenes regularly, but homogeneous groups within pillars; opt-in orgs only.", "Convenes diverse groups around specific processes; designed collisions, but limited to innovation-minded people.", "Seen as a committed, neutral hub; convenes many combinations informally and knows when to systematize."],
        ["Orient", "Materials describe grant activities; no clear regional position; strategy outsourced; generic metrics.", "Rigorous analysis of assets and competitive position; clear theory of regional advantage; innovation defined broadly.", "Actively shapes regional narratives; runs an intelligence function; points partners at specific bottlenecks."],
        ["Activate", "Industry as arms-length advisors; businesses treated as beneficiaries; mid-level staff engaged.", "Sector forums that aggregate demand; hands signals to partners; engages senior technical leaders.", "Business leaders define problems and co-design; engages many individuals inside many firms."],
        ["Integrate", "New entrant; funds directly rather than changing systems; coordinates rather than enforces strategy.", "Strong perspective on gaps and duplication; backbone role; influences demand and supply sides.", "Shifts fluidly between convener, implementer, funder; can reorganize the ecosystem; player-coach."],
        ["Mobilize", "Funding primarily NSF; grants only; resources allocated to maintain relationships.", "Non-federal funding at similar scale; building the post-grant case; beginning to use mixed instruments.", "Non-federal funding exceeds federal; patient capital; allocates by ROI as conditions change."],
      ] },
    ],
  },
  {
    slug: "innovation-mode", group: "Frameworks", title: "Innovation mode, maturity, and capital intensity", related: ["m1", "m2"],
    summary: "Three dimensions that decide which ecosystem strategy could possibly work.",
    body: [
      { t: "h4", text: "Innovation mode" },
      { t: "p", text: "Science-to-market: novel products, codified knowledge, formal IP; key actors are research universities, tech transfer, venture capital (pharma, biotech, some defense tech). Firm-to-firm applied: process improvement, second-generation adaptation, tacit knowledge flowing through supply chains, worker mobility and informal collaboration; key actors are other firms, skilled workers, community colleges, MEPs (metals, electronics, advanced manufacturing, machinery). Over 80% of innovation is new-to-firm, not new-to-market." },
      { t: "callout", text: "Guard against two biases: the pull toward science-to-market as the default (because universities and most federal programs value invention), and path dependency in the other direction (assuming the region's current mode is the one to build toward). Getting this wrong means diagnosing the industry correctly and prescribing the wrong Engine." },
      { t: "h4", text: "Technology maturity" },
      { t: "p", text: "Pre-commercial (TRL 1–5): discovery and market signals. Demonstration (TRL 5–7): the valley of death between lab and production — the most acute ecosystem gaps. Production-ready (TRL 7–9): scale-up, supply chains, workforce, structured demand." },
      { t: "h4", text: "Capital intensity" },
      { t: "p", text: "Capital-intensive, long-horizon ($100M+, 5–10 years) needs patient capital, blended finance, government co-investment — the standard VC model doesn't work. Capital-moderate ($10–100M) can scale through conventional finance if market conditions exist. Capital-light: standard VC works. Most Engines are in capital-intensive or -moderate industries while applying capital-light strategies." },
    ],
  },
  {
    slug: "skeptic-personas", group: "Process", title: "The stress test: six skeptics", related: ["m5"],
    summary: "Every partner sees only part of your causal chain. If the links aren't explicit, they fill the gaps with wrong assumptions.",
    body: [
      { t: "p", text: "A state legislator who hears “ecosystem building” but can't see the connection to jobs will treat the Engine as an academic exercise. A philanthropic funder who sees the industry case but not the equity case will pass. A community college dean who can't see quantified employer demand will hedge. A corporate leader invited to “participate in the ecosystem” without knowing what's being asked will send the community-relations director instead of the CTO. A startup organization that sees duplication will compete rather than partner." },
      { t: "p", text: "Milestone 5 makes you answer each of them before the diagnostic is marked complete. In the guided pilot, this step was likely to be skipped; the self-guided track bakes it in." },
      { t: "callout", text: "These misperceptions are existential: Engines only have their intended impact if they convince other entities to invest ten times as much energy and money as NSF invests in the Engine." },
    ],
  },
  {
    slug: "who-in-the-room", group: "Process", title: "Who should be in the room", related: ["m0"],
    summary: "The pilot worked partly because of one person most Engines don't have. Plan for that.",
    body: [
      { t: "p", text: "The first pilot had an unusually strong domain expert on the Engine side — someone with cluster-methodology background and roaming institutional knowledge who could complicate the data in real time: “that firm is filed under navigational instruments but runs a packaging fab.” That role was not a nice-to-have. It was what made the engagement work." },
      { t: "h", text: "Roles" },
      { t: "table", cols: ["Role", "Why", "Required"], rows: [
        ["Engine lead / CEO", "Attends kickoff and synthesis; owns the strategic call. Not the day-to-day interlocutor.", "Yes"],
        ["Process owner — mid-senior deputy", "Primary interlocutor across all milestones. Not the CEO, not a junior researcher.", "Yes"],
        ["Regional economic-development fluency", "Someone who can look at a data table and say “that's wrong, here's why.” If you don't have this person, tell us at kickoff — we'll help you find one or plan for a heavier navigator role.", "Yes"],
        ["Technical / industry voice", "A CTO, engineer, or founder. Leadership networks in the pilot were dense but nonprofit-heavy; the technical network was sparse. Bring the technical network in.", "Recommended"],
        ["Evaluators", "Invited to the data-heavy early milestones as insight partners.", "Optional"],
      ] },
      { t: "callout", text: "Push for broader representation than your instinct. The process works better with more voices — and with people from legacy firms who should be exposed to innovation, not just the ones who already opted in." },
    ],
  },
  {
    slug: "self-serve-vs-guided", group: "Process", title: "Self-guided vs. Full Compass", related: ["m0", "m6"],
    summary: "Two paths, one framework. TBP recommends a path at kickoff; you can move between them.",
    body: [
      { t: "table", cols: ["", "Self-guided Compass", "Full Compass (guided)"], rows: [
        ["Who drives", "Your team, with the Gem", "TBP's navigator, strategist and data steward"],
        ["Human touchpoints", "Kickoff + synthesis calls; navigator review at the diagnosis gate; off-ramps anywhere", "Five or six facilitated calls over 10–12 weeks"],
        ["Time from your team", "Roughly 8–15 hours; can compress into 2–3 focused days", "6–8 hours of calls plus prep"],
        ["Between-milestone work", "Structured by the tool: question banks, local conversations, artifacts", "Done by TBP between calls (60%+ of total effort in the pilot)"],
        ["Best for", "Teams with a clear deadline and an internal owner with regional data fluency", "Teams new to the framework, complex or defense-adjacent industries, or where the CEO needs a neutral third party in the room"],
      ] },
      { t: "p", text: "Navigators route Engines to a path — self-guided is not for everyone, and teams that clearly need hand-holding shouldn't be defaulted to it. Throughout the self-guided flow you can flag that you want a thought partner; the two highest-stakes moments (the archetype call and the barrier test) have escalation built in." },
    ],
  },
  {
    slug: "how-the-gem-works", group: "Data & the Gem", title: "How your Compass Gem works", related: ["m0", "m1", "m2", "m3", "m4", "m5"],
    summary: "A Gemini Gem pre-configured with the Compass logic and your region's data — and nothing else.",
    body: [
      { t: "p", text: "The diagnostic runs on a Gemini Gem — Google's name for a specialized assistant set up in advance to know two things you'd otherwise have to type every time." },
      { t: "h4", text: "Core directive" },
      { t: "p", text: "The diagnostic logic, archetype definitions, and the voice TBP requires. Strict guardrails: no hallucinations, no external web searches, no fabricated metrics. Global across all Engines and maintained centrally, so a framework improvement reaches every active Gem at once." },
      { t: "h4", text: "Regional intelligence" },
      { t: "p", text: "Your Engine's analysis packet, attached as knowledge files: economic performance, ecosystem connectivity, peer comparison, geography comparison, archetype signals, and data provenance. The Gem draws exclusively from these. It is blind to other Engines and won't fall back on generic industry assumptions." },
      { t: "h", text: "What that means in practice" },
      { t: "ul", items: [
        "Your Gem is a dedicated instance, provisioned after kickoff (about one business day). Anyone on your team with the link can run their own conversation.",
        "NAICS codes, counties and peers are locked when the Gem is built. This is a guardrail: if the definition needs to change, you come back to the data steward rather than editing mid-journey.",
        "The Gem writes an artifact at the end of each milestone. Artifacts are pushed to a shared Drive folder so your navigator can review asynchronously.",
        "You can upload qualitative material — past reports, local intelligence — to enrich the story.",
        "Visualizations like network graphs are pre-produced and revealed at the right milestone; the Gem doesn't generate them live.",
      ] },
      { t: "callout", text: "This landing page and the Gem are deliberately separate surfaces with a light connection: paste-able prompts, milestone checkpoints, and a place to return to. No data flows between them." },
    ],
  },
  {
    slug: "data-what-it-sees", group: "Data & the Gem", title: "What the data can and can't see", related: ["m1", "m2", "m3"],
    summary: "Suppression, misclassification, trade secrets, and the thin dimensions — know them before you read a chart.",
    body: [
      { t: "h", text: "Three traps from the pilot" },
      { t: "ul", items: [
        "Federal suppression. A single large establishment at a fine geography triggers confidentiality suppression. The pilot's job count tripled (~11k → ~33k) when a private source corrected for suppressed defense-sector firms. Emerging-tech clusters with few establishments per NAICS are systematically exposed to this.",
        "NAICS misclassification. Companies self-report codes at registration without domain knowledge. A defense prime filed under “navigational instruments” may be standing up a semiconductor packaging fab. The taxonomy is a Venn diagram, not clean buckets.",
        "Non-patenting innovation. Some industries are culturally less patent-oriented; trade secrets and process innovation don't show up in USPTO data. Low patent counts don't mean low innovation.",
      ] },
      { t: "h", text: "What the public data layer does well" },
      { t: "ul", items: ["Industry trajectory: employment, wages, GDP, productivity, benchmarked over time and against peers.", "Innovation intensity at the metro level: patenting, tech-class concentration, R&D where available.", "Workforce composition, cost-of-living adjusted wages, firm-size distribution as a cluster-maturity signal."] },
      { t: "h", text: "What it does only directionally" },
      { t: "ul", items: ["Firm-to-firm connectivity — via proxies like the “missing middle” of 50–499 employee firms.", "Research-to-industry translation — via cross-institutional patenting.", "Talent-pipeline alignment — if the optional CIP↔SOC module is built."] },
      { t: "h", text: "What it can't do on public data alone" },
      { t: "ul", items: ["Metro-level VC deal flow at granular precision (the finance dimension is the most data-constrained).", "Direct measurement of commercial relationships between firms.", "Real-time labor-market signals like job postings and frontier skill demand."] },
      { t: "callout", text: "Data vintages matter: BDS lags two years, QCEW two quarters, BEA regional accounts one year. The Gem cites the vintage rather than implying current-year coverage. If the picture changes mid-journey, expect an explicit revised read." },
    ],
  },
];

export const learnBySlug = (slug?: string) => LEARN.find((l) => l.slug === slug);
export const LEARN_GROUPS: LearnTopic["group"][] = ["Start here", "Frameworks", "Process", "Data & the Gem"];
