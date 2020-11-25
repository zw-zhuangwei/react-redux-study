import { USER_INFO } from '@redux/type/user'

const UserAction = {
  user: {
    userInfo: (dispatch, payload) => {
      return dispatch({
        type: USER_INFO,
        data: payload,
      })
    },
  },
}

export default UserAction
