import { useRef } from "react";
import "./App.css";
import NavBarComponent from "./components/layout/navBarComponent/NavBarComponent";
import { BrowserRouter, useLocation } from "react-router-dom";
import FooterComponent from "./components/layout/footerComponent/FooterComponent";
import AppRoutes from "./routes/AppRoutes";
import GTMLoader from "./components/analytics/GTMLoader";

const FULLSCREEN_ROUTES: string[] = [];

function AppInner() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);
  const portalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {!isFullscreen && <NavBarComponent portalContainerRef={portalContainerRef} />}
      <div ref={portalContainerRef} />
      <main role="main">
        <AppRoutes />
      </main>
      {!isFullscreen && <FooterComponent />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
      <GTMLoader />
    </BrowserRouter>
  );
}

export default App;
