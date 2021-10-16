import { connect } from 'react-redux'
import React, { useState } from 'react'

import { SendOutlined } from '@ant-design/icons'
import { Card, Button, message, Alert } from 'antd'

import TableSchules from './TableSchules'
import ModalAsesoria from './ModalAsesoria'
import TableSchulesEnrolled from './TableSchulesEnrollled'

import {
  deleteSchulesSubject,
  selectionSubjectSchules
} from '../../../../redux/ducks/asesoria'
import { verificatedSubject } from '../../../../utils/verificatedAdvisory'

function CardSubjects({
  subjects,
  schulesStudents,
  title,
  add,
  drop,
  ciclo,
  work
}) {
  const [isOpen, setisOpen] = useState(false)

  const handlerAddSubjectStatus = (record) => {
    const { verificated, txt } = verificatedSubject(
      schulesStudents,
      record.schules
    )
    if (verificated) {
      add(record)
    } else {
      message.error(txt, 5)
    }
  }

  const handlerDeleteSubject = (record) => {
    drop(record)
  }

  return (
    <>
      <div className="row">
        <div className="col">
          {work && (
            <Card title={`Materias del ciclo ${ciclo}`}>
              {subjects
                .filter((e) => e.visible)
                .map((e) => (
                  <TableSchules
                    handler={handlerAddSubjectStatus}
                    key={e.materia}
                    subject={e}
                  />
                ))}
            </Card>
          )}
          {!work && (
            <Card title="Inscripcion inactiva">
              <Alert
                type="info"
                message="Por el momento la asesoria no esta activada"
                style={{
                  textAlign: 'center'
                }}
              />
            </Card>
          )}
        </div>
        {schulesStudents.length > 0 && (
          <div className="col">
            <Card
              title={title ? title : 'Hoja de asesoria'}
              extra={
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setisOpen(true)}
                  icon={<SendOutlined />}
                >
                  Enviar
                </Button>
              }
            >
              <TableSchulesEnrolled
                key={schulesStudents}
                items={schulesStudents}
                handler={handlerDeleteSubject}
              />
            </Card>
          </div>
        )}
      </div>
      <ModalAsesoria isOpen={isOpen} handler={setisOpen} />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    drop: (data) => dispatch(deleteSchulesSubject(data)),
    add: (data) => dispatch(selectionSubjectSchules(data))
  }
}

const mapStateToProps = (state) => {
  const { asesoria, auth } = state
  return {
    ciclo: auth.ciclo,
    work: asesoria.work,
    subjects: asesoria.subjects,
    schulesStudents: asesoria.schulesStudents
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSubjects)
