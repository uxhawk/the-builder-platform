import { Button, Container, Section } from "../components/Primitives";
export default function NotFound() {
  return (
    <Section style={{ paddingTop: "calc(var(--globals--navbar-height) + 96px)", minHeight: "60vh" }}>
      <Container>
        <div className="vertical-content align-center">
          <h1 className="heading-h2">Nothing here yet.</h1>
          <p className="body-text">That page doesn't exist in the prototype.</p>
          <Button variant="dark" to="/">Back to the Compass</Button>
        </div>
      </Container>
    </Section>
  );
}
