import { NavigateFunction } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export const AppNavigate = (
  key: string, // can be path or name
  navigate?: NavigateFunction,
  defaultRoute = false
) => {
  const { getRoute, getRouteByName } = useAppContext();

  // first try path, then name
  let config = getRoute(key);
  if (!config) config = getRouteByName(key);

  if (!config) {
    if (defaultRoute && navigate) navigate("/coming-soon");
    return;
  }

  if (config.external) {
    window.open(config.path, "_blank");
  } else if (navigate) {
    navigate(config.path, {
      state: config.data ? { data: config.data } : undefined,
    });
  }
};
