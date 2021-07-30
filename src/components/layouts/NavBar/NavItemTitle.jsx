import React from "react";

export const NavItemTitle = ({ title, description }) => {
  return (
    <li className="sidebar-main-title">
      <div>
        <h6 className="lan-1">{title}</h6>
        <p className="lan-2">{description}</p>
      </div>
    </li>
  );
};