import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardHeader } from "reactstrap";

import ModalSextaMateria from "./ModalSextaMateria";
import SextaMateriaTabla from "./SextaMaterialTabla";
import SextaMateriaInscripta from "./SextaMateriaInscripta";
import { addSolicitud } from "../../../redux/ducks/asesoria";

const SextaMateria = ({ validated }) => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggle = () => setIsOpenModal((e) => !e);

  const onSubmitHandler = (values) => {
    const data = {
      subject,
      type: "SEXTA",
      observacion: values.details,
    };
    toggle();
    dispatch(addSolicitud(data));
  };

  const selectionSubject = (object, item) => {
    toggle();
    setSubject(
      Object.assign({}, object, {
        nommate: item.nommate,
        codmate: item.materia,
      })
    );
  };

  return (
    <>
      <Card className="m-3">
        <CardHeader className="p-4">
          <h2>Sexta Materia</h2>
        </CardHeader>
        {validated.inscripta ? (
          <SextaMateriaInscripta validated={validated} />
        ) : (
          <SextaMateriaTabla
            validated={validated}
            selectionSubject={selectionSubject}
          />
        )}
      </Card>
      <ModalSextaMateria
        toggle={toggle}
        subject={subject}
        isOpen={isOpenModal}
        onSubmitHandler={onSubmitHandler}
      />
    </>
  );
};

SextaMateria.PropType = {
  validated: PropTypes.object.isRequired,
};

export default SextaMateria;
