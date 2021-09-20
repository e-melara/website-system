export const arancelesCuota = (data = []) => {
  return {
    default: data.slice(0, 3),
    data: data.slice(3)
  }
}

export const AsesoriaTypeUser = (pathname) => {
  if (pathname === '/admin/c/asesoria') {
    // Colecturia
    return 1;
  }
  // Registro
  return 2
}
