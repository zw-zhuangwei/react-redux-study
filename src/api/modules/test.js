import $request from '@utils/request'

export const goodsType = (params) =>
  $request.setPromise(`GET`, '/mock/test.json', params)
