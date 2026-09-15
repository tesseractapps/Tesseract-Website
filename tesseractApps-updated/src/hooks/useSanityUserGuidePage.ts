import { useEffect, useState } from "react";

import { client } from "../sanity/lib/client";
import { USER_GUIDE_BY_SLUG_QUERY } from "../sanity/lib/queries";
import { sanityConfigError } from "../sanity/env";

import type { UserGuidePageDocument } from "../types/sanityQueries";

type UseSanityUserGuideResult = {
  guide: UserGuidePageDocument | null;
  loading: boolean;
  error: string | null;
};

export function useSanityUserGuidePage(
  stageSlug: string,
  pageSlug: string,
): UseSanityUserGuideResult {
  const [guide, setGuide] = useState<UserGuidePageDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) {
      setGuide(null);
      setLoading(false);
      setError(
        sanityConfigError ??
          "Sanity is not configured. Error loading user guide.",
      );
      return;
    }

    if (!stageSlug || !pageSlug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    client
      .fetch<UserGuidePageDocument | null>(USER_GUIDE_BY_SLUG_QUERY, {
        stageSlug,
        pageSlug,
      })
      .then((result) => {
        if (!cancelled) {
          setGuide(result ?? null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load user guide",
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [stageSlug, pageSlug]);

  return { guide, loading, error };
}
