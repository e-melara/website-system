import { connect } from "react-redux";
import React, { useEffect } from "react";
// import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import AuthPrivateRoute  from "./AuthPrivateRoute";

import { startChecking } from "../redux/ducks/login";
import Loading from "../components/common/Loading";

const AppRouter = ({ isAuthenticated, checking , checkingStart }) => {
  useEffect(() => {
    if(checking) {
      checkingStart();
    }
  }, [checkingStart, checking]);

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
            component={() => <AuthPrivateRoute />}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </>
    </Router>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    checkingStart: () => dispatch(startChecking())
  }
}


const mapStateToProps = (state) => {
  const { isAuthenticated, checking} = state.auth
  return {
    isAuthenticated, checking
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
