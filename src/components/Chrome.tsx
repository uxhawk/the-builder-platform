import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LINKS, MY_COMPASS } from "../config";
import { Cross, LinkedIn, Menu } from "./Icons";

/* ---------- Navbar (site: .navbar-wrapper / .navbar) ---------- */
const NAV = [
  { to: "/", label: "Compass", end: true },
  { to: MY_COMPASS, label: "My Compass" },
  { to: "/learn", label: "Learn" },
  { to: "/styleguide", label: "Styleguide" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar-wrapper">
      <div className="navbar-top-line" />
      <div className="navbar-content main-container contains-navbar">
        <nav className="navbar" aria-label="Primary">
          <img className="notch left" src="/icons/notch-corner.svg" alt="" />
          <img className="notch right" src="/icons/notch-corner.svg" alt="" />
          <div className="navbar-row">
            <Link to="/" className="nav-logo-link" aria-label="The Builder Platform — Compass home" onClick={() => setOpen(false)}>
              <img src="/logo/TBP_Logo_Endorsed_White.svg" alt="The Builder Platform, powered by The Engine" />
            </Link>
            <div className="nav-contents">
              <div className={`nav-menu ${open ? "open" : ""}`}>
                <div className="nav-links">
                  {NAV.map((n) => (
                    <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={() => setOpen(false)}>{n.label}</NavLink>
                  ))}
                  <a className="nav-link" href={LINKS.tbpSite} target="_blank" rel="noreferrer">builderplatform.engine.xyz ↗</a>
                </div>
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
              <Link to="/"><img src="/logo/TBP_Logo_Endorsed_White_footer.svg" alt="The Builder Platform" /></Link>
              <p className="fine-print footer-fine-print font-color-white">We exist to empower ecosystem builders to unlock the full potential of Tough Tech, ensuring every innovation is supported by a thriving ecosystem.</p>
            </div>
            <div className="footer-menus">
              <div className="footer-menu">
                <Link className="footer-link" to="/">Compass</Link>
                <Link className="footer-link" to={MY_COMPASS}>My Compass</Link>
                <Link className="footer-link" to="/learn">Learn</Link>
                <Link className="footer-link" to="/styleguide">Styleguide</Link>
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
