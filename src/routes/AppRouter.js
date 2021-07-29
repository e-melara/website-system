import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { HomePage } from '../views/Home'
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { KeyLocalStorage } from "../consts";
import { PrivateRoute } from "./PrivateRoute";
import { axiosConfig } from "../config/axios";

import Loading from "../components/common/Loading";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axiosConfig.post("auth/me")
      .then(response=> {
        setChecking(false);
        setIsLoggedIn(true);
      })
      .catch(error => {
        const {response} = error;
        if(response.status === 401) {
          localStorage.removeItem(KeyLocalStorage);
        }
        setChecking(false);
        setIsLoggedIn(false);
      })
  }, []);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
            isAuthenticated={isLoggedIn}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </>
    </Router>
  );
};
