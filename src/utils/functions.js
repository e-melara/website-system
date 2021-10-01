export const arancelesCuota = (data = []) => {
  return {
    data: data.slice(3),
    selections: data.slice(0, 3)
  }
}

export const AsesoriaTypeUser = (pathname) => {
  if (pathname === '/admin/c/asesoria' || pathname === '/admin/c/solicitudes') {
    // Colecturia
    return 1
  }

  if (pathname === '/admin/a/asesoria') {
    // registro
    return 3
  }
  // Registro
  return 2
}
