import React from "react";

import { NavItem } from "./NavBar/NavItem";
import { NavBarBody } from "./NavBar/NavBarBody";
import { NavItemTitle } from "./NavBar/NavItemTitle";
import { routesExample } from "../../utils/routesExample";

function Navbar() {
  return (
    <NavBarBody>
      {routesExample.map((item, index) => {
        return item.isTitle ? (
          <NavItemTitle {...item} key={`${index}-${item.icon}-${item.title}`} />
        ) : (
          <NavItem {...item} key={`${index}-${item.icon}-${item.title}`} />
        );
      })}
    </NavBarBody>
  );
}

export default Navbar;
