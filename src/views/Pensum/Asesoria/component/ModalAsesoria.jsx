import React from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import * as Yup from "yup";
import { Formik } from "formik";

import { asesoriaRequestSend } from "../../../../redux/ducks/asesoria";
import { MessageError } from "../../../../components/common/MessageError";

const phoneRegExp = /^[2,7]{1}[0-9]{3}-[0-9]{4}$/;

const shapeToValidated = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "El numero de telefono no es valido")
    .required("El numero de celular es requerido"),
});

function ModalAsesoria({
  handler,
  isOpen,
  schules: { schulesStudents },
  dispatch,
}) {
  const rows = schulesStudents.map((item) => {
    return (
      <tr key={`${item.materia}-modal-${Math.random()}`}>
        <td>{item.subject.nommate}</td>
        <td>{item.schules.dias}</td>
        <td>{item.schules.hora}</td>
        <td>{item.schules.turno}</td>
      </tr>
    );
  });

  return (
    <>
      <Formik
        onSubmit={(values) => {
          handler(false);
          dispatch(
            asesoriaRequestSend({
              phone: values.phoneNumber,
              schules: schulesStudents,
            })
          );
        }}
        validationSchema={shapeToValidated}
        initialValues={{
          phoneNumber: "",
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Modal isOpen={isOpen}>
            <ModalHeader>Listados de materias</ModalHeader>
            <Table>
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Dias</th>
                  <th>Horas</th>
                  <th>Turno</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <ModalBody>
              <form noValidate onSubmit={handleSubmit} autoComplete="off">
                <FormGroup
                  className={`was-invalited ${
                    touched.phoneNumber && errors.phoneNumber ? "error" : ""
                  }`}
                >
                  <Label className="col-form-label">Celular</Label>
                  <Input
                    required
                    type="text"
                    name="phoneNumber"
                    onBlur={handleBlur}
                    placeholder="0000-0000"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  <MessageError
                    errors={errors.phoneNumber}
                    touched={touched.phoneNumber}
                  />
                </FormGroup>
                <div
                  className="alert alert-primary"
                  role="alert"
                  style={{ marginTop: "20px" }}
                >
                  Debes ingresar tu numero de celular para poder seguir
                </div>
                <FormGroup>
                  <button
                    type="button"
                    onClick={() => handler(false)}
                    style={{ float: "left" }}
                    className="btn btn-danger"
                  >
                    Cancelar
                  </button>
                  <input
                    type="submit"
                    value="Enviar"
                    disabled={errors.phoneNumber}
                    style={{ float: "right" }}
                    className="btn btn-primary"
                  />
                </FormGroup>
              </form>
            </ModalBody>
          </Modal>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    schules: state.asesoria,
  };
};

export default connect(mapStateToProps)(ModalAsesoria);
