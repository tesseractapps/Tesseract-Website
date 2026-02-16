import "./FaqStyles.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ArrowDown from "../../assets/arrow_down.svg";
import { accordiaDummyData } from "../../utils/DummyData";
const FaqComponent = () => {
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
    <div id="faq-container">
      <div className="heading">FAQ's</div>
      <div className="subheading">Have a question about TesseractApps?</div>
      <div className="text" id="faq-text">
        We’re here to help.
      </div>
      <div id="accordian-container">
        {accordiaDummyData.map((data, index) => {
          return (
            <Accordion
              key={data.id}
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
              <AccordionSummary
                expandIcon={<img src={ArrowDown} alt="arrow" />}
              >
                <Typography
                  sx={{ fontSize: "22px", fontWeight: 600, textAlign: "left" }}
                  component="span"
                >
                  {data.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ fontSize: "22px", fontWeight: 600, textAlign: "left" }}
                  component="span"
                >
                  <div id="accordian-text-details">
                    {data.answer}
                    {data.points &&
                      data.points.map((pointsData, pointsindex) => {
                        return (
                          <ul key={pointsindex}>
                            <li>{pointsData}</li>
                          </ul>
                        );
                      })}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};
export default FaqComponent;
