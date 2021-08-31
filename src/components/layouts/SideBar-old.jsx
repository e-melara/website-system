import React from "react";

import Navbar from "./Navbar";
import Logo from "./Sidebar/Logo";

export const SideBar = ({ isClose }) => {
  return (
    <div className={`sidebar-wrapper ${isClose ? "close_icon" : ""}`}>
      <div>
        <Logo />
        <Navbar />
      </div>
    </div>
  );
};
