import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import ImageProfile from "../../../../assets/images/profile/3.png";

const ItemNavStudent = ({ index }) => {
  const { url } = useRouteMatch();

  return (
    <NavLink
      to={`${url}/${index}`}
      className="nav-link"
      activeClassName="active"
    >
      <div className="media">
        <img
          src={ImageProfile}
          alt="imgs user students"
          className="img-50 img-fluid m-r-20 rounded-circle update_img_0"
        />
        <div className="media-body">
          <h6>
            <span className="first_name_0">Bucky</span>
            <span className="last_name_0">Barnes</span>
          </h6>
          <p className="email_add_0">barnes@gmail.com</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ItemNavStudent;
