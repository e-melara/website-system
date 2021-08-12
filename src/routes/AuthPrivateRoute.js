import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "../views/Home";
import PensumPage from "../views/Pensum";
// import AsesoriaPage from "../views/Asesoria";

export const AuthPrivateRoute = () => {
  return (
    <>
      <Switch>
        {/* <Route exact path="/pensum" component={PensumPage} /> */}
        <Route exact path="/asesoria" component={PensumPage} />

        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
