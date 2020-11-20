import { combineReducers } from 'redux' //combinReducers用于合并各模块的reducers;
import counter from './counter'
import article from './article'

const reducers = combineReducers({
  counter,
  article,
})

export default reducers
