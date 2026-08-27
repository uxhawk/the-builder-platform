import type { MilestoneId } from "./milestones";

export interface Person { name: string; org: string; email?: string }
export interface HypothesisVersion { version: number; date: string; text: string; note: string }
export interface Engine {
  slug: string;
  name: string;
  shortName: string;
  region: string;
  cohort: 1 | 2;
  path: "guided" | "self-guided" | "pre-kickoff";
  industry: string;
  tone: "deep-blue" | "ultramarine" | "sky-blue" | "magenta" | "verdant" | "evergreen" | "neutral";
  gemUrl?: string;
  driveUrl?: string;
  navigator: Person;
  strategist: Person;
  dataSteward: Person;
  deadline?: { label: string; date: string };
  config?: { coreNaics: string[]; enablingNaics: string[]; geography: string; peers: string[] };
  hypotheses: HypothesisVersion[];
  team: { role: string; why: string; person?: string; required: boolean }[];
  seedCompleted: MilestoneId[];
  seedReviewApproved?: boolean;
}

/* The Florida Semiconductor Engine pilot (May–Aug 2026) is the only real
   engagement so far; its data here is drawn from the meeting notes and is
   illustrative, not authoritative. */
export const ENGINES: Engine[] = [
  {
    slug: "florida-semiconductor",
    name: "NSF Florida Semiconductor Engine",
    shortName: "FSE",
    region: "Central Florida · I-4 Corridor",
    cohort: 1,
    path: "guided",
    industry: "Semiconductor packaging · photonics & optics · defense-adjacent",
    tone: "deep-blue",
    gemUrl: "https://gemini.google.com/gem/compass-fse", // placeholder — real Gem URL lives with Sid
    driveUrl: "#drive-fse",
    navigator: { name: "Elizabeth", org: "The Builder Platform", email: "builderplatform@engine.xyz" },
    strategist: { name: "Ryan Donahue", org: "Formation" },
    dataSteward: { name: "Sid", org: "Moonlight Analytics" },
    deadline: { label: "NSF site visit (virtual)", date: "2026-09-15" },
    config: {
      coreNaics: ["3344 · Semiconductor & other electronic components", "333242 · Semiconductor machinery mfg"],
      enablingNaics: ["3341 · Computer & peripheral", "3342 · Communications equipment", "3345 · Navigational & control instruments", "3364 · Aerospace products", "541713 · R&D in nanotechnology"],
      geography: "7-county Orlando labor shed (core) · 23-county High Tech Corridor (grant footprint) · Florida statewide (frame)",
      peers: ["Phoenix", "Austin", "Boise", "Albany", "Rochester"],
    },
    hypotheses: [
      { version: 1, date: "2026-05-26", text: "Central Florida's semiconductor cluster is scaling and diversifying; FSE's role is to accelerate advanced packaging capacity on the NeoCity site.", note: "Starting hypothesis stated at kickoff, before data." },
      { version: 2, date: "2026-06-26", text: "A mature, enabling-led cluster anchored by defense — roughly 3× larger than public data showed once suppression was corrected (~33k jobs). National security is the cross-audience hook.", note: "Revised after the switch to Lightcast exposed defense-sector suppression. An explicit reframe, not a silent update." },
      { version: 3, date: "2026-08-07", text: "Strong innovation supply (optics/photonics ~3× semiconductors on every measure) but weak demand-side connectivity: small and mid-size firms lack relationships with defense and commercial end users. FSE's distinctive role: the intermediary that brings technical talent and big industry to the table.", note: "Emerged in Milestones 3–4 from leadership-network, patent and SBIR analysis." },
    ],
    team: [
      { role: "Engine lead / CEO", why: "Attends kickoff and synthesis; owns the strategic call.", person: "Ron Piccolo", required: true },
      { role: "Process owner (mid-senior deputy)", why: "Primary interlocutor across every milestone.", person: "Andrea Wesserbrawner · FHTC", required: true },
      { role: "Regional ED fluency — “the Andrea role”", why: "Someone who can look at a data table and say “that's wrong, here's why.”", person: "Jordan DeWitt · OEP", required: true },
      { role: "Technical / industry voice", why: "A CTO, engineer, or founder — not a community-relations lead.", required: false },
    ],
    seedCompleted: [], /* everyone starts at Kickoff; “reset prototype state” returns here */
  },
  {
    slug: "sample-cohort-two",
    name: "Your Engine (cohort two sample)",
    shortName: "Sample Engine",
    region: "Region to be confirmed at kickoff",
    cohort: 2,
    path: "pre-kickoff",
    industry: "Industry definition happens in Milestone 1",
    tone: "ultramarine",
    navigator: { name: "Karen Barnes", org: "The Builder Platform", email: "builderplatform@engine.xyz" },
    strategist: { name: "Ryan Donahue", org: "Formation" },
    dataSteward: { name: "Sid", org: "Moonlight Analytics" },
    hypotheses: [],
    team: [
      { role: "Engine lead / CEO", why: "Attends kickoff and synthesis; owns the strategic call.", required: true },
      { role: "Process owner (mid-senior deputy)", why: "Primary interlocutor across every milestone.", required: true },
      { role: "Regional ED fluency — “the Andrea role”", why: "Someone who can look at a data table and say “that's wrong, here's why.” If you don't have this person, tell us at kickoff.", required: true },
      { role: "Technical / industry voice", why: "A CTO, engineer, or founder — not a community-relations lead.", required: false },
    ],
    seedCompleted: [],
  },
];

export const engineBySlug = (slug?: string) => ENGINES.find((e) => e.slug === slug);
