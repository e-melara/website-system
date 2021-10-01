import {
  Modal,
  Row,
  Col,
  PageHeader,
  Button,
  Descriptions,
  Spin,
  Space
} from 'antd'
import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'

import CardUSer from '../../../components/common/CardUser'
import { TypeSolicitudKey } from '../../../utils/utilsStatus'
import { sendSolicitudServer } from '../../../redux/ducks/admin/solicitudes'

export const ModalSuficienciaOTutoriada = ({
  open,
  current,
  onClose,
  typeUser
}) => {
  const dispatch = useDispatch()

  const { data, solicitud, loading } = current
  const { apellidos, carnet, ciclopens, nombres, nomcarrera, nommate } = data
  const { codmate, id, observacion, type, updated_at } = solicitud

  const handlerClickView = (status) => {
    const object = {
      id,
      status,
      type
    }
    onClose(false)
    dispatch(sendSolicitudServer(object))
  }

  console.log(typeUser)

  return (
    <Modal
      width="70%"
      visible={open}
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
                danger
              >
                Denegada
              </Button>
              <Button
                onClick={() => handlerClickView('A')}
                icon={<CheckOutlined />}
                type="primary"
              >
                Aceptada
              </Button>
            </>
          )}
          {typeUser === 1 && (
            <Button
              onClick={() => onClose(false)}
              size="large"
              type="primary"
              icon={<CheckCircleOutlined />}
            >
              Validar pago
            </Button>
          )}
        </Space>
      ]}
      onCancel={() => onClose(false)}
      title="Solicitud: Sexta o Adiccion"
    >
      {loading && <Spin />}
      {!loading && (
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <CardUSer
              user={{
                id: carnet,
                nombres: nombres,
                apellidos: apellidos
              }}
              carrera={{ nomcarrera: nomcarrera }}
            />
          </Col>
          <Col span={16}>
            <PageHeader
              ghost={false}
              title="Solicitud"
              subTitle={<TypeSolicitudKey type={type} />}
            >
              <Descriptions size="middle" column={2}>
                <Descriptions.Item key={codmate} label="Codigo ">
                  {codmate}
                </Descriptions.Item>
                <Descriptions.Item key={updated_at} label="Hace ">
                  <Moment date={updated_at} fromNow />
                </Descriptions.Item>
                <Descriptions.Item key={nommate} label="Materia ">
                  {nommate}
                </Descriptions.Item>
                <Descriptions.Item key={ciclopens} label="Ciclo ">
                  {ciclopens}
                </Descriptions.Item>
                <Descriptions.Item
                  key={observacion}
                  span={2}
                  label="Observacion "
                >
                  {observacion}
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
      )}
    </Modal>
  )
}
