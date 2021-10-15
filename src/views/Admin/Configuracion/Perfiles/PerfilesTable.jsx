import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EyeFilled, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Table, Tag, Button, Row, Col, Modal, Form, Space } from 'antd'

import { InpuType } from '../../../../components/common'
import {
  loadingPage,
  addNewPerfil,
  editPerfil
} from '../../../../redux/ducks/admin/perfiles'

const TagComponent = ({ modulos }) => {
  return (
    <>
      {modulos.map(function ({ nombre }, index) {
        return (
          <Tag key={index} color="geekblue">
            {nombre}
          </Tag>
        )
      })}
    </>
  )
}

export const PerfilesTable = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.adminPerfiles)

  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState({})

  const handlerOnFinish = (values) => {
    setVisible(false)
    form.resetFields()
    if (current.id) {
      dispatch(
        editPerfil({
          id: current.id,
          nombre: values.nombre
        })
      )
    } else {
      dispatch(addNewPerfil(values))
    }
  }

  const handlerEditButton = (record) => {
    const { nombre } = record
    setVisible(true)
    setCurrent(record)
    form.setFieldsValue({
      nombre
    })
  }

  React.useEffect(() => {
    dispatch(loadingPage())
  }, [dispatch])

  React.useEffect(() => {
    if (!visible) {
      form.resetFields()
      setCurrent({})
    }
  }, [visible, form])

  const columns = [
    {
      key: 'nombre',
      title: 'Nombre',
      align: 'center',
      dataIndex: 'nombre'
    },
    {
      dataIndex: 'modulos',
      title: 'Modulos',
      render: (modulos) => <TagComponent modulos={modulos} />
    },
    {
      key: 'is_admin',
      align: 'center',
      dataIndex: 'is_admin',
      title: 'Tipo de usuario',
      render: (is_admin) => {
        return (
          <Tag color={is_admin ? 'blue' : 'cyan'}>
            {is_admin ? 'Administrador' : 'Estudiante'}
          </Tag>
        )
      }
    },
    {
      key: 'actions',
      align: 'center',
      dataIndex: 'actions',
      render: (_, record) => {
        return (
          <>
            <Space>
              <Link to={`/admin/a/view/${record.id}`}>
                <Button icon={<EyeFilled />} type="dashed" size="large" />
              </Link>
              <Button
                onClick={() => handlerEditButton(record)}
                type="ghost"
                icon={<EditOutlined />}
                size="large"
              />
            </Space>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Row gutter={[24, 24]} className="p-4" justify="space-between">
        <Col span={10}>
          <h2>Perfiles</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => setVisible(true)}
            icon={<PlusOutlined />}
          >
            Nuevo Perfil
          </Button>
        </Col>
      </Row>
      <Table
        bordered
        rowKey="id"
        size="small"
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      <Modal
        footer={[]}
        visible={visible}
        title="Matenimiento perfil"
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          size="large"
          autoComplete="off"
          name="form-perfil-name"
          onFinish={handlerOnFinish}
        >
          <InpuType
            column={{ span: 24 }}
            item={{
              name: 'nombre',
              label: '',
              rules: [{ required: true, message: 'El nombre es requerido' }]
            }}
            input={{
              placeholder: 'Introduzca el nombre del perfil'
            }}
          />
          <Row justify="end">
            <Col>
              <Button htmlType="submit" type="primary" icon={<PlusOutlined />}>
                Agregar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
