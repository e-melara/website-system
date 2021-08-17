import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "../views/Home";
import NotesPages from "../views/Notes";
import PensumPage from "../views/Pensum";
import HorarioPage from "../views/Horario";
import Calendario from "../views/Calendario";

export const AuthPrivateRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/notes"      component={NotesPages} />
        <Route exact path="/asesoria"   component={PensumPage} />
        <Route exact path="/horario"    component={HorarioPage} />
        <Route exact path='/calendario' component={Calendario} />

        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
