import { connect } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthPrivateRoute } from "./AuthPrivateRoute";

import { startChecking } from "../redux/login";
import Loading from "../components/common/Loading";

const AppRouter = ({ auth: { isAuthenticated, checking }, dispatch }) => {
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

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
            path="/"
            component={AuthPrivateRoute}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AppRouter);
