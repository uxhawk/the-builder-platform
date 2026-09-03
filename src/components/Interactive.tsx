import { useId, useState, type ReactNode } from "react";
import { Check, ChevronDown, Copy } from "./Icons";

/* ---------- FAQ / accordion item (site: .services-title + .accordion-content) ---------- */
export function FaqItem({ q, children, defaultOpen = false, dark = false }: { q: string; children: ReactNode; defaultOpen?: boolean; dark?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={dark ? "services-item bkg-black" : "faq-item"}>
      <button type="button" className="services-title" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className={`heading-h5 bold ${dark ? "font-color-white" : ""}`}>{q}</span>
        <ChevronDown />
      </button>
      {open && <div id={id} className="accordion-content anim-in">{children}</div>}
    </div>
  );
}

/* ---------- Tabs (site: .services-tab-menu / .tab-link) ---------- */
export function Tabs<T extends string>({ tabs, active, onChange, align = "center" }: { tabs: { id: T; label: string; color: string }[]; active: T; onChange: (id: T) => void; align?: "center" | "left" }) {
  return (
    <div className={`services-tab-menu ${align === "left" ? "left" : ""}`} role="tablist">
      {tabs.map((t) => (
        <button key={t.id} role="tab" type="button" aria-selected={active === t.id} className={`tab-link ${t.color} ${active === t.id ? "current" : ""}`} onClick={() => onChange(t.id)}>{t.label}</button>
      ))}
    </div>
  );
}

/* ---------- Copy button ---------- */
export function CopyButton({ text, label = "Copy prompt" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch { /* clipboard blocked */ }
  };
  return <button type="button" className="copy-btn" onClick={copy}>{done ? <Check /> : <Copy />}{done ? "Copied" : label}</button>;
}

/* ---------- Checkbox row (site: .checkbox 24px) ---------- */
export function Checkbox({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; disabled?: boolean }) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} disabled={disabled} className={`checkbox-row ${checked ? "done" : ""}`} onClick={() => onChange(!checked)}>
      <span className={`checkbox ${checked ? "checked" : ""}`}><Check /></span>
      <span className="checkbox-label">{label}</span>
    </button>
  );
}

/* ---------- Generic disclosure (“revealed complexity”) ---------- */
/* `toggle` swaps the bare chevron for a small labelled button (“More details” / “Hide details”). */
export function Disclosure({ summary, children, defaultOpen = false, className = "", toggle }: { summary?: ReactNode; children: ReactNode; defaultOpen?: boolean; className?: string; toggle?: { closed: string; open: string } }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={className}>
      <button type="button" className="services-title" aria-expanded={open} onClick={() => setOpen(!open)}>
        {summary}
        {toggle ? <span className="button small disclosure-toggle">{open ? toggle.open : toggle.closed}<ChevronDown /></span> : <ChevronDown />}
      </button>
      {open && <div className="anim-in" style={{ paddingTop: 12 }}>{children}</div>}
    </div>
  );
}
