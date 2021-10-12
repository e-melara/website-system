import React from 'react'
import { map } from 'lodash'
import { Switch, Route } from 'react-router-dom'

import Error404 from '../views/Error404'

// Routes for students
import HomePage from '../views/Home'
import NotesPages from '../views/Notes'
import PensumPage from '../views/Pensum'
import HorarioPage from '../views/Horario'
import Solicitud from '../views/Solicitud'
import Calendario from '../views/Calendario'
import { SolicitudAdd } from '../views/Solicitud/SolicitudAdd'
import FormAsesoria from '../views/Pensum/Asesoria/FormAsesoria'
import SolicitudNuevaPage from '../views/Solicitud/SolicitudNuevaPage'

// Routes administrado
import AsesoriaTable from '../views/Admin/Asesoria/AsesoriaTable'
import { TableSolicitudes } from '../views/Admin/Solicitud/TableSolicitudes'
import { TableUsers } from "../views/Admin/Configuracion/Usuarios/TableUsers";

const routes = [
  {
    to: '/notes',
    key: '/notes',
    component: <NotesPages />
  },
  {
    to: '/asesoria',
    key: '/asesoria',
    component: <PensumPage />
  },
  {
    key: '/asesoria',
    to: '/asesoria/form',
    component: <FormAsesoria />
  },
  {
    to: '/solicitud',
    key: '/solicitud',
    component: <Solicitud />
  },
  {
    key: '/solicitud',
    to: '/solicitud/s/new',
    component: <SolicitudNuevaPage />
  },
  {
    key: '/solicitud',
    to: '/solicitud/s/add',
    component: <SolicitudAdd />
  },
  {
    to: '/calendario',
    key: '/calendario',
    component: <Calendario />
  },
  {
    to: '/horario',
    key: '/horario',
    component: <HorarioPage />
  },
  {
    key: '/admin/r/asesoria',
    to: '/admin/r/asesoria',
    component: <AsesoriaTable />
  },
  {
    key: '/admin/c/asesoria',
    to: '/admin/c/asesoria',
    component: <AsesoriaTable />
  },
  {
    key: '/admin/a/asesoria',
    to: '/admin/a/asesoria',
    component: <AsesoriaTable />
  },
  {
    key: '/admin/r/solicitudes',
    to: '/admin/r/solicitudes',
    component: <TableSolicitudes />
  },
  {
    key: '/admin/c/solicitudes',
    to: '/admin/c/solicitudes',
    component: <TableSolicitudes />
  },
  // admin user
  {
    key: '/admin/a/usuarios',
    to: '/admin/a/usuarios',
    component: <TableUsers />
  }
]

const RouteComponent = ({ routesState }) => {
  const array = map(routesState, 'short_name')
  const routeComponent = routes
    .filter(function (route) {
      return array.includes(route.key)
    })
    .map((route) => (
      <Route
        key={route.to}
        exact
        path={route.to}
        component={() => route.component}
      />
    ))

  return (
    <>
      <Switch>
        {routeComponent}
        <Route path="/" exact component={HomePage} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  )
}

export default RouteComponent
