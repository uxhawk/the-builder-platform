import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLink, Badge, BoxCta, Button, Container, Section, WideHero } from "../components/Primitives";
import { FaqItem } from "../components/Interactive";
import { ArrowRight, ArrowUpRight, Users } from "../components/Icons";
import { MoodPicker } from "../compass/components/MoodPicker";
import { MILESTONES } from "../compass/data/milestones";
import type { MoodId } from "../compass/data/moods";
import { LEARN } from "../compass/data/learn";
import { useHelp } from "../components/HelpDrawer";
import { LINKS, MY_COMPASS } from "../config";
import { fromState } from "../compass/state/from";

const MOOD_KEY = "tbp-compass:mood";

export default function Landing() {
  const help = useHelp();
  const [mood, setMood] = useState<MoodId | undefined>(() => { try { return (localStorage.getItem(MOOD_KEY) as MoodId) || undefined; } catch { return undefined; } });
  useEffect(() => { try { if (mood) localStorage.setItem(MOOD_KEY, mood); else localStorage.removeItem(MOOD_KEY); } catch { /* ignore */ } }, [mood]);

  return (
    <>
      {/* Hero */}
      <WideHero tone="deep-blue" size="large">
        <div className="vertical-content">
          <Badge label="The Compass · Self-guided regional diagnostic" color="sky-blue" white />
          <h1 className="display-heading font-color-white">Know exactly where your Engine should act next.</h1>
          <p className="paragraph-big font-color-white" style={{ maxWidth: 560, opacity: .9 }}>A data-grounded diagnostic that turns your region's evidence into a story partners believe — and two or three first moves you can defend.</p>
          <div className="hero-actions">
            <Button variant="primary" to={MY_COMPASS} icon={<ArrowRight width={18} height={18} />}>Open your Compass</Button>
            <Button variant="glass" href="#how">How it works</Button>
          </div>
        </div>
      </WideHero>

      {/* Where are you right now */}
      <Section id="start">
        <Container>
          <div className="vertical-content padding">
            <Badge label="Start where you are" color="magenta" />
            <h2 className="heading-h2">Where are you right now?</h2>
            <p className="body-text max-m">Engines arrive here panicked, curious, obligated, or already motivated. Pick the closest — it changes your first step, not what you'll find.</p>
          </div>
          <MoodPicker value={mood} onChange={setMood} />
        </Container>
      </Section>

      {/* Outcomes */}
      <Section id="outcomes" className="bg-grey">
        <Container>
          <div className="vertical-content padding">
            <Badge label="What you'll walk away with" color="evergreen" />
            <h2 className="heading-h2 max-l">Clarity, alignment, and a path partners are ready to support.</h2>
          </div>
          <div className="grid four gap-default align-stretch">
            {[
              { n: "01", t: "An industry you can measure", d: "Your target industry defined in NAICS, SOC and CPC terms — legible to partners who think in jobs and firms, and measurable over time." },
              { n: "02", t: "A trajectory, not a snapshot", d: "Where the industry is actually heading — benchmarked against your own past decade and against peer regions." },
              { n: "03", t: "A diagnosis that survives “why not already?”", d: "The specific ecosystem barriers holding growth back, tested to separate structural failures from unfunded gaps." },
              { n: "04", t: "A narrative and first moves", d: "A 4–5 page document any team member can use with any partner, plus 2–3 priorities with 24-month success markers." },
            ].map((c) => (
              <div className="light-card" key={c.n}>
                <span className="badge-text muted">{c.n}</span>
                <h3 className="heading-h5 bold">{c.t}</h3>
                <p className="body-text" style={{ fontSize: 15, color: "#444" }}>{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works: three layers */}
      <Section id="how">
        <Container>
          {/* Intro on top, three equal-width layer cards below — side-by-side left the third card squeezed. */}
          <div className="stack" style={{ gap: 40, width: "100%" }}>
            <div className="vertical-content" style={{ maxWidth: 760 }}>
              <Badge label="How it works" color="ultramarine" />
              <h2 className="heading-h2">Built from the inside out, in three layers.</h2>
              <p className="body-text">Engines default to the macro case (“this technology matters”) and the micro case (“here are our twelve sub-awards”). The Compass builds the missing middle: how your ecosystem actually works, and what your Engine is built to change. Each layer produces a claim, and each claim depends on the one before it.</p>
              <ArrowLink to="/learn/what-is-compass" state={fromState("/#how", "Compass home · How it works")}>What the Compass is and isn't</ArrowLink>
            </div>
            <div className="layers">
              <div className="layer industry"><Badge label="Layer 1 · Industry" color="sky-blue" /><div className="layer-claim">“Our target industry is underperforming in this specific way, given how it exists in the region and how it innovates.”</div><span className="fine-print">Milestones 1–2 · public data, benchmarked twice</span><ArrowRight className="layer-arrow" /></div>
              <div className="layer ecosystem"><Badge label="Layer 2 · Ecosystem" color="ultramarine" /><div className="layer-claim">“That underperformance is explained by these specific failures in how actors relate — not by a shortage of raw materials.”</div><span className="fine-print">Milestones 3–4 · data plus local knowledge</span><ArrowRight className="layer-arrow" /></div>
              <div className="layer engine"><Badge label="Layer 3 · Engine" color="evergreen" /><div className="layer-claim">“Our Engine is designed to fix those failures. Here's what it must be — and what we're doing first.”</div><span className="fine-print">Milestones 4–5 · role, priorities, narrative</span></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Milestone overview */}
      <Section className="no-top-padding">
        <Container>
          <div className="vertical-content padding">
            <Badge label="Seven milestones" color="deep-blue" />
            <h2 className="heading-h2 max-l">Two conversations, five self-guided milestones, one document.</h2>
            <p className="body-text max-l">The kickoff and synthesis calls are the load-bearing moments. In between, you work in your Compass Gem at your own pace — a motivated team can finish in two or three focused days. Every milestone ends with questions for your team and produces one artifact.</p>
          </div>
          <div className="overview-strip">
            {MILESTONES.map((m, i) => (
              <Link to={`${MY_COMPASS}#${m.id}`} className={`overview-item ${m.kind === "bookend" ? "human" : ""}`} key={m.id}>
                <span className="ov-code">{m.kind === "bookend" ? "Call" : `Milestone ${i}`}{m.gate ? " · gate" : ""}</span>
                <span className="ov-title">{m.title}</span>
                <span className="ov-sub">{m.purpose}</span>
                <span className="ov-cta"><span className="arrow-link-text">Open in Compass</span><ArrowRight /></span>
                {m.kind === "bookend" && <Users width={16} height={16} style={{ position: "absolute", top: 14, right: 14, color: "var(--colors-brand--sky-blue-dark)" }} />}
              </Link>
            ))}
          </div>
          <div className="row" style={{ marginTop: 24 }}>
            <span className="fine-print" style={{ color: "#6b6b6b" }}>The sequence is scaffolding, not a mold — completed milestones stay open, and the diagnosis step is gated behind a human review on purpose.</span>
          </div>
        </Container>
      </Section>

      {/* Two paths */}
      <Section id="paths" className="bg-dark">
        <Container>
          <div className="vertical-content padding">
            <Badge label="Two paths, one framework" color="evergreen" white />
            <h2 className="heading-h2 font-color-white max-l">Self-guided or Full Compass. Your navigator recommends; you can switch.</h2>
          </div>
          <div className="grid gap-default align-stretch">
            <div className="path-card light">
              <Badge label="Self-guided Compass" color="evergreen" />
              <h3 className="heading-h4">You drive, with the Gem.</h3>
              <ul>
                <li>Kickoff and synthesis calls with your navigator and strategist</li>
                <li>Five milestones in your Compass Gem, at your pace</li>
                <li>Navigator review at the diagnosis gate — nothing reaches your team unchallenged</li>
                <li>Off-ramps everywhere: flag a thought partner at any milestone</li>
              </ul>
            </div>
            <div className="path-card light">
              <Badge label="Full Compass · guided" color="sky-blue" />
              <h3 className="heading-h4">TBP drives, call by call.</h3>
              <ul>
                <li>Five or six facilitated calls</li>
                <li>TBP does the between-call work: data pulls, stakeholder conversations, drafts</li>
                <li>A neutral third party in the room for the hard conversations</li>
                <li>Best for complex, defense-adjacent, or newly-led Engines</li>
              </ul>
            </div>
          </div>
          <div className="row" style={{ marginTop: 24 }}><ArrowLink to="/learn/self-serve-vs-guided" state={fromState("/#paths", "Compass home · Two paths")} white>Compare the two paths</ArrowLink></div>
        </Container>
      </Section>

      {/* The Gem */}
      <Section id="gem">
        <Container>
          <div className="grid gap-loose" style={{ alignItems: "start" }}>
            <div className="vertical-content">
              <Badge label="Your Compass Gem" color="ultramarine" />
              <h2 className="heading-h2">An AI partner that knows your region — and only your region.</h2>
              <p className="body-text">Each Engine gets a dedicated Gemini Gem: the Compass diagnostic logic plus your regional data packet, and nothing else. No web searches, no fabricated metrics, no generic industry assumptions. It writes an artifact at every milestone and can tell you what the data can't see.</p>
              <p className="body-text">This page and the Gem are separate on purpose. You'll paste a prompt, do the work there, and come back here to reflect, check off, and move on.</p>
              <div className="row gap-l"><ArrowLink to="/learn/how-the-gem-works" state={fromState("/#gem", "Compass home · The Gem")}>How the Gem works</ArrowLink><ArrowLink to="/learn/data-what-it-sees" state={fromState("/#gem", "Compass home · The Gem")}>What the data can and can't see</ArrowLink></div>
              <div className="row"><Button variant="primary" to={MY_COMPASS} icon={<ArrowRight width={18} height={18} />}>Open your Compass</Button></div>
            </div>
            <div className="stack">
              {[
                { t: "Core directive", d: "Diagnostic logic, archetype definitions, TBP's voice. Strict guardrails. Maintained centrally so every Gem improves at once.", c: "ultramarine" },
                { t: "Regional intelligence", d: "Your economic performance, ecosystem connectivity, peer and geography comparisons, archetype signals, and data provenance — attached as knowledge files.", c: "sky-blue" },
                { t: "Human review", d: "Moonlight reviews the Gem's diagnosis before it reaches your team, annotates it, and presents it next to your own framing. Three voices, not one.", c: "evergreen" },
              ].map((x) => (
                <div className="light-card" key={x.t}><Badge label={x.t} color={x.c as "ultramarine"} /><p className="body-text" style={{ fontSize: 15, color: "#444" }}>{x.d}</p></div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Who's in the room */}
      <Section id="room" className="bg-grey">
        <Container>
          <div className="grid gap-loose" style={{ alignItems: "start" }}>
            <div className="vertical-content">
              <Badge label="Before you start" color="sky-blue" />
              <h2 className="heading-h2">The right people matter more than the right data.</h2>
              <p className="body-text">The first pilot worked because one person on the Engine side could look at a table and say “that's wrong, here's why.” Most Engines don't have that person on staff. We'll help you find one at kickoff — before the data is pulled.</p>
              <ArrowLink to="/learn/who-in-the-room" state={fromState("/#room", "Compass home · Who's in the room")}>Who should be in the room</ArrowLink>
            </div>
            <div className="stack">
              {[["Engine lead / CEO", "Kickoff and synthesis. Owns the strategic call."], ["Process owner", "A mid-senior deputy — the primary interlocutor across milestones."], ["Regional ED fluency", "The “Andrea role.” Required. If you don't have one, say so at kickoff."], ["Technical / industry voice", "A CTO, engineer, or founder — not community relations."]].map(([r, d]) => (
                <div className="light-card" key={r} style={{ flexDirection: "row", alignItems: "center", gap: 16 }}><Users style={{ color: "var(--colors-brand--deep-blue)" }} /><div><strong>{r}</strong><div className="fine-print" style={{ color: "#555" }}>{d}</div></div></div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Learn teaser + FAQ */}
      <Section id="faq">
        <Container>
          <div className="grid gap-loose" style={{ alignItems: "start" }}>
            <div className="vertical-content">
              <Badge label="Good questions" color="magenta" />
              <h2 className="heading-h2">Things Engines ask before they start.</h2>
              <p className="body-text">Dig deeper in the Learn library — frameworks, process, and what the data can and can't see.</p>
              <ArrowLink to="/learn">Open the Learn library ({LEARN.length} topics)</ArrowLink>
            </div>
            {/* width: 100% — the grid centres/shrink-wraps items, which made this column resize as answers opened */}
            <div className="stack" style={{ gap: 0, width: "100%" }}>
              <FaqItem q="How much time does this really take?" defaultOpen>Roughly 8–15 hours of your team's time on the self-guided path, plus two calls. A motivated team with a deadline has done the middle in two or three focused days. The guided path is 6–8 hours of calls over 10–12 weeks, with TBP doing the between-call work.</FaqItem>
              <FaqItem q="Do we need a data scientist?">No. The Gem does the retrieval and the arithmetic; the navigator and data steward handle sources. You need someone who knows your region's firms and institutions well enough to challenge a chart — and a CEO willing to be challenged.</FaqItem>
              <FaqItem q="What if the data is wrong about us?">It will be, somewhere: suppressed defense employers, misclassified firms, trade secrets that never patent. Milestone 1 is designed to surface exactly that. When a correction changes the picture, you get an explicit revised read — never a silent update.</FaqItem>
              <FaqItem q="What if none of the archetypes fit?">Then say so. Archetypes are hypotheses and a way to find peer Engines who share your pattern — not labels. If a diagnosis feels wrong, that argument is what sharpens your strategy, and it's why a human reviews it before priorities are set.</FaqItem>
              <FaqItem q="Can we get help partway through?">Yes, anywhere. Every milestone has an “I want a thought partner here” flag; the highest-stakes moments (the barrier test, the archetype call) have review built in; and you can move to the guided track at any point.</FaqItem>
              <FaqItem q="Who sees our data and outputs?">Your Gem is a dedicated instance — it's blind to other Engines. Artifacts go to a shared Drive folder your navigator can review asynchronously. Nothing is published without you.</FaqItem>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA band (site: blobs + boxed CTAs) */}
      <section id="kickoff" className="section wide-section remove-padding">
        <div className="wide-section-content cta remove-radius">
          <div className="blob a" /><div className="blob b" /><div className="blob c" /><div className="blob d" />
          <div className="grid-bg dark-cta-grid" />
          <div className="main-container inside-wide-section align-center">
            <div className="cta-content">
              <div className="vertical-content align-center">
                <h2 className="heading-h2 max-l">Ready to point the Compass at your region?</h2>
              </div>
              <div className="cta-container" style={{ gap: 12 }}>
                <BoxCta color="green" href={LINKS.bookCall}>Book a kickoff</BoxCta>
                <BoxCta color="grey" onClick={() => help.open()}>Talk to TBP first</BoxCta>
              </div>
              <a className="external-link" href={LINKS.tbpSite} target="_blank" rel="noreferrer">builderplatform.engine.xyz <ArrowUpRight width={16} height={16} /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
