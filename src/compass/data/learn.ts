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
      { t: "h", text: "How it works" },
      { t: "p", text: "Two conversations bookend the work. A kickoff call sets your configuration — industry codes, geography, peer regions — along with a first working hypothesis and a declared deadline. A synthesis call closes the loop by putting three voices side by side: your team's framing, the Gem's data-grounded read, and your navigator's annotations. In between are five self-guided milestones in your Compass Gem. Every milestone ends with questions for your team and produces one artifact, so the work accumulates into a document rather than a pile of notes. A motivated team can finish the middle in two or three focused days; most take six to ten weeks." },
      { t: "p", text: "There is one hard gate, on purpose: the diagnosis (Milestone 4) goes to a navigator for human review before priorities are set, so no archetype prescription reaches your team unchallenged. Everything else is sequential but revisitable — completed milestones stay open, and the sequence is scaffolding, not a mold." },
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
      { t: "h", text: "Three habits that make it work" },
      { t: "ul", items: [
        "Point it at a date. A site visit, a renewal pitch, a board retreat — an external deadline is the best thing that can happen to this work, because it tells you exactly what the output has to do and when. Declare one at kickoff and the cadence is set backward from it.",
        "Write your own read before the Gem's. At every major judgment — the archetype, the barriers, the priorities — state what your team believes first. It protects your mental model from being overwritten by the first authoritative-sounding answer.",
        "Treat disagreement as data. When your read and the evidence diverge, the argument is the product: it's either a data correction worth making or a strategic insight no dataset holds.",
      ] },
      { t: "callout", text: "TBP does the analytical heavy lifting. Roughly two-thirds of the output comes from analysis of public and large-scale regional data; one-third from what the process surfaces — local knowledge and your team's own strategic judgment that no dataset captures." },
    ],
  },
  {
    slug: "engine-vs-grant", group: "Start here", title: "How an Engine differs from a research grant", related: ["m0"],
    summary: "The one-pager most Engines wish they'd had six months in.",
    body: [
      { t: "p", text: "“How is an Engine different from a research grant?” is the question Engine teams get asked most — by NSF, by boards, by the partners they're trying to mobilize — and the one they most often answer with either the macro case or a list of awards. It deserves a concrete answer, because the two models demand opposite behavior from the same organization, and most institutional habits pull toward the grant." },
      { t: "p", text: "An Engine is not a grant program with a bigger budget. It is a small, precisely targeted intervention team — roughly $10–15M a year — trying to shape how much larger sums ($500M a year or more) get spent on research, education, and economic development in a region." },
      { t: "p", text: "A grant adds raw material to an innovation pipeline: more funding, more facilities, more trained scientists, more startup programs. An Engine changes the ecosystem: how information flows (startups now know what large firms need), what actors are incentivized to do (agencies see that deploying new technology is a cheaper way to meet their goals), and what market infrastructure exists (financing mechanisms, procurement pathways, testbeds)." },
      { t: "h", text: "Two mindsets, side by side" },
      { t: "table", cols: ["", "Grant thinking", "Engine thinking"], rows: [
        ["What “more” looks like", "More inputs into the pipeline: funding, facilities, trained people, programs.", "Changed relationships: actors who now transact, co-invest, or share information where they didn't before."],
        ["Industry's role", "Beneficiary of services; source of letters of support.", "Co-investor and co-designer who defines the problems and puts skin in the game."],
        ["What gets measured", "Dollars deployed, awards made, participants served.", "Transactions and capabilities that exist because of you — and would vanish without you."],
        ["Time horizon", "The award period.", "The ecosystem that outlives the award."],
      ] },
      { t: "h", text: "The five things an ecosystem builder does" },
      { t: "table", cols: ["Capability", "What it means"], rows: [
        ["Connect", "Bring together actors who wouldn't normally interact — across institutional pillars, not just within them."],
        ["Orient", "Create a shared problem definition and buy-in for a strategy grounded in the region's competitive position."],
        ["Activate", "Mobilize industry as co-investors and co-designers, not beneficiaries of services."],
        ["Integrate", "Build cross-sector teams that create new delivery systems, not just coordinate activities."],
        ["Mobilize", "Attract state, local, philanthropic and private resources in multiple forms to sustain the work."],
      ] },
      { t: "callout", text: "The test: what specifically happens because of the Engine that wouldn't happen otherwise? Not “we support semiconductor manufacturing” — but “this contract, this capability, this capital flow exists because of us.”" },
      { t: "p", text: "A useful exercise before kickoff: write your own version of this page with your region's names in it. If a sentence could describe any Engine in the country, it isn't your answer yet — the Compass exists to replace those sentences with specific ones." },
    ],
  },
  {
    slug: "input-fallacy", group: "Frameworks", title: "The input fallacy", related: ["m3", "m4"],
    summary: "Why “we need more X” is usually the wrong diagnosis.",
    body: [
      { t: "p", text: "The input fallacy is the assumption that innovation output is a function of the quantity and quality of inputs: more funding, more facilities, more trained scientists, more startup programs. It is the default trap for Engines because inputs are countable, so political and reporting pressure always bends toward buying inputs that are already relatively abundant." },
      { t: "p", text: "It's easiest to see with a shared asset. A region concludes its industry needs a testbed, funds one, and finds it underused — because money was never the reason firms hadn't built one. Returns accrued to competitors, so no one would move first. The barrier was a coordination failure, and the input was purchased without changing the relationships that made it missing. The same logic sinks training programs no employer's hiring commitments anchor, and funds no deal flow is ready for." },
      { t: "p", text: "The Compass forces a stop between “our industry is underperforming” and “we need more inputs.” The question in between: what ecosystem behaviors — who interacts with whom, where linkages are missing, where demand isn't being aggregated — produced this trajectory?" },
      { t: "h", text: "How to catch yourself" },
      { t: "ul", items: [
        "If the proposed fix is a fund, a facility, or a program, ask what relationship it changes.",
        "If the barrier “persists because no one funded it,” it's probably not a structural barrier.",
        "If a region already has a large industry in jobs or GDP but no cluster in the traditional sense, adding inputs won't build one.",
      ] },
      { t: "h", text: "What to ask instead" },
      { t: "ul", items: [
        "Which specific transaction or relationship would this input enable — and between whom?",
        "Who in the ecosystem should already be providing it, and what's stopping them?",
        "If the input really is the right move, what changed relationship arrives with it — co-investment, hiring commitments, a procurement pathway — so it doesn't sit idle?",
      ] },
      { t: "p", text: "The discipline is built into the diagnosis milestone: when a barrier's answer to “why not already?” comes back as “because no one funded it,” the Gem flags a probable input-fallacy diagnosis and challenges whether it's a structural barrier at all." },
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
      { t: "h", text: "How to argue with one" },
      { t: "p", text: "The archetype hypothesis arrives with its supporting signals — and the strongest signal against it. Your job is to push back with what the data can't capture: anchor-firm dynamics, recent shocks, adjacent industries doing target-industry work under other codes. Record where you agree, where you don't, and why; disagreement is data, and it's exactly what the synthesis call is built to use. If none of the four fit, say so — the argument about why yours doesn't fit is usually the sharpest strategic material the process produces." },
      { t: "h", text: "Why archetypes are a “nice to have,” not the goal" },
      { t: "p", text: "Leading with archetypes risks an Engine deciding none fit and disengaging. Their best use is cross-Engine discovery: a maritime Engine may share more with a bio-manufacturing Engine than with other maritime hubs. Tease lightly; reveal as a guide, not a label." },
    ],
  },
  {
    slug: "ecosystem-archetypes", group: "Frameworks", title: "Ecosystem archetypes", related: ["m3"],
    summary: "Five patterns of assets and connectivity — how to recognize your region.",
    body: [
      { t: "p", text: "Milestone 2 tells you where your industry is heading; Milestone 3 asks why — and the answer lives in connectivity: who interacts with whom, where linkages are thin, where demand goes unaggregated. The Compass presents that assessment through five themes a team can actually discuss — People (talent flows), Ideas (patents and co-authorship), Relationships (firm-to-firm and leadership networks), Money (capital), and Institutions (public and nonprofit alignment). Beneath the themes sits a taxonomy of five ecosystem patterns." },
      { t: "p", text: "Read the middle column first. Recognition should come from how coordination actually happens in your region — who convenes, what survives a staff change, which partnerships exist on paper only — not from which label sounds most flattering." },
      { t: "table", cols: ["Archetype", "How to recognize your region", "What indicators typically show"], rows: [
        ["Asset-rich, lightly connected", "Many relevant assets; coordination is informal or episodic.", "Universities, firms, workforce orgs and funders exist; limited cross-sector programs; reliance on personal relationships rather than systems."],
        ["Functionally connected but fragmented", "Active partnerships exist, but only within parts of the ecosystem.", "Strong linkages in select industries or institutions; uneven participation across the region or across firm sizes."],
        ["Research-forward, industry-light", "Strong research and invention signals; limited uptake by local firms.", "High patenting or research output but few local licensees or spinoffs; weak industry pull."],
        ["Industry-forward, talent- or research-constrained", "Firms are driving demand, but pipelines from research or talent are thin.", "Strong firm activity and job demand; meaningful skills gaps; limited research collaboration."],
        ["Integrated innovation system", "Research, industry, workforce, capital and government aligned around shared priorities.", "Repeatable collaboration; clear pathways from research to industry to market; dense firm-to-firm and talent pipelines."],
      ] },
      { t: "p", text: "In the pilot, the ecosystem conversation organized itself around themes the team could engage with — talent, patents, leadership networks — rather than the analytical taxonomy. The taxonomy is still underneath; the themes are how it's presented." },
      { t: "callout", text: "Two caveats before you self-diagnose from indicators: finance is the most data-constrained dimension on public sources, and firm-to-firm connectivity is measured through proxies. Treat those columns as suggestive, and let local knowledge carry more weight there." },
    ],
  },
  {
    slug: "engine-archetypes", group: "Frameworks", title: "Engine archetypes", related: ["m4", "m5"],
    summary: "Five ways an Engine can sit in its ecosystem — and what each primarily does.",
    body: [
      { t: "p", text: "By the end of Milestone 4 you know where your industry is heading and which ecosystem failures explain it. The Engine archetype answers the question that follows: given those failures and your organizational reality, what kind of institution does this Engine need to be? Five patterns cover most of the territory. Like every archetype in the Compass, they're hypotheses — and this one in particular never reaches your team without a human review first." },
      { t: "table", cols: ["Archetype", "How to recognize the fit", "What the Engine primarily does"], rows: [
        ["Academic Anchor", "Strong universities and R&D; weak commercialization and firm scaling; startups and talent leave.", "Orients the ecosystem around frontier technologies; connects researchers to industry and funders; legitimizes emerging domains for external partners."],
        ["Industry-Led", "A critical mass of firms with shared workforce, innovation or supply-chain challenges; limited collective action among competitors.", "Activates firms as co-owners of shared platforms (workforce pipelines, pilots, testbeds); mobilizes private capital; makes market needs legible."],
        ["Civic Systems Integrator", "Many public, workforce and education institutions misaligned with innovation priorities — “program rich, system poor.”", "Aligns civic systems around emerging-industry priorities; translates technology needs into public-system action."],
        ["Market-Maker", "Promising technologies stall on weak demand, financing gaps, or early-stage risk; few first customers or procurement pathways.", "Structures demand and finance — pooled capital, guarantees, advance purchase commitments, procurement mechanisms."],
        ["Strategic Integrator", "Many assets, weak connectivity, fragmented initiatives; no actor responsible for diagnosing system-level failures.", "Diagnoses ecosystem failures; integrates across research, industry, workforce, capital and sites; selectively convenes, funds, or operates missing functions."],
      ] },
      { t: "p", text: "The fit column is the honest entry point: match it against your diagnosis, not your org chart. An Engine can carry a secondary pattern, and the call can change as the ecosystem does — the archetype exists to focus the first-move menu, not to brand the organization." },
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
      { t: "h", text: "How to write a good barrier hypothesis" },
      { t: "p", text: "In Milestone 3 you draft two or three of these — not ten. Write them in plain language, and name the actors and the relationship, not the missing resource. “We need more collaboration” is a wish; “the manufacturers who need this capability and the lab that has it can't see each other, and it's no one's job to introduce them” is a hypothesis — it names who, what's failing between them, and something you could test in a conversation." },
      { t: "ul", items: [
        "Name specific actors on both sides of the failed relationship or transaction.",
        "Say what should be happening between them that isn't — and make it checkable with one or two local conversations.",
        "Ask what the failure explains: a good hypothesis accounts for part of the trajectory you saw in Milestone 2.",
      ] },
      { t: "p", text: "The Gem maps each hypothesis to these types as scaffolding — the taxonomy is for rigor, not for the room. In Milestone 4, every hypothesis then meets the “why not already?” test, which is where false diagnoses go to die." },
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
      { t: "h", text: "How to run it" },
      { t: "ul", items: [
        "Write the honest answer for each barrier hypothesis — one paragraph, no hedging.",
        "Classify what the answer reveals: it's no one's job; it's a collective-action problem; the incentives point the wrong way; or the capacity to act doesn't exist.",
        "Let the classification pick the Engine's move: catalyze the actor who could already fix it, build the capability nothing in the ecosystem holds, or bring in a partner. Three different institutions — one test.",
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
      { t: "p", text: "Milestone 4 ends with a deceptively simple exercise: place your Engine on each of the five capabilities — Connect, Orient, Activate, Integrate, Mobilize — as nascent, established, or advanced. The point is not the score. Each barrier in your diagnosis demands specific capabilities to address, and the assessment is what turns “here's what's broken” into “here's what we can hold now, what we must build, and where we need a partner.”" },
      { t: "p", text: "Analysis of an Engine's capabilities is necessarily qualitative. These tiers illustrate what a candid self-assessment looks like; the purpose is to understand the strengths and limits of your organizational position — a university has capabilities an EDO lacks and vice versa — and plan to bolster weaknesses by building or partnering." },
      { t: "table", cols: ["Capability", "Nascent", "Established", "Advanced"], rows: [
        ["Connect", "Convenes regularly, but homogeneous groups within pillars; opt-in orgs only.", "Convenes diverse groups around specific processes; designed collisions, but limited to innovation-minded people.", "Seen as a committed, neutral hub; convenes many combinations informally and knows when to systematize."],
        ["Orient", "Materials describe grant activities; no clear regional position; strategy outsourced; generic metrics.", "Rigorous analysis of assets and competitive position; clear theory of regional advantage; innovation defined broadly.", "Actively shapes regional narratives; runs an intelligence function; points partners at specific bottlenecks."],
        ["Activate", "Industry as arms-length advisors; businesses treated as beneficiaries; mid-level staff engaged.", "Sector forums that aggregate demand; hands signals to partners; engages senior technical leaders.", "Business leaders define problems and co-design; engages many individuals inside many firms."],
        ["Integrate", "New entrant; funds directly rather than changing systems; coordinates rather than enforces strategy.", "Strong perspective on gaps and duplication; backbone role; influences demand and supply sides.", "Shifts fluidly between convener, implementer, funder; can reorganize the ecosystem; player-coach."],
        ["Mobilize", "Funding primarily NSF; grants only; resources allocated to maintain relationships.", "Non-federal funding at similar scale; building the post-grant case; beginning to use mixed instruments.", "Non-federal funding exceeds federal; patient capital; allocates by ROI as conditions change."],
      ] },
      { t: "h", text: "How to keep yourself honest" },
      { t: "ul", items: [
        "Behind every claimed capability, name the person and the relationship. “We convene industry” should cash out to named leaders who actually show up — if it doesn't, the capability is nascent.",
        "Let your institutional position inform the read. A university-anchored Engine usually starts stronger on Orient than Activate; an industry-anchored one often reverses that. Neither is a failing — it's the starting terrain.",
        "Write the gap plan in the same breath: for each capability a priority depends on, decide build or partner, and put a name on it.",
      ] },
    ],
  },
  {
    slug: "innovation-mode", group: "Frameworks", title: "Innovation mode, maturity, and capital intensity", related: ["m1", "m2"],
    summary: "Three dimensions that decide which ecosystem strategy could possibly work.",
    body: [
      { t: "p", text: "Before prescribing anything, the Compass places your industry on three dimensions: how innovation actually happens in it, how mature the technology is, and how much capital it takes to scale. They sound descriptive; they're decisive. Get one wrong and you can diagnose the industry correctly and still build the wrong Engine." },
      { t: "h4", text: "Innovation mode" },
      { t: "p", text: "Science-to-market: novel products, codified knowledge, formal IP; key actors are research universities, tech transfer, venture capital (pharma, biotech, some defense tech). Firm-to-firm applied: process improvement, second-generation adaptation, tacit knowledge flowing through supply chains, worker mobility and informal collaboration; key actors are other firms, skilled workers, community colleges, MEPs (metals, electronics, advanced manufacturing, machinery). Over 80% of innovation is new-to-firm, not new-to-market." },
      { t: "p", text: "The question to ask locally: where does innovation actually enter firms in your region — through labs and licenses, or through suppliers, equipment vendors, and the engineers firms hire?" },
      { t: "callout", text: "Guard against two biases: the pull toward science-to-market as the default (because universities and most federal programs value invention), and path dependency in the other direction (assuming the region's current mode is the one to build toward). Getting this wrong means diagnosing the industry correctly and prescribing the wrong Engine." },
      { t: "h4", text: "Technology maturity" },
      { t: "p", text: "Pre-commercial (TRL 1–5): discovery and market signals. Demonstration (TRL 5–7): the valley of death between lab and production — the most acute ecosystem gaps. Production-ready (TRL 7–9): scale-up, supply chains, workforce, structured demand." },
      { t: "h4", text: "Capital intensity" },
      { t: "p", text: "Capital-intensive, long-horizon ($100M+, 5–10 years) needs patient capital, blended finance, government co-investment — the standard VC model doesn't work. Capital-moderate ($10–100M) can scale through conventional finance if market conditions exist. Capital-light: standard VC works. Most Engines are in capital-intensive or -moderate industries while applying capital-light strategies." },
      { t: "p", text: "These dimensions surface twice in the journey: in Milestone 1, where they shape how the industry is defined and which peer regions are fair comparisons, and in Milestone 2, where they frame the question the trajectory memo has to answer — is the goal to help this industry innovate more, or innovate differently?" },
    ],
  },
  {
    slug: "skeptic-personas", group: "Process", title: "The stress test: six skeptics", related: ["m5"],
    summary: "Every partner sees only part of your causal chain. If the links aren't explicit, they fill the gaps with wrong assumptions.",
    body: [
      { t: "p", text: "A state legislator who hears “ecosystem building” but can't see the connection to jobs will treat the Engine as an academic exercise. A philanthropic funder who sees the industry case but not the equity case will pass. A community college dean who can't see quantified employer demand will hedge. A corporate leader invited to “participate in the ecosystem” without knowing what's being asked will send the community-relations director instead of the CTO. A startup organization that sees duplication will compete rather than partner." },
      { t: "h", text: "The six, and what each needs to see" },
      { t: "table", cols: ["Skeptic", "Their lens", "The question they'll ask first"], rows: [
        ["Community college dean", "Enrollment & employer demand", "“Show me specific, quantified employer demand. How many jobs, at what wage, by when?”"],
        ["EDO CEO", "Business attraction & deals", "“Why isn't this duplicating what we already do?”"],
        ["State legislator", "Jobs, wages, districts", "“How does ecosystem building become jobs in my district before the next election?”"],
        ["Established manufacturer", "Supply chain & ROI", "“What exactly are you asking me to do, and what's in it for my P&L in 18 months?”"],
        ["Philanthropic funder", "Equity & inclusion", "“Where's the case that this reaches workers without degrees and communities left out last time?”"],
        ["Startup ecosystem leader", "Turf & overlap", "“You're funded to do what we already do. Are you a partner or a competitor?”"],
      ] },
      { t: "p", text: "Milestone 5 makes you answer each of them before the diagnostic is marked complete. In the guided pilot, this step was likely to be skipped; the self-guided track bakes it in." },
      { t: "h", text: "How to run it" },
      { t: "ul", items: [
        "Answer every skeptic in writing — a sentence you could actually say to them, with a specific ask where one exists.",
        "If an answer leans on “the ecosystem” to do the work, translate it: name the jobs, the deal, the program, the capability.",
        "Then rehearse for real: share the draft with one internal skeptic and one external friendly before the synthesis call, and note which claims get challenged first.",
      ] },
      { t: "callout", text: "These misperceptions are existential: Engines only have their intended impact if they convince other entities to invest ten times as much energy and money as NSF invests in the Engine." },
    ],
  },
  {
    slug: "who-in-the-room", group: "Process", title: "Who should be in the room", related: ["m0"],
    summary: "The pilot worked partly because of one person most Engines don't have. Plan for that.",
    body: [
      { t: "p", text: "The right people matter more than the right data. Every milestone of the Compass runs on the same loop — evidence proposes, local knowledge challenges, judgment decides — and the loop breaks at exactly one point: when no one in the room can challenge the evidence." },
      { t: "p", text: "The first pilot had an unusually strong domain expert on the Engine side — someone with cluster-methodology background and roaming institutional knowledge who could complicate the data in real time: “that firm is filed under navigational instruments but runs a packaging fab.” That role was not a nice-to-have. It was what made the engagement work." },
      { t: "h", text: "Roles" },
      { t: "table", cols: ["Role", "Why", "Required"], rows: [
        ["Engine lead / CEO", "Attends kickoff and synthesis; owns the strategic call. Not the day-to-day interlocutor.", "Yes"],
        ["Process owner — mid-senior deputy", "Primary interlocutor across all milestones. Not the CEO, not a junior researcher.", "Yes"],
        ["Regional economic-development fluency", "Someone who can look at a data table and say “that's wrong, here's why.” If you don't have this person, tell us at kickoff — we'll help you find one or plan for a heavier navigator role.", "Yes"],
        ["Technical / industry voice", "A CTO, engineer, or founder. Leadership networks in the pilot were dense but nonprofit-heavy; the technical network was sparse. Bring the technical network in.", "Recommended"],
        ["Evaluators", "Invited to the data-heavy early milestones as insight partners.", "Optional"],
      ] },
      { t: "h", text: "If you're missing the data-fluent role" },
      { t: "p", text: "Most Engines are — that's the expected case, not the exception. Say so at kickoff, before the data is pulled. From there the options are concrete: we help you recruit the person, or we plan for a heavier navigator role through the data-heavy milestones. What doesn't work is proceeding without the check and hoping the data is right — the pilot's data was materially wrong in places, and it was this role that caught it." },
      { t: "callout", text: "Push for broader representation than your instinct. The process works better with more voices — and with people from legacy firms who should be exposed to innovation, not just the ones who already opted in." },
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
      { t: "h", text: "A typical working session" },
      { t: "p", text: "Each milestone follows the same rhythm. On this site, you run the short Prepare checklist — read the snapshot, write your own read first. Then you copy the milestone's paste-able prompt into your Gem and do the work in that conversation: reacting to the draft analysis, correcting what's misclassified, adding what the data can't see. The Gem writes the milestone's artifact to your shared Drive folder, and you come back here to answer the questions for your team, check off Reflect & decide, and move on. The page never pretends to be the Gem, and the Gem never replaces the reflection — the split is the design." },
      { t: "callout", text: "This landing page and the Gem are deliberately separate surfaces with a light connection: paste-able prompts, milestone checkpoints, and a place to return to. No data flows between them." },
    ],
  },
  {
    slug: "data-what-it-sees", group: "Data & the Gem", title: "What the data can and can't see", related: ["m1", "m2", "m3"],
    summary: "Suppression, misclassification, trade secrets, and the thin dimensions — know them before you read a chart.",
    body: [
      { t: "p", text: "Every chart the Compass shows you is benchmarked, sourced, and cited — and still wrong somewhere. In the pilot, correcting for one known blind spot roughly tripled the industry's job count. That's not a reason to distrust the data; it's the reason the process asks you to challenge it. Know the failure modes before you read your first chart, so you challenge in the right places." },
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
      { t: "h", text: "When the data is wrong about you" },
      { t: "ul", items: [
        "Expect it somewhere — suppressed employers, misclassified firms, trade secrets that never patent. Milestone 1's suppression check and known-firms cross-reference are designed to surface it early, while the definition can still change cheaply.",
        "If the gap is material — defense-heavy regions especially — flag it to your navigator; a private-data pull may be warranted.",
        "When a correction changes the picture, you get an explicit revised read, never a silent update. Your working hypothesis keeps a version history recording what changed and why.",
      ] },
      { t: "callout", text: "Data vintages matter: BDS lags two years, QCEW two quarters, BEA regional accounts one year. The Gem cites the vintage rather than implying current-year coverage. If the picture changes mid-journey, expect an explicit revised read." },
    ],
  },
];

export const learnBySlug = (slug?: string) => LEARN.find((l) => l.slug === slug);
export const LEARN_GROUPS: LearnTopic["group"][] = ["Start here", "Frameworks", "Process", "Data & the Gem"];
