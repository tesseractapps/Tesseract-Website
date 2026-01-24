// src/hooks/useAppNavigate.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

/**
 * Hook that returns a function to navigate by path or friendly name.
 * Usage: const appNavigate = useAppNavigate(); appNavigate("Pricing", { replace: false, defaultRoute: true });
 */
export const useAppNavigate = () => {
  const navigate = useNavigate();
  const { getRoute, getRouteByName } = useAppContext();

  const appNavigate = useCallback(
    (
      key: string, // path ("/pricing") or friendly name ("Pricing")
      opts?: { replace?: boolean; defaultRoute?: boolean; targetId?: string }
    ) => {
      const {
        replace = false,
        defaultRoute = true,
        targetId = "",
      } = opts || {};
      console.log("useAppNavigate targetId", targetId);

      // try path first, then friendly name
      let config = getRoute(key);
      if (!config) config = getRouteByName(key);

      if (!config) {
        if (
          defaultRoute &&
          key !== "Solutions" &&
          key !== "Signup" &&
          key !== "Resources"
        ) {
          navigate("/coming-soon", { replace });
        }
        return false;
      }

      if (config.external) {
        // externally hosted link
        window.open(config.path, "_blank", "noopener,noreferrer");
        return true;
      }

      // internal navigation
      navigate(config.path, {
        state: config.data
          ? { data: config.data, targetId }
          : targetId
          ? { targetId }
          : undefined,
        replace,
      });
      return true;
    },
    [getRoute, getRouteByName, navigate]
  );

  return appNavigate;
};

export default useAppNavigate;
