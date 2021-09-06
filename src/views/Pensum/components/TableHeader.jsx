import React from "react";

export default function TableHeader({ carrera }) {
  return (
    <>
      <div className="jumbotron">
        <h1 className="display-3">Pensum</h1>
        <p className="lead">
          Carrera: <strong>{carrera.nomcarrera}</strong>
        </p>
        <hr className="my-2" />
        <p className="lead">
          Nota: Este módulo tiene la finalidad de visualizar el desarrollo de la
          carrera a lo largo de los diferentes ciclos de estudio.
        </p>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-evenly align-items-center">
          <div className='cuadro aprobadas'></div>
          <h5>Aprobadas</h5>
        </div>
        <div className="col d-flex justify-content-evenly align-items-center">
          <div className='cuadro inscriptas'></div>
          <h5>Inscritas</h5>
        </div>
        <div className="col d-flex justify-content-evenly align-items-center">
          <div className='cuadro take'></div>
          <h5 style={{ marginLeft: 5, marginBottom: 0 }}>Prerequisitos completos</h5>
        </div>
        <div className="col d-flex justify-content-evenly align-items-center">
          <div className='cuadro'></div>
          <h5>Pendientes</h5>
        </div>
        <div className="col d-flex justify-content-evenly align-items-center">
          <div className='cuadro reprobada'></div>
          <h5>Reprobadas</h5>
        </div>
      </div>
    </>
  );
}