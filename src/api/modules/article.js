import $request from '@utils/request'

//查询所有文章
export const articleQuery = (params) =>
  $request.setPromise(`GET`, '/api/article/query', params)
//查询我的文章列表
export const articleMyList = (params) =>
  $request.setPromise(`GET`, '/api/article/myListQuery', params)
// 查看文章详情
export const articleDetails = (params) =>
  $request.setPromise(`GET`, '/api/article/details', params)
// 添加文章
export const articleInsert = (params) =>
  $request.setPromise(`POST`, '/api/article/insert', params)
// 修改文章
export const articleModify = (params) =>
  $request.setPromise(`POST`, '/api/article/modify', params)
// 删除文章
export const articleRemove = (params) =>
  $request.setPromise(`POST`, '/api/article/remove', params)
// 文章点赞
export const articlePraise = (params) =>
  $request.setPromise(`POST`, '/api/article/praise', params)

// 评论文章
export const articleComment = (params) =>
  $request.setPromise(`POST`, '/api/article/comment', params)
// 评论文章
export const commentListQuery = (params) =>
  $request.setPromise(`GET`, '/api/article/commentListQuery', params)
// 评论回复
export const commentReply = (params) =>
  $request.setPromise(`POST`, '/api/article/commentReply', params)
// 评论点赞
export const commentPraise = (params) =>
  $request.setPromise(`POST`, '/api/article/commentPraise', params)
// 评论回复点赞
export const replyPraise = (params) =>
  $request.setPromise(`POST`, '/api/article/replyPraise', params)
