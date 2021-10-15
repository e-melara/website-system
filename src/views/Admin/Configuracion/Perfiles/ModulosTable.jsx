import { map } from 'lodash'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, Row, Col, Modal, Form } from 'antd'

import { Icon, SelectInputType } from '../../../../components/common'
import { deleteModulo } from '../../../../redux/ducks/admin/perfiles'

const { confirm } = Modal
const { Column, ColumnGroup } = Table

const objectStatus = {
  I: <Tag color="#f50">Inactivo</Tag>,
  A: <Tag color="#108ee9">Activo</Tag>
}

export const ModulosTable = ({ loading, modulos, isAdmin, data, add }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modulosPosibles, setModulosPosibles] = useState([])

  useEffect(() => {
    const ids = map(modulos, 'modulo_id')
    const _modulos = data
      .filter((d) => {
        return !ids.includes(d.id)
      })
      .map(function (data) {
        return {
          value: data.id,
          title: `${data.nombre} - ${data.short_name}`
        }
      })
    setModulosPosibles(_modulos)
  }, [modulos, data])

  const handlerFinish = (values) => {
    add(values.modulo)
    handlerIsOpenModal(false)
    form.resetFields()
  }

  const handlerIsOpenModal = (opts = true) => {
    setIsOpenModal(opts)
  }

  const showDeleteConfirm = (record) => {
    const { nombre, id } = record
    confirm({
      width: '40%',
      title: '¿Esta seguro que desea eliminar el modulo?',
      icon: <Icon type="ExclamationCircleOutlined" />,
      content: `Modulo a eliminar: ${nombre}`,
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteModulo({ id }))
      }
    })
  }
  return (
    <div className="p-4">
      <Row justify="end" style={{ padding: '0 0px 1.3rem' }}>
        <Col>
          <Button
            size="large"
            type="primary"
            onClick={handlerIsOpenModal}
            disabled={!isAdmin}
            icon={<Icon type="PlusOutlined" />}
          >
            Agregar modulo
          </Button>
        </Col>
      </Row>
      <Table
        loading={loading}
        size="small"
        dataSource={modulos}
        rowKey="id"
        bordered
        pagination={false}
      >
        <Column align="center" dataIndex="nombre" key="nombre" title="Nombre" />
        <Column
          key="icon"
          title="Icon"
          width="70px"
          align="center"
          dataIndex="icon"
          render={(iconObject) => {
            return <Icon type={iconObject} />
          }}
        />
        <ColumnGroup align="center" title="Permisos">
          <Column
            dataIndex="add"
            key="add"
            render={(add) => objectStatus[add]}
            title="Agregar"
            align="center"
          />
          <Column
            key="update"
            align="center"
            dataIndex="update"
            title="Actualizar"
            render={(update) => objectStatus[update]}
          />
          <Column
            key="delete"
            align="center"
            title="Eliminar"
            dataIndex="delete"
            render={(opts) => objectStatus[opts]}
          />
          <Column
            dataIndex="view"
            key="view"
            title="Ver"
            align="center"
            render={(opts) => objectStatus[opts]}
          />
        </ColumnGroup>
        <Column
          key="actions"
          width="70px"
          align="center"
          dataIndex="actions"
          render={(_, record) => (
            <Button
              danger
              type="primary"
              disabled={!isAdmin}
              onClick={() => showDeleteConfirm(record)}
              icon={<Icon type="DeleteFilled" />}
            />
          )}
        />
      </Table>
      {/* Modal para agregar modulos */}
      <Modal
        centered
        footer={[]}
        title="Agregar modulo"
        visible={isOpenModal}
        onCancel={() => handlerIsOpenModal(false)}
      >
        <Form
          form={form}
          size="large"
          name="form-perfil"
          onFinish={handlerFinish}
        >
          <SelectInputType
            column={{ span: 24 }}
            item={{
              name: 'modulo',
              rules: [{ required: true, message: 'El modulo es requerido' }],
              placeholder: 'Selecccion el modulo agregar'
            }}
            options={modulosPosibles}
          />
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                icon={<Icon type="PlusOutlined" />}
              >
                Agregar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
