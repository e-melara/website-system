import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { LoginPage } from "../views/Login";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route exact path="/auth/login" component={LoginPage} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};
