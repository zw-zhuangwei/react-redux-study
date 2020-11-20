import {
  ARTICLE_QUERY,
  ARTICLE_MYLIST,
  ARTICLE_REMOVE,
} from '@redux/type/article'
import { articleQuery, articleMyList, articleRemove } from '@api/article'

const ArticleAction = {
  article: {
    artQuery: (dispatch, payload) => {
      return articleQuery(payload).then((res) => {
        dispatch({
          type: ARTICLE_QUERY,
          data: res,
        })
      })
    },
    artMylist: (dispatch, payload) => {
      return articleMyList(payload).then((res) => {
        dispatch({
          type: ARTICLE_MYLIST,
          data: res,
        })
      })
    },
    artRemove: (dispatch, payload) => {
      return articleRemove(payload).then((res) => {
        dispatch({
          type: ARTICLE_REMOVE,
          data: res,
        })
      })
    },
  },
}

export default ArticleAction
