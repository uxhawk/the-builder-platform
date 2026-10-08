/* Single place for the handful of external links the prototype depends on.
   All are placeholders until TBP confirms the real destinations. */
/* Public-dir asset path, prefixed with Vite's base so it works under
   the GitHub Pages subpath (/the-builder-platform/) as well as locally. */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");

/* Stand-in for auth: the signed-in user lands directly on their Engine. */
export const SIGNED_IN_ENGINE = "florida-semiconductor";
/* Two takes on the per-Engine portal live side by side (docs/my-compass-a-vs-b.md):
   A = the gem-first timeline with progress, B = free accordions with no progress.
   /engine/:slug stays the canonical entry point and resolves to this branch's default, B. */
export const enginePath = (slug: string, version: "a" | "b" = "b") => `/engine-${version}/${slug}`;
export const MY_COMPASS_A = enginePath(SIGNED_IN_ENGINE, "a");
export const MY_COMPASS_B = enginePath(SIGNED_IN_ENGINE, "b");
export const MY_COMPASS = MY_COMPASS_B;

export const LINKS = {
  tbpSite: "https://builderplatform.engine.xyz",
  contactEmail: "builderplatform@engine.xyz",
  // Per-engine Gem URLs live in compass/data/engines.ts; this is the fallback.
  gemFallback: "https://gemini.google.com/gems/view",
  // Placeholder scheduling link for the strategist (Ryan) / navigator.
  bookCall: "#book-a-call",
  linkedin: "https://www.linkedin.com/company/theenginebuiltbymit/",
  // Member login (Circle), as linked from the live site's nav.
  login: "https://login.circle.so/sign_in?request_host=builderplatform.circle.so",
  // The Engine (parent org), linked from the live site's footer.
  engineSite: "https://engine.xyz/",
};
