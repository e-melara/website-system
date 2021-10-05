import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { Row, Col, Card, Table, Alert } from 'antd'

import { checking } from '../../redux/ducks/notes'
import { statusEnrolled } from '../../utils/pensum'
import CardUser from '../../components/common/CardUser'

const { Column } = Table

const HorarioPage = ({ schules, user, carrera, loading, validated, ciclo }) => {
  useEffect(() => {
    if (!loading) {
      validated(loading)
    }
  }, [loading, validated])

  return (
    <div className="p-4">
      <Row gutter={[20, 0]}>
        <Col xs={8}>
          <CardUser user={user} carrera={carrera} />
        </Col>
        <Col xs={16}>
          {schules.length === 0 ? (
            <div>
              <Alert
                type="info"
                message="Por el momento no tienes una horarios asignado"
              />
            </div>
          ) : (
            <Card title={`Horario ciclo ${ciclo}`}>
              <Table
                size="small"
                dataSource={schules}
                key={schules[0].codmate}
                pagination={false}
                bordered
              >
                <Column title="Codigo" dataIndex="codmate" key="codmate" />
                <Column title="Materia" dataIndex="nommate" key="nommate" />
                <Column title="Dias" dataIndex="dias" key="dias" />
                <Column title="Horas" dataIndex="hora" key="hora" />
                <Column
                  title="Estado"
                  dataIndex="estado"
                  key="estado"
                  render={(estado) => {
                    const r = statusEnrolled(estado)
                    return <Alert type={r.type} message={r.message} />
                  }}
                />
              </Table>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { schules, loading } = state.notes
  const { data, carrera, ciclo } = state.auth
  return {
    ciclo,
    carrera,
    schules,
    loading,
    user: data
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    validated: (loading) => dispatch(checking(loading))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(HorarioPage)
