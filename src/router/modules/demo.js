/*
 * @Author: zhuangwei
 * @Date: 2020-11-18 10:46:31
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-21 17:56:17
 * @Description: 
 */
// import { Redirect } from 'react-router-dom'
import asyncLoader from '@utils/loadable'

const demo = [
  {
    path: '/demo1',
    exact: true,
    component: asyncLoader(() => import('@views/demo/Demo1')),
    meta: {
      layout: 0,
      title: 'demo1'
    }
  },
  {
    path: '/demo2',
    exact: true,
    component: asyncLoader(() => import('@views/demo/Demo2')),
    meta: {
      layout: 0,
      title: 'demo2'
    }
  },
  {
    path: '/demo3',
    exact: true,
    component: asyncLoader(() => import('@views/demo/Demo3')),
    meta: {
      layout: 0,
      title: 'demo3'
    }
  },
  {
    path: '/demo/hooks/use_state',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseState')),
    meta: {
      layout: 0,
      title: 'use_state'
    }
  },
  {
    path: '/demo/hooks/use_effect',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseEffect')),
    meta: {
      layout: 0,
      title: 'use_effect'
    }
  },
  {
    path: '/demo/hooks/use_history',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseHistory')),
    meta: {
      layout: 0,
      title: 'use_history'
    }
  },
  {
    path: '/demo/hooks/use_ref',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseRef')),
    meta: {
      layout: 0,
      title: 'use_ref'
    }
  },
  {
    path: '/demo/hooks/use_context',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseContext')),
    meta: {
      layout: 0,
      title: 'use_context'
    }
  },
  {
    path: '/demo/hooks/use_reducer',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseReducer')),
    meta: {
      layout: 0,
      title: 'use_reducer'
    }
  },
  {
    path: '/demo/hooks/use_memo',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/UseMemo')),
    meta: {
      layout: 0,
      title: 'use_memo'
    }
  },
  {
    path: '/demo/hooks/define_hook',
    exact: true,
    component: asyncLoader(() => import('@views/demo/hooks/DefineHook')),
    meta: {
      layout: 0,
      title: 'define_hook'
    }
  }
]

export default demo
