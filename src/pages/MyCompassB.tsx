import { useId, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { engineBySlug, type Engine } from "../compass/data/engines";
import { MILESTONES, type Milestone } from "../compass/data/milestones";
import { useProgress } from "../compass/state/progress";
import { Button, StatusPill } from "../components/Primitives";
import { ArrowUpRight, Calendar, ChevronDown, Users } from "../components/Icons";
import { LINKS } from "../config";
import NotFound from "./NotFound";

/* My Compass B: the same timeline as A, read at the user's own pace.
   No milestone is ever "done", "up next" or locked. Every card is an
   accordion the reader opens and closes freely. No prompts, no
   thought-partner flags, no stress test, no gate note, no people card:
   the Gem dock is just the link. Hypothesis revisions still persist; they share A's
   localStorage record for the Engine.
   Compare with MyCompassA (docs/my-compass-a-vs-b.md). */
export default function MyCompassB() {
  const { slug } = useParams();
  const engine = engineBySlug(slug);
  if (!engine) return <NotFound />;
  return <Page key={engine.slug} engine={engine} />;
}

function Page({ engine }: { engine: Engine }) {
  const progress = useProgress(engine);
  const latest = engine.hypotheses[engine.hypotheses.length - 1];
  const gemHref = engine.gemUrl ?? LINKS.gemFallback;

  return (
    <div className="gf-page">
      <section className="gf-head">
        <div className="main-container">
          <div className="gf-head-row">
            <h1 className="heading-h2">{engine.name}</h1>
          </div>
          <div className="gf-hyp">
            <span className="badge-text" style={{ color: "var(--colors-brand--evergreen-dark)" }}>Hypothesis</span>
            <span className={`txt ${latest ? "" : "empty"}`}>{latest ? latest.text : "Captured at kickoff — what you believe is holding your industry back, before you see any data."}</span>
            {progress.state.revisionRequested ? <span className="status-pill review">Revision requested</span> : <Button variant="outline" size="small" onClick={() => progress.requestRevision()}>Request revision</Button>}
          </div>
        </div>
      </section>

      <div className="main-container">
        <div className="gf-layout">
          {/* ---- Timeline: seven free accordions ---- */}
          <div className="gf-rail">
            {MILESTONES.map((m) => (
              <Step key={m.id} m={m} />
            ))}
          </div>

          {/* ---- Gem dock: just the link. No "now", no prompts, no people card. ---- */}
          <aside className="gem-dock">
            <div className="gem-card">
              <div className="badge-title"><span className="square ultramarine" /><span className="badge-text font-color-white">Your Compass Gem</span></div>
              <span className="fine-print font-color-body">Your Gem is pre-loaded with your regional data. Do each milestone's work there, and come back here for what to bring, what you'll leave with, and the questions for your team.</span>
              <Button variant="primary" full href={gemHref} external disabled={!engine.gemUrl} icon={<ArrowUpRight width={18} height={18} />}>Open your Gem</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Step({ m }: { m: Milestone }) {
  const { hash } = useLocation();
  const bodyId = useId();
  /* Deep links (#m3, e.g. a Learn article's related-milestone chips) arrive with that card open;
     everything else starts closed and is the reader's to open. A later hash change (another chip
     while already on this page) opens its card too, adjusted during render rather than in an effect. */
  const [open, setOpen] = useState(hash === `#${m.id}`);
  const [seenHash, setSeenHash] = useState(hash);
  if (hash !== seenHash) { setSeenHash(hash); if (hash === `#${m.id}`) setOpen(true); }
  const idx = MILESTONES.findIndex((x) => x.id === m.id);
  const isHuman = m.kind === "bookend";
  /* Milestone 5's "Work through it" list (shared with A) points at the stress test, which B doesn't have. */
  const inGem = m.stressTest ? m.inGem.filter((t) => !/stress test/i.test(t)) : m.inGem;

  return (
    <div className={`gf-step ${open ? "open" : ""}`} id={m.id}>
      <div className="gf-node"><span>{isHuman ? <Users /> : idx}</span></div>
      <div className="gf-card gf-acc">
        {/* The whole header is the toggle: kicker, title and purpose stay visible when closed. */}
        <button type="button" className="gf-acc-toggle" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen((o) => !o)}>
          <div>
            <div className="gf-kicker">{isHuman ? "Call" : `Milestone ${idx}`}</div>
            <div className="gf-title">{m.title}</div>
            <div className="milestone-purpose">{m.purpose}</div>
          </div>
          <div className="row gf-acc-side">
            {isHuman && <StatusPill status="human" />}
            <span className="button small disclosure-toggle">{open ? "Close" : "Open"}<ChevronDown /></span>
          </div>
        </button>

        {open && (
          <div id={bodyId} className="gf-acc-body anim-in">
            <div className="gf-mini">
              <div><span className="n">1</span><strong>{isHuman ? "Book it" : "Open the Gem"}</strong>
                {isHuman ? <span>{m.humanLabel}. Come prepared:</span> : <span>Open your Compass Gem and start this milestone there.</span>}
                {isHuman && <ul>{m.prepare.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>}
              </div>
              <div><span className="n">2</span><strong>{isHuman ? "On the call" : "Work through it"}</strong><ul>{inGem.map((t) => <li key={t}>{t}</li>)}</ul></div>
              <div><span className="n">3</span><strong>Come back</strong><ul>{m.reflect.map((t) => <li key={t}>{t}</li>)}</ul></div>
            </div>

            {/* Calls keep their booking button; self-guided milestones have no actions (the Gem link is in the dock). */}
            {isHuman && (
              <div className="row">
                <Button variant="primary" size="small" href={LINKS.bookCall} icon={<Calendar width={16} height={16} />}>{m.id === "m0" ? "Book kickoff" : "Schedule"}</Button>
              </div>
            )}

            {/* Details: what you leave with, and the question bank. (No "go deeper" links in B.) */}
            <div className="stack gap-l" style={{ borderTop: "1px solid var(--colors-interface--grey-2)", paddingTop: 16 }}>
              <div className="fact"><span className="fact-label">You'll leave with</span><span className="fact-value">{m.leaveWith}</span></div>
              <section className="stack">
                <span className="badge-text muted">Questions for your team</span>
                <ul className="question-bank">{m.questions.map((q) => <li key={q}>{q}</li>)}</ul>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
