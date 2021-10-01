import { map } from 'lodash'
import { createSelector } from 'reselect'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Col,
  Row,
  Card,
  Table,
  Divider,
  Modal,
  Button,
  List,
  Space,
  message,
  Empty
} from 'antd'
import {
  CheckOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
  SendOutlined
} from '@ant-design/icons'

import { checking } from '../../redux/ducks/asesoria'
import { saveSolicitud } from '../../redux/ducks/solicitud'

import {
  validateAddSubjects,
  validatedAddSubjects
} from '../../utils/solicitud'

const addSubjectsSelector = createSelector(
  (state) => state.asesoria,
  (asesoria) => {
    const { enrolled, subjects, loading } = asesoria

    const maps = map(enrolled.schules, 'codmate')
    const posibles = subjects.filter(({ materia }) => {
      return !maps.includes(materia)
    })
    return {
      enrolled,
      subjects: posibles,
      loading
    }
  }
)

export const SolicitudAdd = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  // useSelector app
  const { enrolled, subjects, loading } = useSelector((state) =>
    addSubjectsSelector(state)
  )
  // useState for application
  const [isOpen, setIsOpen] = useState(false)
  const [subjectsAdd, setSubjectsAdd] = React.useState([])
  const [subjectsPosibles, setSubjectsPosibles] = useState([])

  useEffect(() => {
    setSubjectsPosibles([...subjects])
  }, [subjects])

  // handlers
  const handlerSelectionRow = (row) => {
    const { ok, msg } = validatedAddSubjects(enrolled, subjectsAdd, row)
    if (ok) {
      setSubjectsAdd((rows) => [...rows, row])
      setSubjectsPosibles((rows) => {
        return rows.filter(({ materia }) => {
          return materia !== row.codmate
        })
      })
      message.success(msg)
    } else {
      message.error(msg)
    }
  }

  const handlerDelete = ({ codmate }) => {
    const row = subjects.find((subject) => subject.materia === codmate)
    if (row) {
      setSubjectsPosibles((rows) => [...rows, row])
      setSubjectsAdd((rows) => {
        return rows.filter((row) => row.codmate !== codmate)
      })
    }
  }

  const handlerSendSolicitud = () => {
    if (subjectsAdd.length === 0) {
      message.error(
        'Debes seleccionar por lo menos una materia para poder enviar la solicitud'
      )
    }
    const first = subjectsAdd[0]
    const object = Object.assign({
      type: 'AGREGAR',
      observacion: '-- No Observacion ---',
      subject: first.codmate,
      arraySubjects: [...subjectsAdd]
    })
    dispatch(saveSolicitud(object))
    history.push('/solicitud')
  }

  useEffect(() => {
    if (!loading) {
      dispatch(checking())
    }
  }, [loading, dispatch])

  const { response, msg } = validateAddSubjects(enrolled)

  if (!response) {
    return (
      <Row className="p-4" gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Incovenientes">
            <h4>{msg}</h4>
          </Card>
        </Col>
      </Row>
    )
  }

  const { schules, carnet } = enrolled

  return (
    <>
      <Row gutter={[24, 24]} className="p-4">
        <Col span={10}>
          <Divider orientation="left">Materias inscriptas</Divider>
          <Table
            dataSource={schules}
            pagination={false}
            rowKey="codcarga"
            bordered
            size="middle"
          >
            <Table.Column dataIndex="codmate" title="Codigo" key="codmate" />
            <Table.Column
              dataIndex="nommate"
              title="Nombre materia"
              key="nommate"
            />
            <Table.Column
              align="center"
              dataIndex="dias"
              title="Dia"
              key="dias"
            />
            <Table.Column
              align="center"
              dataIndex="hora"
              title="Horas"
              key="hora"
            />
          </Table>
        </Col>
        <Col span={14}>
          <Card
            key={carnet}
            title="Materias a solicitar"
            extra={[
              <Space key={carnet}>
                <Button
                  onClick={() => setIsOpen(true)}
                  icon={<PlusCircleOutlined />}
                  type="primary"
                  size="middle"
                >
                  Agregar
                </Button>
              </Space>
            ]}
          >
            <Table
              bordered
              key={carnet}
              size="middle"
              rowKey="codcarga"
              pagination={false}
              dataSource={subjectsAdd}
            >
              <Table.Column dataIndex="codmate" title="Codigo" key="codmate" />
              <Table.Column
                align="left"
                dataIndex="materia"
                title="Materia"
                key="materia"
              />
              <Table.Column
                align="center"
                dataIndex="dias"
                title="Dia"
                key="dias"
              />
              <Table.Column
                align="center"
                dataIndex="hora"
                title="Hora"
                key="hora"
              />
              <Table.Column
                align="center"
                dataIndex="turno"
                title="Turno"
                key="turno"
              />
              <Table.Column
                align="center"
                key="action"
                render={(record) => (
                  <Button
                    danger
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => handlerDelete(record)}
                  />
                )}
              ></Table.Column>
            </Table>
            <Row justify="end">
              <Button
                size="large"
                type="primary"
                disabled={subjectsAdd.length === 0}
                icon={<SendOutlined />}
                style={{ marginTop: 20 }}
                onClick={handlerSendSolicitud}
              >
                Enviar
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        width="50%"
        key={carnet}
        visible={isOpen}
        footer={[
          <Button
            icon={<CloseCircleOutlined />}
            type="default"
            onClick={() => setIsOpen(false)}
          >
            Cerrar
          </Button>
        ]}
        title="Materias disponibles"
        onCancel={() => setIsOpen(false)}
      >
        {
          subjectsPosibles.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No hay materias para seleccionar' />
          )
        }
        {subjectsPosibles.map((subject) => {
          return (
            <List
              bordered
              key={subject.materia}
              itemLayout="horizontal"
              style={{ marginBottom: 10 }}
              className="list-add-subjects"
              dataSource={subject.schules}
              header={<div>{subject.nommate}</div>}
              renderItem={({ dias, hora, turno, codcarga }) => {
                return (
                  <List.Item
                    key={codcarga}
                    actions={[
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        size="small"
                        onClick={() =>
                          handlerSelectionRow({
                            codmate: subject.materia,
                            materia: subject.nommate,
                            dias,
                            hora,
                            turno,
                            codcarga
                          })
                        }
                      >
                        Seleccionar
                      </Button>
                    ]}
                  >
                    Dias: {dias} | Hora: {hora} | Turno: {turno}
                  </List.Item>
                )
              }}
            />
          )
        })}
      </Modal>
    </>
  )
}
