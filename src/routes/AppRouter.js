import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { HomePage } from '../views/Home'
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { startChecking } from "../redux/login";
import Loading from "../components/common/Loading";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch])

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
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </>
    </Router>
  );
};
