/* Skeptical partner personas for the Milestone 5 stress test (V2 Call 5). */
export interface Persona { id: string; name: string; lens: string; questions: string[] }
export const PERSONAS: Persona[] = [
  { id: "dean", name: "Community college dean", lens: "Enrollment & employer demand", questions: ["Show me specific, quantified employer demand. How many jobs, at what wage, by when?", "Our funding formula rewards enrollment. Why would we restructure a program around your sector?"] },
  { id: "edo", name: "EDO CEO", lens: "Business attraction & deals", questions: ["Why isn't this duplicating what we already do?", "Name one deal or connection you've moved that we couldn't have."] },
  { id: "legislator", name: "State legislator", lens: "Jobs, wages, districts", questions: ["“Ecosystem building” sounds academic. How does this become jobs in my district before the next election?", "Why should I fund this instead of a traditional incentive deal?"] },
  { id: "manufacturer", name: "Established manufacturer", lens: "Supply chain & ROI", questions: ["What exactly are you asking me to do, and what's in it for my P&L in 18 months?", "Why would I train workers who might leave for my competitor?"] },
  { id: "funder", name: "Philanthropic funder", lens: "Equity & inclusion", questions: ["Where's the case that this reaches workers without degrees and communities left out last time?", "How is this different from the last regional strategy we funded?"] },
  { id: "startup", name: "Startup ecosystem leader", lens: "Turf & overlap", questions: ["You're funded to do what we already do. Are you a partner or a competitor?", "What happens to our programs if yours succeed?"] },
];
