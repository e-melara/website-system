import React from "react";

export function MessageError({ errors, touched }) {
  if (touched && errors) {
    return <div className="invalid-feedback">{errors}</div>;
  }
  return null;
}
