import { useRef, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import { asset, LINKS, MY_COMPASS } from "../config";
import { ArrowUpRight, Cross, LinkedIn, Menu, Plus, Search } from "./Icons";

/* ---------- Navbar (site: .navbar-wrapper / .navbar) ---------- */
/* Stand-ins for the live site's primary nav (builderplatform.engine.xyz), in the
   site's order. They open the real pages until the Compass is folded into Webflow. */
const SITE_NAV = [
  { href: `${LINKS.tbpSite}/about`, label: "About" },
  { href: `${LINKS.tbpSite}/impact`, label: "Impact" },
  { href: `${LINKS.tbpSite}/ecosystems`, label: "Ecosystems" },
  { href: `${LINKS.tbpSite}/featured-stories`, label: "Stories" },
  { href: `${LINKS.tbpSite}/services`, label: "Services" },
];
/* Search placeholder (site: .search-dropdown-form): submits to the live site's /search in a new tab. */
function SearchForm({ className = "", autoFocus = false }: { className?: string; autoFocus?: boolean }) {
  return (
    <form className={`search-form ${className}`} role="search" action={`${LINKS.tbpSite}/search`} method="get" target="_blank">
      <input className="search-form-input" type="search" name="query" placeholder="Type search" aria-label="Search the site" autoFocus={autoFocus} required />
      {/* mousedown is swallowed so the input keeps focus and the desktop panel stays open through the click */}
      <button type="submit" className="search-submit" aria-label="Search" onMouseDown={(e) => e.preventDefault()}><Search width={20} height={20} /></button>
    </form>
  );
}

/* Desktop search (site: .search-dropdown): the icon toggles a panel hanging under the nav controls. */
function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={wrap}
      className={`search-dropdown ${open ? "open" : ""}`}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node | null)) setOpen(false); }}
      onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
    >
      <button type="button" className="search-trigger" aria-label={open ? "Close search" : "Open search"} aria-expanded={open} onClick={() => setOpen((o) => !o)}><Search width={20} height={20} /></button>
      {open && <div className="search-panel"><SearchForm autoFocus /></div>}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  // Compass reads as active on its landing page and on its sub-pages (engine portals, Learn).
  // Both matches are hooks, so they must run on every render (no short-circuiting).
  const onEngine = useMatch("/engine/:slug");
  const onLearn = useMatch("/learn/*");
  const inCompass = !!onEngine || !!onLearn;
  return (
    <div className="navbar-wrapper">
      <div className="navbar-top-line" />
      <div className="navbar-content main-container contains-navbar">
        <nav className="navbar" aria-label="Primary">
          <img className="notch left" src={asset("icons/notch-corner.svg")} alt="" />
          <img className="notch right" src={asset("icons/notch-corner.svg")} alt="" />
          <div className="navbar-row">
            <Link to="/" className="nav-logo-link" aria-label="The Builder Platform — Compass home" onClick={close}>
              <img src={asset("logo/TBP_Logo_Endorsed_White.svg")} alt="The Builder Platform, powered by The Engine" />
            </Link>
            <div className="nav-contents">
              <div className={`nav-menu ${open ? "open" : ""}`}>
                <div className="nav-links">
                  {SITE_NAV.map((n) => (
                    <a key={n.href} className="nav-link" href={n.href} target="_blank" rel="noreferrer" onClick={close}>{n.label}</a>
                  ))}
                  {/* Compass: click goes to the landing page; hover/focus reveals the sub-pages. */}
                  <div className="nav-dropdown">
                    <NavLink to="/compass" end className={({ isActive }) => `nav-link nav-dropdown-toggle ${isActive || inCompass ? "active" : ""}`} onClick={close}>
                      <Plus className="icon nav-dropdown-plus" />Compass
                    </NavLink>
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-panel">
                        <NavLink to={MY_COMPASS} className={({ isActive }) => `nav-link nav-dropdown-item ${isActive ? "active" : ""}`} onClick={close}>My Compass</NavLink>
                        <NavLink to="/learn" className={({ isActive }) => `nav-link nav-dropdown-item ${isActive ? "active" : ""}`} onClick={close}>Learn</NavLink>
                      </div>
                    </div>
                  </div>
                  {/* Mobile overlay only (site: .mobile-only): Login row, and the search field pinned to the bottom */}
                  <a className="nav-link external-link mobile-only" href={LINKS.login} target="_blank" rel="noreferrer" onClick={close}>Login <ArrowUpRight width={16} height={16} /></a>
                  <SearchForm className="mobile-only" />
                </div>
              </div>
              {/* Desktop only (site: .nav-controls): search icon + Login */}
              <div className="nav-controls">
                <SearchDropdown />
                <a className="external-link nav-login" href={LINKS.login} target="_blank" rel="noreferrer">Login <ArrowUpRight width={16} height={16} /></a>
              </div>
              <button type="button" className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
                {open ? <Cross /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

/* ---------- Footer (site: .footer) ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="main-container">
        <div className="footer-wrapper">
          <div className="footer-top">
            <div className="footer-info">
              <Link to="/"><img src={asset("logo/TBP_Logo_Endorsed_White_footer.svg")} alt="The Builder Platform" /></Link>
              <p className="fine-print footer-fine-print font-color-white">We exist to empower ecosystem builders to unlock the full potential of Tough Tech, ensuring every innovation is supported by a thriving ecosystem.</p>
            </div>
            <div className="footer-menus">
              <div className="footer-menu">
                <Link className="footer-link" to="/compass">Compass</Link>
                <Link className="footer-link" to={MY_COMPASS}>My Compass</Link>
                <Link className="footer-link" to="/learn">Learn</Link>
              </div>
              <div className="footer-menu">
                <a className="footer-link" href={LINKS.tbpSite} target="_blank" rel="noreferrer">The Builder Platform</a>
                <a className="footer-link" href={`${LINKS.tbpSite}/ecosystems`} target="_blank" rel="noreferrer">Ecosystems</a>
                <a className="footer-link" href={`${LINKS.tbpSite}/services`} target="_blank" rel="noreferrer">Services</a>
                <a className="footer-link" href={`mailto:${LINKS.contactEmail}`}>Contact</a>
              </div>
              <div className="footer-menu">
                <a className="footer-link" href={`${LINKS.tbpSite}/privacy-policy`} target="_blank" rel="noreferrer">Privacy Policy</a>
                <a className="footer-link" href={`${LINKS.tbpSite}/terms-and-conditions`} target="_blank" rel="noreferrer">Terms and Conditions</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="fine-print font-color-white">Copyright © {new Date().getFullYear()} The Engine · Compass design prototype</div>
            <a className="social-icon-link" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
