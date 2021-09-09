import { remove } from "lodash";

export const reducerArray = (array = []) => {
  return array.reduce(function (acc, current) {
    if (current.id) {
      return [current.id, ...acc];
    }
    return acc;
  }, []);
};

export const removeArray = (array, condicion) => {
  return remove(array, function (item) {
    return item.key === condicion;
  });
};
