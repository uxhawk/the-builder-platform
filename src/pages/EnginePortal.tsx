import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { engineBySlug } from "../compass/data/engines";
import { MILESTONES, type MilestoneId } from "../compass/data/milestones";
import { useProgress } from "../compass/state/progress";
import { Stepper } from "../compass/components/Stepper";
import { MilestoneCard } from "../compass/components/MilestoneCard";
import { HypothesisBox } from "../compass/components/HypothesisBox";
import { ArtifactsCard, ConfigCard, DeadlineCard, GemCard, HelpCard, TeamCard } from "../compass/components/SideCards";
import { Badge, Button, Container, Section, WideHero } from "../components/Primitives";
import { ArrowUpRight, Calendar, Refresh } from "../components/Icons";
import { useHelp } from "../components/HelpDrawer";
import NotFound from "./NotFound";
import { LINKS } from "../config";

export default function EnginePortal() {
  const { slug } = useParams();
  const engine = engineBySlug(slug);
  if (!engine) return <NotFound />;
  return <Portal key={engine.slug} engineSlug={engine.slug} />;
}

function Portal({ engineSlug }: { engineSlug: string }) {
  const engine = engineBySlug(engineSlug)!;
  const progress = useProgress(engine);
  const help = useHelp();
  /* Open card = the current milestone, unless the user picked another one since
     the current milestone last changed (derived during render, no effect). */
  const { hash } = useLocation();
  const [pick, setPick] = useState<{ when: MilestoneId; id: MilestoneId | "" } | null>(() => {
    /* Arriving at #m3 (e.g. back from a Learn article) opens that card. */
    const id = hash.slice(1) as MilestoneId;
    return MILESTONES.some((x) => x.id === id) ? { when: progress.current.id, id } : null;
  });
  const openId: MilestoneId | "" = pick && pick.when === progress.current.id ? pick.id : progress.current.id;
  const setOpenId = (id: MilestoneId | "") => setPick({ when: progress.current.id, id });

  const select = (id: MilestoneId) => {
    setOpenId(id);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const done = progress.state.completed.length;
  const cur = progress.current;
  const d = progress.state.deadline;
  const days = d ? Math.ceil((new Date(d.date + "T12:00:00").getTime() - Date.now()) / 86400000) : null;

  return (
    <>
      <WideHero tone={engine.tone} size="large">
        <div className="grid thin" style={{ alignItems: "end" }}>
          <div className="vertical-content">
            <Badge label={`Compass · cohort ${engine.cohort} · ${engine.path === "pre-kickoff" ? "pre-kickoff" : engine.path === "guided" ? "guided pilot" : "self-guided"}`} color="evergreen" white />
            <h1 className="display-heading font-color-white">{engine.name}</h1>
            <p className="paragraph-big font-color-white" style={{ opacity: .9, maxWidth: 560 }}>{engine.region} · {engine.industry}</p>
          </div>
          <div className="hero-status-card" style={{ justifySelf: "end" }}>
            <div className="row between">
              <div className="badge-title"><span className="square evergreen" /><span className="badge-text font-color-white">Your progress</span></div>
              {d && <span className={`deadline-chip ${days !== null && days < 21 ? "" : "grey"}`}><Calendar width={14} height={14} />{d.label} · {days !== null && days >= 0 ? `${days}d` : "passed"}</span>}
            </div>
            <div>
              <div className="heading-h3 font-color-white">{done} of {MILESTONES.length} milestones</div>
              <div className="fine-print font-color-body">Up next: <strong style={{ color: "#fff" }}>{cur.title}</strong> — {cur.purpose}</div>
            </div>
            <div className="meter"><span style={{ width: `${progress.percent}%` }} /></div>
            <div className="hero-actions">
              <Button variant="primary" href={engine.gemUrl ?? LINKS.gemFallback} external disabled={!engine.gemUrl} icon={<ArrowUpRight width={18} height={18} />}>Open your Compass Gem</Button>
              <Button variant="glass" onClick={() => help.open({ engine })}>Talk to your navigator</Button>
            </div>
          </div>
        </div>
      </WideHero>

      <Section className="padding-s">
        <Container>
          <div className="stack gap-l" style={{ width: "100%" }}>
            <div className="row between">
              <div className="badge-title"><span className="square deep-blue" /><span className="badge-text">Milestones · sequence is scaffolding, not a mold</span></div>
              <button type="button" className="proto-note" onClick={progress.reset} title="Reset local progress to the seeded state"><Refresh width={12} height={12} />reset prototype state</button>
            </div>
            <Stepper progress={progress} activeId={openId || progress.current.id} onSelect={select} />
          </div>
        </Container>
      </Section>

      <Section className="no-top-padding">
        <Container>
          <div className="portal">
            <div className="milestone-list">
              {MILESTONES.map((m) => (
                <MilestoneCard key={m.id} m={m} engine={engine} progress={progress} open={openId === m.id} onToggle={() => setOpenId(openId === m.id ? "" : m.id)} />
              ))}
            </div>
            <aside className="portal-side">
              <HypothesisBox engine={engine} progress={progress} />
              <GemCard engine={engine} />
              <DeadlineCard progress={progress} />
              <TeamCard engine={engine} />
              <HelpCard engine={engine} />
              <ArtifactsCard progress={progress} />
              <ConfigCard engine={engine} />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
