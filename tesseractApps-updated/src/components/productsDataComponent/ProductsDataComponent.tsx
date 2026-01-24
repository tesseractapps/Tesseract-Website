// import { useNavigate } from "react-router-dom";
import "./productsDataStyles.css";
// import { AppNavigate } from "../../routes/AppNavigate";
import DetailsHeroComponent from "../detailsHeroComponent/DetailsHeroComponent";
import useAppNavigate from "../../hooks/useAppNavigate";
interface ProductsDataTypes {
  data: {
    title: string;
    description: string;
    productsData: { title: string; description: string; image: string }[];
  };
}
const ProductsDataComponent = ({ data }: ProductsDataTypes) => {
  // const navigate = useNavigate();
  const appNavigate = useAppNavigate();
  function handleProductDataClick(name: string) {
    // console.log(name);
    appNavigate(name);
  }
  const backgroundColors = [
    "#E6EEFF",
    "#FFE3E3",
    "#DBF2E8",
    "#DBE8EF",
    "#F7ECD9",
    "#EBE2FE",
    "#E6EEFF",
    "#FFE3E3",
    "#DBF2E8",
    "#DBE8EF",
    "#F7ECD9",
    "#EBE2FE",
    "#E6EEFF",
    "#FFE3E3",
    "#DBF2E8",
    "#DBE8EF",
  ];
  return (
    <div id="products-data-container">
      <div id="product-data-title" className="heading">
        {data.title}
      </div>
      <div id="product-data-description" className="subheading">
        {data.description}
      </div>
      <div className="sticky-section">
        {data.productsData.map((subData, index) => (
          <div
            className="sticky-box"
            key={subData.title}
            onClick={() => handleProductDataClick(subData.title)}
          >
            <DetailsHeroComponent
              data={{
                ...subData,
                page: subData.title,
                backgroundColor: backgroundColors[index],
              }}
              displayTitle={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsDataComponent;
