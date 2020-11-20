import {
  ARTICLE_QUERY,
  ARTICLE_MYLIST,
  ARTICLE_REMOVE,
} from '@redux/type/article'

let initState = {
  qzHomeData: {},
  artMylistData: {},
}

const article = (state = initState, action) => {
  switch (action.type) {
    case ARTICLE_QUERY:
      return {
        ...state,
        qzHomeData: action.data,
      }
    case ARTICLE_MYLIST:
      return {
        ...state,
        artMylistData: action.data.data,
      }
    case ARTICLE_REMOVE:
      return {
        ...state,
        listData: action.data,
      }
    default:
      return state
  }
}

export default article
