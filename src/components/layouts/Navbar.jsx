import React from "react";
import { connect } from "react-redux";

import { NavItem } from "./NavBar/NavItem";
import { NavBarBody } from "./NavBar/NavBarBody";

function Navbar({ routes }) {
  const mapToRoutes = routes.map(function (item, index) {
    return (
      <NavItem
        key={`${index}-routes`}
        title={item.nombre}
        to={item.short_name}
        icon={item.icon}
      />
    );
  });
  return <NavBarBody>{mapToRoutes}</NavBarBody>;
}

const mapStateToProps = (state) => {
  return {
    routes: state.auth.routes,
  };
};

export default connect(mapStateToProps)(Navbar);
