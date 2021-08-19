import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "reactstrap";
import { HelpCircle } from "react-feather";

const ButtonTooltip = ({ id, message = "NO MESSAGE", position = "top" }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div>
        <HelpCircle
          size={20}
          id={`${id}-tooltip`}
          style={{
            cursor: "pointer",
          }}
        />
        <Tooltip
          placement={position}
          isOpen={tooltipOpen}
          target={`${id}-tooltip`}
          toggle={toggle}
        >
          {message}
        </Tooltip>
      </div>
    </>
  );
};

ButtonTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
  position: PropTypes.string,
};

export default ButtonTooltip;
