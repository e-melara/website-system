import { Tag } from 'antd'
import {
  CoffeeOutlined,
  CheckOutlined,
  FieldTimeOutlined,
  CloseCircleOutlined,
  CloudUploadOutlined,
  DollarCircleOutlined,
  DingtalkOutlined
} from '@ant-design/icons'

const statusMap = {
  A: (
    <Tag color="geekblue" icon={<CoffeeOutlined />}>
      Iniciando
    </Tag>
  ),
  P: (
    <Tag color="magenta" icon={<FieldTimeOutlined />}>
      Pendiente
    </Tag>
  ),
  V: (
    <Tag color="volcano" icon={<DollarCircleOutlined />}>
      Impago
    </Tag>
  ),
  F: (
    <Tag color="geekblue" icon={<DollarCircleOutlined />}>
      UNI
    </Tag>
  ),
  M: (
    <Tag color="green" icon={<DingtalkOutlined />}>
      Matriculado
    </Tag>
  )
}

export const StatusTag = ({ status }) => statusMap[status] || <p></p>

const asesoriaStatusMap = {
  D: (
    <Tag color="red" icon={<CloseCircleOutlined />}>
      Denegada
    </Tag>
  ),
  A: (
    <Tag color="blue" icon={<CheckOutlined />}>
      Aceptada
    </Tag>
  ),
  I: (
    <Tag color="volcano" icon={<CloudUploadOutlined />}>
      Inicianda
    </Tag>
  ),
  M: (
    <Tag color="green" icon={<DingtalkOutlined />}>
      Matriculado
    </Tag>
  )
}

export const StatusTagAsesoria = ({ status }) =>
  asesoriaStatusMap[status] || <p></p>
