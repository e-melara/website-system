import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Table,
  Tag,
  Col,
  Row,
  Form,
  Space,
  Button,
  Modal,
  Input,
  Tooltip
} from 'antd'

import {
  UserOutlined,
  LikeOutlined,
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
  UnlockOutlined,
  WechatOutlined,
  SearchOutlined,
  DislikeOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import { InpuType, SelectInputType } from '../../../../components/common'
import {
  pageLoading,
  darBajaUser,
  onChangePerfil,
  onChangePassword,
  changeUserNombresApellidos
} from '../../../../redux/ducks/admin/users'

const objectStatus = {
  1: <Tag color="#108ee9">Activado</Tag>,
  0: <Tag color="#f50">Descativado</Tag>
}

const { confirm } = Modal
const { Search } = Input

export const TableUsers = () => {
  // object form
  const [form] = Form.useForm()
  const [formPerfil] = Form.useForm()
  const [formEditForm] = Form.useForm()

  const dispatch = useDispatch()
  const { data, loading, page, perfiles } = useSelector(
    (state) => state.adminUser
  )

  // useState
  const [user, setUser] = useState({})
  const [formEdit, setFormEdit] = useState(false)
  const [visiblePerfil, setVisiblePerfil] = useState(false)
  const [perfilesPosibles, setPerfilesPosibles] = useState([])
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [filters, setFilters] = React.useState({
    page: 1,
    search: ''
  })

  React.useEffect(() => {
    dispatch(pageLoading({ ...filters }))
  }, [dispatch, filters])

  // handler
  const handlerOpenPerfil = React.useCallback(
    (options = true, user = {}) => {
      setUser(user)
      setVisiblePerfil(options)

      const _filterPerfil = perfiles.filter(
        (perfil) => perfil.value !== user.perfil_id
      )
      setPerfilesPosibles(_filterPerfil)
      formPerfil.resetFields()
    },
    [formPerfil, perfiles]
  )

  const handlerOpenPassword = React.useCallback((options = true, user = {}) => {
    setUser(user)
    setVisiblePassword(options)
  }, [])

  const handlerDarBajaUser = React.useCallback(
    (user) => {
      const { nomuser, apeuser, id, estado } = user
      confirm({
        okText: 'Si',
        width: '40%',
        okType: 'danger',
        cancelText: 'Cancelar',
        title: 'Cambiar estado del usuario',
        icon: <ExclamationCircleOutlined />,
        content: `¿Esta seguro que desea cambiar el estado de ${nomuser} ${apeuser}?`,
        // actions
        onOk: () => {
          dispatch(darBajaUser({ id, estado: !estado }))
        }
      })
    },
    [dispatch]
  )

  const handlerEditForm = React.useCallback((users, options = true) => {
    setUser(users)
    setFormEdit(options)

    formEditForm.setFieldsValue({
      nombres: users.nomuser,
      apellidos: users.apeuser
    })
  }, [formEditForm])

  // finish formulario
  const handlerFinishPassword = (values) => {
    form.resetFields()
    handlerOpenPassword(false)
    dispatch(
      onChangePassword({
        loading: true,
        password: values.password,
        usuario: user.usuario_id
      })
    )
  }

  const handlerFinishEditForm = (values) => {
    setFormEdit(false)
    formEditForm.resetFields()
    dispatch(
      changeUserNombresApellidos({
        ...values,
        usuario: user.usuario_id
      })
    )
  }

  const handlerFinishPerfil = (values) => {
    formPerfil.resetFields()
    handlerOpenPerfil(false)
    dispatch(
      onChangePerfil({
        usuario: user.usuario_id,
        perfil: values.perfil
      })
    )
  }
  // ========================================

  // formulario component
  const handlerSearch = (values) => {
    setFilters({
      page: 1,
      search: values.trim()
    })
  }

  const handlerChangePaginate = ({ current }) => {
    setFilters((filter) => ({
      ...filter,
      page: current
    }))
  }

  // columns
  const columns = React.useMemo(
    () => [
      {
        key: 'usuario_id',
        title: 'Usuario',
        align: 'center',
        dataIndex: 'usuario_id'
      },
      {
        key: 'nomuser',
        title: 'Nombres',
        dataIndex: 'nomuser'
      },
      {
        key: 'apeuser',
        title: 'Apellidos',
        dataIndex: 'apeuser'
      },
      {
        key: 'nombre',
        width: '100px',
        title: 'Perfil',
        dataIndex: 'nombre',
        render: (perfil) => (
          <Tag color="#3b5999" icon={<WechatOutlined />}>
            {perfil}
          </Tag>
        )
      },
      {
        key: 'estado',
        width: '80px',
        title: 'Estado',
        align: 'center',
        dataIndex: 'estado',
        render: (estado) => objectStatus[estado]
      },
      {
        title: '',
        key: 'actions',
        width: '130px',
        render: (record) => {
          const { estado } = record
          return (
            <Space size="small">
              <Tooltip
                placement="top"
                title={estado ? 'Dar de baja' : 'Dar de alta'}
              >
                <Button
                  danger={estado}
                  icon={estado ? <DislikeOutlined /> : <LikeOutlined />}
                  onClick={() => handlerDarBajaUser(record)}
                  type="dashed"
                />
              </Tooltip>
              <Tooltip placement="top" title="Cambiar la contraseña">
                <Button
                  type="ghost"
                  icon={<UnlockOutlined />}
                  onClick={() => handlerOpenPassword(true, record)}
                />
              </Tooltip>
              <Tooltip placement="top" title="Cambiar perfil">
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  onClick={() => handlerOpenPerfil(true, record)}
                />
              </Tooltip>
              <Tooltip placement="top" title="Editar">
                <Button
                  type="dashed"
                  icon={<EditOutlined />}
                  onClick={() => handlerEditForm(record)}
                />
              </Tooltip>
            </Space>
          )
        }
      }
    ],
    [
      handlerDarBajaUser,
      handlerEditForm,
      handlerOpenPerfil,
      handlerOpenPassword
    ]
  )

  return (
    <>
      <Row gutter={[24, 24]} className="p-4" justify="space-between">
        <Col span={10}>
          <h2>Solicitudes</h2>
        </Col>
        <Col span={14}>
          <Space style={{ float: 'right' }}>
            <Search
              size="large"
              allowClear
              onSearch={handlerSearch}
              placeholder="Buscar ...."
              enterButton={<SearchOutlined />}
              style={{ width: 300, float: 'right' }}
            />
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              Nuevo
            </Button>
          </Space>
        </Col>
      </Row>
      <Table
        size="middle"
        bordered
        dataSource={data}
        loading={loading}
        columns={columns}
        rowKey="usuario_id"
        onChange={handlerChangePaginate}
        pagination={{
          ...page,
          position: ['bottomCenter']
        }}
      />
      {/* Modal para editar */}
      <Modal
        centered
        width="50%"
        footer={[]}
        visible={formEdit}
        title="Editar Usuario"
        onCancel={() => handlerEditForm({}, false)}
      >
        <Form
          size="large"
          autoComplete="off"
          form={formEditForm}
          name="edit-form-usuario"
          onFinish={handlerFinishEditForm}
        >
          <Row gutter={[24, 24]}>
            <InpuType
              column={{ span: 12 }}
              item={{
                label: '',
                name: 'nombres',
                hasFeedback: true,
                rules: [
                  {
                    required: true,
                    message: 'Los nombres son requeridos'
                  }
                ]
              }}
              input={{
                allowClear: true,
                placeholder: 'Nombres del usuario'
              }}
            />
            <InpuType
              column={{ span: 12 }}
              item={{
                label: '',
                name: 'apellidos',
                hasFeedback: true,
                rules: [
                  {
                    required: true,
                    message: 'Los apellidos son requeridos'
                  }
                ]
              }}
              input={{
                allowClear: true,
                placeholder: 'Apellidos del usuario'
              }}
            />
          </Row>
          <Row justify="end">
            <Button
              ghost
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
            >
              Cambiar
            </Button>
          </Row>
        </Form>
      </Modal>
      {/* Modal Cambiar perfil */}
      <Modal
        centered
        footer={[]}
        title={`Cambiar perfil: ${user.nombre}`}
        visible={visiblePerfil}
        onCancel={() => handlerOpenPerfil(false)}
      >
        <Form
          form={formPerfil}
          name="form-perfil-change"
          size="large"
          onFinish={handlerFinishPerfil}
        >
          <SelectInputType
            column={{ span: 24 }}
            options={perfilesPosibles}
            item={{
              name: 'perfil',
              label: 'Perfiles',
              placeholder: 'Seleccione el nuevo perfil',
              rules: [
                {
                  required: true,
                  message: 'El nuevo perfil es requerido'
                }
              ]
            }}
          />
          <Row justify="end">
            <Button
              ghost
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
            >
              Cambiar
            </Button>
          </Row>
        </Form>
      </Modal>

      {/* Modal Cambiar contraseña */}
      <Modal
        centered
        footer={[]}
        visible={visiblePassword}
        title="Cambiar contraseña"
        onCancel={() => handlerOpenPassword(false)}
      >
        <Form
          form={form}
          size="large"
          name="form-password"
          onFinish={handlerFinishPassword}
        >
          <InpuType
            column={{ span: 24 }}
            item={{
              label: '',
              name: 'password',
              hasFeedback: true,
              rules: [
                {
                  required: true,
                  message: 'La contraseña es requerida'
                },
                {
                  min: 8,
                  message: 'El tamaño minimo es de 8 caracteres'
                },
                {
                  max: 16,
                  message: 'El tamaño maximo es de 16 caracteres'
                }
              ]
            }}
            input={{
              allowClear: true,
              type: 'password',
              placeholder: 'Introduzca la nueva contraseña'
            }}
          />
          <Row justify="end">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              ghost
              htmlType="submit"
            >
              Cambiar
            </Button>
          </Row>
        </Form>
      </Modal>
      <Modal title='Nuevo usuario'>

      </Modal>
    </>
  )
}
