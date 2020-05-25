import {
  COUNTER_INCREASE,
  COUNTER_REDUCE,
  COUNTER_ASYNC_TEST,
} from "../type/counter";

import * as test from "../../api/test.js";

export default {
  counter: {
    increase: () => {
      return (dispatch) => {
        dispatch({
          type: COUNTER_INCREASE,
        });
      };
    },
    reduce: () => {
      return (dispatch) => {
        dispatch({
          type: COUNTER_REDUCE,
        });
      };
    },
    asyncTest: (payload) => {
      return (dispatch) => {
        console.log(">>>>>action接收的值: ", payload);
        return test.goodsType(payload).then((res) => {
          dispatch({
            type: COUNTER_ASYNC_TEST,
            data: res,
          });
        });
      };
    },
  },
};
