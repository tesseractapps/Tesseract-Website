import "./DetailsDataStyles.css";
interface detailsDataType {
  data?: {
    title: string;
    description: string;
    images: string[];
    points?: string[];
    conclusion?: string;
    discriptionsPoints?: string[];
    list?: { title: string; description: string }[];
  };
  componentType?: number;
}
const DetailsDataComponent = ({
  data = {
    title: " One Lorem ipsum dolor sit amet, consectetur Lorem ipsum",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, dapibus
          mattis adipiscing elit. Diam, dapibus mattis Lorem ipsum dolor sit
          amet, onsectetur adipiscing elit. Diam, dapibus mattis`,
    images: [],
    points: [],
  },
  componentType,
}: detailsDataType) => {
  // console.log(data.images);
  return (
    <div
      id={
        componentType == 2
          ? "details-data-container"
          : "details-data-container-wrap-reverse"
      }
    >
      {componentType == 1 && data.images && data.images.length > 1 && (
        <div id="details-data-image-collage">
          <img src={data.images[0]} alt="details image 1" />
          <div id="details-data-image-collage-item">
            <img src={data.images[1]} alt="details image 2" />
            <img src={data.images[2]} alt="details image 3" />
          </div>
        </div>
      )}
      {componentType == 1 && data.images && data.images.length == 1 && (
        <div id="details-data-image">
          <img
            src={data.images[0]}
            alt="details image 1"
            className="details-data-image"
          />
        </div>
      )}

      <div
        id="details-data-text"
        className={componentType == 2 ? "text-align-right" : ""}
      >
        <div id="details-data-text-title"> {data.title} </div>
        <div id="details-data-text-description">{data.description}</div>
        {data.points && (
          <ul>
            {data.points.map((point, index) => (
              <li id="details-data-text-points" key={index}>
                {point}
              </li>
            ))}
          </ul>
        )}
        {data.list && (
          <ul>
            {data.list.map((point, index) => (
              <div key={point.title + index}>
                <div id="details-data-text-title"> {point.title} </div>
                <div id="details-data-text-description">
                  {point.description}
                </div>
              </div>
            ))}
          </ul>
        )}
        {data.discriptionsPoints &&
          data.discriptionsPoints.map((point, index) => (
            <div id="details-data-text-description" key={index}>
              {point}
            </div>
          ))}
        {data.conclusion && (
          <div id="details-data-text-description">{data.conclusion}</div>
        )}
      </div>
      {componentType == 2 && data.images && data.images.length > 1 && (
        <div id="details-data-image-collage">
          <img src={data.images[0]} alt="details image 1" />
          <div id="details-data-image-collage-item">
            <img src={data.images[1]} alt="details image 2" />
            <img src={data.images[2]} alt="details image 3" />
          </div>
        </div>
      )}
      {componentType == 2 && data.images && data.images.length == 1 && (
        <div id="details-data-image">
          <img
            src={data.images[0]}
            alt="details image 1"
            className="details-data-image"
          />
        </div>
      )}
    </div>
  );
};

export default DetailsDataComponent;
