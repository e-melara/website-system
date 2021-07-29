import React from "react";

export default function Loading() {
  return (
    <div className="loader-wrapper">
      <div className="loader-index">
        <span></span>
      </div>
      <svg>
        <defs></defs>
        <filter id="goo">
          <fegaussianblur
            in="SourceGraphic"
            result="blur"
          ></fegaussianblur>
          <fecolormatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          >
          </fecolormatrix>
        </filter>
      </svg>
    </div>
  );
}
