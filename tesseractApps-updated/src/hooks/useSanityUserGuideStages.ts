// hooks/useSanityUserGuideStages.ts

import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import { USER_GUIDE_STAGES_QUERY } from "../sanity/lib/queries";
import { sanityConfigError } from "../sanity/env";
import type { UserGuideStage } from "../types/sanityQueries";

type UseSanityUserGuideStagesResult = {
  stages: UserGuideStage[];
  loading: boolean;
  error: string | null;
};

export function useSanityUserGuideStages(): UseSanityUserGuideStagesResult {
  const [stages, setStages] = useState<UserGuideStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) {
      setStages([]);
      setLoading(false);
      setError(
        sanityConfigError ??
          "Sanity is not configured. Error loading guide stages.",
      );
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    client
      .fetch<UserGuideStage[]>(USER_GUIDE_STAGES_QUERY)
      .then((result) => {
        if (!cancelled) {
          setStages(result ?? []);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load guide stages",
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    stages,
    loading,
    error,
  };
}
