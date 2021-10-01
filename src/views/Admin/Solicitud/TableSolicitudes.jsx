import Moment from 'react-moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Table, Row, Col, Input, Button } from 'antd'
import { SearchOutlined, EyeOutlined } from '@ant-design/icons'

import { AsesoriaTypeUser } from '../../../utils/functions'
import {
  pageLoading,
  selectionCurrentById
} from '../../../redux/ducks/admin/solicitudes'

import {
  TypeSolicitudKey,
  TypeSolicitudStatusKey
} from '../../../utils/utilsStatus'

import { ModalSextaOAddicion } from './ModalSextaOAddicion'
import { ModalSuficienciaOTutoriada } from './ModalSuficienciaOTutoriada'

const Search = Input.Search

export const TableSolicitudes = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  // columns
  const columns = [
    {
      key: 'Carnet',
      align: 'center',
      title: 'Carnet',
      dataIndex: 'carnet'
    },
    {
      dataIndex: 'type',
      key: 'type',
      title: 'Tipo',
      render: (type) => <TypeSolicitudKey type={type} />
    },
    {
      dataIndex: 'nombres',
      key: 'nombres',
      title: 'Nombres'
    },
    {
      dataIndex: 'apellidos',
      key: 'apellidos',
      title: 'Apellidos'
    },
    {
      dataIndex: 'nomcarrera',
      title: 'Carreras',
      key: 'nomcarrera'
    },
    {
      key: 'estado',
      title: 'Estado',
      align: 'center',
      dataIndex: 'estado',
      render: (estado) => <TypeSolicitudStatusKey status={estado} />
    },
    {
      key: 'updated_at',
      dataIndex: 'updated_at',
      title: 'Hace ..',
      render: (updated) => <Moment date={updated} fromNow />
    },
    {
      key: 'actions',
      align: 'center',
      dataIndex: 'actions',
      render: (_, record) => (
        <Button
          onClick={() => handlerOpenViewModal(record)}
          type="dashed"
          size="middle"
          icon={<EyeOutlined />}
        />
      )
    }
  ]

  // type user (1-Colecturia, 2-Registro Academico)
  const typeUser = AsesoriaTypeUser(location.pathname)
  // selector
  const { loading, data, current } = useSelector(
    (state) => state.adminSolicitud
  )

  // states
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalOther, setIsOpenModalOther] = useState(false)

  const [filterObject, setFilterObject] = React.useState({
    page: 1,
    search: '',
    type: typeUser
  })

  // effects
  useEffect(() => {
    dispatch(pageLoading({ ...filterObject }))
  }, [dispatch, filterObject])

  // handler
  const handlerSearch = (searchTxt) => {
    setFilterObject((status) => ({
      ...status,
      search: searchTxt.trim()
    }))
  }

  const handlerOpenViewModal = ({ type, id }) => {
    dispatch(selectionCurrentById({ id,typeUser }))
    if (type === 'SUFICIENCIA' || type === 'TUTORIADA') {
      setIsOpenModal(true)
    } else {
      setIsOpenModalOther(true)
    }
  }

  return (
    <>
      <Row gutter={[24, 24]} className="p-4">
        <Col span={10}>
          <h2>Solicitudes</h2>
        </Col>
        <Col span={14}>
          <Search
            size="large"
            allowClear
            onSearch={handlerSearch}
            placeholder="Buscar ...."
            enterButton={<SearchOutlined />}
            style={{ width: 300, float: 'right' }}
          />
        </Col>
      </Row>
      <Table
        bordered
        rowKey="id"
        size="middle"
        loading={loading}
        dataSource={data}
        columns={columns}
      />

      {/* Modal para las solicitudes tipo (Suficiencia o Tutoriada) */}
      {isOpenModal && (
        <ModalSuficienciaOTutoriada
          current={current}
          open={isOpenModal}
          typeUser={typeUser}
          onClose={setIsOpenModal}
        />
      )}

      {isOpenModalOther && (
        <ModalSextaOAddicion
          current={current}
          typeUser={typeUser}
          open={isOpenModalOther}
          onClose={setIsOpenModalOther}
        />
      )}

      {/* Modal para las solicitudes tipo (Sexta o Adiccion) */}
    </>
  )
}
