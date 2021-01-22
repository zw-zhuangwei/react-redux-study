/*
 * @Author: zhuangwei
 * @Date: 2020-11-18 10:47:09
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-21 18:31:14
 * @Description: 
 */
import asyncLoader from '@utils/loadable'

const article = [
  {
    path: '/article',
    routes: [
      {
        path: '/article/details/:id',
        exact: true,
        component: asyncLoader(() => import('@views/article/Details')),
        meta: {
          layout: 1,
          title: '文章详情'
        }
      }
    ],
  },
]

export default article
