import React from "react";
import { connect } from "react-redux";

import "./asesoria.scss";
import CardSubjects from "./component/CardSubjects";
import CardUser from "../../../components/common/CardUser";
import CardUserEnrolled from "./component/CardUserEnrolled";

const AsesoriaPage = ({ data, carrera, active, enrolled }) => {
  return (
    <div className="row">
      <div className="col-3">
        <CardUser user={data} carrera={carrera} />
      </div>

      {active && (
        <div className="col">
          <CardUserEnrolled enrolled={enrolled} />
        </div>
      )}

      {!active &&
        <div className="col">
          <CardSubjects />
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data, carrera } = state.auth;
  const { active, enrolled } = state.asesoria;
  return {
    data,
    carrera,
    active,
    enrolled,
  };
};

export default connect(mapStateToProps)(AsesoriaPage);
