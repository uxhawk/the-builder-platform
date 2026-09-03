# Engines: content model and "My Compass" access — options

How TBP admins create and manage an Engine (one cohort's Compass) and how that Engine's team gets into *their* Compass — without building an admin app or user accounts. Written Sep 3 2026 so an approach can be picked before cohort-two kickoffs (from Sep 26).

Short version: **keep Engine records in one JSON file in the repo, gate "My Compass" with a per-Engine passphrase checked in the browser, and upgrade the gate to a real one at the hosting edge only when TBP decides the content must be non-public.** Details and alternatives below. Recommendation is §5.

---

## 1. Where things stand

**The live site.** builderplatform.engine.xyz is a **Webflow** site. Its "LogIN" link goes to a **Circle** community (`builderplatform.circle.so`), so TBP already runs member accounts somewhere — just not anywhere Compass can use today. Nothing on the site mentions Compass.

**This prototype.** A static Vite + React single-page app. GitHub Actions builds it and deploys to GitHub Pages on every push to `main`. No server, no database, no secrets. The repo is currently **public**, so everything in it and in the deployed bundle is readable by anyone.

**Where Engine content lives today.** `src/compass/data/engines.ts` — a TypeScript array with two records (FSE and a cohort-two sample). Adding an Engine means editing that file and pushing. The portal reads: name, gemUrl, hypotheses, navigator / strategist / dataSteward, driveUrl, deadline, team roles, tone, region, industry, cohort, path, config.

**What "My Compass" does today.** `/compass` redirects to the single Engine hard-coded in `src/config.ts`. That is the stand-in for login.

So there are two questions: **(1)** what replaces the hand-edited TypeScript file, and **(2)** what replaces the hard-coded redirect. They are independent — any answer to one works with any answer to the other.

---

## 2. What an Engine record needs

The four things you listed, plus what the portal already renders.

| Field | Required | Notes |
| --- | --- | --- |
| `slug` | **yes** | Becomes the URL: `/engine/<slug>`. Lowercase, hyphens. Never changes once it has been shared. |
| `name` | **yes** | "NSF Florida Semiconductor Engine" |
| `shortName` | recommended | "FSE" — hero pill, stepper, help drawer |
| `cohort` | **yes** | 1, 2, … |
| `gems[]` | **yes** | `{ label, url }` list. An Engine may have more than one Gem (Compass Gem, stress-test Gem), so a list, not a single URL. |
| `hypotheses[]` | **yes** | `{ version, date, text, note }`. Keep the version history — the "picture changed" moment (FSE v1→v2) is part of the product, not just the latest text. |
| `people` | recommended | `navigator`, `strategist`, `dataSteward` — name, org, email. |
| `driveUrl` | recommended | Artifacts folder |
| `deadline` | optional | `{ label, date }` — the forcing function |
| `tone` | optional | Brand colour; default if omitted |
| `region`, `industry` | optional | Hero copy |
| `access` | if gated | A **hash**, never the password (§4) |

```jsonc
{
  "slug": "florida-semiconductor",
  "name": "NSF Florida Semiconductor Engine",
  "shortName": "FSE",
  "cohort": 1,
  "region": "Central Florida · I-4 Corridor",
  "industry": "Semiconductor packaging · photonics & optics",
  "tone": "deep-blue",
  "gems": [
    { "label": "Compass Gem", "url": "https://gemini.google.com/gem/…" }
  ],
  "hypotheses": [
    { "version": 1, "date": "2026-05-26", "text": "…", "note": "Stated at kickoff, before data." }
  ],
  "people": {
    "navigator":   { "name": "Karen Barnes", "org": "The Builder Platform", "email": "builderplatform@engine.xyz" },
    "strategist":  { "name": "Ryan Donahue", "org": "Formation" },
    "dataSteward": { "name": "Sid", "org": "Moonlight Analytics" }
  },
  "driveUrl": "https://drive.google.com/…",
  "deadline": { "label": "NSF site visit", "date": "2026-09-15" },
  "access": { "hash": "pbkdf2$…" }
}
```

What drops out of the current record: `seedCompleted` / `seedReviewApproved` (prototype demo state) and the four team roles, which are identical across Engines today and belong in shared defaults with an optional per-Engine override.

---

## 3. Options for managing Engine content

| | **A. JSON in the repo** | **B. Git-based CMS UI** | **C. Spreadsheet / Notion / Airtable** | **D. Headless CMS** | **E. Webflow CMS** |
| --- | --- | --- | --- | --- | --- |
| Admin edits with | GitHub web editor, or a "Run workflow" form | Form UI at `/admin` | A table they already know | Vendor admin UI | Webflow Editor |
| New moving parts | none | CMS login (hosted Pages CMS: none to run) | A sync step, or a public sheet | Vendor account, SDK, bill | API token → needs a proxy |
| Validation | Schema check at build. A bad edit fails the deploy; it never ships a broken site | Form fields | none | Schema | Field types |
| Versioned / reviewable | Yes (git, PRs) | Yes (git) | Sheet history only | Drafts / history | Limited |
| Time to publish | ~2 min (Actions) | ~2 min | Instant (runtime fetch) or next build | Seconds | Seconds |
| Fits the "no back-end" decision | Yes | Yes | Mostly | No — the vendor *is* the back-end | Partly |
| Rough setup | ½ day | 1 day | 1 day | 2–3 days | 2–3 days |

### A. JSON in the repo  — "could it be as easy as adding properties to a JSON?" Yes.

- One file: `src/compass/data/engines.json`. A ~20-line loader validates it against a schema (e.g. zod) and gives the app its TypeScript types. If an admin breaks the JSON, `npm run build` fails and the deploy stops — the live site is never broken by a typo.
- **Editing path 1 — github.com.** Open the file, click the pencil, edit, "Commit changes". Two minutes later it is live. Fine for prose edits (hypothesis wording, a new Gem link).
- **Editing path 2 — a form on GitHub.** A `workflow_dispatch` workflow ("Add or update an Engine") with typed inputs: GitHub renders those inputs as a form under Actions → Run workflow. The workflow writes the record into the JSON, hashes the password, commits, and the normal deploy runs. No CMS, no extra service, nobody touches JSON. (GitHub allows up to 10 inputs per workflow — enough for the required fields; optional fields still go through path 1.)
- **Where it strains.** Long prose in JSON strings is unpleasant; a Markdown-with-frontmatter file per Engine (`content/engines/fse.md`) is the usual fix and works with every option in this table. Twenty Engines in one file is still fine. And the repo must go **private** before real hypotheses go in — GitHub Pages on a private repo needs GitHub Pro/Team, or the site moves to a host that builds private repos for free (Cloudflare Pages, Netlify).

### B. A git-based CMS UI on top of A

Same JSON/Markdown underneath; adds a form UI that commits to GitHub on the admin's behalf.

- **Pages CMS** (pagescms.org) — hosted, sign in with GitHub, configured by one YAML file in the repo, handles JSON and Markdown collections. Nothing to run. Best fit for GitHub Pages.
- **Decap CMS** (ex-Netlify CMS) — self-hosted at `/admin`, but on GitHub Pages it needs an OAuth proxy (Netlify Identity or a small worker). More setup.
- **Keystatic**, **TinaCMS** — similar; nicer editing, more configuration.

Add this when admins balk at JSON. Nothing migrates because the data file does not change.

### C. Spreadsheet / Notion / Airtable as the source of truth

- **Google Sheet** "published to the web" as CSV → the app fetches it at load time. No rebuild to publish. But: the published URL is public to anyone who finds it, there is no validation, and a password hash would sit in a sheet cell.
- **Airtable / Notion** need an API token, which cannot ship inside a static site — so a small proxy (Cloudflare Worker) appears, and the "no back-end" line gets fuzzy.
- Two sources of truth (sheet + repo defaults) is the real cost.
- Right answer **only if** TBP already runs cohort operations in one of these and wants Compass to read that same table.

### D. Headless CMS (Sanity, Contentful, Payload, Hygraph)

Real admin UI, roles, drafts, image handling. For ~10 fields × ≤20 records it is another vendor login, another bill, and a week of schema work. This is the step *after* B if Compass grows per-Engine milestone copy, uploaded artifacts, etc.

### E. Webflow CMS

An "Engines" collection in the site TBP already administers. Two ways to use it, both costly:

1. The React app reads the collection via Webflow's Data API — needs an API token → a proxy → back-end-ish.
2. Rebuild Compass *inside* Webflow as collection pages — loses the interactive stepper, persisted progress, and the app-shell design the concept branches explore.

Attractive because the admins are already in Webflow; expensive because of the proxy or the rebuild.

---

## 4. Options for the "My Compass" password

### What this gate is — and is not

The need is: an Engine team clicks **My Compass**, proves they belong to Engine A, and lands on Compass A. Engine B's team does the same and lands on Compass B. No accounts, no invitations, no password resets.

Be clear with TBP about what a shared per-Engine password protects. It keeps casual visitors and search engines out and makes the cohort's space feel like *theirs*. It does **not** protect secrets: a Gem link is already usable by anyone who has it, and on a static site anything checked in the browser can be bypassed by someone who reads the JavaScript. The one field that might warrant a real lock is the **hypothesis text**. If TBP says that must be non-public, choose an edge-level option (3 or 4). If "not on Google, not on the front door" is enough, option 1 is fine.

### The flow

- **The password is the selector.** One field — no "pick your Engine" dropdown. The app matches the passphrase to an Engine and routes to `/engine/<slug>`. (Validation enforces that no two Engines share a passphrase.)
- **Remembered per browser.** Store the unlocked slug(s) in `localStorage` next to the existing progress state; the team enters it once per device.
- **Direct links honour the gate.** Visiting `/engine/fse` cold shows the same one-field gate, then continues.
- **A staff passphrase unlocks everything** so navigators (Karen, Elizabeth) can see any Engine without collecting passwords.
- **Wrong password:** "That passphrase doesn't match an Engine — check with your navigator" + the help drawer. No lockout logic needed at this scale.

### The options

| | **1. Hash in the JSON, checked in the browser** | **2. Capability URL** | **3. Edge function password** | **4. Cloudflare Access (email code)** | **5. Webflow page passwords** | **6. Real accounts** |
| --- | --- | --- | --- | --- | --- | --- |
| Where the secret lives | A salted hash in `engines.json` (public bundle) | The URL itself | Host env vars / KV, server-side | An allow-list of emails or domains | Webflow page settings | Identity provider (Circle, Memberstack, Clerk, Supabase) |
| Content downloadable without it? | Yes (it's in the bundle) | Yes | **No** | **No** | No | No |
| Works on GitHub Pages | Yes | Yes | No — Cloudflare Pages / Netlify / Vercel | No — Cloudflare | n/a | Depends |
| Admin: give an Engine access | Paste a hash into the record (helper page generates it) | Nothing — the slug *is* the token | Add one env var / KV entry | Add emails or a domain to a policy | Set in page settings | Invite users |
| Admin: rotate | New hash, redeploy | New URL, re-send | Change the env var | Edit the list | Change | Reset |
| Team experience | One field, once per device | Click the link they were emailed | One field, cookie | Enter email, type the code | Webflow's password page | Sign in |
| Rough build | ½–1 day | ½ day | 1 day + hosting move | ½ day + hosting move | n/a | 3+ days |
| Scales to | Any number of Engines | Any | Any | 50 users free, then paid | Per page | Any |

### 1. Salted hash in the JSON, checked in the browser  ← the flow you described, on today's stack

- Each record carries `access.hash`. On submit the app derives a key from the passphrase with PBKDF2 (Web Crypto, built into every browser; one salt for the whole file so an attempt costs one derivation regardless of Engine count), compares against every Engine, routes to the match.
- **Generating the hash** needs no tooling: a tiny hidden page (`/admin/hash`) does it client-side — type the passphrase, copy the hash, paste into the JSON. Or the "Run workflow" form from §3-A does it for the admin.
- **Honest limits.** The hash is in a public file: a weak password ("fse2026") can be guessed offline. Mitigate with three-word passphrases (`neocity-packaging-corridor`) and a slow hash. And the Engine content is in the bundle whether or not the gate is passed — this is a curtain, not a lock.
- **1b — encrypt the record instead.** Same idea, but the passphrase decrypts the Engine's JSON (AES-GCM, key from PBKDF2). The content is then unreadable in the bundle. Cost: admin edits become "edit plaintext → run a seal step → commit ciphertext", and the plaintext must live *outside* the public repo. Only worth it if the hypothesis must be non-public **and** TBP will not move hosts. Tools like StatiCrypt do this for whole pages.

### 2. Capability URL (the link is the password)

`/engine/fse-7k2m9x` — an unguessable slug, emailed at kickoff, no password screen at all. Your "URL for the cohort" and "password" collapse into one thing. Links leak (history, screenshots, Slack) and rotation means re-sending, but it is the least friction possible and pairs well with option 1 (the token pre-fills the gate).

### 3. Per-Engine password at the hosting edge

Move hosting to **Cloudflare Pages** (free, builds private repos, same GitHub push-to-deploy). A ~50-line Pages Function in front of `/engine/*`: no cookie → show the one-field form; POST → compare with `ENGINE_PASSWORDS` (env var or KV: `fse=…`, `cohort-two=…`); set a signed cookie; serve. Secrets never reach the browser and the HTML for an Engine is not served until the check passes. Netlify Edge Functions or Vercel Middleware do the same (their built-in site-wide password protection is on paid plans and is all-or-nothing, so the small function is the way regardless).

Admin work: passwords live in the host dashboard (one line per Engine); everything else stays in the JSON.

### 4. Cloudflare Access — email one-time code, no passwords at all

Cloudflare Zero Trust (free for 50 users) in front of the same Cloudflare Pages site. Policy: "allow `@fhtc.org`, `@ucf.edu`, plus these three addresses". Visitors enter their work email, receive a code, and are in. The app reads the verified email from the Access header and routes to the Engine whose `allowedDomains` / `allowedEmails` list matches — so the routing still lives in `engines.json`. This is "who you are" instead of "what you know": nothing to share or rotate, revoke one person without changing anyone else's access, and still no accounts to CRUD. Trade-off: admins maintain an email list per Engine, and the 50-user free ceiling (Engine teams are 3–6 people; fine for many cohorts).

### 5. Webflow page passwords

Native per-page passwords on paid Webflow site plans — a perfect match for "one page, one password" if Compass were Webflow pages, which it is not (see §3-E). Webflow's own Memberships product has been retired; Memberstack is the usual replacement, and that is option 6.

### 6. Real accounts

Out of scope by your framing and by the Aug 6 / Aug 19 decisions. Noted only so the path is visible: TBP already has Circle logins; Memberstack, Clerk, or Supabase magic links would each be a few days and bring user CRUD with them.

---

## 5. Recommendation

**Two stages, one contract.** The JSON file (§2) is the durable piece. Both the editing experience and the strength of the gate can be upgraded later without touching it.

### Stage 1 — now, for cohort two (Sep 26)

Options **A + 1**, optionally with **2**. Everything runs on the current stack.

1. Move Engine records to `src/compass/data/engines.json`, validated at build. Team roles become shared defaults.
2. Gate `/compass` and `/engine/:slug` with the one-field passphrase (option 1): password-as-selector, remembered per browser, staff passphrase for navigators.
3. Two admin paths: edit the JSON on github.com, or the "Add or update an Engine" workflow form. Add a hidden `/admin/hash` helper so a hash can be made without any tooling.
4. **Make the repo private** before real Engine data goes in. Because GitHub Pages on a private repo needs a paid GitHub plan, and because Stage 2 lands there anyway, move hosting to **Cloudflare Pages** now (free, same push-to-deploy, custom domain such as `compass.builderplatform.engine.xyz` when TBP is ready).

Rough effort: 1½–2 days. Nothing new for TBP to log into except GitHub.

### Stage 2 — when TBP says the content must be non-public, or Engines pass ~15

Options **3 or 4** on Cloudflare, same JSON, same admin flow.

- Move the passphrase check into a Pages Function (3), or switch to email codes with per-Engine domain lists (4). Both are half-day changes because the routing data already lives in the JSON.
- If admins want forms instead of GitHub, layer **Pages CMS** (B) over the same file. No migration.

### Why this and not…

- **…straight to Stage 2:** it needs a hosting move and a decision about where Compass lives (TBP's domain, DNS via Webflow) that TBP has not made. Stage 1 does not block on it.
- **…a spreadsheet (C):** no validation, two sources of truth, and the hash would sit in a sheet cell. Only if TBP already runs cohort ops in Sheets/Notion.
- **…Webflow (E/5):** the interactive portal does not fit Webflow's page model, and reading Webflow's CMS from the app needs a proxy.
- **…accounts (6):** decided against in August; Circle exists if that changes.

### What an admin does under Stage 1

| Task | Steps |
| --- | --- |
| Add an Engine | Actions → "Add or update an Engine" → fill name, slug, cohort, Gem URL, hypothesis, passphrase → Run. Live in ~2 min. Send slug + passphrase to the Engine lead. |
| Change a Gem link or hypothesis wording | Open `engines.json` on github.com → pencil → edit → Commit. |
| Add a second Gem | Same, add a `{ label, url }` to `gems`. |
| Rotate a passphrase | Open `/admin/hash`, type the new passphrase, paste the hash into `access.hash`, commit. Tell the team. |
| Retire an Engine | Set `"archived": true` (portal shows a read-only banner) or delete the record. |
| Let a navigator see everything | They use the staff passphrase. |

---

## 6. Decisions TBP needs to make

1. **Who edits?** Names, and whether they have (or will accept) GitHub accounts. Decides A vs B.
2. **Is the hypothesis text non-public?** Decides whether Stage 2 is needed before cohort two or after.
3. **Where does Compass live?** A TBP subdomain (DNS in Webflow) or the current github.io URL. Decides when the Cloudflare move happens.
4. **Cohort-two size** and expected Engines per year. Above ~15, prefer option 4's email lists over shared passphrases.
5. **Password policy for teams**: one passphrase per Engine shared by the whole team, or one per person (that is option 4/6 territory).
6. **Do they already run cohort ops in Notion / Airtable / Sheets?** If yes, revisit C for the content half only.

---

## Appendix — the gate in ten lines

```ts
// engines.json carries { salt } at the top and access.hash per Engine.
async function unlock(passphrase: string): Promise<Engine | "staff" | null> {
  const key = await pbkdf2(passphrase, ENGINES_FILE.salt);   // Web Crypto, ~100k iterations
  if (key === ENGINES_FILE.staffHash) return "staff";
  return ENGINES.find((e) => e.access?.hash === key) ?? null;
}
// On success: localStorage["tbp-compass:unlocked"] = [...slugs] (or "*" for staff),
// then navigate(`/engine/${engine.slug}`). <EngineRoute> renders the gate when the slug is not unlocked.
```
