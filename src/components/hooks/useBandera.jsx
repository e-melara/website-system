import { useState } from "react";

export const useBandera = (initialState) => {
  const reset = () => setValues(initialState);
  const [values, setValues] = useState(initialState);
  const handleInputChange = () => setValues(e => !e);

  return [values, handleInputChange, reset];
};
