import {
  COUNTER_INCREASE,
  COUNTER_REDUCE,
  COUNTER_ASYNC_TEST,
} from '@redux/type/counter'

import * as test from '@api/modules/test.js'

const CounterAction = {
  counter: {
    increase: () => {
      return (dispatch) => {
        dispatch({
          type: COUNTER_INCREASE,
        })
      }
    },
    reduce: () => {
      return (dispatch) => {
        dispatch({
          type: COUNTER_REDUCE,
        })
      }
    },
    asyncTest: (payload) => {
      return (dispatch) => {
        return test.goodsType(payload).then((res) => {
          dispatch({
            type: COUNTER_ASYNC_TEST,
            data: res,
          })
        })
      }
    },
  },
}

export default CounterAction
