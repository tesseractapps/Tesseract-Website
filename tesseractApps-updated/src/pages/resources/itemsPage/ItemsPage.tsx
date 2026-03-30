import "./ItemsPageStyles.css";
import { useLocation } from "react-router-dom";

const ItemsPage = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div id="items-page-container">
      <div className="heading" id="items-page-heading">
        {data?.heading || "Items Page"}
      </div>
      <div className="subheading" id="items-page-sub-heading">
        {data?.subHeading || "Insights, industry updates, and practical tips."}
      </div>
      <div className="text" id="items-page-text">
        {data?.text ||
          "Stay informed with expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation."}
      </div>
    </div>
  );
};

export default ItemsPage;
