import AboutSelectedToolComponent from "../../components/aboutSelectedToolComponent/AboutSelectedToolComponent";
import DetailsDataComponent from "../../components/detailsDataComponent/DetailsDataComponent";
import DetailsHeroComponent from "../../components/detailsHeroComponent/DetailsHeroComponent";
import ProductsDataComponent from "../../components/productsDataComponent/ProductsDataComponent";
import { useAppContext } from "../../contexts/AppContext";
import ComingSoon from "../comingSoon/ComingSoon";
import "./SubPage.css";
import { useLocation } from "react-router-dom";
import { useMetaTags } from "../../utils/useMetaTags";
import { getMetaTags } from "../../utils/metaTagsConfig";

const SubPage = () => {
  const location = useLocation();
  // const { data } = location.state || {};
  const { getRoute } = useAppContext();

  // normalize path
  const path = location.pathname.replace(/\/$/, "");

  // Set dynamic meta tags based on current route
  const metaTags = getMetaTags(path);
  useMetaTags(metaTags);

  // Prefer location.state.data (present when navigated internally), otherwise fallback to AppContext
  const data = (location.state as any)?.data ?? getRoute(path)?.data ?? null;

  // If no data available, render a safe fallback (avoid crash / white screen)
  if (!data) {
    // You can show a 404, ComingSoon, or a message
    return <ComingSoon />; // or <div>Content not available</div>;
  }
  return (
    <div id="sub-page-container">
      {data.section1 && <DetailsHeroComponent data={data.section1} />}
      {data.section2 && <AboutSelectedToolComponent data={data.section2} />}
      {data.section3 && (
        <DetailsDataComponent data={data.section3} componentType={1} />
      )}
      {data.products && <ProductsDataComponent data={data.products} />}
    </div>
  );
};

export default SubPage;
