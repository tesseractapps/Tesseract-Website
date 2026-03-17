import { useLocation } from "react-router-dom";
import AboutSelectedToolComponent from "../../../components/details/aboutSelectedToolComponent/AboutSelectedToolComponent";
import DetailsDataComponent from "../../../components/details/detailsDataComponent/DetailsDataComponent";
import DetailsHeroComponent from "../../../components/details/detailsHeroComponent/DetailsHeroComponent";
import ProductsDataComponent from "../../../components/details/productsDataComponent/ProductsDataComponent";
import { useAppContext } from "../../../contexts/AppContext";
import { getMetaTags } from "../../../data/metaTagsConfig";
import ComingSoon from "../../marketing/comingSoon/ComingSoon";
import SEO from "../../../components/common/SEO";
import "./SubPageStyles.css";

const SubPage = () => {
  const location = useLocation();
  // const { data } = location.state || {};
  const { getRoute } = useAppContext();

  // normalize path
  const path = location.pathname.replace(/\/$/, "");

  // Set dynamic meta tags based on current route
  const metaTags = getMetaTags(path);

  // Prefer location.state.data (present when navigated internally), otherwise fallback to AppContext
  const data = (location.state as any)?.data ?? getRoute(path)?.data ?? null;

  // If no data available, render a safe fallback (avoid crash / white screen)
  if (!data) {
    // You can show a 404, ComingSoon, or a message
    return <ComingSoon />; // or <div>Content not available</div>;
  }
  return (
    <div id="sub-page-container">
      <SEO {...metaTags} />
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
