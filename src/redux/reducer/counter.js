import {
  COUNTER_INCREASE,
  COUNTER_REDUCE,
  COUNTER_ASYNC_TEST,
} from '@redux/type/counter'

let initState = {
  count: 10000,
  data: {},
}

const counter = (state = initState, action) => {
  const count = state.count
  switch (action.type) {
    case COUNTER_INCREASE:
      return {
        ...state,
        count: count + 1,
      }
    case COUNTER_REDUCE:
      return {
        ...state,
        count: count - 1,
      }
    case COUNTER_ASYNC_TEST:
      return {
        ...state,
        count: count + 1,
        data: action.data.items,
      }
    default:
      return state
  }
}

export default counter
