import React from "react";
import classNames from "classnames";

const EstadoSextaMateria = ({ estado }) => {
  let txt = estado.toLowerCase();
  const stringStatus =
    txt === "i" ? "Inicianda" : txt === "A" ? "Aceptada" : "Denegada";

  return (
    <div
      className={classNames({
        span: true,
        badge: true,
        "rounded-pill": true,
        "pill-badge-primary": txt === "i",
        "pill-badge-danger": txt === "d",
        "pill-badge-success": txt === "a",
      })}
    >
      <span>{stringStatus}</span>
    </div>
  );
};

export default EstadoSextaMateria;
