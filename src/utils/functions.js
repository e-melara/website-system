export const arancelesCuota = (data = []) => {
  return {
    data: data.slice(3),
    selections: data.slice(0, 3)
  }
}

export const AsesoriaTypeUser = (pathname) => {
  if (pathname === '/admin/c/asesoria') {
    // Colecturia
    return 1
  }
  // Registro
  return 2
}
