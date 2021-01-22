import { USER_INFO } from '@redux/type/user'

let initState = {
  userInfo: {},
}

const user = (state = initState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: action.data,
      }
    default:
      return state
  }
}

export default user
