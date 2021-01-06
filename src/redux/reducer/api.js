import { API_ALL_GATHER } from '@redux/type/api'

let initState = {
  api: {},
}

const api = (state = initState, action) => {
  switch (action.type) {
    case API_ALL_GATHER:
      return {
        ...state,
        api: action.data,
      }
    default:
      return state
  }
}

export default api
