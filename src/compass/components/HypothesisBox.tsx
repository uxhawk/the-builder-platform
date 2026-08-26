import type { Engine } from "../data/engines";
import type { Progress } from "../state/progress";
import { Disclosure } from "../../components/Interactive";
import { Button } from "../../components/Primitives";
import { Refresh } from "../../components/Icons";
import { useHelp } from "../../components/HelpDrawer";

/* “Live hypothesis box”: a sticky element that tracks the evolving thesis.
   Revised only via the Navigator or strategist, not changed on the fly (Aug 19). */
export function HypothesisBox({ engine, progress }: { engine: Engine; progress: Progress }) {
  const help = useHelp();
  const latest = engine.hypotheses[engine.hypotheses.length - 1];
  const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  return (
    <div className="hypothesis-box">
      <div className="row between">
        <div className="badge-title"><span className="square evergreen" /><span className="badge-text font-color-white">Working hypothesis</span></div>
        {latest && <span className="badge-text evergreen">v{latest.version} · {fmt(latest.date)}</span>}
      </div>
      {latest ? <p className="hypothesis-text">{latest.text}</p> : <p className="hypothesis-text empty">Your starting hypothesis is captured at kickoff — what you believe is holding your industry back, before you see any data.</p>}
      {engine.hypotheses.length > 1 && (
        <Disclosure summary={<span className="badge-text font-color-white muted">How it changed ({engine.hypotheses.length} versions)</span>}>
          <ul className="hypothesis-history">
            {[...engine.hypotheses].reverse().map((h) => (
              <li key={h.version}><span className="v">v{h.version} · {fmt(h.date)}</span><span>{h.text}</span><span style={{ opacity: .6 }}>{h.note}</span></li>
            ))}
          </ul>
        </Disclosure>
      )}
      <div className="row between" style={{ borderTop: "1px solid var(--colors-interface--white-border)", paddingTop: 12 }}>
        <span className="fine-print font-color-body">Revised with your navigator, not on the fly.</span>
        {progress.state.revisionRequested
          ? <span className="status-pill review">Revision requested</span>
          : <Button variant="outline on-dark" size="small" iconLeft={<Refresh width={14} height={14} />} onClick={() => { progress.requestRevision(); help.open({ engine, milestone: "hypothesis revision" }); }}>Request a revision</Button>}
      </div>
    </div>
  );
}
