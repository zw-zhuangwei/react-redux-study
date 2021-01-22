import { API_ALL_GATHER } from '@redux/type/api'

const ApiAction = {
  api: {
    getAll: (dispatch, payload) => {
      return dispatch({
        type: API_ALL_GATHER,
        data: payload,
      })
    },
  },
}

export default ApiAction
