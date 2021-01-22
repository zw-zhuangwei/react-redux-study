import counter from './counter'
import user from './user'
import api from './api'

let action = Object.assign({}, counter, user, api)

export default action
