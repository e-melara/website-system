import { connect } from "react-redux";
import { Col, Row, Button, Steps, Form, message } from "antd";
import {
  CheckOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import React, { useCallback, useState, useMemo, useEffect, memo } from "react";

import "./solicitud-nueva.scss";
import {
  validateSextaSubject,
  subjectsApprovateTake,
} from "../../redux/selectors/asesoria";
import {
  reset,
  saveSolicitud,
  addObjectState,
  addSixthSubject,
} from "../../redux/ducks/solicitud";

import { checking } from "../../redux/ducks/asesoria";
import { PageInfo } from "./components/SolicitudNueva/PageInfo";
import FormSelect from "./components/SolicitudNueva/FormSelect";
import { validateSextaSubjectUtils } from "../../utils/solicitud";
import HorarioSextaMateria from "./components/SolicitudNueva/HorarioSextaMateria";

const { Step } = Steps;

const SolicitudNuevaPage = memo(
  ({
    add,
    data,
    sixth,
    loading,
    history,
    carrera,
    subjects,
    validated,
    enrolleds,
    saveRemote,
    resetState,
    verificated,
    dataSolicitud,
  }) => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [status, setStatus] = useState("process");

    useEffect(() => {
      resetState();
    }, [resetState]);

    useEffect(() => {
      if (!loading) {
        verificated();
      }
    }, [loading, verificated]);

    const validateForm = useCallback(async () => {
      if (current === 0) {
        let object = null;
        const response = await form.validateFields();
        if (response.type !== "SEXTA") {
          object = subjects.find((e) => e.code === response.subject);
          object = object.object;
        }
        add({
          ...response,
          object,
        });
        return response.type === "SEXTA" ? 1 : 2;
      }
      return 1;
    }, [current, form, subjects, add]);

    const prev = useCallback(() => {
      const type = dataSolicitud.type;
      setCurrent(current - (type === "SEXTA" ? 1 : 2));
    }, [current, dataSolicitud]);

    const next = useCallback(async () => {
      try {
        const countPage = await validateForm();
        setCurrent(current + countPage);
        setStatus("proccess");
      } catch (error) {
        setStatus("error");
      }
    }, [current, validateForm]);

    const handlerSelectionSextaSubject = useCallback(
      (data) => {
        let validatedSolicitud = validateSextaSubjectUtils(data, enrolleds);
        if (!validatedSolicitud.validate) {
          sixth(data);
          setCurrent(current + 1);
          return;
        }

        const { subjectObject } = validatedSolicitud;
        message.error(
          `Lo sentimos pero el horario seleccionado es el mismo con la materia ${subjectObject.nommate}, materia ya inscripta`,
          10
        );
      },
      [sixth, enrolleds, setCurrent, current]
    );

    const steps = useMemo(
      () => [
        {
          title: "Inicio",
          content: (
            <FormSelect
              form={form}
              subjects={subjects}
              data={dataSolicitud}
              validated={validated}
            />
          ),
        },
        {
          title: "Materia",
          content: (
            <HorarioSextaMateria
              validated={validated}
              handler={handlerSelectionSextaSubject}
            />
          ),
        },
        {
          title: "Detalles",
          content: <PageInfo user={data} carrera={carrera} />,
        },
      ],
      [
        form,
        data,
        carrera,
        subjects,
        validated,
        dataSolicitud,
        handlerSelectionSextaSubject,
      ]
    );

    const handlerSave = useCallback(() => {
      const { save, resolve } = dataSolicitud;
      if (!save) {
        saveRemote(dataSolicitud);
        if (resolve) {
          message.success("Tu solicitud ha sido enviada");
        } else {
          message.error(
            "Por el momento tenemos problema con el servidor, intenta mas tarde"
          );
        }
        history.push("/solicitud");
      }
    }, [saveRemote, dataSolicitud, history]);

    return (
      <Row justify="center">
        <Col xs={24} id="contenedor">
          <Steps status={status} current={current} type="navigation">
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            <>
              <Button
                size="large"
                icon={<ArrowLeftOutlined />}
                type="dashed"
                disabled={current === 0}
                onClick={prev}
              >
                Anterior
              </Button>
              {current < steps.length - 1 && (
                <Button
                  type="dashed"
                  icon={<ArrowRightOutlined />}
                  size="large"
                  disabled={current === 1}
                  onClick={next}
                >
                  Siguiente
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handlerSave}
                  icon={<CheckOutlined />}
                >
                  Enviar
                </Button>
              )}
            </>
          </div>
        </Col>
      </Row>
    );
  }
);

const mapDispathToProps = (dispatch) => {
  return {
    resetState: () => dispatch(reset()),
    verificated: () => dispatch(checking()),
    add: (data) => dispatch(addObjectState(data)),
    saveRemote: (data) => dispatch(saveSolicitud(data)),
    sixth: (data) => dispatch(addSixthSubject(data)),
  };
};

const mapStateToProps = (state) => {
  const { add } = state.solicitud;
  const { enrolled } = state.asesoria;
  const { data, carrera } = state.auth;
  return {
    data,
    carrera,
    dataSolicitud: add,
    enrolleds: enrolled,
    loading: state.asesoria.loading,
    validated: validateSextaSubject(state),
    subjects: subjectsApprovateTake(state),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(SolicitudNuevaPage);
