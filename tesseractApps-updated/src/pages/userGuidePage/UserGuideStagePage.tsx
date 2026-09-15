import { Navigate, useParams } from "react-router-dom";
import { useSanityUserGuideNavigation } from "../../hooks/useSanityUserGuideNavigation";

export default function UserGuideStagePage() {
  const { stageSlug } = useParams<{
    stageSlug: string;
  }>();

  const { navigation: guides, loading } = useSanityUserGuideNavigation(
    stageSlug ?? "",
  );

  if (loading) {
    return null;
  }

  const firstGuide = guides[0];

  if (!firstGuide) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <Navigate replace to={`/user-guide/${stageSlug}/${firstGuide.slug}`} />
  );
}
