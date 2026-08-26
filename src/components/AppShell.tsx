import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Engine } from "../compass/data/engines";
import { ArrowDown, Users } from "./Icons";
import { useHelp } from "./HelpDrawer";
import { LINKS } from "../config";

/* Standalone, logged-in app chrome (concept/gem-first). No marketing banner
   or site nav: Engines land here after signing in. */
export function AppShell({ engine, progressLabel, children }: { engine?: Engine; progressLabel?: string; children: ReactNode }) {
  const help = useHelp();
  return (
    <div className="app-shell">
      <header className="app-bar">
        <div className="main-container">
          <Link to="/" className="app-brand" aria-label="The Builder Platform — Compass">
            <img src="/logo/TBP_Logo_Endorsed_White.svg" alt="The Builder Platform" />
            <span className="sep" /><span className="product">Compass</span>
          </Link>
          {engine && <Link to="/engines" className="engine-switch" title="Switch Engine"><span>{engine.name}</span><ArrowDown /></Link>}
          <div className="app-bar-right">
            {progressLabel && <span className="status-pill current hide-narrow">{progressLabel}</span>}
            <Link to="/learn" className="nav-link hide-narrow">Learn</Link>
            <button type="button" className="button glass small" onClick={() => help.open({ engine })}><Users width={16} height={16} />Help</button>
            <span className="avatar" title="Signed in (placeholder)">DH</span>
          </div>
        </div>
      </header>
      <main style={{ flex: 1 }}>{children}</main>
      <footer className="app-footer">
        <div className="main-container">
          <span>© {new Date().getFullYear()} The Engine · Compass · design prototype</span>
          <span><a href={LINKS.tbpSite} target="_blank" rel="noreferrer">builderplatform.engine.xyz</a> · <a href={`mailto:${LINKS.contactEmail}`}>{LINKS.contactEmail}</a></span>
        </div>
      </footer>
    </div>
  );
}
