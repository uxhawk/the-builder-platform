import { useState } from "react";
import { DELIVERABLE, STEPS, type DocSpec, type Step, type StepId } from "../data/artifacts";
import { Compass, Users } from "../../components/Icons";

/* ---------- Document outline: type, title and headings ---------- */
export function DocMock({ spec, size }: { spec: DocSpec; size?: "large" }) {
  return (
    <div className={`doc ${size ?? ""}`} role="img" aria-label={`${spec.kicker} — illustrative outline`}>
      <div className="doc-kicker">{spec.kicker}</div>
      <div className="doc-title">{spec.title}</div>
      <ol className="doc-sections">
        {spec.sections.map((s, i) => (
          <li className="doc-section" key={s}><span className="n">{i + 1}</span><span className="t">{s}</span></li>
        ))}
      </ol>
      {spec.footer && <div className="doc-foot">{spec.footer}</div>}
    </div>
  );
}

/* ---------- Viewer: three steps across the top; below, what happens (left) and the document outline (right) ---------- */
export function ArtifactViewer() {
  const [id, setId] = useState<StepId>(DELIVERABLE.id);
  const step: Step = STEPS.find((s) => s.id === id)!;

  return (
    <div className="viewer">
      <div className="viewer-list" role="tablist" aria-label="The three steps of the Compass">
        {STEPS.map((s) => {
          const Icon = s.kind === "call" ? Users : Compass;
          const selected = s.id === id;
          return (
            <button key={s.id} type="button" role="tab" id={`step-tab-${s.id}`} aria-selected={selected} aria-controls="step-panel" className={`viewer-item ${s.kind} ${selected ? "selected" : ""}`} onClick={() => setId(s.id)}>
              <span className="vi-label"><span className={`square ${s.color}`} />{s.label}</span>
              <span className="vi-name">{s.name}</span>
              <span className="vi-meta">{s.with}</span>
              <Icon className="icon vi-icon" />
            </button>
          );
        })}
      </div>

      <div className="viewer-stage anim-in" role="tabpanel" id="step-panel" aria-labelledby={`step-tab-${step.id}`} key={step.id}>
        <div className="viewer-aside">
          <div className="stack" style={{ gap: 6 }}>
            <span className="badge-text muted">{step.label}</span>
            <h3 className="heading-h5 bold">{step.summary}</h3>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <span className="badge-text muted">You'll leave with</span>
            <p className="say">{step.leaveWith}</p>
          </div>
        </div>
        <div className="viewer-doc">
          <DocMock spec={step.doc} size="large" />
        </div>
      </div>
    </div>
  );
}
