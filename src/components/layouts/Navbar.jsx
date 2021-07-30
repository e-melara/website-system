import React from "react";

import './NavBar/NavBar.scss'
import { NavItem } from "./NavBar/NavItem";
import { NavItemTitle } from "./NavBar/NavItemTitle";

function Navbar() {
  return (
    <nav className="sidebar-main">
      <div className="sidebar-menu">
        <ul className="sidebar-links" id="simple-bar">
          <NavItemTitle
            title="General"
            description="Dashboards,widgets & layout."
          />
          <NavItem/>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
