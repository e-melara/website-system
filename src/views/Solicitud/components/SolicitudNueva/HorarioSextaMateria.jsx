import React from "react";
import { PageHeader, Button, List } from "antd";
import { RightOutlined } from "@ant-design/icons";

const HorarioSextaMateria = ({ validated, handler }) => {
  const { subjects } = validated;

  return (
    <div className="form-select-subject">
      <div className="title-component">
        <h2>Lorem Ipsum</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      {subjects.length > 0 &&
        subjects.map((element, index) => (
          <PageItemschules key={index} handler={handler} {...element} />
        ))}
    </div>
  );
};

const PageItemschules = ({ materia, nommate, schules, handler }) => {
  return (
    <PageHeader ghost={false} title={nommate} subTitle={materia}>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={schules}
        renderItem={(item) => (
          <List.Item actions={[
            <Button type='primary' icon={<RightOutlined />} onClick={() =>  handler({
              codmate: materia,
              nommate,
              item
            })} />
          ]}>
            Dias: {item.dias} | Hora: {item.hora} | Turno: {item.turno}
          </List.Item>
        )}
      />
    </PageHeader>
  );
};

export default HorarioSextaMateria;
