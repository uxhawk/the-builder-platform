import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useMatch } from "react-router-dom";
import { LINKS } from "../config";
import type { Engine } from "../compass/data/engines";
import { Button } from "./Primitives";
import { Drawer } from "./Interactive";
import { ArrowRight, Calendar, Flag, Mail, Users } from "./Icons";

type HelpCtx = { open: (opts?: { engine?: Engine; milestone?: string }) => void; close: () => void };
const Ctx = createContext<HelpCtx>({ open: () => {}, close: () => {} });
export const useHelp = () => useContext(Ctx);

/* “Get live help” is the always-available off-ramp (Aug 6 / Aug 13 / Aug 20 notes:
   engines should be able to flag they want a thought partner at any point).
   The drawer is mounted site-wide so in-page CTAs can open it; the floating
   button only shows on the My Compass (engine portal) page. */
export function HelpProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; engine?: Engine; milestone?: string }>({ open: false });
  const [note, setNote] = useState("");
  const open = useCallback((opts?: { engine?: Engine; milestone?: string }) => setState({ open: true, ...opts }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ open, close }), [open, close]);
  const onMyCompass = useMatch("/engine/:slug");
  const eng = state.engine;
  const subject = encodeURIComponent(`Compass help${eng ? ` — ${eng.shortName}` : ""}${state.milestone ? ` (${state.milestone})` : ""}`);
  const body = encodeURIComponent(note);
  const navigatorMail = `mailto:${eng?.navigator.email ?? LINKS.contactEmail}?subject=${subject}&body=${body}`;

  return (
    <Ctx.Provider value={value}>
      {children}
      {onMyCompass && <button type="button" className="button dark help-fab" onClick={() => open()}><Users width={18} height={18} />Get help</button>}
      <Drawer open={state.open} onClose={close} title="Get live help">
        <div className="stack gap-l">
          <p className="body-text">The Compass is self-guided, not hands-off. If you're stuck, unsure, or want a thought partner before you commit to a call — reach out. The bookend calls are the most load-bearing moments in the process; the middle has off-ramps.</p>
          {state.milestone && <div className="notice evergreen"><Flag /><div><div className="notice-title">You're flagging {state.milestone}</div><p>We'll reply within one business day with a time to talk.</p></div></div>}
          <div className="stack">
            <label className="badge-text muted" htmlFor="help-note">What's on your mind? (optional)</label>
            <textarea id="help-note" className="text-field" rows={3} placeholder="e.g. The archetype doesn't fit — the data is missing our largest employer." value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="side-card">
            <a className="help-row" href={navigatorMail}>
              <span className="avatar">{initials(eng?.navigator.name ?? "TBP")}</span>
              <span className="who"><strong>Message your Navigator</strong><small>{eng ? `${eng.navigator.name} · ${eng.navigator.org}` : "The Builder Platform team"}</small></span>
              <ArrowRight className="arrow" />
            </a>
            <a className="help-row" href={LINKS.bookCall}>
              <span className="avatar magenta"><Calendar width={18} height={18} /></span>
              <span className="who"><strong>Book 30 minutes with the strategist</strong><small>{eng?.strategist.name ?? "Ryan Donahue"} · framework & strategy · joins every kickoff and synthesis</small></span>
              <ArrowRight className="arrow" />
            </a>
            <a className="help-row" href={`mailto:${LINKS.contactEmail}?subject=${subject}&body=${body}`}>
              <span className="avatar evergreen"><Mail width={18} height={18} /></span>
              <span className="who"><strong>Email The Builder Platform</strong><small>{LINKS.contactEmail}</small></span>
              <ArrowRight className="arrow" />
            </a>
          </div>
          <div className="stack">
            <div className="badge-text muted">Common reasons people reach out</div>
            <ul className="question-bank">
              <li>The data is missing a firm or a county we know matters.</li>
              <li>None of the archetypes fit — or one fits uncomfortably well.</li>
              <li>We want a human check before the "why not already?" step.</li>
              <li>We need to switch from self-guided to the guided track (or back).</li>
            </ul>
          </div>
          <Button variant="outline" onClick={close}>Close</Button>
        </div>
      </Drawer>
    </Ctx.Provider>
  );
}

export function initials(name: string) { return name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase(); }
