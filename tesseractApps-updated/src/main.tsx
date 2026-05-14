import { ViteReactSSG } from "vite-react-ssg/single-page";
import type { ViteReactSSGContext } from "vite-react-ssg/single-page";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext.tsx";

// ViteReactSSG handles both client-side hydration and SSG pre-rendering.
// The callback receives `routePath` during SSG, which we expose via globalThis
// so App.tsx can pass it to StaticRouter (BrowserRouter crashes in Node).
export const createRoot = ViteReactSSG(
  <AppProvider>
    <App />
  </AppProvider>,
  ({ routePath }: ViteReactSSGContext<false>) => {
    if (routePath !== undefined) {
      (globalThis as any).__SSG_ROUTE__ = routePath;
    }
  }
);
