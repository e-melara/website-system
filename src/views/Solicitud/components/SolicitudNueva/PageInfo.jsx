import React from "react";
import "moment/locale/es";
import moment from "moment";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { PageHeader, Descriptions } from "antd";

import CardUser from "../../../../components/common/CardUser";

export const PageInfo = ({ user, carrera }) => {
  const day = moment().toDate();
  const { type, subject, observacion, object, sixthSubject } = useSelector(
    (state) => state.solicitud.add
  );

  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <CardUser carrera={carrera} user={user} />
        </div>
        <div className='col-9'>
          <PageHeader
            ghost={false}
            title="Confirmacion"
            subTitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi esse laborum dolorum ducimus recusandae enim"
          >
            <Descriptions
              size="small"
              column={2}
              className="details-solicitud"
            >
              <Descriptions.Item label="Tipo de solicitud" span={2}>
                <strong>{type}</strong>
              </Descriptions.Item>
              {type === "SEXTA" ? (
                <>
                  <Descriptions.Item label="Codigo" span={2}>
                    <strong>{sixthSubject.codmate}</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Materia" span={2}>
                    <strong>{sixthSubject.nommate}</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Dias">
                    <strong>{sixthSubject.item.dias}</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Horas">
                    <strong>{sixthSubject.item.hora}</strong>
                  </Descriptions.Item>
                </>
              ) : (
                <>
                  <Descriptions.Item label="Codigo" span={2}>
                    <strong>{subject}</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Materia" span={2}>
                    <strong>{object.nommate}</strong>
                  </Descriptions.Item>
                </>
              )}
              <Descriptions.Item label="Fecha" span={2}>
                <Moment format="DD MMMM YYYY" date={day} locale="es" />
              </Descriptions.Item>
              <Descriptions.Item label="Observacion" span={2}>
                <strong>{observacion}</strong>
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      </div>
    </>
  );
};
