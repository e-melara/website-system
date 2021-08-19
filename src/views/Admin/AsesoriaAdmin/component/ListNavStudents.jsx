import React from "react";

import ItemNavStudent from "./ItemNavStudent";

const ListNavStudents = () => {
  return (
    <div className="nav flex-columns nav-pills justify-content-start d-flex align-content-start ">
      {Array.from(Array(10).fill(1)).map((_, index) => (
        <ItemNavStudent key={index} index={index} />
      ))}
    </div>
  );
};

export default ListNavStudents;
