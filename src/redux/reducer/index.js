import { combineReducers } from 'redux' //combinReducers用于合并各模块的reducers;
import counter from './counter'
import user from './user'

const reducers = combineReducers({
  counter,
  user,
})

export default reducers
