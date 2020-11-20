import { ARTICLE_QUERY } from '@redux/type/article'

let initState = {
  count: 10000,
  data: {},
}

const article = (state = initState, action) => {
  const count = state.count
  console.log('>>>>>>>reduce获取的值: ', action)
  switch (action.type) {
    case ARTICLE_QUERY:
      return {
        ...state,
        count: count + 1,
      }
    default:
      return state
  }
}

export default article
