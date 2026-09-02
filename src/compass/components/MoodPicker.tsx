import { MOODS, type MoodId } from "../data/moods";
import { ArrowLink, Button } from "../../components/Primitives";
import { ArrowRight } from "../../components/Icons";

/* Entry-state selector: tailors the first step without hiding anything. */
export function MoodPicker({ value, onChange }: { value?: MoodId; onChange: (id: MoodId) => void }) {
  const mood = MOODS.find((m) => m.id === value);
  const go = (to: string) => (to.startsWith("#") ? <a className="button primary" href={to}>{mood!.cta.label}</a> : <Button variant="primary" to={to} icon={<ArrowRight width={18} height={18} />}>{mood!.cta.label}</Button>);
  return (
    <div className="stack gap-l" style={{ width: "100%" }}>
      <div className="mood-grid" role="radiogroup" aria-label="Where are you right now?">
        {MOODS.map((m) => (
          <button key={m.id} type="button" role="radio" aria-checked={value === m.id} className={`mood-option ${value === m.id ? "selected" : ""}`} onClick={() => onChange(m.id)}>
            <span className="mood-title">{m.title}</span>
            <span className="mood-sub">{m.sub}</span>
          </button>
        ))}
      </div>
      {mood && (
        <div className="mood-panel anim-in">
          <div className="vertical-content">
            <div className="badge-title"><span className={`square ${mood.tone === "sky" ? "sky-blue" : mood.tone}`} /><span className="badge-text">{mood.title}</span></div>
            <h3 className="heading-h3">{mood.headline}</h3>
            <p className="body-text">{mood.body}</p>
          </div>
          <div className="vertical-content" style={{ justifyContent: "flex-start" }}>
            <div className="light-card">
              <div className="badge-text muted">Your first step</div>
              <p className="heading-h5">{mood.firstStep}</p>
              <div className="row">{go(mood.cta.to)}</div>
            </div>
            <div className="stack" style={{ gap: 4 }}>
              <span className="badge-text muted">More questions?</span>
              <ArrowLink href="#faq">Things Engines ask before they start</ArrowLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
