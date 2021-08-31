import React from "react";
import { map } from "lodash";
import { Switch, Route } from "react-router-dom";

import HomePage from "../views/Home";
import NotesPages from "../views/Notes";
import PensumPage from "../views/Pensum";
import HorarioPage from "../views/Horario";
import Calendario from "../views/Calendario";
import Solicitud from "../views/Solicitud";

import SolicitudNuevaPage from "../views/Solicitud/SolicitudNuevaPage";

const routes = [
  {
    to: "/notes",
    key: "/notes",
    component: <NotesPages />,
  },
  {
    to: "/asesoria",
    key: "/asesoria",
    component: <PensumPage />,
  },
  {
    to: "/solicitud",
    key: "/solicitud",
    component: <Solicitud />,
  },
  {
    key: "/solicitud",
    to: "/solicitud/s/new",
    component: <SolicitudNuevaPage />,
  },
  {
    to: "/calendario",
    key: "/calendario",
    component: <Calendario />,
  },
  {
    to: "/horario",
    key: "/horario",
    component: <HorarioPage />,
  },
];

const RouteComponent = ({ routesState }) => {
  const array = map(routesState, "short_name");
  const routeComponent = routes
    .filter(function (route) {
      return array.includes(route.key);
    })
    .map((route) => (
      <Route
        key={route.to}
        exact
        path={route.to}
        component={() => route.component}
      />
    ));

  return (
    <>
      <Switch>
        {routeComponent}
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default RouteComponent;
