import { Link, useLocation, useParams } from "react-router-dom";
import { LEARN, LEARN_GROUPS, learnBySlug, type Block } from "../compass/data/learn";
import { milestoneById } from "../compass/data/milestones";
import { ArrowLink, Badge, Container, Section, WideHero } from "../components/Primitives";
import { ArrowLeft, ArrowRight } from "../components/Icons";
import NotFound from "./NotFound";
import { MY_COMPASS } from "../config";
import { fromState, readFrom } from "../compass/state/from";

export function LearnIndex() {
  return (
    <>
      <WideHero tone="sky-blue">
        <div className="vertical-content">
          <Badge label="Learn library" white />
          <h1 className="heading-h1 font-color-white max-l">Dive as deep as you like.</h1>
          <p className="paragraph-big font-color-white max-m" style={{ opacity: .9 }}>Frameworks, process, and what the data can and can't see — in plain language first, framework vocabulary second.</p>
        </div>
      </WideHero>
      {LEARN_GROUPS.map((g, i) => (
        <Section key={g} className={i === 0 ? "" : "no-top-padding"}>
          <Container>
            <div className="vertical-content padding" style={{ paddingBottom: 24 }}><Badge label={g} color={(["magenta", "ultramarine", "sky-blue", "evergreen"] as const)[i]} /></div>
            <div className="learn-grid">
              {LEARN.filter((t) => t.group === g).map((t) => (
                <Link key={t.slug} to={`/learn/${t.slug}`} state={fromState("/learn", "Learn library")} className="learn-card">
                  <span className="lc-title">{t.title}</span>
                  <span className="lc-sum">{t.summary}</span>
                  <span className="arrow-link"><span className="arrow-link-text">Read</span><ArrowRight /></span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}

export function LearnTopic() {
  const { slug } = useParams();
  const location = useLocation();
  const t = learnBySlug(slug);
  if (!t) return <NotFound />;
  /* Back link returns to wherever the reader came from (portal milestone, landing
     section, library); the index is only the fallback for a direct visit. */
  const back = readFrom(location.state) ?? fromState("/learn", `Learn library · ${t.group}`);
  const i = LEARN.indexOf(t);
  const prev = LEARN[i - 1]; const next = LEARN[i + 1];
  const heads = t.body.filter((b) => b.t === "h") as Extract<Block, { t: "h" }>[];
  return (
    <>
      <Section className="padding-s" style={{ paddingTop: "calc(var(--globals--navbar-height) + 48px)" }}>
        <Container>
          <div className="vertical-content">
            <Link to={back.from} className="arrow-link"><ArrowLeft /><span className="arrow-link-text">{back.fromLabel}</span></Link>
            <h1 className="heading-h1 max-xl">{t.title}</h1>
            <p className="paragraph-big max-l" style={{ color: "#444" }}>{t.summary}</p>
            {t.related.length > 0 && <div className="row"><span className="badge-text muted">Shows up in {t.related.map((r) => milestoneById(r).code).join(", ")}</span></div>}
          </div>
        </Container>
      </Section>
      <Section className="no-top-padding">
        <Container>
          <div className="portal" style={{ gridTemplateColumns: "minmax(0,1fr) 280px" }}>
            <div className="article">
              {t.body.map((b, k) => <BlockView key={k} b={b} />)}
              <div className="divider" style={{ marginTop: 24 }} />
              <div className="stack">
                <span className="badge-text muted">Where this shows up</span>
                <div className="chip-row">{t.related.map((r) => { const m = milestoneById(r); return <Link key={r} className="chip" to={`${MY_COMPASS}#${r}`}>{m.code} · {m.title}</Link>; })}</div>
              </div>
              <div className="row between" style={{ marginTop: 12 }}>
                {prev ? <ArrowLink to={`/learn/${prev.slug}`} state={location.state}>← {prev.title}</ArrowLink> : <span />}
                {next && <ArrowLink to={`/learn/${next.slug}`} state={location.state}>{next.title}</ArrowLink>}
              </div>
            </div>
            <aside className="portal-side">
              {heads.length > 0 && <nav className="toc" aria-label="On this page">{heads.map((h) => <a key={h.text} href={`#${slugify(h.text)}`}>{h.text}</a>)}</nav>}
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p": return <p>{b.text}</p>;
    case "h": return <h3 id={slugify(b.text)}>{b.text}</h3>;
    case "h4": return <h4>{b.text}</h4>;
    case "ul": return <ul>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
    case "callout": return <div className="callout">{b.text}</div>;
    case "table": return (
      <div style={{ overflowX: "auto" }}>
        <div className="table" style={{ gridTemplateColumns: `repeat(${b.cols.length}, minmax(160px, 1fr))`, minWidth: b.cols.length * 180 }}>
          {b.cols.map((c, i) => <div className="th" key={`h${i}`}>{c}</div>)}
          {b.rows.flatMap((r, ri) => r.map((c, ci) => <div key={`${ri}-${ci}`}>{ci === 0 ? <strong>{c}</strong> : c}</div>))}
        </div>
      </div>
    );
  }
}
