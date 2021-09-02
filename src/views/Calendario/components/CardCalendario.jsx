import React from "react";
import { Card } from "antd";
import Moment from "react-moment";
import classNames from "classnames";

import "./card_calendario.scss";

const CardCalendario = ({ begin_date, dias, end_date, is_end_date, title }) => {
  return (
    <Card
      className={classNames({
        rojo: dias <= 3,
        amarillo: dias <= 10 && dias > 3,
      })}
      title={<Moment date={begin_date} format="DD" />}
      extra={<Moment date={begin_date} format="MMM" />}
      hoverable
    >
      <span className="link">{title}</span>
      <span className="date_span">
        Desde <Moment date={begin_date} format="D MMM" />
        {is_end_date && (
          <>
            <span className="fecha_span">hasta el</span>
            <Moment date={end_date} format="D MMM" />
          </>
        )}
      </span>
    </Card>
  );
};

export default CardCalendario;
