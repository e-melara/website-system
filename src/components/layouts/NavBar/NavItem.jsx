import React from "react";
import { NavLink } from "react-router-dom";

import * as Icon from "react-feather";

export function NavItem({ title, icon, to }) {
  let IconTheme = Icon.Home;
  if (icon) {
    IconTheme = Icon[icon];
  }

  return (
    <li className="sidebar-list nav_bar__li">
      <NavLink
        to={to}
        style={{ marginBottom: "5px" }}
        className="sidebar-link sidebar-title link-nav"
      >
        <IconTheme />
        <span>{title}</span>
      </NavLink>
    </li>
  );
}
