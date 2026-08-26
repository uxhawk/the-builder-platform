import { Link } from "react-router-dom";
import { MOODS, type MoodId } from "../data/moods";
import { ArrowLink, Button } from "../../components/Primitives";

/* Entry-state selector: tailors the first step without hiding anything. */
export function MoodPicker({ value, onChange }: { value?: MoodId; onChange: (id?: MoodId) => void }) {
  const mood = MOODS.find((m) => m.id === value);
  const go = (to: string) => (to.startsWith("#") ? <a className="button primary" href={to}>{mood!.cta.label}</a> : <Button variant="primary" to={to}>{mood!.cta.label}</Button>);
  return (
    <div className="stack gap-l" style={{ width: "100%" }}>
      <div className="mood-grid" role="radiogroup" aria-label="Where are you right now?">
        {MOODS.map((m) => (
          <button key={m.id} type="button" role="radio" aria-checked={value === m.id} className={`mood-option ${value === m.id ? "selected" : ""}`} onClick={() => onChange(value === m.id ? undefined : m.id)}>
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
              {mood.alt.to.startsWith("#") ? <a className="arrow-link" href={mood.alt.to}><span className="arrow-link-text">{mood.alt.label}</span></a> : <ArrowLink to={mood.alt.to}>{mood.alt.label}</ArrowLink>}
            </div>
            <Link to="/learn/self-serve-vs-guided" className="fine-print" style={{ color: "#6b6b6b" }}>Not sure which path fits? Navigators help you choose at kickoff — and you can switch.</Link>
          </div>
        </div>
      )}
    </div>
  );
}
