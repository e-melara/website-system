import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "../views/Home";
import AsesoriaPage from "../views/Asesoria";

export const AuthPrivateRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/asesoria" component={AsesoriaPage} />

        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
