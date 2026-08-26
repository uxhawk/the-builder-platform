/* “Users arrive in very different mental states: panicked, curious, obligated,
   or already motivated. The landing page should speak to people where they are.”
   — Elizabeth, Aug 20 check-in */
export type MoodId = "deadline" | "obligated" | "curious" | "ready";
export interface Mood {
  id: MoodId; title: string; sub: string; headline: string; body: string; firstStep: string;
  cta: { label: string; to: string }; alt: { label: string; to: string }; tone: "magenta" | "sky" | "ultramarine" | "evergreen";
}
export const MOODS: Mood[] = [
  {
    id: "deadline", title: "I have a date to hit", sub: "Site visit, renewal pitch, board retreat", tone: "magenta",
    headline: "Point the Compass at your date.",
    body: "Cohort one organized everything around a September NSF site visit — and that forcing function was the strongest predictor of a good outcome. A motivated team can move through the milestones in two or three focused days; most take six to ten weeks. Either way, we set the cadence backward from your date.",
    firstStep: "Book your kickoff and declare the deadline. Everything else follows from it.",
    cta: { label: "Book a kickoff", to: "#kickoff" }, alt: { label: "See what you'll walk away with", to: "#outcomes" },
  },
  {
    id: "obligated", title: "I was told to do this", sub: "NSF or a board member suggested it", tone: "sky",
    headline: "Fair enough. Here's the minimum — and why it's worth more.",
    body: "The minimum is a kickoff call and one milestone. What most Engines discover is that the Compass answers the question they keep getting asked and struggle to answer: how is an Engine different from a research grant? A data-grounded answer to that is worth the time even if you stop there.",
    firstStep: "Read the one-pager on how an Engine differs from a grant. Then decide.",
    cta: { label: "How an Engine differs from a grant", to: "/learn/engine-vs-grant" }, alt: { label: "How it works", to: "#how" },
  },
  {
    id: "curious", title: "I want to see what the data says", sub: "Show me before I commit", tone: "ultramarine",
    headline: "Start with the evidence.",
    body: "The Compass doesn't start with ideas — it starts with your region's data: employment and firm dynamics, patents and inventor networks, talent flows, capital signals, benchmarked against peers and against your own past decade. Every archetype is a hypothesis, every claim is editable, and nothing goes to your team unchallenged.",
    firstStep: "Browse the frameworks and see how a diagnosis is built, layer by layer.",
    cta: { label: "Explore the frameworks", to: "/learn" }, alt: { label: "How the Gem works", to: "/learn/how-the-gem-works" },
  },
  {
    id: "ready", title: "We're ready to sharpen our strategy", sub: "Team assembled — let's go", tone: "evergreen",
    headline: "Good. Let's make sure the right people are in the room.",
    body: "The Engines that got the most out of the Compass had one thing in common: someone on the team who could look at a regional data table and say “that's wrong, here's why.” Most Engines don't have that person on staff. If you don't, we'll help you find one before the data is pulled — not after.",
    firstStep: "Check who's in the room, then open your Engine's Compass.",
    cta: { label: "Open your Compass", to: "/compass" }, alt: { label: "Who should be in the room", to: "/learn/who-in-the-room" },
  },
];
