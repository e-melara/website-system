import React from 'react'
import {
  CloseOutlined,
  WarningOutlined,
  FilePdfOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Modal, Button, Spin, Table, Row, Col, Card, Space } from 'antd'

import './modal.scss'
import { ContentModalUNI } from './ContentModalUNI'
import CardUser from '../../../components/common/CardUser'
import { enrolledAsesoria } from '../../../redux/ducks/admin/asesoria'
import { StatusTagAsesoria } from '../../../components/common/TagEstado'

const columns = [
  {
    title: 'Codigo',
    dataIndex: 'codmate',
    key: 'codmate',
    align: 'left'
  },
  {
    title: 'Nombre de materia',
    dataIndex: 'nommate',
    key: 'nommate'
  },
  {
    key: 'dias',
    title: 'Dias',
    dataIndex: 'dias',
    align: 'center'
  },
  {
    title: 'Horas',
    dataIndex: 'hora',
    key: 'hora',
    align: 'center'
  },
  {
    key: 'estado',
    title: 'Estado',
    dataIndex: 'estado',
    align: 'center',
    render: (record) => <StatusTagAsesoria status={record} />
  }
]

const AsesoriaModal = ({
  user,
  data,
  isOpen,
  addSend,
  typeUser,
  handlerOpen,
  handlerViewPdf,
  addSelectedKeys
}) => {
  const { loading, isSend, id, enrolled, selectedRowsKeyArray, estado, pago } =
    data

  const dispatch = useDispatch()

  const handlerValidatedPago = () => {
    dispatch(enrolledAsesoria(id))
    handlerOpen(false)
  }

  return (
    <>
      <Modal
        width="80%"
        visible={isOpen}
        closable={false}
        title="Asesoria"
        key={user.carnet}
        footer={[
          <Space wrap className="d-flex justify-content-between">
            <Button
              size="large"
              type="default"
              loading={loading}
              icon={<CloseOutlined />}
              onClick={() => handlerOpen(false)}
            >
              Cancelar
            </Button>
            {!isSend ? (
              <Button
                size="large"
                type="primary"
                loading={loading}
                icon={<CheckCircleOutlined />}
                disabled={selectedRowsKeyArray.length === 0}
                onClick={() => addSend('ACEPTADA', selectedRowsKeyArray, id)}
              >
                Enviar
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                loading={loading}
                onClick={handlerValidatedPago}
                disabled={typeUser === 2}
                icon={<CheckCircleOutlined />}
              >
                Validar pago
              </Button>
            )}
          </Space>
        ]}
      >
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spin size="large" tip="Cargando ..." />
          </div>
        ) : (
          <>
            <Row gutter={[24, 16]}>
              <Col flex="1">
                <CardUser
                  user={{
                    id: user.carnet,
                    nombres: user.nombres,
                    apellidos: user.apellidos
                  }}
                  carrera={user.nomcarrera}
                />
              </Col>
              <Col flex="3">
                <Card
                  key="1-card-content"
                  title="Materias solicitadas"
                  extra={[
                    <Space wrap>
                      {!isSend && (
                        <Button
                          size="large"
                          type="primary"
                          loading={loading}
                          icon={<WarningOutlined />}
                          onClick={() =>
                            addSend('PENDIENTE', selectedRowsKeyArray, id)
                          }
                          disabled={
                            selectedRowsKeyArray.length === 0 ||
                            selectedRowsKeyArray.length === enrolled.length
                          }
                        >
                          Pendientes
                        </Button>
                      )}
                      {
                        typeUser === 1 && estado === 'F' && (
                          <Button onClick={() => handlerViewPdf(user)} type='dashed' size='large' icon={<FilePdfOutlined />} />
                        )
                      }
                    </Space>
                  ]}
                >
                  <Table
                    bordered
                    size="middle"
                    rowKey={(record) => record.id}
                    columns={columns}
                    pagination={false}
                    dataSource={enrolled}
                    expandedRowKeys='nommate'
                    rowSelection={
                      !isSend && {
                        onChange: (selectedKeyRows) => {
                          addSelectedKeys(selectedKeyRows)
                        },
                        fixed: true,
                        hideSelectAll: true,
                        preserveSelectedRowKeys: true,
                        selectedRowKeys: selectedRowsKeyArray
                      }
                    }
                  />
                </Card>
              </Col>
            </Row>
            {typeUser === 1 && estado === 'F' && (
              <ContentModalUNI pago={pago} />
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export default AsesoriaModal
