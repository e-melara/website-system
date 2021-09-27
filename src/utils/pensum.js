import { values, map, includes, groupBy, orderBy } from 'lodash'
const stringStatus = (status) => {
  const statusValues = {
    A: 'Activa',
    V: 'Validar',
    F: 'Validacion de pago',
    P: 'Pendiente',
    I: 'Inscriptas',
    M: 'Matriculado'
  }
  return statusValues[status]
}

export const statusEnrolled = (status) => {
  let resolve = { message: 'Activa', type: 'info' }
  if (status === 'A') {
    return resolve
  } else if (status === 'D') {
    return {
      message: 'Denegada',
      type: 'error'
    }
  } else if (status === 'F') {
    return {
      message: 'Facturada',
      type: 'success'
    }
  }
  return resolve
}

export const mapSubjectsActive = (materias) => {
  return values(materias).map((e) =>
    Object.assign({}, e, {
      visible: true
    })
  )
}

export const forEachPensumArrayToProps = (
  pensum,
  approveds,
  takes,
  enrolled,
  reprobadas
) => {
  let enrolledIs = false
  let arrayEnrolleds = []
  const { schules } = enrolled
  const pensumValues = values(pensum)
  const approvedsValues = map(values(approveds), 'materia')
  const takesValues = map(values(takes), 'materia')
  const reprobadasValues = map(values(reprobadas), 'materia')

  if (schules && schules.length > 0) {
    enrolledIs = true
    arrayEnrolleds = schules.filter((s) => {
      return s.estado !== 'D'
    }).map(function(e) {
      return e.codmate
    })
    // arrayEnrolleds = map(schules, 'codmate')
  }

  const pensumEvaluado = pensumValues.map((e) =>
    Object.assign({}, e, {
      take: includes(takesValues, e.codmate),
      approved: includes(approvedsValues, e.codmate),
      enrolled: enrolledIs && includes(arrayEnrolleds, e.codmate),
      reprobada: includes(reprobadasValues, e.codmate)
    })
  )

  return orderBy(groupBy(pensumEvaluado, 'ciclopens'), 'nopensim')
}

export const propsToEnrolled = (data) => {
  let { enrolled, schules } = data
  return Object.assign({}, enrolled, {
    schules,
    estado: stringStatus(enrolled.estado)
  })
}
