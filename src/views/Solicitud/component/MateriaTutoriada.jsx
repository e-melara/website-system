import * as Yup from "yup";
import "moment/locale/es";
import { useFormik } from "formik";
import classNames from "classnames";
import { connect } from "react-redux";
import React, { memo, useMemo } from "react";
import { Card, CardHeader, Input, Col } from "reactstrap";

import {
  filterSubjectTutoriadaSuficiencia,
  solicitudOthers,
} from "../../../redux/selectors/asesoria";
import { addSolicitud } from "../../../redux/ducks/asesoria";
import { MessageError } from "../../../components/common/MessageError";
import TableSuficienciaSexta from "./TableSuficienciaSexta";

const validateSchema = Yup.object().shape({
  item: Yup.string().required("El campo es requerido"),
  details: Yup.string()
    .min(5, "El tamaño minimo debe ser de 5 caracteres")
    .required("El campo es requerido"),
});

const MateriaTutoriada = memo(({ add, solicitudes, filters }) => {
  const formik = useFormik({
    initialValues: {
      details: "",
      item: "",
    },
    onSubmit: (values) => {
      const filtersObject = filters.find((i) => i.code === values.item);
      const object = {
        type: "TUTORIADA",
        subject: filtersObject.object,
        observacion: values.details,
      };
      formik.resetForm();
      add(object);
    },
    validationSchema: validateSchema,
  });

  const filterTutoriada = useMemo(
    () => solicitudes.filter((s) => s.type === "TUTORIADA"),
    [solicitudes]
  );

  return (
    <>
      <Col xs={5}>
        <Card className="m-3 no-border">
          <CardHeader className="p-4">
            <h6>Materia Tutoriada</h6>
          </CardHeader>
          <form className="form theme-form p-3" onSubmit={formik.handleSubmit}>
            <div
              className={classNames({
                "form-group": true,
                "was-invalited": true,
                error: formik.errors.item && formik.touched.item,
              })}
            >
              <div className="mb-3 row">
                <label htmlFor="item" className="col-sm-3 col-form-label">
                  Materia
                </label>
                <div className="col-sm-9">
                  <Input
                    type="select"
                    value={formik.values.item}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                    name="item"
                    id="item"
                  >
                    <option value>[Seleccione una materia]</option>
                    {filters.map(function (item, index) {
                      return (
                        <option value={item.code} key={`${index}-${item.code}`}>
                          {item.object.nommate}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <MessageError
                  errors={formik.errors.item}
                  touched={formik.touched.item}
                />
              </div>
            </div>
            <div
              className={classNames({
                "form-group": true,
                "was-invalited": true,
                error: formik.errors.details && formik.touched.details,
              })}
            >
              <div className="mb-3 row">
                <label htmlFor="details" className="col-sm-3 col-form-label">
                  Detalle
                </label>
                <div className="col-sm-9">
                  <textarea
                    name="details"
                    id="details"
                    cols="30"
                    rows="5"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    placeholder="Explique porque desea latutoria de la materia"
                  ></textarea>
                </div>
                <MessageError
                  errors={formik.errors.details}
                  touched={formik.touched.details}
                />
              </div>
            </div>
            <div>
              <hr />
              <button
                type="submit"
                className="btn btn-primary btn-lg pull-right"
              >
                Enviar
              </button>
            </div>
          </form>
        </Card>
      </Col>
      <TableSuficienciaSexta filterTutoriada={filterTutoriada} />
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    solicitudes: solicitudOthers(state),
    filters: filterSubjectTutoriadaSuficiencia(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (payload) => dispatch(addSolicitud(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MateriaTutoriada);
