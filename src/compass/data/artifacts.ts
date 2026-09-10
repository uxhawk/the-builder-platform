/* ------------------------------------------------------------------
   Landing page (version B, proof-led) — the Compass as three steps and
   what you leave each one holding: a kickoff call, self-paced work in
   My Compass, a synthesis call.

   Kept deliberately high-level: one sentence on what happens, one line
   on what you leave with, and the document's headings. No timeframes; those depend on the Engine. Program-general on
   purpose — no cohort or Engine is named.
   ------------------------------------------------------------------ */
import type { BrandColor } from "../../components/Primitives";

export interface DocSpec {
  kicker: string;     // document type
  title: string;
  sections: string[]; // headings only
  footer?: string;
}

export type StepId = "kickoff" | "self-paced" | "synthesis";
export interface Step {
  id: StepId;
  label: string;      // "Step 1 · Call"
  kind: "call" | "self-paced";
  color: BrandColor;
  name: string;
  with: string;       // who's in it
  summary: string;    // one sentence — what happens
  leaveWith: string;  // one line — what you leave holding
  doc: DocSpec;
}

export const STEPS: Step[] = [
  {
    id: "kickoff", label: "Step 1 · Call", kind: "call", color: "sky-blue",
    name: "Kickoff call", with: "With your navigator and strategist",
    summary: "Set your bearings before any data is pulled: the industry you're measuring, the regions you're comparing against, and what you believe is holding you back.",
    leaveWith: "Your Compass configured, and a first hypothesis on paper.",
    doc: {
      kicker: "Compass configuration summary",
      title: "Your Engine's Compass, configured",
      sections: ["Core industry", "Geography", "Peer regions", "Starting hypothesis"],
      footer: "Set once, together — so the data is right from the start",
    },
  },
  {
    id: "self-paced", label: "Step 2 · Self-paced in My Compass", kind: "self-paced", color: "evergreen",
    name: "Self-paced, in My Compass", with: "With AI-powered data analytics, at your pace",
    summary: "Work through the analysis at your own pace. A navigator reviews it before you set first moves.",
    leaveWith: "One document you can hand to any partner, and two or three first moves you can defend.",
    doc: {
      kicker: "Integrated Diagnostic Document",
      title: "Your Engine: what we're building, and why it's ours to build",
      sections: ["The industry, defined", "Where it's heading", "Why", "What the Engine must be", "First moves", "Stress test"],
    },
  },
  {
    id: "synthesis", label: "Step 3 · Call", kind: "call", color: "sky-blue",
    name: "Synthesis call", with: "With your navigator and strategist",
    summary: "Your narrative, the AI-powered analysis, and TBP's synthesis side by side — and a look at what to unlock next.",
    leaveWith: "A finalized document, and a clear view of what's next.",
    doc: {
      kicker: "Finalized Integrated Diagnostic Document",
      title: "Closing the loop",
      sections: ["Your narrative", "The AI-powered analysis", "TBP's synthesis", "What's next"],
      footer: "Nothing is published without you",
    },
  },
];

/* The document the whole sequence exists to produce. */
export const DELIVERABLE: Step = STEPS.find((s) => s.id === "self-paced")!;
