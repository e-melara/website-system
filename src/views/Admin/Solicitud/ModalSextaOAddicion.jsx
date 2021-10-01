import Moment from 'react-moment'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Modal,
  Spin,
  Col,
  Row,
  Table,
  PageHeader,
  Descriptions,
  Button,
  Alert,
  Divider,
  Space
} from 'antd'

import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'

import CardUser from '../../../components/common/CardUser'
import { sendSolicitudServer } from '../../../redux/ducks/admin/solicitudes'
import {
  TypeSolicitudKey,
  TypeSolicitudStatusKey
} from '../../../utils/utilsStatus'

const columns = [
  {
    key: 'nombre',
    title: 'Materia',
    dataIndex: 'nombre'
  },
  {
    key: 'ciclo',
    title: 'Ciclo',
    align: 'center',
    dataIndex: 'ciclo'
  },
  {
    key: 'dias',
    title: 'Dias',
    align: 'center',
    dataIndex: 'dias'
  },
  {
    key: 'hora',
    title: 'Horario',
    align: 'center',
    dataIndex: 'hora'
  },
  {
    key: 'estado',
    align: 'center',
    title: 'Estado',
    dataIndex: 'estado',
    render: (status) => <TypeSolicitudStatusKey status={status} />
  }
]

export const ModalSextaOAddicion = ({ open, current, onClose, typeUser }) => {
  const dispatch = useDispatch()
  const { data, solicitud, loading } = current
  const { apellidos, carnet, nombres, nomcarrera } = data

  const [rowsSelecteds, setRowsSelecteds] = useState([])

  const {
    carga_academica,
    type,
    updated_at: updated,
    observacion,
    id
  } = solicitud

  const handlerOnChange = (rowsSelected) => {
    setRowsSelecteds(rowsSelected)
  }

  const handlerClickView = (status) => {
    const objects = {
      id,
      type,
      status,
      rows: rowsSelecteds
    }
    onClose(false)
    dispatch(sendSolicitudServer(objects))
  }

  let arrayCarga = carga_academica?.map(function ({
    codcarga,
    id,
    carga,
    estado
  }) {
    return {
      id,
      estado,
      codcarga,
      hora: carga.hora,
      dias: carga.dias,
      nombre: carga.nommate,
      ciclo: carga.ciclopens
    }
  })

  return (
    <Modal
      visible={open}
      width="70%"
      onCancel={() => onClose(false)}
      title="Solicitud: Sexta o Adiccion"
      footer={[
        <Space
          style={{
            width: '100%',
            justifyContent: typeUser === 2 ? 'space-between' : 'end'
          }}
        >
          {typeUser === 2 && (
            <>
              <Button
                onClick={() => handlerClickView('D')}
                icon={<CloseOutlined />}
                type="primary"
                disabled={rowsSelecteds.length > 0}
                danger
              >
                Denegada
              </Button>
              <Button
                icon={<CheckOutlined />}
                disabled={rowsSelecteds.length === 0}
                onClick={() => handlerClickView('A')}
                type="primary"
              >
                Aceptada
              </Button>
            </>
          )}
          {typeUser === 1 && (
            <Button
              onClick={() => onClose(false)}
              type="primary"
              icon={<CheckCircleOutlined />}
              size="large"
            >
              Validar pago
            </Button>
          )}
        </Space>
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <CardUser
              user={{
                id: carnet,
                nombres: nombres,
                apellidos: apellidos
              }}
              carrera={{ nomcarrera: nomcarrera }}
            />
          </Col>
          <Col span={16}>
            <h4>Materias</h4>
            <Table
              bordered
              rowSelection={
                typeUser === 2 && {
                  hideSelectAll: true,
                  onChange: handlerOnChange
                }
              }
              rowKey="id"
              pagination={false}
              columns={columns}
              dataSource={arrayCarga}
            />
            <Divider />
            <PageHeader title="Solicitud">
              <Descriptions size="small" columns={3}>
                <Descriptions.Item label="Tipo de solicitud" span={2}>
                  <TypeSolicitudKey type={type} color="#2db7f5" />
                </Descriptions.Item>
                <Descriptions.Item label="Fecha">
                  <Moment date={updated} fromNow />
                </Descriptions.Item>
                <Descriptions.Item label="Observacion">
                  <Alert
                    type="info"
                    message={observacion}
                    style={{ width: '100%', textAlign: 'center' }}
                  />
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
      )}
    </Modal>
  )
}
