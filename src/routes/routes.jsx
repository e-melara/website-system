import React from "react";
import { map } from "lodash";
import { Switch, Route } from "react-router-dom";

import Error404 from "../views/Error404";

// Routes for students
import HomePage from "../views/Home";
import NotesPages from "../views/Notes";
import PensumPage from "../views/Pensum";
import HorarioPage from "../views/Horario";
import Solicitud from "../views/Solicitud";
import Calendario from "../views/Calendario";
import FormAsesoria from "../views/Pensum/Asesoria/FormAsesoria";
import SolicitudNuevaPage from "../views/Solicitud/SolicitudNuevaPage";

// Routes administrado
import AsesoriaTable from "../views/Admin/Asesoria/AsesoriaTable";

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
    key: "/asesoria",
    to: "/asesoria/form",
    component: <FormAsesoria />,
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
  {
    key: "/admin/r/asesoria",
    to: "/admin/r/asesoria",
    component: <AsesoriaTable />,
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
        <Route path="/" exact component={HomePage} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
};

export default RouteComponent;
