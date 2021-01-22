import { createStore, compose, applyMiddleware } from 'redux' // applyMiddlewares 是将所有中间件组成一个数组，依次执行
import thunk from 'redux-thunk'
import reducer from '@redux/reducer'

// dev 环境测试
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
