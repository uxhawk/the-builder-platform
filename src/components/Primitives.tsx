import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Info, Lock, Users } from "./Icons";

export type BrandColor = "sky-blue" | "evergreen" | "verdant" | "verdant-dark" | "magenta" | "ultramarine" | "deep-blue" | "grey" | "white" | "dark";

/* ---------- Badge title: square + mono label (site: .badge-title) ---------- */
export function Badge({ label, color = "dark", white = false, className = "" }: { label: string; color?: BrandColor; white?: boolean; className?: string }) {
  return (
    <div className={`badge-title ${className}`}>
      <span className={`square ${color}`} />
      <span className={`badge-text ${white ? "font-color-white" : ""}`}>{label}</span>
    </div>
  );
}

/* ---------- Button (site: .button pill) ---------- */
type ButtonProps = {
  to?: string; href?: string; onClick?: () => void; type?: "button" | "submit";
  variant?: "grey" | "primary" | "dark" | "glass" | "outline" | "outline on-dark" | "magenta" | "sky";
  size?: "small"; full?: boolean; disabled?: boolean; icon?: ReactNode; iconLeft?: ReactNode;
  children: ReactNode; className?: string; external?: boolean; title?: string; ariaLabel?: string;
};
export function Button({ to, href, onClick, type = "button", variant = "grey", size, full, disabled, icon, iconLeft, children, className = "", external, title, ariaLabel }: ButtonProps) {
  const cls = `button ${variant} ${size ?? ""} ${full ? "full" : ""} ${disabled ? "disabled" : ""} ${className}`;
  const inner = <>{iconLeft}{children}{icon}</>;
  if (to && !disabled) return <Link className={cls} to={to} title={title} aria-label={ariaLabel}>{inner}</Link>;
  if (href && !disabled) return <a className={cls} href={href} title={title} aria-label={ariaLabel} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{inner}</a>;
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} title={title} aria-label={ariaLabel}>{inner}</button>;
}

/* ---------- Arrow link (site: .arrow-link) ---------- */
export function ArrowLink({ to, href, children, white, external, onClick }: { to?: string; href?: string; children: ReactNode; white?: boolean; external?: boolean; onClick?: () => void }) {
  const cls = `arrow-link ${white ? "font-color-white" : ""}`;
  const inner = <><span className="arrow-link-text">{children}</span>{external ? <ArrowUpRight /> : <ArrowRight />}</>;
  if (to) return <Link className={cls} to={to} onClick={onClick}>{inner}</Link>;
  if (href) return <a className={cls} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={onClick}>{inner}</a>;
  return <button type="button" className={cls} onClick={onClick}>{inner}</button>;
}

/* ---------- Boxed CTA with rolling label (site: .box-format-div “See the Impact”) ---------- */
export function BoxCta({ to, href, onClick, color = "green", children, compact, external }: { to?: string; href?: string; onClick?: () => void; color?: "green" | "grey" | "dark" | "magenta" | "sky"; children: ReactNode; compact?: boolean; external?: boolean }) {
  const cls = `box-format-div ${color} roll ${compact ? "compact" : ""}`;
  const inner = <><div className="heading-h4">{children}</div><div className="heading-h4" aria-hidden>{children}</div></>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{inner}</a>;
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

/* ---------- Layout ---------- */
export function Section({ children, className = "", id, style }: { children: ReactNode; className?: string; id?: string; style?: CSSProperties }) {
  return <section id={id} className={`section ${className}`} style={style}>{children}</section>;
}
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`main-container ${className}`}>{children}</div>;
}

/* ---------- Wide hero with 3D “modular shift” art (site: .wide-section-content.page-title) ---------- */
export type HeroTone = "deep-blue" | "ultramarine" | "sky-blue" | "magenta" | "verdant" | "evergreen" | "neutral" | "dark";
const ART: Record<HeroTone, string | null> = {
  "deep-blue": "/bg/3D_Shift_DeepBlue.jpg", ultramarine: "/bg/3D_Shift_UltraMarine.jpg", "sky-blue": "/bg/3D_Shift_SkyBlue.jpg",
  magenta: "/bg/3D_Shift_Magenta.jpg", verdant: "/bg/3D_Shift_Verdant.jpg", evergreen: "/bg/3D_Shift_Evergreen.jpg", neutral: "/bg/3D_Shift_Neutral.jpg", dark: null,
};
export function WideHero({ tone = "deep-blue", size = "default", children, art = true, shade = true, className = "" }: { tone?: HeroTone; size?: "default" | "large" | "small"; children: ReactNode; art?: boolean; shade?: boolean; className?: string }) {
  const img = art ? ART[tone] : null;
  return (
    <section className="section wide-section">
      <div className={`wide-section-content page-title ${tone} ${size === "large" ? "large" : ""} ${size === "small" ? "cta" : ""} ${className}`}>
        {img && <div className="hero-bg" style={{ backgroundImage: `url(${img})` }} />}
        {img && shade && <div className="hero-shade" />}
        <div className="grid-bg" />
        <div className="main-container inside-wide-section">{children}</div>
      </div>
    </section>
  );
}

/* ---------- Notice ---------- */
export function Notice({ tone = "grey", title, children, icon }: { tone?: "grey" | "magenta" | "evergreen" | "sky" | "ultramarine" | "dark"; title?: string; children: ReactNode; icon?: "info" | "lock" | "check" | "users" }) {
  const I = icon === "lock" ? Lock : icon === "check" ? Check : icon === "users" ? Users : Info;
  return (
    <div className={`notice ${tone}`}>
      <I />
      <div>{title && <div className="notice-title">{title}</div>}<p>{children}</p></div>
    </div>
  );
}

/* ---------- Status pill ---------- */
export type Status = "done" | "current" | "available" | "locked" | "review";
export function StatusPill({ status, label }: { status: Status | "human"; label?: string }) {
  const text = label ?? ({ done: "Complete", current: "Up next", available: "Available", locked: "Locked", review: "In review", human: "With a navigator" } as Record<string, string>)[status];
  return (
    <span className={`status-pill ${status}`}>
      {status === "done" && <Check />}{status === "locked" && <Lock />}{status === "human" && <Users />}
      {text}
    </span>
  );
}
