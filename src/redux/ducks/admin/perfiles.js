export const actionsType = {
  all: '@admin/perfiles/page',
  add: '@admin/perfiles/add',
  newPerfil: '@admin/perfiles/new',
  findById: '@admin/perfiles/findById',
  deleteModulo: '@admin/perfiles/delete',
  editPerfil: '@admin/perfiles/edit',

  addSuccess: '@admin/perfiles/add/success',
  allSuccess: '@admin/perfiles/page/success',
  newPerfilSuccess: '@admin/perfiles/new/success',
  editPerfilSuccess: '@admin/perfiles/edit/success',
  findByIdSuccess: '@admin/perfiles/findById/success',
  deleteModuloSuccess: '@admin/perfiles/delete/success'
}

export const deleteModulo = (payload) => ({
  type: actionsType.deleteModulo,
  payload
})

export const loadingPage = () => ({
  type: actionsType.all
})

export const findById = (payload) => ({
  type: actionsType.findById,
  payload
})

export const addModuloPerfilServer = (payload) => ({
  type: actionsType.add,
  payload
})

export const addNewPerfil = (payload) => ({
  type: actionsType.newPerfil,
  payload
})

export const editPerfil = (payload) => ({
  type: actionsType.editPerfil,
  payload
})

const initialState = {
  data: [],
  current: {
    perfil: {},
    modulos: [],
    usuarios: [],
    loading: false,
    dataModulos: []
  },
  loading: false
}

const reducers = (state = initialState, { type, payload }) => {
  if (type === actionsType.all) {
    return {
      ...state,
      loading: true
    }
  }

  if (type === actionsType.editPerfilSuccess) {
    return {
      ...state,
      data: state.data.map(function (item) {
        if (item.id === payload.id) {
          return {
            ...item,
            nombre: payload.nombre
          }
        }
        return item
      })
    }
  }

  if (type === actionsType.findById) {
    return {
      ...state,
      current: { ...initialState.current, loading: true }
    }
  }

  if (type === actionsType.deleteModulo) {
    return {
      ...state,
      current: {
        ...state.current,
        loading: true
      }
    }
  }

  if (type === actionsType.allSuccess) {
    return {
      ...state,
      loading: false,
      data: payload.data
    }
  }

  if (type === actionsType.findByIdSuccess) {
    return {
      ...state,
      current: {
        loading: false,
        perfil: payload.perfil,
        modulos: payload.modulos,
        usuarios: payload.usuarios,
        dataModulos: payload.dataModulos
      }
    }
  }

  if (type === actionsType.deleteModuloSuccess) {
    return {
      ...state,
      current: {
        ...state.current,
        loading: false,
        modulos: state.current.modulos.filter((m) => m.id !== payload.id)
      }
    }
  }

  if (type === actionsType.addSuccess) {
    return {
      ...state,
      current: {
        ...state.current,
        modulos: [...state.current.modulos, payload]
      }
    }
  }

  if (type === actionsType.newPerfilSuccess) {
    return {
      ...state,
      data: [...state.data, payload]
    }
  }

  return state
}

export default reducers
