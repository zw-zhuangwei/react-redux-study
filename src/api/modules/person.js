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

//数据字典查询
export const dictionaryQuery = (params) =>
  $request.setPromise(`GET`, '/api/commonEnum/query', params)

//数据字典新增
export const dictionaryInsert = (params) =>
  $request.setPromise(`POST`, '/api/commonEnum/insert', params)

//数据字典修改
export const dictionaryModify = (params) =>
  $request.setPromise(`POST`, '/api/commonEnum/modify', params)

//数据字典删除
export const dictionaryRemove = (params) =>
  $request.setPromise(`POST`, '/api/commonEnum/remove', params)

//数据字典明细查询
export const dictionaryItemQuery = (params) =>
  $request.setPromise(`GET`, '/api/commonEnum/itemQuery', params)

//数据字典明细新增
export const dictionaryItemInsert = (params) =>
  $request.setPromise(`POST`, '/api/commonEnum/itemInsert', params)

//数据字典明细修改
export const dictionaryItemModify = (params) =>
  $request.setPromise(`POST`, '/api/commonEnum/itemModify', params)

//数据字典明细删除
export const dictionaryItemRemove = (params) =>
  $request.setPromise(`POST`, '/api/commonEnum/itemRemove', params)


