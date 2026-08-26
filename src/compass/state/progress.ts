/* Lightweight per-engine progress, persisted in localStorage.
   (Aug 6: “basic progress storage included”; no back-end.) */
import { useCallback, useEffect, useMemo, useState } from "react";
import { MILESTONES, type MilestoneId } from "../data/milestones";
import type { Engine } from "../data/engines";
import type { Status } from "../../components/Primitives";
import type { MoodId } from "../data/moods";

export interface ProgressState {
  completed: MilestoneId[];
  checks: Record<string, boolean>;
  flags: MilestoneId[];
  reviews: Partial<Record<MilestoneId, "requested" | "approved">>;
  mood?: MoodId;
  deadline?: { label: string; date: string };
  personasAnswered: string[];
  revisionRequested?: boolean;
  notes: Partial<Record<MilestoneId, string>>;
}

const KEY = (slug: string) => `tbp-compass:${slug}`;

function initial(engine: Engine): ProgressState {
  return {
    completed: [...engine.seedCompleted], checks: {}, flags: [],
    reviews: engine.seedReviewApproved ? { m4: "approved" } : {},
    deadline: engine.deadline, personasAnswered: [], notes: {},
  };
}

function load(engine: Engine): ProgressState {
  try {
    const raw = localStorage.getItem(KEY(engine.slug));
    if (raw) return { ...initial(engine), ...JSON.parse(raw) };
  } catch { /* private mode etc. */ }
  return initial(engine);
}

export function useProgress(engine: Engine) {
  const [state, setState] = useState<ProgressState>(() => load(engine));
  useEffect(() => { try { localStorage.setItem(KEY(engine.slug), JSON.stringify(state)); } catch { /* ignore */ } }, [state, engine.slug]);

  const isComplete = useCallback((id: MilestoneId) => state.completed.includes(id), [state.completed]);

  /* Unlock rules — sequential scaffolding with one hard gate:
     m0 always available; each milestone needs the previous one complete;
     m5 additionally needs the m4 navigator review approved. */
  const statusOf = useCallback((id: MilestoneId): Status => {
    if (state.completed.includes(id)) return "done";
    const idx = MILESTONES.findIndex((m) => m.id === id);
    const prev = MILESTONES[idx - 1];
    const prevDone = !prev || state.completed.includes(prev.id);
    if (!prevDone) return "locked";
    if (id === "m5" && state.reviews.m4 !== "approved") return "review";
    const firstOpen = MILESTONES.find((m) => !state.completed.includes(m.id));
    return firstOpen?.id === id ? "current" : "available";
  }, [state.completed, state.reviews]);

  const current = useMemo(() => MILESTONES.find((m) => statusOf(m.id) === "current" || statusOf(m.id) === "review") ?? MILESTONES[MILESTONES.length - 1], [statusOf]);

  const api = useMemo(() => ({
    state, statusOf, isComplete, current,
    percent: Math.round((state.completed.length / MILESTONES.length) * 100),
    isChecked: (key: string) => !!state.checks[key],
    toggleCheck: (key: string) => setState((s) => ({ ...s, checks: { ...s.checks, [key]: !s.checks[key] } })),
    complete: (id: MilestoneId) => setState((s) => ({ ...s, completed: s.completed.includes(id) ? s.completed : [...s.completed, id] })),
    uncomplete: (id: MilestoneId) => setState((s) => ({ ...s, completed: s.completed.filter((c) => c !== id) })),
    flag: (id: MilestoneId) => setState((s) => ({ ...s, flags: s.flags.includes(id) ? s.flags : [...s.flags, id] })),
    unflag: (id: MilestoneId) => setState((s) => ({ ...s, flags: s.flags.filter((f) => f !== id) })),
    isFlagged: (id: MilestoneId) => state.flags.includes(id),
    requestReview: (id: MilestoneId) => setState((s) => ({ ...s, reviews: { ...s.reviews, [id]: "requested" } })),
    approveReview: (id: MilestoneId) => setState((s) => ({ ...s, reviews: { ...s.reviews, [id]: "approved" } })),
    setMood: (mood?: MoodId) => setState((s) => ({ ...s, mood })),
    setDeadline: (deadline?: { label: string; date: string }) => setState((s) => ({ ...s, deadline })),
    togglePersona: (id: string) => setState((s) => ({ ...s, personasAnswered: s.personasAnswered.includes(id) ? s.personasAnswered.filter((p) => p !== id) : [...s.personasAnswered, id] })),
    requestRevision: () => setState((s) => ({ ...s, revisionRequested: true })),
    setNote: (id: MilestoneId, text: string) => setState((s) => ({ ...s, notes: { ...s.notes, [id]: text } })),
    reset: () => setState(initial(engine)),
  }), [state, statusOf, isComplete, current, engine]);

  return api;
}
export type Progress = ReturnType<typeof useProgress>;
