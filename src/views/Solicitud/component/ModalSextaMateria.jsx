import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import React, { memo } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { MessageError } from "../../../components/common/MessageError";

const schemaValidation = Yup.object().shape({
  details: Yup.string()
    .min(5, "Lo minimo de caracteres que el detalle debe tener es 5")
    .required("El campo es requerido"),
});

const ModalSexta = memo(({ isOpen, toggle, subject, onSubmitHandler }) => {
  const formik = useFormik({
    validationSchema: schemaValidation,
    initialValues: {
      details: "",
    },
    onSubmit: onSubmitHandler,
  });
  return (
    <Modal isOpen={isOpen} size="lg">
      <ModalHeader>Verificacion de sexta</ModalHeader>
      <ModalBody>
        <table className="table table-border">
          <thead>
            <tr>
              <th>Nombre materia</th>
              <th>Dias</th>
              <th>Horas</th>
              <th>Grupo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{subject.nommate}</td>
              <td>{subject.dias}</td>
              <td>{subject.hora}</td>
              <td>{subject.turno}</td>
            </tr>
          </tbody>
        </table>
        <form
          noValidate
          className="form theme-form m-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="row">
            <div className="col">
              <div
                className={classNames({
                  "form-group": true,
                  "was-invalited": true,
                  error: formik.errors.details && formik.touched.details,
                })}
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="detalle">
                    Detalle
                  </label>
                  <textarea
                    rows="3"
                    required
                    id="details"
                    name="details"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    values={formik.values.details}
                    placeholder="Detalle del porque necesita la sexta materia"
                  ></textarea>

                  <MessageError
                    errors={formik.errors.details}
                    touched={formik.touched.details}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={toggle}
              className="btn btn-light btn-lg pull-right"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              Enviar
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
});

export default ModalSexta;
