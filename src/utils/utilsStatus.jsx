import { Tag } from 'antd'

// Tipos de solicitud
const TypeSolicitud = {
  SEXTA: <Tag color="blue">Sexta Materia</Tag>,
  AGREGAR: <Tag color="cyan">Adiccion de Materias</Tag>,
  TUTORIADA: <Tag color="gold">Materia Tutoriada</Tag>,
  SUFICIENCIA: <Tag color="magenta">Examen de Suficiencia</Tag>
}

export const TypeSolicitudKey = ({ type, color }) => {
  return TypeSolicitud[type] || TypeSolicitud['SEXTA']
}

// estado aprobacion
const TypeSolicitudStatus = {
  I: <Tag color="blue">Iniciada</Tag>,
  D: <Tag color="error">Denegada</Tag>,
  A: <Tag color="cyan">Aceptada</Tag>
}

export const TypeSolicitudStatusKey = ({ status }) =>
  TypeSolicitudStatus[status] || TypeSolicitudStatus['I']
