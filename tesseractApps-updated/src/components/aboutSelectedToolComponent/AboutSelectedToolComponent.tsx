import "./AboutSelectedToolStyles.css";
import { aboutSelectedToolDummyData } from "../../utils/DummyData";
import { useEffect, useState } from "react";
import dividerLine from "../../assets/divider_line.webp";
// import { useNavigate } from "react-router-dom";
import useAppNavigate from "../../hooks/useAppNavigate";
interface aboutSelectedToolType {
  data?: {
    type?: number;
    title: string;
    description: string;
    points: {
      dot: { outer: string; middle: string; inner: string };
      title: string;
      description: string;
      conclusion?: string;
      descriptionPoints?: string[];
      pointsData?: string[];
      cta?: {
        title: string;
        navigate?: string;
        type?: string;
      };
    }[];
  };
}
const AboutSelectedToolComponent = ({
  data = {
    title: "About Selected Tool",
    description:
      "A comprehensive, user-friendly platform that handles everything from care management to compliance.",
    points: aboutSelectedToolDummyData,
  },
}: aboutSelectedToolType) => {
  const appNavigate = useAppNavigate();
  type PointObject = { pointTitle: string; pointDescription: string };

  function isOfType(value: unknown, type: "stringArray"): value is string[];
  function isOfType(
    value: unknown,
    type: "pointObjectArray"
  ): value is PointObject[];
  function isOfType(
    value: unknown,
    type: "stringArray" | "pointObjectArray"
  ): boolean {
    if (!Array.isArray(value)) return false;

    if (type === "stringArray") {
      return value.every((item: unknown) => typeof item === "string");
    }

    if (type === "pointObjectArray") {
      return value.every((item: unknown) => {
        if (typeof item !== "object" || item === null) return false;
        const obj = item as Record<string, unknown>;
        return (
          typeof obj.pointTitle === "string" &&
          typeof obj.pointDescription === "string"
        );
      });
    }

    return false;
  }
  const divderRowsInitialValues = [2, 3, 5, 6, 8, 9, 11, 12];
  const [dividerRows, setDividerRows] = useState(divderRowsInitialValues);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1480) {
        setDividerRows([2, 4, 6, 8, 10]);
      } else {
        setDividerRows(divderRowsInitialValues);
      }
    };

    handleResize(); // Run initially on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const navigate = useNavigate();
  const handleCtaClick = (name: string) => {
    console.log("cta click ", name);
    appNavigate(name);
  };
  return (
    <div id="selected-tool-container">
      <div id="selected-tool-heading">{data.title}</div>
      <div id="selected-tool-subheading">{data.description}</div>
      {/* <div id="selected-tool-text">
        An all-in-one, seamless platform designed for NDIS businesses,
        simplifying care management, rostering, invoicing, and compliance –
        delivering efficiency, security, and affordability in one solution.
      </div> */}
      <div
        id="selected-tool-data-container"
        style={data.type == 2 ? { gap: "60px" } : {}}
      >
        {data.points &&
          data.points?.map((subdata, index) => {
            return (
              <div key={index} className={"selected-tool-data"}>
                {data.type != 2 && dividerRows.includes(index + 1) && (
                  <img loading="lazy"
                    src={dividerLine}
                    alt="dividerLine"
                    className="selected-dividerLine"
                  />
                )}
                <div
                  style={
                    data.type == 2
                      ? { backgroundColor: subdata.dot.outer, padding: "40px" }
                      : {}
                  }
                >
                  {data.type != 2 && (
                    <svg viewBox="0 0 48 48" width="40" height="40">
                      <circle cx="24" cy="24" r="24" fill={subdata.dot.outer} />
                      <circle
                        cx="24"
                        cy="24"
                        r="16"
                        fill={subdata.dot.middle}
                      />
                      <circle cx="24" cy="24" r="10" fill={subdata.dot.inner} />
                    </svg>
                  )}

                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    role="img"
                    aria-label="Rounded light gray rectangle"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      rx="6"
                      ry="6"
                      fill={subdata.dot.outer}
                    />
                  </svg> */}

                  <h2 className="selected-tool-title">{subdata.title}</h2>
                  <div className="selected-tool-description">
                    {subdata.description}
                  </div>
                  {subdata.descriptionPoints &&
                    subdata.descriptionPoints.map((point, index) => {
                      return (
                        <div className="selected-tool-description" key={index}>
                          {point}
                        </div>
                      );
                    })}
                  {subdata.pointsData &&
                    isOfType(subdata.pointsData, "stringArray") && (
                      <ul>
                        {subdata.pointsData.map((point: string, index) => {
                          return (
                            <li
                              className="selected-tool-description"
                              key={index}
                            >
                              {point}
                            </li>
                          );
                        })}{" "}
                      </ul>
                    )}
                  {subdata.pointsData &&
                    isOfType(subdata.pointsData, "pointObjectArray") && (
                      <ul>
                        {subdata.pointsData.map((point: PointObject, index) => {
                          return (
                            <li
                              className="selected-tool-description"
                              key={index}
                            >
                              <div className="selected-tool-description-point-title">
                                {point.pointTitle}
                              </div>
                              <div className="selected-tool-description-point-description">
                                {point.pointDescription}
                              </div>
                            </li>
                          );
                        })}{" "}
                      </ul>
                    )}
                  <div className="selected-tool-description">
                    {subdata.conclusion}
                  </div>
                  {subdata.cta && subdata.cta.type == "text" && (
                    <div
                      onClick={() =>
                        handleCtaClick(subdata?.cta?.navigate || "")
                      }
                      className="selected-tool-cta-link"
                    >
                      {subdata.cta.title}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {}
    </div>
  );
};

export default AboutSelectedToolComponent;
