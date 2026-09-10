import { ArrowLink, Badge, Button, Container, Section, WideHero } from "../components/Primitives";
import { FaqItem } from "../components/Interactive";
import { Calendar } from "../components/Icons";
import { ArtifactViewer } from "../compass/components/ArtifactViewer";
import { LEARN } from "../compass/data/learn";
import { LINKS, MY_COMPASS } from "../config";
import { fromState } from "../compass/state/from";

/* Version B — proof-led. Written for an Engine lead who hasn't booked a kickoff yet:
   lead with the document they'll be holding at the end, then show the three steps by
   what each leaves behind. Program-general throughout; the region fills the blanks. */
export default function Landing() {
  return (
    <>
      {/* Hero: same copy as main; B keeps its pre-kickoff CTAs */}
      <WideHero tone="ultramarine" size="large">
        <div className="vertical-content">
          <Badge label="The Compass · Self-guided regional diagnostic" color="sky-blue" white />
          <h1 className="display-heading font-color-white">Know exactly where your Engine should act next.</h1>
          <p className="paragraph-big font-color-white" style={{ maxWidth: 560, opacity: .9 }}>A data-grounded diagnostic that turns your region's evidence into a story partners believe — and two or three first moves you can defend.</p>
          <div className="hero-actions">
            <Button variant="primary" href={LINKS.bookCall} icon={<Calendar width={18} height={18} />}>Book a kickoff</Button>
            <Button variant="glass" to={MY_COMPASS}>Already enrolled? Open my Compass</Button>
          </div>
        </div>
      </WideHero>

      {/* What you'll walk away with: three steps, by what each leaves behind */}
      <Section id="walk-away">
        <Container>
          <div className="vertical-content padding">
            <Badge label="What you'll walk away with" color="evergreen" />
            <h2 className="heading-h2 max-l">Three steps to a story that holds up in any room.</h2>
            <p className="body-text max-l">A kickoff call with us, self-paced work in My Compass, a synthesis call. Pick a step to see what to expect.</p>
          </div>
          <ArtifactViewer />
        </Container>
      </Section>

      {/* Who does what: you, the AI-powered analytics, the humans */}
      <Section id="how" className="bg-dark">
        <Container>
          <div className="vertical-content padding">
            <Badge label="Who does what" color="ultramarine" white />
            <h2 className="heading-h2 font-color-white max-l">You bring the local knowledge. AI-powered data analytics does the heavy lifting.</h2>
          </div>
          <div className="roles">
            <div className="role-card">
              <Badge label="Your team" color="evergreen" white />
              <h3>The things no dataset captures</h3>
              <p>The firms, relationships and history behind the numbers. You make the calls: which pattern fits, which barriers are real, what comes first.</p>
            </div>
            <div className="role-card">
              <Badge label="AI-powered data analytics" color="ultramarine" white />
              <h3>A draft at every milestone</h3>
              <p>Built on the Compass framework and your region's data — nothing else. No fabricated metrics, no generic assumptions, and honest about what the data can't see.</p>
            </div>
            <div className="role-card">
              <Badge label="Your navigator + strategist" color="sky-blue" white />
              <h3>At the start, the end, and whenever you ask</h3>
              <p>They run the kickoff and synthesis calls, review your diagnosis before you set priorities, and step in whenever you want a thought partner.</p>
            </div>
          </div>
          <div className="row gap-l" style={{ marginTop: 32 }}>
            <ArrowLink to="/learn/how-the-gem-works" state={fromState("/compass#how", "Compass home · Who does what")} white>How the AI-powered analysis works</ArrowLink>
            <ArrowLink to="/learn/data-what-it-sees" state={fromState("/compass#how", "Compass home · Who does what")} white>What the data can and can't see</ArrowLink>
            <ArrowLink to="/learn/who-in-the-room" state={fromState("/compass#how", "Compass home · Who does what")} white>Who should be in the room</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* FAQ — the questions that come up before anyone books */}
      <Section id="faq">
        <Container>
          <div className="grid gap-loose" style={{ alignItems: "start" }}>
            <div className="vertical-content">
              <Badge label="Before you book" color="magenta" />
              <h2 className="heading-h2">Things Engines ask before they start.</h2>
              <p className="body-text">Dig deeper in the Learn library — frameworks, process, and what the data can and can't see.</p>
              <ArrowLink to="/learn">Open the Learn library ({LEARN.length} topics)</ArrowLink>
            </div>
            <div className="stack" style={{ gap: 0, width: "100%" }}>
              <FaqItem q="How much time does this really take?" defaultOpen>It depends on your team and your deadline. Two calls with us bookend the work; the middle is self-paced, so a team with a date to hit can move quickly and a team without one can take the time it needs. You'll set a cadence with your navigator at kickoff.</FaqItem>
              <FaqItem q="What if we only get through the first milestone?">You'll still leave with an Industry Definition Statement — a data-grounded answer to “how big is this, really?” in the terms partners use. Many Engines find that alone answers the question they keep being asked. Nothing later is wasted if you stop there.</FaqItem>
              <FaqItem q="Do we need a data scientist?">No. AI-powered data analytics does the retrieval and the arithmetic; the navigator and data steward handle sources. You need someone who knows your region's firms and institutions well enough to challenge a chart — and a lead willing to be challenged.</FaqItem>
              <FaqItem q="What if the data is wrong about us?">It will be, somewhere: suppressed defense employers, misclassified firms, trade secrets that never patent. The first milestone is designed to surface exactly that. When a correction changes the picture, you get an explicit revised read — never a silent update.</FaqItem>
              <FaqItem q="Can we get help partway through?">Yes, anywhere. Every milestone has an “I want a thought partner here” flag; the highest-stakes moment — the diagnosis — has review built in; and you can move to the guided track at any point.</FaqItem>
              <FaqItem q="Who sees our data and outputs?">Your analytics run on a dedicated instance — blind to other Engines. Documents go to a shared folder your navigator can review asynchronously. Nothing is published without you.</FaqItem>
            </div>
          </div>
        </Container>
      </Section>

      {/* Closing band: same treatment as the hero, content centred */}
      <WideHero tone="deep-blue" size="small" center id="book-a-call" className="cta-band">
        <div className="vertical-content align-center" style={{ maxWidth: 720, margin: "0 auto" }}>
          <Badge label="Ready when you are" color="evergreen" white />
          <h2 className="heading-h1 font-color-white">Point the Compass at your region.</h2>
          <p className="paragraph-big font-color-white" style={{ fontSize: "1.25rem", opacity: .9 }}>Book a kickoff. You'll leave it with your Compass configured, a hypothesis on paper, and a date to work toward.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Button variant="primary" href={LINKS.bookCall} icon={<Calendar width={18} height={18} />}>Book a kickoff</Button>
          </div>
          <ArrowLink to={MY_COMPASS} white>Already enrolled? Open my Compass</ArrowLink>
        </div>
      </WideHero>
    </>
  );
}
