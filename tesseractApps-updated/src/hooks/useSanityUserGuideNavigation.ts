import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import { USER_GUIDE_STAGE_NAVIGATION_QUERY } from "../sanity/lib/queries";

export type UserGuideNavigationItem = {
  _id: string;
  title: string;
  slug: string;
  order: number;
};

export function useSanityUserGuideNavigation(stageSlug: string) {
  const [navigation, setNavigation] = useState<UserGuideNavigationItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) {
      setNavigation([]);
      setLoading(false);
      return;
    }

    if (!stageSlug) {
      setNavigation([]);
      setLoading(false);
      return;
    }

    client
      .fetch<UserGuideNavigationItem[]>(USER_GUIDE_STAGE_NAVIGATION_QUERY, {
        stageSlug,
      })
      .then((result) => {
        setNavigation(result ?? []);
        setLoading(false);
      })
      .catch((error) => {
        setNavigation([]);
        setLoading(false);
        setError(error);
      });
  }, [stageSlug]);

  return {
    navigation,
    loading,
    error,
  };
}
