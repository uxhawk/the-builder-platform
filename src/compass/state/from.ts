/* "Where did I come from?" — passed as router state on cross-links into the
   Learn library so an article's back link returns to the exact page (and
   milestone) the reader left, instead of always dropping them at the index. */
export interface FromState { from: string; fromLabel: string }

export const fromState = (from: string, fromLabel: string): FromState => ({ from, fromLabel });

export function readFrom(state: unknown): FromState | null {
  if (state && typeof state === "object" && "from" in state && "fromLabel" in state) {
    const s = state as Record<string, unknown>;
    if (typeof s.from === "string" && typeof s.fromLabel === "string") return { from: s.from, fromLabel: s.fromLabel };
  }
  return null;
}
