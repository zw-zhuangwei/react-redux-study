import $request from '@utils/request'

//新增第三方资源
export const articleThirdPartyQuery = (params) =>
  $request.setPromise(`GET`, '/api/articleThirdParty/query', params)

//新增第三方资源
export const articleThirdPartyInsert = (params) =>
  $request.setPromise(`POST`, '/api/articleThirdParty/insert', params)

//修改第三方资源
export const articleThirdPartyModify = (params) =>
  $request.setPromise(`POST`, '/api/articleThirdParty/modify', params)

//删除第三方资源
export const articleThirdPartyRemove = (params) =>
  $request.setPromise(`POST`, '/api/articleThirdParty/remove', params)


