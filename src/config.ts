/* Single place for the handful of external links the prototype depends on.
   All are placeholders until TBP confirms the real destinations. */
/* Stand-in for auth: the signed-in user lands directly on their Engine. */
export const SIGNED_IN_ENGINE = "florida-semiconductor";
export const MY_COMPASS = `/engine/${SIGNED_IN_ENGINE}`;

export const LINKS = {
  tbpSite: "https://builderplatform.engine.xyz",
  contactEmail: "builderplatform@engine.xyz",
  // Per-engine Gem URLs live in compass/data/engines.ts; this is the fallback.
  gemFallback: "https://gemini.google.com/gems/view",
  // Placeholder scheduling link for the strategist (Ryan) / navigator.
  bookCall: "#book-a-call",
  linkedin: "https://www.linkedin.com/company/theenginebuiltbymit/",
};
