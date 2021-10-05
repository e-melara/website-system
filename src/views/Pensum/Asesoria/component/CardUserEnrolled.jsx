import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Card, Alert, Space, Button, Tag } from 'antd'
import { PaperClipOutlined, FilePdfOutlined } from '@ant-design/icons'

import { BaseAssets } from '../../../../consts'
import { StatusTagAsesoria } from '../../../../components/common/TagEstado'

const objectValues = {
  Activa: 'magenta',
  Validar: 'volcano',
  Pendiente: 'red',
  Inscriptas: 'gold',
  Matriculado: 'success'
}

const messageAsesoria = {
  Activa: 'Se ha enviado la asesoria al proceso de validacion',
  Matriculado: 'La asesoria ha sido matriculada con exito',
  Validar:
    'Su asesoria ha sido validad, puede realizar el pago en ventanilla o por medio de tranferencia electronica (PxT) dando click al boton de pago',
  Pendiente:
    'Por el momento la asesoria tiene observaciones, estar pendiente por favor',
  Inscriptas: 'La asesoria has sido validad y sus materias estas inscriptas',
  'Validacion de pago':
    'Su pago esta en proceso de validacion, de 3 a 4 dias habiles se aplicara su inscripcion de materias'
}

const messageAsesoriaColor = {
  Activa: 'info',
  Validar: 'info',
  Pendiente: 'error',
  Inscriptas: 'warning',
  Matriculado: 'success'
}

const AlertValidar = ({ estado }) => {
  return (
    <Alert
      showIcon
      style={{ padding: 20, fontSize: '1.2rem', textAlign: 'center' }}
      type="success"
      action={
        <Space wrap size="large">
          <Link to="/asesoria/form">
            <Button type="dashed" icon={<PaperClipOutlined />} size="middle">
              Pago
            </Button>
          </Link>
        </Space>
      }
      message={messageAsesoria[estado]}
    />
  )
}

export default function CardUserEnrolled({ enrolled }) {
  const { schules, estado } = enrolled

  const handlerOnViewPdf = ({ carnet }) => {
    const token = localStorage.getItem('token')
    window.open(`${BaseAssets}pdf/matricula/${carnet}?token=${token}`)
  }

  const columns = [
    {
      title: 'Codigo',
      dataIndex: 'codmate',
      key: 'codmate'
    },
    {
      title: 'Materia',
      dataIndex: 'nommate',
      key: 'nommate'
    },
    {
      title: 'Dias',
      dataIndex: 'dias',
      key: 'dias'
    },
    {
      title: 'Horarios',
      dataIndex: 'hora',
      key: 'hora'
    },
    {
      title: 'Grupo',
      dataIndex: 'turno',
      key: 'turno'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      align: 'center',
      render: (status) => <StatusTagAsesoria status={status} />
    }
  ]

  return (
    <>
      <Card
        title="Hoja de asesoria"
        extra={
          <Space>
            <Tag color={objectValues[estado]}>{estado}</Tag>
            {estado === 'Matriculado' && (
              <Button
                size="middle"
                onClick={() => handlerOnViewPdf(enrolled)}
                type="dashed"
                icon={<FilePdfOutlined />}
              />
            )}
          </Space>
        }
      >
        <Table
          bordered
          rowKey="codmate"
          columns={columns}
          dataSource={schules}
          pagination={false}
        />
        {estado !== 'Validar' ? (
          <Alert
            showIcon
            title="Obsevacion"
            style={{ padding: 20, fontSize: '1.2rem', textAlign: 'center' }}
            type={messageAsesoriaColor[estado]}
            message={enrolled.observacion || messageAsesoria[estado]}
          />
        ) : (
          <AlertValidar estado={estado} />
        )}
      </Card>
    </>
  )
}
