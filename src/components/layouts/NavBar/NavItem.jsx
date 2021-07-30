import React from "react";
import * as Icon from "react-feather";

export function NavItem({title, icon}) {
  let IconTheme = Icon.Home;
  if(icon) { IconTheme = Icon[icon]; }
  
  return (
    <li className="sidebar-list nav_bar__li">
      <a className="sidebar-link sidebar-title link-nav" href="/#">
        <IconTheme />
        <span>{title}</span>
      </a>
    </li>
  );
}
