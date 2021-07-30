import React from "react";

import Navbar from "./Navbar";
import Logo from "./Sidebar/Logo";

export const SideBar = () => {
  return (
    <div className="sidebar-wrapper">
      <Logo />
      <Navbar />
    </div>
  );
};
