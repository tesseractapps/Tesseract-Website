import { ViteReactSSG } from "vite-react-ssg/single-page";
import type { ViteReactSSGContext } from "vite-react-ssg/single-page";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext.tsx";
import {
  prefetchSanityForRoute,
  replaceSsgData,
  seedSsgDataFromWindow,
} from "./sanity/lib/ssgData";

// ViteReactSSG handles both client-side hydration and SSG pre-rendering.
// The callback receives `routePath` during SSG, which we expose via globalThis
// so App.tsx can pass it to StaticRouter (BrowserRouter crashes in Node).
export const createRoot = ViteReactSSG(
  <AppProvider>
    <App />
  </AppProvider>,
  async (context: ViteReactSSGContext<false>) => {
    const { routePath, isClient } = context;
    if (routePath !== undefined) {
      (globalThis as any).__SSG_ROUTE__ = routePath;
    }
    // Expose SSG context so AppRoutes can skip lazy loading during pre-render
    (globalThis as any).__IS_SSG__ = !isClient;

    if (isClient) {
      // Same data the build rendered with, so hydration matches the HTML.
      seedSsgDataFromWindow();
    } else if (routePath !== undefined) {
      // Pre-render real CMS content instead of loading skeletons.
      const data = await prefetchSanityForRoute(routePath);
      replaceSsgData(data);
      context.initialState = { ...(context.initialState ?? {}), sanity: data };
    }
  }
);
