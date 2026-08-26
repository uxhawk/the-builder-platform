import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeMiterlimit: 10, className: "icon", "aria-hidden": true, ...props });

/* Icons traced from the live site's interface icon set (24px, 1.5 stroke) */
export const ArrowRight = (p: P) => <svg {...base(p)}><path d="M19.5 12H3M13.5 5.625L19.875 12L13.5 18.375" /></svg>;
export const ArrowUpRight = (p: P) => <svg {...base(p)}><path d="M17.1384 6.29892L5.47118 17.9662M8.388 6.03375H17.4036V15.0494" /></svg>;
export const ArrowDown = (p: P) => <svg {...base(p)}><path d="M12.375 20.0625L12.375 3.5625M18.75 14.0625L12.375 20.4375L6 14.0625" /></svg>;
export const ArrowLeft = (p: P) => <svg {...base(p)}><path d="M4.5 12H21M10.5 5.625L4.125 12L10.5 18.375" /></svg>;
export const Menu = (p: P) => <svg {...base(p)}><path d="M24 12H0M24 4.8H0M0 19.2H24" /></svg>;
export const Search = (p: P) => <svg {...base(p)} viewBox="0 0 20 20"><path d="M11.875 13.75C14.9816 13.75 17.5 11.2316 17.5 8.125C17.5 5.0184 14.9816 2.5 11.875 2.5C8.7684 2.5 6.25 5.0184 6.25 8.125C6.25 11.2316 8.7684 13.75 11.875 13.75Z" /><path d="M2.5 17.5L8.125 11.875" /></svg>;
export const Cross = (p: P) => <svg {...base(p)} stroke="none" fill="currentColor"><path d="M5.70703 4.29297L4.29297 5.70703L10.5859 12L4.29297 18.293L5.70703 19.707L12 13.4141L18.293 19.707L19.707 18.293L13.4141 12L19.707 5.70703L18.293 4.29297L12 10.5859L5.70703 4.29297Z" /></svg>;
export const ChevronDown = (p: P) => <svg {...base(p)}><path d="M5 9l7 7 7-7" /></svg>;
export const Check = (p: P) => <svg {...base(p)} strokeWidth={2}><path d="M4 12.5l5 5L20 6.5" /></svg>;
export const Lock = (p: P) => <svg {...base(p)}><rect x="5" y="10.5" width="14" height="10" rx="1.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></svg>;
export const Copy = (p: P) => <svg {...base(p)}><rect x="8" y="8" width="12" height="12" rx="1.5" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></svg>;
export const Info = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></svg>;
export const Flag = (p: P) => <svg {...base(p)}><path d="M5 21V4M5 4h13l-3 4 3 4H5" /></svg>;
export const Calendar = (p: P) => <svg {...base(p)}><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>;
export const Mail = (p: P) => <svg {...base(p)}><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="M4 7l8 6 8-6" /></svg>;
export const Doc = (p: P) => <svg {...base(p)}><path d="M6.5 3.5h7l4 4v13h-11z" /><path d="M13.5 3.5v4h4M9 12h6M9 15.5h6" /></svg>;
export const Users = (p: P) => <svg {...base(p)}><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M15.5 5.5a3.5 3.5 0 0 1 0 6M17 13.5a6.5 6.5 0 0 1 4.5 6.5" /></svg>;
export const Sparkle = (p: P) => <svg {...base(p)}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></svg>;
export const Compass = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none" /></svg>;
export const Refresh = (p: P) => <svg {...base(p)}><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></svg>;
export const LinkedIn = (p: P) => <svg {...base(p)} stroke="none" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
