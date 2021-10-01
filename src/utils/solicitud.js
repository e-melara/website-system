import { isEqual } from 'lodash'

export const validateSextaSubjectUtils = (current, arraySchules = []) => {
  let resolve = {
    validate: false,
    subjectObject: null
  }

  const { item } = current
  const { schules } = arraySchules
  schules.forEach((element) => {
    if (isEqual(element.hora, item.hora) && isEqual(element.dias, item.dias)) {
      resolve = {
        validate: true,
        subjectObject: element
      }
      return
    }
  })
  return resolve
}

// validado si tiene menos de 5 materias o si la asesoria ya ha sido registrada
export const validateAddSubjects = (enrolleds) => {
  const { estado, schules } = enrolleds
  if (estado !== 'Matriculado') {
    return {
      response: false,
      msg: 'Lo sentimos pero la asesoria actual no ha sido matriculada aun'
    }
  }

  if (schules.length >= 5) {
    return {
      response: false,
      msg: 'Lo sentimos pero no puede agregar mas materias, un limite de 5'
    }
  }

  return {
    response: true,
    msg: ''
  }
}

export const validatedAddSubjects = ({ schules }, rowsSelections, row) => {
  const array = [...schules, ...rowsSelections]

  if (array.length >= 5) {
    return {
      ok: false,
      msg: 'Solo puedes elegir un maximo de 5 materias'
    }
  }

  for (const { dias, hora, nommate, materia } of array) {
    if (dias === row.dias && hora === row.hora) {
      return {
        ok: false,
        msg: `El horario elegido es el mismo de la materia ${
          nommate || materia
        }`
      }
    }
  }

  return {
    ok: true,
    msg: 'La materia fue agregada con exito!'
  }
}
