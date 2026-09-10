import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components/Chrome";
import { ToastProvider } from "./components/Toast";
import LandingA from "./pages/LandingA";
import LandingB from "./pages/LandingB";
import GemFirstPortal from "./pages/GemFirstPortal";
import { LearnIndex, LearnTopic } from "./pages/Learn";
import Styleguide from "./pages/Styleguide";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }); return; }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </ToastProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          {/* Two takes on the landing page, side by side for review (docs/homepage-a-vs-b.md).
              /compass stays the canonical entry point and resolves to this branch's default, B. */}
          <Route index element={<Navigate to="/compass-b" replace />} />
          <Route path="compass" element={<Navigate to="/compass-b" replace />} />
          <Route path="compass-a" element={<LandingA />} />
          <Route path="compass-b" element={<LandingB />} />
          <Route path="engine/:slug" element={<GemFirstPortal />} />
          <Route path="learn" element={<LearnIndex />} />
          <Route path="learn/:slug" element={<LearnTopic />} />
          <Route path="styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
