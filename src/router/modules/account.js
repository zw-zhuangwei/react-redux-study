/*
 * @Author: zhuangwei
 * @Date: 2020-11-18 13:54:11
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-22 11:18:18
 * @Description: 
 */
import asyncLoader from '@utils/loadable'

const account = [
  {
    path: '/account/login',
    exact: true,
    component: asyncLoader(() => import('@views/account/Login')),
    meta: {
      layout: 0,
      title: '登录'
    }
  },
  {
    path: '/account/register',
    exact: true,
    component: asyncLoader(() => import('@views/account/Register')),
    meta: {
      layout: 0,
      title: '注册'
    }
  },
]

export default account
