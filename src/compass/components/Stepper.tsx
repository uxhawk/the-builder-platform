import { MILESTONES, type MilestoneId } from "../data/milestones";
import type { Progress } from "../state/progress";
import { Check, Lock, Users } from "../../components/Icons";

/* Level-1 disclosure: seven nodes, one line of state each. */
export function Stepper({ progress, activeId, onSelect }: { progress: Progress; activeId: MilestoneId; onSelect: (id: MilestoneId) => void }) {
  return (
    <div className="stepper" role="list" aria-label="Milestones">
      {MILESTONES.map((m, i) => {
        const st = progress.statusOf(m.id);
        return (
          <button key={m.id} type="button" role="listitem" className={`step ${st} ${activeId === m.id ? "active" : ""}`} onClick={() => onSelect(m.id)} aria-current={activeId === m.id ? "step" : undefined} title={`${m.title} — ${st}`}>
            <span className="step-node">
              {st === "done" ? <Check /> : st === "locked" ? <Lock /> : m.kind === "bookend" ? <Users /> : i}
            </span>
            <span className="step-label">{m.shortTitle}</span>
          </button>
        );
      })}
    </div>
  );
}
