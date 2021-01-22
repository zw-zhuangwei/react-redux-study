/*
 * @Author: zhuangwei
 * @Date: 2020-11-18 13:52:52
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-22 11:24:41
 * @Description: 
 */
import { Redirect } from 'react-router-dom'
import asyncLoader from '@utils/loadable'
const LayHome = asyncLoader(() => import('@views/layout/Home'))
const Qzhome = asyncLoader(() => import('@views/quanzi/Home'))
const Counter = asyncLoader(() => import('@components/Counter'))

const base = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/qzhome/home" />,
    meta: {
      layout: 0,
      title: '根目录'
    }
  },
  {
    path: '/counter',
    exact: true,
    component: Counter,
    meta: {
      layout: 0,
      title: '测试counter'
    }
  },
  {
    path: '/qzhome',
    exact: true,
    routes: [
      {
        path: '/qzhome/home',
        exact: true,
        component: Qzhome,
        meta: {
          layout: 1,
          title: '首页'
        }
      },
      {
        path: '/qzhome/:id',
        exact: true,
        component: Qzhome,
        meta: {
          layout: 1,
          title: '我的首页'
        }
      },
    ],
  },
]

export default base
