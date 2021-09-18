export const arancelesCuota = (data = [], codigo = '', precioCuota = 0.0) => {
  const codigoCuota = `${codigo}020`
  return data.map(({ idarancel, precio, descripcion }) => {
    let returnObject = {
      precio,
      descripcion,
      id: idarancel,
      isCuota: false
    }
    if (idarancel.includes(codigoCuota)) {
      returnObject['isCuota'] = true
      returnObject['precio'] = precioCuota
    }
    return returnObject
  })
}

export const AsesoriaTypeUser = (pathname) => {
  if (pathname === '/admin/c/asesoria') {
    // Colecturia
    return 1;
  }
  // Registro
  return 2
}
