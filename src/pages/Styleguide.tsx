import { useState } from "react";
import { ArrowLink, Badge, BoxCta, Button, Container, Notice, Section, StatusPill, WideHero } from "../components/Primitives";
import { Checkbox, FaqItem, Tabs } from "../components/Interactive";
import { ArrowRight, ArrowUpRight } from "../components/Icons";
import { LINKS } from "../config";

/* Side-by-side parity page: compare against builderplatform.engine.xyz */
const SWATCHES: [string, string, string][] = [
  ["Foundation White", "#FFFFFF", "#000"], ["Light Gray", "#F5F5F5", "#000"], ["Interface Grey", "#F3F3F3", "#000"], ["Dark", "#1E1E1E", "#fff"], ["Dark 2", "#121212", "#fff"],
  ["Deep Blue", "#3C53B9", "#fff"], ["Ultramarine", "#6494FF", "#fff"], ["Sky Blue", "#47D7EE", "#000"], ["Magenta", "#D269FF", "#fff"], ["Verdant Green", "#3EE68F", "#000"], ["Evergreen", "#B5F44A", "#000"],
];
export default function Styleguide() {
  const [tab, setTab] = useState<"a" | "b" | "c">("a");
  const [chk, setChk] = useState(true);
  return (
    <>
      <WideHero tone="neutral" size="small" shade={false}>
        <div className="vertical-content">
          <Badge label="Styleguide · parity check" />
          <h1 className="heading-h1 max-l">Components ported from builderplatform.engine.xyz</h1>
          <p className="body-text max-m">Tokens are 1:1 with the live Webflow variables. Open the site next to this page and compare. <a href={LINKS.tbpSite} target="_blank" rel="noreferrer">builderplatform.engine.xyz ↗</a></p>
        </div>
      </WideHero>
      <Section className="padding-s">
        <Container>
          <div className="sg-block" style={{ borderTop: 0 }}>
            <Badge label="Color · brand book p.23 / balance p.24" />
            <div className="swatches">{SWATCHES.map(([n, h, c]) => <div className="swatch" key={n} style={{ background: h, color: c }}><span className="name">{n}</span><span className="hex">{h}</span></div>)}</div>
            <p className="fine-print" style={{ color: "#6b6b6b" }}>Balance guidance: white 25% · light gray 25% · black 15% · deep blue / ultramarine / sky blue 9% each · verdant 4% · magenta 2% · evergreen 2%. Blues lead; magenta and evergreen are accents.</p>
          </div>
          <div className="sg-block">
            <Badge label="Type · Neue Haas Grotesk Display + Sometype Mono" />
            <div className="display-heading">Display · 4.06rem Bold</div>
            <div className="heading-h1">Heading H1 · 3.2rem Roman</div>
            <div className="heading-h2">Heading H2 · 2.1rem Roman (site maps h2 to h3 size)</div>
            <div className="heading-h4">Heading H4 · 1.8rem Bold</div>
            <div className="heading-h5">Heading H5 · 1.25rem Roman</div>
            <p className="paragraph-big">Paragraph big · 1.5rem Roman</p>
            <p className="body-text max-l">Body · 1rem / 140% Roman with ss02. Refreshingly unpretentious, relentlessly generous, ever evolving, equitably empowering, patiently impatient.</p>
            <div className="badge-text">Badge text · 13px Sometype Mono 600 uppercase</div>
            <div className="fine-print">Fine print · 13px</div>
          </div>
          <div className="sg-block">
            <Badge label="Badges" />
            <div className="row gap-l">
              <Badge label="Build. Connect. Accelerate." color="sky-blue" /><Badge label="Scaling impact" color="verdant-dark" /><Badge label="Discover who's shaping the future" color="evergreen" /><Badge label="Article" color="magenta" /><Badge label="Default" />
            </div>
            <div className="sg-dark"><Badge label="Building blocks" color="verdant" white /><Badge label="What ecosystem builders have to say" color="evergreen" white /></div>
          </div>
          <div className="sg-block">
            <Badge label="Buttons · pill 48px, mono uppercase" />
            <div className="row gap-l">
              <Button>Default grey</Button><Button variant="primary">Primary evergreen</Button><Button variant="dark">Dark</Button><Button variant="outline">Outline</Button><Button variant="magenta">Magenta</Button><Button variant="sky">Sky</Button><Button size="small">Small</Button><Button disabled>Disabled</Button><Button variant="primary" icon={<ArrowUpRight width={18} height={18} />}>With icon</Button>
            </div>
            <div className="sg-dark"><Button variant="glass">Glass on dark</Button><Button variant="outline on-dark">Outline on dark</Button><Button>About the Builder Platform</Button></div>
          </div>
          <div className="sg-block">
            <Badge label="Arrow links & external link" />
            <div className="row gap-l"><ArrowLink href="#">Innovation accelerates here</ArrowLink><ArrowLink href="#" external>Explore</ArrowLink><span className="external-link">LogIN <ArrowUpRight width={16} height={16} /></span></div>
            <div className="sg-dark"><ArrowLink href="#" white>Explore the newest cohort</ArrowLink></div>
          </div>
          <div className="sg-block">
            <Badge label="Boxed CTAs · “See the Impact / Contact Us” (hover to roll)" />
            <div className="cta-container" style={{ gap: 12 }}><BoxCta color="grey" href="#">See the Impact</BoxCta><BoxCta color="green" href="#">Contact Us</BoxCta><BoxCta color="dark" href="#">Member Login</BoxCta><BoxCta color="magenta" href="#" compact>Compact</BoxCta></div>
          </div>
          <div className="sg-block">
            <Badge label="Tabs · services page" />
            <Tabs tabs={[{ id: "a", label: "Ecosystem strategy", color: "sky-blue" }, { id: "b", label: "Capital", color: "evergreen" }, { id: "c", label: "Talent", color: "magenta" }]} active={tab} onChange={setTab} align="left" />
            <div className="services-item bkg-black"><div className="services-title"><span className="heading-h5 bold font-color-white">Tab {tab.toUpperCase()} content</span></div><div className="list-item"><span className="square evergreen" /><span className="font-color-body">List item with border-top white-border</span></div><div className="list-item"><span className="square evergreen" /><span className="font-color-body">Another item</span></div></div>
          </div>
          <div className="sg-block">
            <Badge label="Accordion / FAQ" />
            <div className="stack" style={{ gap: 0 }}><FaqItem q="Light FAQ item" defaultOpen>Body copy inside an accordion. Border top/bottom grey-2, chevron rotates.</FaqItem><FaqItem q="Second item">More.</FaqItem></div>
            <FaqItem q="Dark services item" dark>Content on dark.</FaqItem>
          </div>
          <div className="sg-block">
            <Badge label="Cards" />
            <div className="grid three gap-default align-stretch">
              <a className="blog-card" href="#"><div className="zoom-image-link"><img src="/bg/3D_Shift_Verdant.jpg" alt="" /></div><div className="blog-card-body"><div className="heading-h5 font-color-white">Sustaining Innovation Ecosystems: Roles of the System Hub</div><div className="blog-card-meta"><Badge label="Article" color="white" white /><span className="badge-text font-color-white">8.25.2026</span></div></div></a>
              <div className="card-link"><Badge label="Card link" color="evergreen" white /><span className="heading-h4 font-color-white">16:9 dark card</span></div>
              <div className="light-card"><Badge label="Light card" /><span className="heading-h5 bold">Border grey-2, radius 10</span><p className="body-text" style={{ fontSize: 15, color: "#444" }}>Used for Compass content on white.</p></div>
            </div>
          </div>
          <div className="sg-block">
            <Badge label="Forms · checkbox 24px, underline field" />
            <div className="grid gap-default">
              <form className="form newsletter" onSubmit={(e) => e.preventDefault()}><input className="text-field" placeholder="Email" style={{ borderBottom: 0 }} /><button type="submit" aria-label="Subscribe"><ArrowRight /></button></form>
              <div className="stack"><Checkbox checked={chk} onChange={setChk} label="Checked item" /><Checkbox checked={false} onChange={() => {}} label="Unchecked item" /><Checkbox checked={false} onChange={() => {}} label="Disabled item" disabled /></div>
            </div>
          </div>
          <div className="sg-block">
            <Badge label="Compass status & notices" />
            <div className="row gap-l"><StatusPill status="done" /><StatusPill status="current" /><StatusPill status="available" /><StatusPill status="locked" /><StatusPill status="review" /><StatusPill status="human" /><span className="deadline-chip">NSF site visit · 20d</span></div>
            <div className="stack"><Notice tone="evergreen" icon="check" title="Complete">Evergreen notice.</Notice><Notice tone="magenta" icon="users" title="Navigator review">Magenta notice.</Notice><Notice tone="ultramarine" icon="info" title="Gate">Ultramarine notice.</Notice><Notice tone="grey" icon="lock" title="Locked">Grey notice.</Notice></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
