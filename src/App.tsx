import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Banner, Footer, Navbar } from "./components/Chrome";
import { HelpProvider } from "./components/HelpDrawer";
import Landing from "./pages/Landing";
import EnginePortal from "./pages/EnginePortal";
import { LearnIndex, LearnTopic } from "./pages/Learn";
import Styleguide from "./pages/Styleguide";
import NotFound from "./pages/NotFound";
import { MY_COMPASS } from "./config";

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
    <HelpProvider>
      <ScrollToTop />
      <Banner />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </HelpProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="compass" element={<Navigate to={MY_COMPASS} replace />} />
          <Route path="engine/:slug" element={<EnginePortal />} />
          <Route path="learn" element={<LearnIndex />} />
          <Route path="learn/:slug" element={<LearnTopic />} />
          <Route path="styleguide" element={<Styleguide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
