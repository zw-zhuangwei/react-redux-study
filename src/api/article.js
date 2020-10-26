import $request from "../utils/request";

//查询所有文章
export const articleQuery = (params) =>
  $request.setPromise(`POST`, "/api/article/query", params);
// 添加文章详情  
export const articleDetails = (params) =>
  $request.setPromise(`POST`, "/api/article/details", params);    
// 添加文章  
export const articleInsert = (params) =>
  $request.setPromise(`POST`, "/api/article/insert", params);

