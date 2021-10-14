export const actionsType = {
  page: '@admin/users/page',
  perfil: '@admin/users/perfil',
  darBaja: '@admin/users/darbaja',
  newUser: '@admin/users/newuser',
  password: '@admin/users/password',
  nameLast: '@admin/users/changeNameLast',
  // success
  pageSuccess: '@admin/users/page/success',
  perfilSuccess: '@admin/users/perfil/success',
  newUserSuccess: '@admin/users/newuser/success',
  darBajaSuccess: '@admin/users/darbaja/success',
  passwordSuccess: '@admin/users/password/success',
  nameLastSuccess: '@admin/users/changeNameLast/success'
}

// actions
export const pageLoading = (payload) => ({
  type: actionsType.page,
  payload
})

export const darBajaUser = (payload) => ({
  type: actionsType.darBaja,
  payload
})

export const onChangePassword = (payload) => ({
  type: actionsType.password,
  payload
})

export const onChangePerfil = (payload) => ({
  type: actionsType.perfil,
  payload
})

export const changeUserNombresApellidos = (payload) => ({
  type: actionsType.nameLast,
  payload
})

export const userNewAction = (payload) => ({
  type: actionsType.newUser,
  payload
})

const initialState = {
  data: [],
  page: {
    total: 0,
    current: 1,
    pageSize: 5
  },
  perfiles: [],
  loading: false
}

const reducers = (state = initialState, { type, payload }) => {
  if (type === actionsType.page) {
    return {
      ...state,
      data: [],
      loading: true,
      perfiles: [],
      page: initialState.page
    }
  }

  if (type === actionsType.pageSuccess) {
    return {
      ...state,
      loading: false,
      data: payload.data,
      perfiles: payload.perfiles,
      page: {
        total: payload.total,
        current: payload.current,
        pageSize: payload.pageSize
      }
    }
  }

  if (type === actionsType.passwordSuccess) {
    return {
      ...state,
      loading: false
    }
  }

  if (
    type === actionsType.password ||
    type === actionsType.darBaja ||
    type === actionsType.perfil ||
    type === actionsType.nameLast
  ) {
    return {
      ...state,
      loading: true
    }
  }

  if (type === actionsType.perfilSuccess) {
    return {
      ...state,
      loading: false,
      data: state.data.map((item) => {
        if (item.usuario_id === payload.usuario) {
          return {
            ...item,
            nombre: payload.perfils.nombre,
            user_perfil: payload.perfils.id
          }
        }
        return item
      })
    }
  }

  if (type === actionsType.darBajaSuccess) {
    return {
      ...state,
      loading: false,
      data: state.data.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            estado: payload.estado ? 1 : 0
          }
        }
        return item
      })
    }
  }

  if (type === actionsType.nameLastSuccess) {
    return {
      ...state,
      loading: false,
      data: state.data.map(function (item) {
        if (item.usuario_id === payload.usuario) {
          return {
            ...item,
            nomuser: payload.nombres,
            apeuser: payload.apellidos
          }
        }
        return item
      })
    }
  }

  if (type === actionsType.newUserSuccess) {
    return {
      ...state,
      loading: false,
      data: [payload, ...state.data]
    }
  }

  return state
}

export default reducers
