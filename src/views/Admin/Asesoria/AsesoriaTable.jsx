import Moment from 'react-moment'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, DatePicker, Row, Space } from 'antd'
import {
  SearchOutlined,
  EyeOutlined,
  FilePdfOutlined,
  FunnelPlotOutlined
} from '@ant-design/icons'

import AsesoriaModal from './AsesoriaModal'
import { BaseAssets } from '../../../consts'
import AsesoriaHeader from './AsesoriaHeader'
import { AsesoriaTypeUser } from '../../../utils/functions'
import { StatusTag } from '../../../components/common/TagEstado'

import { actionsType } from '../../../redux/ducks/admin/asesoria'

const statusFilter = {
  1: 'A',
  2: 'P',
  4: 'V',
  5: 'F'
}

const { Column } = Table
const { RangePicker } = DatePicker
const AsesoriaTable = ({
  data,
  loading,
  current,
  addType,
  paginator,
  selectOneById,
  emptySelectedCurrent,
  addSelectedKeysHandler
}) => {
  //! Para saber que tipo de usuario es
  const location = useLocation()
  const [form] = Form.useForm()
  const typeUser = AsesoriaTypeUser(location.pathname)

  //! ---  Use state  --------
  const [typeUserState] = useState(typeUser)
  const [isOpen, setIsOpen] = useState(false)
  const [selectCurrent, setSelectCurrent] = useState({})
  const [openFilterDate, setOpenFilterDate] = useState(false)

  const [filterObject, setFilterObject] = useState({
    search: '',
    type: typeUserState,
    estado: ''
  })

  useEffect(() => {
    paginator({ page: 1, ...filterObject })
  }, [filterObject, paginator])

  useEffect(() => {
    if (!isOpen) {
      emptySelectedCurrent()
    }
  }, [isOpen, emptySelectedCurrent])

  //! Handler function
  //!---- Handler open modal -----!
  const handlerOpen = (data) => {
    setSelectCurrent(data)
    selectOneById({ id: data.id })
    setIsOpen(true)
  }

  //! Pagination
  const handlerChange = (record) => {}

  //! Handler filter
  const handlerFilterDropdown = ({ key }) => {
    if (key === '3') {
      setFilterObject({
        search: '',
        estado: '',
        type: typeUserState
      })
    } else {
      const statusTxt = statusFilter[key]
      setFilterObject((status) => ({
        ...status,
        estado: statusTxt
      }))
    }
  }

  //! Handler search
  const handlerSearch = (searchTxt) => {
    setFilterObject((status) => ({
      ...status,
      search: searchTxt.trim()
    }))
  }

  //! Handler send asesoria change status
  const handlerSend = (type, data, id) => {
    setIsOpen(false)
    addType(type, data, id)
  }

  // handler for modal
  const handlerViewPdf = ({ carnet }) => {
    window.open(`${BaseAssets}pdf/pago/${carnet}`)
  }

  const handlerViewPdfInscripcion = ({ carnet }) => {
    window.open(`${BaseAssets}pdf/matricula/${carnet}`)
  }

  const handlerOpenModalFilter = () => {
    setOpenFilterDate(true)
  }

  const onFinishFilter = (values) => {
    const [primer, segundo] = values.range
    const url = typeUser === 2 ? 'pdf/matriculas' : ''
    form.resetFields();
    setOpenFilterDate(false)
    window.open(
      `${BaseAssets}${url}?begin=${primer.format('YYYY-MM-DD')}&end=${segundo
        .add(1, 'day')
        .format('YYYY-MM-DD')}`
    )
  }

  return (
    <>
      <AsesoriaHeader
        typeUser={typeUserState}
        handlerSearch={handlerSearch}
        handlerFilterDropdown={handlerFilterDropdown}
        handlerOpenModalFilter={handlerOpenModalFilter}
      />
      <div className="p-4">
        <Table
          bordered
          size="small"
          rowKey="carnet"
          dataSource={data}
          loading={loading}
          onChange={handlerChange}
          pagination={{ position: ['none', 'bottomCenter'] }}
        >
          <Column
            align="center"
            title="Carnet"
            key="carnet"
            dataIndex="carnet"
            filterIcon={<SearchOutlined />}
            filtered={true}
            fixed="left"
          />
          <Column
            title="Nombre completo"
            dataIndex="nombres"
            key="nombres"
            align="left"
            render={(_, record) => {
              return (
                <span>
                  {record.nombres} {record.apellidos}
                </span>
              )
            }}
          />
          <Column
            align="center"
            title="Carrera"
            dataIndex="nomcarrera"
            key="nomcarrera"
          />
          <Column
            align="center"
            title="Fecha de creacion"
            dataIndex="created_at"
            key="created_at"
            render={(record) => {
              return <Moment date={record} format="DD/MMMM/YYYY HH:mm" />
            }}
          />
          <Column
            align="center"
            title="Estado"
            width="100px"
            key={(record) => `${record.carnet}-${record.nomcarrera}`}
            render={(record) => {
              return <StatusTag key={record.carnet} status={record.estado} />
            }}
          />
          <Column
            title="Hace"
            align="center"
            dataIndex="created_at"
            key={(record) => `${record.nomcarrera}-${record.carnet}`}
            render={(record) => <Moment date={record} fromNow />}
          />
          <Column
            align="center"
            key="action"
            width="80px"
            render={(record) => (
              <Space size="small" align="center">
                {record.estado !== 'M' && (
                  <Button
                    type="dashed"
                    icon={<EyeOutlined />}
                    onClick={() => handlerOpen(record)}
                  >
                    Ver
                  </Button>
                )}
                {record.estado === 'F' && (
                  <Button
                    onClick={() => handlerViewPdf(record)}
                    type="dashed"
                    icon={<FilePdfOutlined />}
                  >
                    Pago
                  </Button>
                )}
                {record.estado === 'M' && (
                  <Button
                    onClick={() => handlerViewPdfInscripcion(record)}
                    type="dashed"
                    icon={<FilePdfOutlined />}
                  >
                    Hoja de inscripcion
                  </Button>
                )}
                <Button />
              </Space>
            )}
          />
        </Table>
      </div>
      <AsesoriaModal
        data={current}
        isOpen={isOpen}
        user={selectCurrent}
        addSend={handlerSend}
        handlerOpen={setIsOpen}
        typeUser={typeUserState}
        handlerViewPdf={handlerViewPdf}
        addSelectedKeys={addSelectedKeysHandler}
      />
      <Modal
        title="Seleccionar fechas"
        visible={openFilterDate}
        footer={[]}
        onCancel={() => setOpenFilterDate(false)}
      >
        <Form
          form={form}
          name="form-date-range"
          size="large"
          layout="horizontal"
          onFinish={onFinishFilter}
        >
          <Row justify="end">
            <Form.Item
              name="range"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: 'El rango de las fechas es requerido'
                }
              ]}
            >
              <RangePicker className="input-width" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                icon={<FunnelPlotOutlined />}
              >
                Filtrar
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

const mapDispathToProps = (dispatch) => {
  return {
    emptySelectedCurrent: () =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT_EMPTY }),
    addSelectedKeysHandler: (payload) =>
      dispatch({
        type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT_ADD_KEYS,
        payload
      }),
    paginator: (payload) =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_LOADING, payload }),
    selectOneById: (payload) =>
      dispatch({ type: actionsType.ASESORIA_ADMIN_CURRENT_SELECT, payload }),
    addType: (type, data, id) =>
      dispatch({
        type: actionsType.ASESORIA_ADMIN_ADD_TYPE,
        payload: {
          type,
          data,
          id
        }
      })
  }
}

const mapStateToProps = (state) => {
  const { data, loading, current } = state.adminAsesoria
  return {
    data,
    loading,
    current
  }
}

export default connect(mapStateToProps, mapDispathToProps)(AsesoriaTable)
