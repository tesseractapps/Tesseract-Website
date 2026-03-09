import Accordion from "@mui/material/Accordion";
import "./faqProductStyles.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import ArrowDown from "../../assets/arrow_down.svg";
interface faqProductionTypes {
  data: {
    question: string;
    answer: string;
    points?: string[];
    conclusion?: string;
  }[];
}
const FaqProductComponent = ({ data }: faqProductionTypes) => {
  const [expanded, setExpanded] = useState(-1);

  const handleExpansion = (index: number) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded === index) {
        return -1; // Collapse the currently expanded item
      } else {
        return index; // Expand the clicked item
      }
    });
  };
  return (
    <div id="faq-product-container">
      {data.map((data, index) => {
        return (
          <Accordion
            key={index}
            className="faq-accordian"
            elevation={0}
            square
            expanded={expanded === index}
            onChange={() => handleExpansion(index)}
            sx={{
              backgroundColor: "#eaeaea",
              marginBottom: "5px",
            }}
          >
            <AccordionSummary expandIcon={<img loading="lazy" src={ArrowDown} alt="arrow" />}>
              <Typography
                sx={{
                  fontSize: "26px",
                  fontWeight: 600,
                  textAlign: "left",
                  fontFamily: "roboto",
                }}
                component="span"
              >
                {data.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 400,
                  textAlign: "left",
                  fontFamily: "inter",
                }}
              >
                {data.answer}
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 400,
                  textAlign: "left",
                  fontFamily: "inter",
                }}
              >
                {data.points &&
                  data.points.map((pointsData, pointsindex) => {
                    return (
                      <ul key={pointsindex}>
                        <li>{pointsData}</li>
                      </ul>
                    );
                  })}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "10px",
                  textAlign: "left",
                  fontFamily: "inter",
                }}
              >
                {data.conclusion}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default FaqProductComponent;
