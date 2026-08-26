import { Link } from "react-router-dom";
import { ENGINES } from "../compass/data/engines";
import { Badge, Button, Container, Section, WideHero } from "../components/Primitives";
import { ArrowRight } from "../components/Icons";

export default function Engines() {
  return (
    <>
      <WideHero tone="magenta">
        <div className="vertical-content">
          <Badge label="Find your Engine" white />
          <h1 className="heading-h1 font-color-white max-l">Every Engine gets its own Compass.</h1>
          <p className="paragraph-big font-color-white max-m" style={{ opacity: .9 }}>A private portal per Engine: your milestones, your working hypothesis, your Gem, your people.</p>
        </div>
      </WideHero>
      <Section>
        <Container>
          <div className="grid gap-default align-stretch">
            {ENGINES.map((e) => (
              <Link key={e.slug} to={`/engine/${e.slug}`} className="card-link" style={{ aspectRatio: "auto", minHeight: 260 }}>
                <div className="hero-bg" style={{ backgroundImage: `url(/bg/3D_Shift_${{ "deep-blue": "DeepBlue", ultramarine: "UltraMarine", "sky-blue": "SkyBlue", magenta: "Magenta", verdant: "Verdant", evergreen: "Evergreen", neutral: "Neutral" }[e.tone]}.jpg)`, opacity: .9 }} />
                <div className="grid-bg" style={{ opacity: .35 }} />
                <div style={{ position: "relative", zIndex: 5, display: "flex", justifyContent: "space-between" }}>
                  <Badge label={`Cohort ${e.cohort} · ${e.path === "pre-kickoff" ? "pre-kickoff" : e.path}`} color="white" white />
                </div>
                <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", gap: 8 }}>
                  <h2 className="heading-h4 font-color-white">{e.name}</h2>
                  <div className="fine-print font-color-white" style={{ opacity: .85 }}>{e.region} · {e.industry}</div>
                  <span className="arrow-link font-color-white"><span className="arrow-link-text">Open Compass</span><ArrowRight /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="light-card grey" style={{ marginTop: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div><strong>Don't see your Engine?</strong><div className="fine-print" style={{ color: "#555" }}>Portals are created after a kickoff call. Access will be gated by your Builder Platform member login.</div></div>
            <Button variant="dark" href="mailto:builderplatform@engine.xyz?subject=Compass%20kickoff">Request a kickoff</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
