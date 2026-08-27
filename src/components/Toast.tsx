import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { Check } from "./Icons";

/* Success toast, one at a time — same context pattern as HelpDrawer. */
type ToastCtx = { toast: (message: ReactNode) => void };
const Ctx = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<ReactNode>(null);
  const [show, setShow] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const toast = useCallback((message: ReactNode) => {
    setMsg(message);
    setShow(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(false), 4500);
  }, []);
  const value = useMemo(() => ({ toast }), [toast]);
  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Kept mounted so the fade-out transition can play; msg persists through it. */}
      <div className={`toast ${show ? "show" : ""}`} role="status" aria-live="polite">
        <span className="toast-icon"><Check width={16} height={16} /></span>
        <span>{msg}</span>
      </div>
    </Ctx.Provider>
  );
}
