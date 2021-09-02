import React from "react";
import { useSelector } from "react-redux";

import Route from "../routes/routes";

import LayoutComponent from "../components/layouts";

function AuthPrivateRoute() {
  const { routes } = useSelector((state) => state.auth);

  return (
    <LayoutComponent>
      <Route routesState={routes} />
    </LayoutComponent>
  );
}

export default AuthPrivateRoute;
