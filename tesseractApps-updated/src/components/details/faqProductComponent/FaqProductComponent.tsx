import Accordion from "@mui/material/Accordion";
import "./FaqProductStyles.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import ArrowDown from "../../../assets/arrow_down.svg";
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
              backgroundColor: "#ffffff",
              marginBottom: "10px",
              border: "1px solid #dde4ed",
              borderRadius: "12px !important",
              overflow: "hidden",
              "&::before": { display: "none" },
              "&.Mui-expanded": {
                boxShadow: "0 4px 20px rgba(0,42,82,0.08)",
                borderColor: "rgba(12,120,186,0.25)",
              },
            }}
          >
            <AccordionSummary expandIcon={<img loading="lazy" src={ArrowDown} alt="arrow" className="faq-arrow-icon" />}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  textAlign: "left",
                  fontFamily: "Inter, -apple-system, sans-serif",
                  color: "var(--color-secondary)",
                  lineHeight: 1.4,
                }}
                component="span"
              >
                {data.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                  color: "var(--color-text-gray)",
                  lineHeight: 1.75,
                }}
              >
                {data.answer}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.9375rem",
                  fontWeight: 400,
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                  color: "var(--color-text-gray)",
                  lineHeight: 1.75,
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
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  marginTop: "10px",
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                  color: "var(--color-text-gray)",
                  lineHeight: 1.7,
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
