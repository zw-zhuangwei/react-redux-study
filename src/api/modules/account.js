import $request from '@utils/request'

export const login = (params) =>
  $request.setPromise(`POST`, '/api/user/login', params)

export const register = (params) =>
  $request.setPromise(`POST`, '/api/user/register', params)

export const layout = (params) =>
  $request.setPromise(`POST`, '/api/user/layout', params)

// 获取七牛token
export const getQiniuToken = (params) =>
  $request.setPromise(`POST`, '/api/user/qiniuToken', params)

// 修改头像
export const uploadFace = (params) =>
  $request.setPromise(`POST`, '/api/user/uploadFace', params)
