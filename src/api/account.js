import $request from "../utils/request";

export const login = (params) =>
  $request.setPromise(`POST`, "/api/user/login", params);

export const register = (params) =>
  $request.setPromise(`POST`, "/api/user/register", params);

export const updateFace = (params) =>
  $request.setPromise(`POST`, "/api/user/updateFace", params);
