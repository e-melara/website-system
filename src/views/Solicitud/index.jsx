import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Col, Row, Button, Table, Card, Space, Divider, Tag } from 'antd'
import { PlusCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons'

import 'moment/locale/es'
import Moment from 'react-moment'

import { paginator, initialStateSolicitud } from '../../redux/ducks/solicitud'

const TypeSolicitud = {
  SEXTA: <Tag color="blue">Sexta Materia</Tag>,
  AGREGAR: <Tag color="cyan">Adiccion de Materias</Tag>,
  TUTORIADA: <Tag color="gold">Materia Tutoriada</Tag>,
  SUFICIENCIA: <Tag color="magenta">Examen de Suficiencia</Tag>
}

const StatusText = {
  I: <Tag color="volcano">Iniciada</Tag>,
  A: <Tag color="success">Aceptada</Tag>,
  D: <Tag color="error">Denegada</Tag>
}

function Solicitud({ paginatorHandler, paginator, initial, estadistica }) {
  // const [viewAdd, setViewAdd] = useState(true)
  useEffect(() => {
    initial()
  }, [initial])

  useEffect(() => {
    // const resolve = !!!estadistica.find(({ type }) => type === 'AGREGAR')
    // setViewAdd(resolve)
  }, [estadistica])

  const handlerChangePage = (pagination) => {
    const { current } = pagination
    paginatorHandler(current)
  }

  const columns = [
    {
      title: 'Codigo',
      dataIndex: 'codmate',
      align: 'center'
    },
    {
      title: 'Materia',
      dataIndex: 'nommate',
      render: (nommate, record) => {
        return `${nommate} ${record.type === 'AGREGAR' ? ', ETC' : ''}`
      }
    },
    {
      width: '80px',
      title: 'Tipo',
      align: 'center',
      dataIndex: 'type',
      render: (type) => TypeSolicitud[type]
    },
    {
      width: '80px',
      title: 'Estado',
      align: 'center',
      dataIndex: 'estado',
      render: (status) => StatusText[status]
    },
    {
      title: 'Fecha',
      width: '160px',
      align: 'center',
      dataIndex: 'created_at',
      render: (dateCreated) => (
        <Moment date={dateCreated} format="DD MMM YYYY" withTitle locale="es" />
      )
    },
    {
      title: '',
      align: 'center',
      width: '160px',
      dataIndex: 'created_at',
      render: (dateCreated) => <Moment date={dateCreated} fromNow locale="es" />
    }
  ]

  return (
    <div className="p-4">
      <Row justify="end">
        <Col>
          <Space>
            <Link to="/solicitud/s/add">
              {
                <Button type="primary" icon={<AppstoreAddOutlined />} ghost>
                  Agregar Materias
                </Button>
              }
            </Link>
            <Link to="/solicitud/s/new">
              <Button
                ghost
                size="middle"
                type="primary"
                icon={<PlusCircleOutlined />}
              >
                Nueva solicitud
              </Button>
            </Link>
          </Space>
        </Col>
        <Divider />
      </Row>
      <Row>
        <Col span={24}>
          <Card title="Solicitudes" size="small">
            <Table
              bordered
              size="small"
              rowKey="codmate"
              columns={columns}
              onChange={handlerChangePage}
              dataSource={paginator.data}
              loading={paginator.loading}
              pagination={paginator.pagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapDispatchToProps = (dispath) => {
  return {
    initial: () => dispath(initialStateSolicitud()),
    paginatorHandler: (data) => dispath(paginator(data))
  }
}

const mapStateToProps = (state) => {
  return {
    paginator: state.solicitud.list,
    estadistica: state.solicitud.estadistica
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Solicitud)
