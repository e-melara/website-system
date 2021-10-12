export const actionsType = {
  page: '@admin/users/page',
  pageSuccess: '@admin/users/page/success'
}

// actions
export const pageLoading = (payload) => ({
  type: actionsType.page,
  payload
})

const initialState = {
  data: [],
  page: {
    total: 0,
    current: 1,
    pageSize: 5
  },
  loading: false
}

const reducers = (state = initialState, { type, payload }) => {
  if (type === actionsType.page) {
    return {
      ...state,
      data: [],
      loading: true,
      page: initialState.page
    }
  }
  if (type === actionsType.pageSuccess) {
    return {
      ...state,
      loading: false,
      data: payload.data,
      page: {
        total: payload.total,
        current: payload.current,
        pageSize: payload.pageSize
      }
    }
  }
  return state
}

export default reducers
