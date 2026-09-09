import { useState } from "react";
import { Link } from "react-router-dom";
import type { Engine } from "../data/engines";
import { MILESTONES } from "../data/milestones";
import { fromState } from "../state/from";
import type { Progress } from "../state/progress";
import { Button } from "../../components/Primitives";
import { Disclosure } from "../../components/Interactive";
import { ArrowRight, ArrowUpRight, Calendar, Check, Doc, Mail, Sparkle } from "../../components/Icons";
import { LINKS } from "../../config";

export function GemCard({ engine }: { engine: Engine }) {
  return (
    <div className="side-card grey">
      <div className="row between"><div className="badge-title"><span className="square ultramarine" /><span className="badge-text">Your Compass Gem</span></div>{engine.gemUrl ? <span className="status-pill done"><Check />Provisioned</span> : <span className="status-pill locked">After kickoff</span>}</div>
      <p className="fine-print" style={{ color: "#444" }}>{engine.gemUrl ? "Pre-loaded with your regional data packet. Opens in Gemini — share the link with your team; each person gets their own conversation." : "Built from the configuration agreed at kickoff, about one business day later."}</p>
      <Button variant="primary" full href={engine.gemUrl ?? LINKS.gemFallback} external disabled={!engine.gemUrl} icon={<ArrowUpRight width={18} height={18} />}>Open Gem</Button>
      {engine.driveUrl && <a className="arrow-link" href={engine.driveUrl}><span className="arrow-link-text">Artifacts folder</span><ArrowRight /></a>}
    </div>
  );
}

export function DeadlineCard({ progress }: { progress: Progress }) {
  const d = progress.state.deadline;
  const [editing, setEditing] = useState(!d);
  const [label, setLabel] = useState(d?.label ?? "");
  const [date, setDate] = useState(d?.date ?? "");
  const days = d ? Math.ceil((new Date(d.date + "T12:00:00").getTime() - Date.now()) / 86400000) : null;
  return (
    <div className="side-card">
      <div className="badge-title"><span className="square magenta" /><span className="badge-text">Your forcing function</span></div>
      {d && !editing ? (
        <>
          <div className="row between"><span className="heading-h5 bold">{d.label}</span><span className={`deadline-chip ${days !== null && days < 21 ? "" : "grey"}`}><Calendar width={14} height={14} />{days !== null && days >= 0 ? `${days} days` : "passed"}</span></div>
          <p className="fine-print" style={{ color: "#444" }}>{new Date(d.date + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric", year: "numeric" })}. External deadlines drove engagement quality in cohort one — we set the cadence backward from this date.</p>
          <button type="button" className="arrow-link" onClick={() => setEditing(true)}><span className="arrow-link-text">Change</span><ArrowRight /></button>
        </>
      ) : (
        <form className="form" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); if (label && date) { progress.setDeadline({ label, date }); setEditing(false); } }}>
          <p className="fine-print" style={{ color: "#444" }}>Without a date to organize toward, Engines drift. Declare one — a site visit, a renewal pitch, a board retreat — or we'll help you manufacture one at kickoff.</p>
          <input className="text-field" placeholder="e.g. NSF site visit" value={label} onChange={(e) => setLabel(e.target.value)} aria-label="Deadline label" />
          <input className="text-field" type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Deadline date" />
          <Button type="submit" variant="dark" size="small">Set deadline</Button>
        </form>
      )}
    </div>
  );
}

export function TeamCard({ engine }: { engine: Engine }) {
  const missing = engine.team.filter((t) => t.required && !t.person).length;
  return (
    <div className="side-card">
      <div className="row between"><div className="badge-title"><span className="square sky-blue" /><span className="badge-text">Who's in the room</span></div>{missing > 0 && <span className="status-pill review">{missing} to recruit</span>}</div>
      <div>
        {engine.team.map((t) => (
          <div className="team-row" key={t.role}>
            <div className="team-role"><span>{t.role}</span><small>{t.person ?? t.why}</small></div>
            {t.person ? <span className="avatar sky" title={t.person}>{initials(t.person.split("·")[0].trim())}</span> : <span className={`status-pill ${t.required ? "review" : "locked"}`}>{t.required ? "Needed" : "Optional"}</span>}
          </div>
        ))}
      </div>
      <Link className="arrow-link" to="/learn/who-in-the-room" state={fromState(`/engine/${engine.slug}`, "Your Compass")}><span className="arrow-link-text">Why these roles</span><ArrowRight /></Link>
    </div>
  );
}

const initials = (name: string) => name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

export function HelpCard({ engine }: { engine: Engine }) {
  return (
    <div className="side-card">
      <div className="badge-title"><span className="square evergreen" /><span className="badge-text">Live help</span></div>
      <div>
        <a className="help-row" href={`mailto:${engine.navigator.email}`}>
          <span className="avatar">{initials(engine.navigator.name)}</span>
          <span className="who"><strong>{engine.navigator.name}</strong><small>Navigator · {engine.navigator.org}</small></span>
          <Mail className="arrow" />
        </a>
        <a className="help-row" href={LINKS.bookCall}>
          <span className="avatar magenta">{initials(engine.strategist.name)}</span>
          <span className="who"><strong>{engine.strategist.name}</strong><small>Strategy · {engine.strategist.org} · book 30 min</small></span>
          <Calendar className="arrow" />
        </a>
        <div className="help-row">
          <span className="avatar evergreen">{initials(engine.dataSteward.name)}</span>
          <span className="who"><strong>{engine.dataSteward.name}</strong><small>Data steward · {engine.dataSteward.org} · via your navigator</small></span>
          <Sparkle className="arrow" />
        </div>
      </div>
      <p className="fine-print" style={{ color: "#6b6b6b" }}>Self-guided is not hands-off. Bookend calls are the quality check; the middle has off-ramps whenever you want one.</p>
    </div>
  );
}

export function ArtifactsCard({ progress }: { progress: Progress }) {
  return (
    <div className="side-card">
      <div className="badge-title"><span className="square deep-blue" /><span className="badge-text">Your artifacts</span></div>
      <div>
        {MILESTONES.map((m) => {
          const done = progress.isComplete(m.id);
          return (
            <div className="artifact-row" key={m.id}>
              <span className="doc"><Doc /></span>
              <span style={{ color: done ? "inherit" : "#8a8a8a" }}>{m.artifact}</span>
              {done ? <span className="status-pill done"><Check />Saved</span> : <span className="status-pill locked">{m.code}</span>}
            </div>
          );
        })}
      </div>
      <p className="fine-print" style={{ color: "#6b6b6b" }}>Each milestone produces a minimum viable artifact: accurate, defensible, Compass-aligned. Incomplete is tolerable; inaccurate is not.</p>
    </div>
  );
}

export function ConfigCard({ engine }: { engine: Engine }) {
  if (!engine.config) return null;
  const c = engine.config;
  return (
    <div className="side-card">
      <Disclosure summary={<div className="badge-title"><span className="square grey" /><span className="badge-text">Configuration (locked at kickoff)</span></div>}>
        <div className="stack" style={{ fontSize: 14 }}>
          <div><div className="fact-label">Core NAICS</div>{c.coreNaics.map((x) => <div key={x}>{x}</div>)}</div>
          <div><div className="fact-label">Enabling NAICS</div>{c.enablingNaics.map((x) => <div key={x}>{x}</div>)}</div>
          <div><div className="fact-label">Geography</div><div>{c.geography}</div></div>
          <div><div className="fact-label">Peer regions</div><div>{c.peers.join(" · ")}</div></div>
          <p className="fine-print" style={{ color: "#6b6b6b" }}>Codes and counties are precomputed before the Gem runs. To change them, come back to your data steward — a guardrail, not a limitation.</p>
        </div>
      </Disclosure>
    </div>
  );
}
