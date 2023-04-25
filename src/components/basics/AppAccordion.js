import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";

export default function AppAccordion({
  title,
  description,
  panelName,
  ...otherProps
}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === panelName}
        onChange={handleChange(panelName)}
        {...otherProps}
      >
        <AccordionSummary
        // expandIcon={<IoIosArrowDown />}
        // aria-controls="panel1bh-content"
        // id="panel1bh-header"
        >
          {title}
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
