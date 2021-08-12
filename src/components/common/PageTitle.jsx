import React from "react";
import PropTypes from "prop-types";
import { Home } from "react-feather";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const PageTitle = ({ title, urls }) => {
  return (
    <div className="page-title">
      <Row>
        <Col>
          <h3>{title}</h3>
        </Col>
        <Col>
          {urls && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <Home />
                </Link>
              </li>
              {urls.map((item, index) => {
                return (
                  <li className="breadcrumb-item" key={`breadcrum - ${index}`}>
                    {item}
                  </li>
                );
              })}
            </ol>
          )}
        </Col>
      </Row>
    </div>
  );
};

PageTitle.propTypes = {
  urls: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default PageTitle;
