import { ARTICLE_QUERY } from '@redux/type/article'

import * as test from '@api/test.js'

const ArticleAction = {
  counter: {
    asyncTest: (payload) => {
      return (dispatch) => {
        console.log('>>>>>action接收的值: ', payload)
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

export default ArticleAction
