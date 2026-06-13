import { useEffect, useRef } from "react";
import "./App.css";
import NavBarComponent from "./components/layout/navBarComponent/NavBarComponent";
import { BrowserRouter, StaticRouter, useLocation } from "react-router-dom";
import FooterComponent from "./components/layout/footerComponent/FooterComponent";
import AppRoutes from "./routes/AppRoutes";
import GTMLoader from "./components/analytics/GTMLoader";
import AnnouncementBar from "./components/layout/announcementBar/AnnouncementBar";

const FULLSCREEN_ROUTES: string[] = [
  "/book-a-demo",
  "/book-a-demo/success",
  "/signup",
  "/signup/success",
  "/register-support-coordination",
];
const CD_BAR_HEIGHT = 36;

function AppInner() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);
  const portalContainerRef = useRef<HTMLDivElement>(null);

  const barVisible = !isFullscreen;

  // Push navbar down by bar height via CSS variable on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--cd-bar-height",
      barVisible ? `${CD_BAR_HEIGHT}px` : "0px",
    );
  }, [barVisible]);

  return (
    <>
      {barVisible && <AnnouncementBar />}
      {!isFullscreen && (
        <NavBarComponent portalContainerRef={portalContainerRef} />
      )}
      <div ref={portalContainerRef} />
      <main role="main">
        <AppRoutes />
      </main>
      {!isFullscreen && <FooterComponent />}
    </>
  );
}

// During SSG (Node.js environment), BrowserRouter crashes because it accesses
// `document`. We detect the SSG context via __SSG_ROUTE__ injected by main.tsx,
// and fall back to StaticRouter which is safe in a server/Node environment.
function App() {
  const isSSG = typeof window === "undefined";

  if (isSSG) {
    const path = (globalThis as any).__SSG_ROUTE__ ?? "/";
    return (
      <StaticRouter location={path}>
        <AppInner />
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppInner />
      <GTMLoader />
    </BrowserRouter>
  );
}

export default App;
