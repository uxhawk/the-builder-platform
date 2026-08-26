import { useState } from "react";
import { PERSONAS } from "../data/personas";
import type { Progress } from "../state/progress";
import { Checkbox } from "../../components/Interactive";

/* Milestone 5: answer every skeptic before the diagnostic can be marked complete. */
export function StressTest({ progress }: { progress: Progress }) {
  const [sel, setSel] = useState(PERSONAS[0].id);
  const p = PERSONAS.find((x) => x.id === sel)!;
  const answered = progress.state.personasAnswered;
  return (
    <div className="stack gap-l">
      <div className="row between">
        <div className="badge-title"><span className="square verdant" /><span className="badge-text">Stress test · {answered.length} of {PERSONAS.length} skeptics answered</span></div>
        <span className="kbd-note">Pick a persona, read their questions, then confirm you can answer them.</span>
      </div>
      <div className="persona-grid" role="tablist">
        {PERSONAS.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={sel === x.id} className={`persona ${sel === x.id ? "selected" : ""}`} onClick={() => setSel(x.id)}>
            <span className="p-lens">{answered.includes(x.id) ? "✓ answered · " : ""}{x.lens}</span>
            <span className="p-name">{x.name}</span>
          </button>
        ))}
      </div>
      <div className="light-card grey">
        <div className="badge-text muted">{p.name} asks</div>
        <ul className="question-bank">{p.questions.map((q) => <li key={q}>“{q}”</li>)}</ul>
        <Checkbox checked={answered.includes(p.id)} onChange={() => progress.togglePersona(p.id)} label={<>We can answer the {p.name.toLowerCase()} convincingly, with numbers.</>} />
      </div>
    </div>
  );
}
