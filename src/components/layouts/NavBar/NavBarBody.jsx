import React from "react";

export function NavBarBody({children}) {
  return (
    <nav className="sidebar-main">
      <div className="sidebar-menu">
        <ul className="sidebar-links" id="simple-bar">
          <div className="simplebar-wrapper">
            <div className="simplebar-mask">
              <div className="simplebar-offset">
                <div className="simplebar-content-wrapper">
                  <div className="simplebar-content">
                    <li className="back-btn"></li>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
}
