import { useLocation } from "react-router-dom";
import "./AboutUsSubPageSyles.css";

const AboutUsSubPage = () => {
  const location = useLocation();
  const { data } = location.state;
  return (
    <div id="about-us-page-container">
      {data.map(
        (
          item: {
            image: string;
            title: string;
            data: string;
          },
          index: number
        ) => {
          return (
            <div key={index} className="about-us-page-data">
              {item.image && item.title != "Our Vision" && (
                <img
                  src={item.image}
                  alt="image-alt"
                  className="about-us-page-image"
                />
              )}
              <div className="about-us-page-data-container">
                <div className="subheading about-us-page-title">
                  {item.title}
                </div>
                <div className="text about-us-page-text">{item.data}</div>
              </div>
              <br></br>
              {item.image && item.title == "Our Vision" && (
                <img
                  src={item.image}
                  alt="image-alt"
                  className="about-us-page-image"
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default AboutUsSubPage;
