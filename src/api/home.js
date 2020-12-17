import $request from '@utils/request'

export const activeUser = (params) =>
  $request.setPromise(`get`, '/api/home/activeUser', params)
