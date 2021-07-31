import React from "react";
import { Link } from "react-router-dom";

import * as Icon from "react-feather";

export function NavItem({title, icon, to}) {
  let IconTheme = Icon.Home;
  if(icon) { IconTheme = Icon[icon]; }
  
  return (
    <li className="sidebar-list nav_bar__li">
      <Link className='sidebar-link sidebar-title link-nav' to={to}>
        <IconTheme />
        <span>{title}</span>
      </Link>
    </li>
  );
}
