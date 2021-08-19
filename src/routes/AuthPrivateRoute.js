import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "../views/Home";
import NotesPages from "../views/Notes";
import PensumPage from "../views/Pensum";
import Solicitud from "../views/Solicitud";
import HorarioPage from "../views/Horario";
import Calendario from "../views/Calendario";

// Routes para administrador
import AsesoriaAdmin from "../views/Admin/AsesoriaAdmin";

export const AuthPrivateRoute = () => {
  return (
    <>
      <Switch>
        {/* Rutas para el estudiante */}
        <Route exact path="/notes" component={NotesPages} />
        <Route exact path="/asesoria" component={PensumPage} />
        <Route exact path="/horario" component={HorarioPage} />
        <Route exact path="/solicitud" component={Solicitud} />
        <Route exact path="/calendario" component={Calendario} />

        {/* Rutas para el administrador */}
        <Route path="/admin/a/registro" component={AsesoriaAdmin} />

        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
