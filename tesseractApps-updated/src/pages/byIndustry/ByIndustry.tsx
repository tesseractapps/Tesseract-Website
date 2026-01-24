import { useLocation } from "react-router-dom";
import "./ByIndustryStyles.css";
import DetailsHeroComponent from "../../components/detailsHeroComponent/DetailsHeroComponent";
import AboutSelectedToolComponent from "../../components/aboutSelectedToolComponent/AboutSelectedToolComponent";
import DetailsDataComponent from "../../components/detailsDataComponent/DetailsDataComponent";
import FaqProductComponent from "../../components/faqProductComponent/faqProductComponent";
import { useAppContext } from "../../contexts/AppContext";
import ComingSoon from "../comingSoon/ComingSoon";
import { useMetaTags } from "../../utils/useMetaTags";
import { getMetaTags } from "../../utils/metaTagsConfig";
interface byroleTypes {
  data: {
    hero: {
      image: string;
      title: string;
      description: string;
      page: string;
    };
    details: {
      title: string;
      description: string;
      points: {
        dot: { outer: string; middle: string; inner: string };
        title: string;
        description: string;
        conclusion?: string;
        descriptionPoints?: string[];
        pointsData?: string[];
      }[];
    };
    details2: {
      title: string;
      description: string;
      points: {
        dot: { outer: string; middle: string; inner: string };
        title: string;
        description: string;
        conclusion?: string;
        descriptionPoints?: string[];
        pointsData?: string[];
      }[];
    };
    section3?: {
      title: string;
      description: string;
      images: string[];
      points?: string[];
      conclusion?: string;
      discriptionsPoints?: string[];
    }[];
    section4?: {
      title?: string;
      data?: {
        title: string;
        description: string;
        images: string[];
        points?: string[];
        conclusion?: string;
        discriptionsPoints?: string[];
      }[];
    };
    faqSection?: {
      title: string;
      faqData: {
        question: string;
        answer: string;
        points?: string[];
        conclusion?: string;
      }[];
    };
  };
}
const ByIndustry = () => {
  const location = useLocation();
  // const { data }: byroleTypes = location.state || {};
  const { getRoute } = useAppContext();
  const path = location.pathname.replace(/\/$/, "");
  const metaTags = getMetaTags(path);
  useMetaTags(metaTags);

  const data: byroleTypes["data"] =
    (location.state as any)?.data ?? getRoute(path)?.data ?? null;
  if (!data) {
    return <ComingSoon />;
  }
  return (
    <div id="byindustry-container">
      {data.hero && <DetailsHeroComponent data={data.hero} />}
      {data.details && <AboutSelectedToolComponent data={data.details} />}
      {data.details2 && (
        <AboutSelectedToolComponent data={{ ...data.details2, type: 2 }} />
      )}
      {data?.section3 &&
        Array.isArray(data?.section3) &&
        data?.section3?.map((item, index) => {
          return (
            <DetailsDataComponent
              data={item}
              componentType={index % 2 == 0 ? 1 : 2}
              key={item.title + index}
            />
          );
        })}
      {data?.section4 && (
        <>
          <div id="faq-product-title" className="subheading">
            {data?.section4?.title}
          </div>

          {Array.isArray(data?.section4?.data) &&
            data.section4.data.map((item, index) => (
              <DetailsDataComponent
                data={item}
                componentType={index % 2 === 0 ? 1 : 2}
                key={item.title + index}
              />
            ))}
        </>
      )}

      <div id="faq-product-title" className="subheading">
        {data?.faqSection?.title}
      </div>
      {data.faqSection && (
        <FaqProductComponent data={data?.faqSection?.faqData || []} />
      )}
    </div>
  );
};

export default ByIndustry;
