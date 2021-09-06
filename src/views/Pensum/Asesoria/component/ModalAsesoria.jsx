import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { connect } from "react-redux";
import InputMask from "react-input-mask";
import { Modal, Table, Alert } from "antd";

import { asesoriaRequestSend } from "../../../../redux/ducks/asesoria";
import { MessageError } from "../../../../components/common/MessageError";

const phoneRegExp = /^[2,7,6]{1}[0-9]{3}-[0-9]{4}$/;

const shapeToValidated = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "El numero de telefono no es valido")
    .required("El numero de celular es requerido"),
});

const { Column } = Table;

function ModalAsesoria({
  send,
  isOpen,
  handler,
  schules: { schulesStudents },
}) {
  const data = schulesStudents.map((e) => ({
    materia: e.subject.materia,
    nommate: e.subject.nommate,
    dias: e.schules.dias,
    hora: e.schules.hora,
    turno: e.schules.turno,
  }));

  const form = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: shapeToValidated,
    onSubmit: ({ phoneNumber }) => {
      handler(false);
      send({
        phone: phoneNumber,
        schules: schulesStudents,
      });
    },
  });

  return (
    <>
      <Modal
        width="60%"
        visible={isOpen}
        onOk={form.handleSubmit}
        okText="Enviar"
        title="Listado de materias"
        onCancel={() => handler(false)}
      >
        <Table rowKey="nommate" dataSource={data} pagination={false} bordered>
          <Column align="center" title="Codigo" dataIndex="materia" />
          <Column title="Materia" dataIndex="nommate" />
          <Column align="center" title="Dias" dataIndex="dias" />
          <Column align="center" title="Horas" dataIndex="hora" />
          <Column align="center" title="Turno" dataIndex="turno" />
        </Table>
        <div className="row" style={{ marginTop: 15 }}>
          <div className="col-8 offset-md-2">
            <form noValidate autoComplete="off">
              <div
                className={classNames({
                  "form-group was-invalited": true,
                  error: form.touched.phoneNumber && form.errors.phoneNumber,
                })}
              >
                <label htmlFor="phoneNumber" className="col-form-label">
                  Celular:
                </label>
                <InputMask
                  required
                  mask='9999-9999'
                  id='phoneNumber'
                  name="phoneNumber"
                  placeholder="0000-0000"
                  onBlur={form.handleBlur}
                  className="form-control"
                  onChange={form.handleChange}
                  value={form.values.phoneNumber}
                />
                <MessageError
                  errors={form.errors.phoneNumber}
                  touched={form.touched.phoneNumber}
                />
              </div>
            </form>
          </div>
          <div className="col-8 offset-md-2" style={{ marginTop: 15 }}>
            <Alert
              type="info"
              message="Debes ingresar tu numero de celular para poder continuar"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    send: (data) => dispatch(asesoriaRequestSend(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    schules: state.asesoria,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAsesoria);
