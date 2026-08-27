import { Link, useLocation, useParams } from "react-router-dom";
import { engineBySlug } from "../compass/data/engines";
import { MILESTONES, nextMilestone, type Milestone, type MilestoneId } from "../compass/data/milestones";
import { learnBySlug } from "../compass/data/learn";
import { fromState } from "../compass/state/from";
import { useProgress, type Progress } from "../compass/state/progress";
import { StressTest } from "../compass/components/StressTest";
import { Button, Notice, StatusPill } from "../components/Primitives";
import { CopyButton, Disclosure } from "../components/Interactive";
import { ArrowUpRight, Calendar, Check, Copy, Flag, Info, Lock, Users } from "../components/Icons";
import { useHelp } from "../components/HelpDrawer";
import { useToast } from "../components/Toast";
import { LINKS } from "../config";
import NotFound from "./NotFound";

/* concept/gem-first: one scrolling timeline, the Gem always one click away.
   The page is a companion, not a workspace: open the Gem with a prompt,
   do the work there, come back and jot one line. */
export default function GemFirstPortal() {
  const { slug } = useParams();
  const engine = engineBySlug(slug);
  if (!engine) return <NotFound />;
  return <Page key={engine.slug} slug={engine.slug} />;
}

function Page({ slug }: { slug: string }) {
  const engine = engineBySlug(slug)!;
  const progress = useProgress(engine);
  const help = useHelp();
  const cur = progress.current;
  const latest = engine.hypotheses[engine.hypotheses.length - 1];
  const gemHref = engine.gemUrl ?? LINKS.gemFallback;
  const copyAndOpen = async (text?: string) => { try { if (text) await navigator.clipboard.writeText(text); } catch { /* ignore */ } window.open(gemHref, "_blank", "noreferrer"); };

  return (
    <div className="gf-page">
      <section className="gf-head">
        <div className="main-container">
          <div className="gf-head-row">
            <div className="stack" style={{ gap: 6 }}>
              <h1 className="heading-h2">{engine.name}</h1>
            </div>
            <div className="row">
              <span className="status-pill current">{progress.state.completed.length} / {MILESTONES.length} milestones</span>
              <button type="button" className="proto-note" onClick={progress.reset}>reset prototype state</button>
            </div>
          </div>
          <div className="gf-hyp">
            <span className="badge-text" style={{ color: "var(--colors-brand--evergreen-dark)" }}>Working hypothesis{latest ? ` · v${latest.version}` : ""}</span>
            <span className={`txt ${latest ? "" : "empty"}`}>{latest ? latest.text : "Captured at kickoff — what you believe is holding your industry back, before you see any data."}</span>
            {progress.state.revisionRequested ? <span className="status-pill review">Revision requested</span> : <Button variant="outline" size="small" onClick={() => { progress.requestRevision(); help.open({ engine, milestone: "hypothesis revision" }); }}>Request revision</Button>}
          </div>
        </div>
      </section>

      <div className="main-container">
        <div className="gf-layout">
          {/* ---- Timeline ---- */}
          <div className="gf-rail">
            {MILESTONES.map((m) => (
              <Step key={m.id} m={m} engine={engine} progress={progress} onOpenGem={copyAndOpen} />
            ))}
          </div>

          {/* ---- Gem dock ---- */}
          <aside className="gem-dock">
            <div className="gem-card">
              <div className="row between">
                <div className="badge-title"><span className="square ultramarine" /><span className="badge-text font-color-white">Your Compass Gem</span></div>
                {engine.gemUrl ? <span className="status-pill done"><Check />Provisioned</span> : <span className="status-pill locked"><Lock />After kickoff</span>}
              </div>
              <div className="gem-now">
                <span className="kicker">Now · {cur.code}</span>
                <span className="t">{cur.title}</span>
                <span className="fine-print font-color-body">{cur.purpose}</span>
              </div>
              {cur.gemPrompt ? (
                <>
                  <div className="prompt-box"><div className="row"><span className="badge-text font-color-white muted">Prompt for this milestone</span><CopyButton text={cur.gemPrompt} label="Copy" /></div><pre>{cur.gemPrompt}</pre></div>
                  <Button variant="primary" full disabled={!engine.gemUrl} onClick={() => copyAndOpen(cur.gemPrompt)} iconLeft={<Copy width={16} height={16} />} icon={<ArrowUpRight width={18} height={18} />}>Copy prompt & open Gem</Button>
                </>
              ) : (
                <>
                  <Notice tone="dark" icon="users" title={cur.humanLabel ?? "With your navigator"}>{cur.kind === "bookend" ? "This milestone happens on a call, not in the Gem." : "Waiting on your navigator's review before the next prompt unlocks."}</Notice>
                  <Button variant="primary" full href={LINKS.bookCall} icon={<Calendar width={18} height={18} />}>{cur.id === "m0" ? "Book the kickoff" : cur.id === "m6" ? "Schedule synthesis" : "Message navigator"}</Button>
                </>
              )}
              <Button variant="outline on-dark" full href={gemHref} external disabled={!engine.gemUrl} icon={<ArrowUpRight width={16} height={16} />}>Open Gem without a prompt</Button>
            </div>
            <div className="gem-side">
              <div className="badge-title"><span className="square evergreen" /><span className="badge-text">Stuck? Talk to a human</span></div>
              <button type="button" className="help-row" onClick={() => help.open({ engine, milestone: cur.title })} style={{ width: "100%", textAlign: "left" }}>
                <span className="avatar">{engine.navigator.name.slice(0, 2).toUpperCase()}</span>
                <span className="who"><strong>{engine.navigator.name}</strong><small>Navigator · replies within a business day</small></span>
                <Flag className="arrow" />
              </button>
              <a className="help-row" href={LINKS.bookCall}>
                <span className="avatar magenta">RD</span>
                <span className="who"><strong>{engine.strategist.name}</strong><small>Strategy · 30 min</small></span>
                <Calendar className="arrow" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Step({ m, engine, progress, onOpenGem }: { m: Milestone; engine: ReturnType<typeof engineBySlug> & object; progress: Progress; onOpenGem: (t?: string) => void }) {
  const help = useHelp();
  const { toast } = useToast();
  const { hash } = useLocation();
  /* Cross-links into Learn carry this so the article's back link lands on this card, expanded. */
  const here = fromState(`/engine/${engine.slug}#${m.id}`, `Your Compass · ${m.title}`);
  const status = progress.statusOf(m.id);
  const idx = MILESTONES.findIndex((x) => x.id === m.id);
  const isHuman = m.kind === "bookend";
  const stressOk = !m.stressTest || progress.state.personasAnswered.length >= 6;
  const complete = () => {
    progress.complete(m.id);
    if (m.gate) progress.requestReview(m.id);
    toast(<>Congratulations — you completed <strong>{m.title}</strong></>);
    const next = nextMilestone(m.id);
    /* Let the completed card collapse before measuring; scroll-behavior in CSS keeps it smooth. */
    if (next) setTimeout(() => document.getElementById(next.id)?.scrollIntoView({ block: "start" }), 100);
  };
  const reopen = () => {
    progress.uncomplete(m.id);
    toast(<>Reopened <strong>{m.title}</strong> — pick up where you left off</>);
    /* The card expands back into its actionable state; scroll its top into view once it has. */
    setTimeout(() => document.getElementById(m.id)?.scrollIntoView({ block: "start" }), 100);
  };

  return (
    <>
      <div className={`gf-step ${status}`} id={m.id}>
        <div className="gf-node"><span>{status === "done" ? <Check /> : status === "locked" ? <Lock /> : isHuman ? <Users /> : idx}</span></div>
        <div className="gf-card">
          <div className="gf-title-row">
            <div>
              <div className="gf-kicker">{isHuman ? "Call" : `Milestone ${idx}`}{m.id === "m0" && ` · ${m.time}`}</div>
              <div className="gf-title">{m.title}</div>
              <div className="milestone-purpose">{m.purpose}</div>
            </div>
            {isHuman && status !== "done" && status !== "locked" ? <StatusPill status="human" /> : <StatusPill status={status} />}
          </div>

          {status === "done" && m.gate && progress.state.reviews.m4 === "requested" && (
            <Notice tone="magenta" icon="users" title="In navigator review">Moonlight annotates the Gem's diagnosis and brings it back with your framing. <button type="button" className="proto-note" onClick={() => progress.approveReview("m4")}>prototype: simulate approval</button></Notice>
          )}

          {(status === "current" || status === "available") && (
            <>
              <div className="gf-mini">
                <div><span className="n">1</span><strong>{isHuman ? "Book it" : "Open the Gem with this prompt"}</strong>
                  {isHuman ? <span>{m.humanLabel}. Come prepared:</span> : <span>The dock on the right has it ready. One click copies and opens.</span>}
                  {isHuman && <ul>{m.prepare.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>}
                </div>
                <div><span className="n">2</span><strong>{isHuman ? "On the call" : "Work through it"}</strong><ul>{m.inGem.map((t) => <li key={t}>{t}</li>)}</ul></div>
                <div><span className="n">3</span><strong>Come back</strong><ul>{m.reflect.map((t) => <li key={t}>{t}</li>)}</ul></div>
              </div>
              {m.stressTest && <StressTest progress={progress} />}
              <div className="row between">
                <div className="row">
                  {!isHuman && <Button variant="primary" size="small" disabled={!engine.gemUrl} onClick={() => onOpenGem(m.gemPrompt)} icon={<ArrowUpRight width={16} height={16} />}>Open Gem</Button>}
                  {isHuman && <Button variant="primary" size="small" href={LINKS.bookCall} icon={<Calendar width={16} height={16} />}>{m.id === "m0" ? "Book kickoff" : "Schedule"}</Button>}
                  <Button variant={progress.isFlagged(m.id) ? "magenta" : "outline"} size="small" iconLeft={<Flag width={14} height={14} />} onClick={() => { progress.flag(m.id); help.open({ engine, milestone: m.title }); }}>{progress.isFlagged(m.id) ? "Thought partner requested" : "Thought partner"}</Button>
                </div>
                <Button variant="dark" size="small" disabled={!stressOk} onClick={complete} title={!stressOk ? "Answer all six skeptics first" : undefined}>{m.gate ? "Done · request review" : "Done"}</Button>
              </div>
            </>
          )}

          {status === "review" && <Notice tone="magenta" icon="users" title="Unlocks after navigator review">The diagnosis goes to a human first. That's the one hard gate in the Compass.</Notice>}

          {status !== "locked" && (
            <Disclosure defaultOpen={hash === `#${m.id}`} toggle={{ closed: "More details", open: "Hide details" }} summary={<span className="badge-text gf-hint">Takeaways · questions for your team · go deeper</span>}>
              {/* Three sections, headed with the same three words as the toggle label. */}
              <div className="stack gap-l">
                <section className="stack">
                  <div className="fact"><span className="fact-label">You'll leave with</span><span className="fact-value">{m.leaveWith}</span></div>
                </section>
                <section className="stack">
                  <span className="badge-text muted">Questions for your team</span>
                  <ul className="question-bank">{m.questions.map((q) => <li key={q}>{q}</li>)}</ul>
                </section>
                <section className="stack">
                  <span className="badge-text muted">Go deeper</span>
                  <div className="chip-row">{m.deeper.map((s) => { const t = learnBySlug(s); return t ? <Link key={s} className="chip" to={`/learn/${s}`} state={here}><Info width={14} height={14} />{t.title}</Link> : null; })}</div>
                </section>
                {status === "done" && <div className="row"><Button variant="outline" size="small" onClick={reopen}>Reopen</Button></div>}
              </div>
            </Disclosure>
          )}
          {status === "locked" && <span className="fine-print" style={{ color: "#6b6b6b" }}>Unlocks after {MILESTONES[idx - 1]?.title}. <Link to={`/learn/${m.deeper[0]}`} state={here}>Read ahead</Link>.</span>}
        </div>
      </div>
      {m.gate && (
        <div className={`gf-gate ${progress.state.reviews.m4 === "approved" ? "done" : ""}`}>
          <div className="gf-node"><span>{progress.state.reviews.m4 === "approved" ? <Check /> : <Users />}</span></div>
          <div className="gf-card" style={{ background: "var(--colors-brand--magenta-lighter)", borderColor: "transparent", padding: "14px 22px" }}>
            <div className="gf-kicker">Gate · navigator review</div>
            <div style={{ fontSize: 14 }}>{progress.state.reviews.m4 === "approved" ? "Approved — Moonlight's annotations are in your Drive folder next to the Gem's output." : "A human reviews the diagnosis before priorities are set. Nothing reaches your team unchallenged."}</div>
          </div>
        </div>
      )}
    </>
  );
}

export type { MilestoneId };
