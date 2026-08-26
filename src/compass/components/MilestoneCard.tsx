import { useId } from "react";
import { Link } from "react-router-dom";
import { MILESTONES, prevMilestone, type Milestone } from "../data/milestones";
import type { Engine } from "../data/engines";
import type { Progress } from "../state/progress";
import { learnBySlug } from "../data/learn";
import { Button, Notice, StatusPill } from "../../components/Primitives";
import { Checkbox, CopyButton, Disclosure } from "../../components/Interactive";
import { ArrowUpRight, Calendar, ChevronDown, Check, Doc, Flag, Info, Sparkle, Users } from "../../components/Icons";
import { useHelp } from "../../components/HelpDrawer";
import { StressTest } from "./StressTest";
import { LINKS } from "../../config";

/* Levels of disclosure inside one card:
   1. Head — number, title, one-line purpose, status.
   2. Body — what you leave with, time, artifact; three work columns with checklists;
      paste-able Gem prompt; question bank; off-ramp; complete.
   3. Go deeper — chips into the Learn library.
   Locked milestones are still readable (preview), just not actionable. */
export function MilestoneCard({ m, engine, progress, open, onToggle }: { m: Milestone; engine: Engine; progress: Progress; open: boolean; onToggle: () => void }) {
  const help = useHelp();
  const id = useId();
  const status = progress.statusOf(m.id);
  const prev = prevMilestone(m.id);
  const isHuman = m.kind === "bookend";
  const actionable = status === "current" || status === "available" || status === "done";
  const reviewState = progress.state.reviews.m4;
  const idx = MILESTONES.findIndex((x) => x.id === m.id);

  const checks = (group: "prepare" | "inGem" | "reflect") => m[group].map((_, i) => `${m.id}:${group}:${i}`);
  const allChecks = [...checks("prepare"), ...checks("inGem"), ...checks("reflect")];
  const doneCount = allChecks.filter((k) => progress.isChecked(k)).length;
  const stressOk = !m.stressTest || progress.state.personasAnswered.length >= 6;
  const canComplete = actionable && status !== "done" && stressOk;

  const complete = () => {
    progress.complete(m.id);
    if (m.gate) progress.requestReview(m.id);
  };

  return (
    <article id={m.id} className={`milestone-card ${status}`}>
      <button type="button" className="milestone-head" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span className="milestone-code">{status === "done" ? <Check width={18} height={18} /> : isHuman ? <Users width={18} height={18} /> : idx}</span>
        <span className="milestone-title-wrap">
          <span className="milestone-title">{m.title}</span>
          <span className="milestone-purpose">{m.purpose}</span>
        </span>
        <span className="milestone-meta">
          {isHuman && status !== "done" ? <StatusPill status="human" /> : <StatusPill status={status} />}
          <ChevronDown className="chev" />
        </span>
      </button>

      {open && (
        <div id={id} className="milestone-body anim-in">
          {/* Level 2: what you get, how long, what it produces */}
          <div className="milestone-facts">
            <div className="fact"><span className="fact-label">You'll leave with</span><span className="fact-value">{m.leaveWith}</span></div>
            <div className="fact"><span className="fact-label">Time</span><span className="fact-value">{m.time}</span></div>
            <div className="fact"><span className="fact-label">{isHuman ? "Who" : "Artifact"}</span><span className="fact-value">{isHuman ? m.humanLabel : m.artifact}</span></div>
          </div>

          {status === "locked" && (
            <Notice tone="grey" icon="lock" title={`Unlocks after ${prev?.title}`}>Sequence is scaffolding, not a mold — you'll be able to come back to any earlier milestone from here. Until then, read ahead so nothing is a surprise.</Notice>
          )}
          {status === "review" && (
            <Notice tone="magenta" icon="users" title="Waiting on navigator review">{reviewState === "requested" ? "Your navigator is annotating the Gem's diagnosis. This milestone opens when the review lands — usually within a few business days." : "Complete the diagnosis and request review to unlock priorities."}
              {reviewState === "requested" && <> <button type="button" className="proto-note" onClick={() => progress.approveReview("m4")} style={{ marginLeft: 8 }}>prototype: simulate approval</button></>}
            </Notice>
          )}
          {status === "done" && m.gate && reviewState === "requested" && (
            <Notice tone="magenta" icon="users" title="Review requested">Moonlight reviews the Gem's output first, annotates it, then brings it back alongside your framing. Milestone 5 unlocks when approved. <button type="button" className="proto-note" onClick={() => progress.approveReview("m4")}>prototype: simulate approval</button></Notice>
          )}
          {status === "done" && !(m.gate && reviewState === "requested") && (
            <Notice tone="evergreen" icon="check" title="Complete">{isHuman ? "Done with your navigator." : <>Artifact saved to your Drive folder: <strong>{m.artifact}</strong>. Revisit any time — later milestones may send you back here.</>}</Notice>
          )}
          {m.gate && status !== "done" && status !== "locked" && (
            <Notice tone="ultramarine" icon="users" title={m.gate.label}>{m.gate.description}</Notice>
          )}
          {engine.path === "pre-kickoff" && m.id !== "m0" && status !== "locked" && (
            <Notice tone="sky" icon="info" title="Your Gem isn't provisioned yet">It's built from the configuration agreed at kickoff, about one business day later.</Notice>
          )}

          {/* Primary action */}
          {actionable && (
            <div className="hero-actions">
              {isHuman
                ? <><Button variant="primary" href={LINKS.bookCall} icon={<Calendar width={18} height={18} />}>{m.id === "m0" ? "Book the kickoff" : "Schedule synthesis"}</Button><Button variant="outline" onClick={() => help.open({ engine, milestone: m.title })}>Message your navigator</Button></>
                : <><Button variant="primary" href={engine.gemUrl ?? LINKS.gemFallback} external disabled={!engine.gemUrl} icon={<ArrowUpRight width={18} height={18} />}>Open your Compass Gem</Button>
                    {engine.driveUrl && <Button variant="outline" href={engine.driveUrl} icon={<Doc width={16} height={16} />}>Artifacts folder</Button>}</>}
            </div>
          )}

          {/* Work columns */}
          {actionable ? (
            <div className="work-cols">
              <WorkCol title="Prepare" icon={<Doc width={16} height={16} />} items={m.prepare} keys={checks("prepare")} progress={progress} />
              <WorkCol title={isHuman ? "On the call" : "In the Gem"} icon={<Sparkle width={16} height={16} />} items={m.inGem} keys={checks("inGem")} progress={progress} />
              <WorkCol title="Reflect & decide" icon={<Users width={16} height={16} />} items={m.reflect} keys={checks("reflect")} progress={progress} />
            </div>
          ) : (
            <Disclosure summary={<span className="badge-text">Preview what you'll do</span>}>
              <div className="work-cols">
                {(["prepare", "inGem", "reflect"] as const).map((g) => (
                  <div className="work-col" key={g}><h5>{g === "prepare" ? "Prepare" : g === "inGem" ? (isHuman ? "On the call" : "In the Gem") : "Reflect & decide"}</h5><ul className="question-bank">{m[g].map((t) => <li key={t}>{t}</li>)}</ul></div>
                ))}
              </div>
            </Disclosure>
          )}

          {/* Paste-able prompt keeps landing page ↔ Gem integration light */}
          {actionable && m.gemPrompt && (
            <div className="prompt-box">
              <div className="row"><span className="badge-text font-color-white muted">Suggested prompt · paste into your Gem</span><CopyButton text={m.gemPrompt} /></div>
              <pre>{m.gemPrompt}</pre>
            </div>
          )}

          {m.stressTest && actionable && <StressTest progress={progress} />}

          {/* Question bank */}
          <Disclosure defaultOpen={status === "current"} summary={<span className="badge-text">Questions for your team{actionable ? "" : " (preview)"}</span>}>
            <ul className="question-bank">{m.questions.map((q) => <li key={q}>{q}</li>)}</ul>
          </Disclosure>

          {/* Level 3: go deeper */}
          <div className="stack">
            <span className="badge-text muted">Go deeper</span>
            <div className="chip-row">
              {m.deeper.map((s) => { const t = learnBySlug(s); return t ? <Link key={s} className="chip" to={`/learn/${s}`}><Info width={14} height={14} />{t.title}</Link> : null; })}
            </div>
          </div>

          {/* Footer: off-ramp + complete */}
          <div className="row between" style={{ borderTop: "1px solid var(--colors-interface--grey-2)", paddingTop: 20 }}>
            <div className="stack" style={{ gap: 6 }}>
              <Button variant={progress.isFlagged(m.id) ? "magenta" : "outline"} size="small" iconLeft={<Flag width={14} height={14} />} onClick={() => { progress.flag(m.id); help.open({ engine, milestone: m.title }); }}>
                {progress.isFlagged(m.id) ? "Thought partner requested" : "I want a thought partner here"}
              </Button>
              {m.offRamp && <span className="kbd-note">{m.offRamp}</span>}
            </div>
            <div className="row">
              {actionable && status !== "done" && <span className="kbd-note">{doneCount}/{allChecks.length} steps{m.stressTest ? ` · ${progress.state.personasAnswered.length}/6 skeptics` : ""}</span>}
              {status === "done"
                ? <Button variant="outline" size="small" onClick={() => progress.uncomplete(m.id)}>Reopen</Button>
                : actionable && <Button variant="dark" size="small" disabled={!canComplete} onClick={complete} title={!stressOk ? "Answer all six skeptics first" : undefined}>{m.gate ? "Mark complete & request review" : "Mark complete"}</Button>}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function WorkCol({ title, icon, items, keys, progress }: { title: string; icon: React.ReactNode; items: string[]; keys: string[]; progress: Progress }) {
  return (
    <div className="work-col">
      <h5>{icon}{title}</h5>
      <div className="checklist">
        {items.map((t, i) => <Checkbox key={keys[i]} checked={progress.isChecked(keys[i])} onChange={() => progress.toggleCheck(keys[i])} label={t} />)}
      </div>
    </div>
  );
}
