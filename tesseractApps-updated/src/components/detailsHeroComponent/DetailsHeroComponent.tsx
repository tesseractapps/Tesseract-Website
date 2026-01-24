// import { useNavigate } from "react-router-dom";
import "./DetailsHeroStyles.css";
import { useAppContext } from "../../contexts/AppContext";
import productHeroImage from "../../assets/productHeroImage.webp";
// import { AppNavigate } from "../../routes/AppNavigate";
interface DeatailsHeroType {
  data?: {
    page: string;
    title: string;
    description: string;
    image: string;
    conclusion?: string;
    descriptionPoints?: string[];
    points?: string[];
    backgroundColor?: string;
    pointsObject?: { pointTitle: ""; pointDescription: "" }[];
    cta?: {
      buttons: { title: string; navigate: string }[];
      conclusion: string;
    };
  };
  displayTitle?: boolean;
}
const DetailsHeroComponent = ({
  data = {
    page: "",
    title: "One Lorem ipsum dolor sit amet, consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, dapibus mattis Ronsectetur adipiscing elit. Diam, dapibus mattis ",
    image: "",
    conclusion: "",
    backgroundColor: "",
  },
  displayTitle = true,
}: DeatailsHeroType) => {
  const pagesWithRightImage = [
    "HR Operations",
    "Role Based Dashboard",
    "Forms",
    "Accounting",
  ];
  // const navigate = useNavigate();
  const { handleSignup, handleBookADemo } = useAppContext();
  const handlectaClick = (name: string) => {
    // console.log("cta click", name);
    if (name == "Signup") {
      handleSignup(true);
    }
    if (name == "bookADemo") {
      handleBookADemo(true);
    }
  };
  // console.log(data.page);
  return (
    <div
      id="details-hero-container"
      style={{
        backgroundColor: data.backgroundColor ? data.backgroundColor : "",
        textAlign: data.page == "Product" ? "center" : "left",
        flexDirection: data.page == "Product" ? "column" : "row",
      }}
    >
      {displayTitle && <div id="details-hero-page-title">{data.page}</div>}
      {pagesWithRightImage.includes(data.page) && (
        <img
          id="details-hero-image"
          src={data.image}
          alt="details-hero-image"
        />
      )}
      <div
        id="details-hero-contents"
        className={
          data.page == "Product" ? "details-hero-contents-product" : ""
        }
      >
        <div
          id="details-hero-heading"
          className={
            data.page == "Product" ? "details-hero-heading-product" : ""
          }
        >
          {data.title}
        </div>
        <div
          className={
            "details-hero-text details-hero-text-description" +
            (data.page == "Product" ? " details-hero-text-product" : "")
          }
        >
          {data.description}
        </div>
        {data.descriptionPoints &&
          data.descriptionPoints.map((point, index) => {
            return (
              <div
                className={
                  "details-hero-text" +
                  (data.page == "Product" ? " details-hero-text-product" : "")
                }
                key={index}
              >
                {point}
              </div>
            );
          })}
        {data.points && (
          <ul>
            {data.points.map((point, index) => {
              return (
                <li
                  className={
                    "details-hero-text" +
                    (data.page == "Product" ? " details-hero-text-product" : "")
                  }
                  key={index}
                >
                  {point}
                </li>
              );
            })}
          </ul>
        )}
        {data.pointsObject && (
          <ul>
            {data.pointsObject.map((point, index) => {
              return (
                <li key={index}>
                  <div className="details-hero-text details-hero-text-heading">
                    {point.pointTitle}
                  </div>
                  <div
                    className={
                      "details-hero-text" +
                      (data.page == "Product"
                        ? " details-hero-text-product"
                        : "")
                    }
                  >
                    {point.pointDescription}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div
          className={
            "details-hero-text details-hero-text-conclusion" +
            (data.page == "Product" ? " details-hero-text-product" : "")
          }
        >
          {data.conclusion}
        </div>
        {data.cta &&
          data.cta.buttons.map((button) => (
            <div
              className="details-hero-button cta-button"
              key={button.title}
              onClick={() => handlectaClick(button.navigate)}
            >
              {button.title}
            </div>
          ))}
        {data.cta && (
          <div
            className={
              "details-hero-text" +
              (data.page == "Product" ? " details-hero-text-product" : "")
            }
          >
            {data.cta?.conclusion}
          </div>
        )}
      </div>
      {!pagesWithRightImage.includes(data.page) && data.page !== "Product" && (
        <img
          id="details-hero-image"
          src={data.image}
          alt="details-hero-image"
        />
      )}
      {data.page == "Product" ? (
        <img
          src={productHeroImage}
          alt="product image"
          id="details-product-bottom-image"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailsHeroComponent;
