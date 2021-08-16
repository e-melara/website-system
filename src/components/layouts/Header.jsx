import React from "react";
import { Row } from "reactstrap";

import HeaderLeft from "./Header/HeaderLeft";
import HeaderRight from "./Header/HeaderRight";

export const Header = ({ isClose }) => {
  return (
    <header className={`page-header ${isClose ? "close_icon" : ""}`}>
      <Row className="header-wrapper m-0 row">
        <HeaderLeft />
        <HeaderRight />
      </Row>
    </header>
  );
};
