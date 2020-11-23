// import { Redirect } from 'react-router-dom'
import asyncLoader from '@utils/loadable'

const demo = [
  {
    path: '/demo1',
    component: asyncLoader(() => import('@views/demo/Demo1')),
  },
  {
    path: '/demo2',
    component: asyncLoader(() => import('@views/demo/Demo2')),
  },
  {
    path: '/demo3',
    component: asyncLoader(() => import('@views/demo/Demo3')),
  },
  {
    path: '/demo/hooks/use_state',
    component: asyncLoader(() => import('@views/demo/hooks/UseState')),
  },
  {
    path: '/demo/hooks/use_effect',
    component: asyncLoader(() => import('@views/demo/hooks/UseEffect')),
  },
  {
    path: '/demo/hooks/use_history',
    component: asyncLoader(() => import('@views/demo/hooks/UseHistory')),
  },
  {
    path: '/demo/hooks/use_ref',
    component: asyncLoader(() => import('@views/demo/hooks/UseRef')),
  },
  {
    path: '/demo/hooks/use_context',
    component: asyncLoader(() => import('@views/demo/hooks/UseContext')),
  },
  {
    path: '/demo/hooks/use_reducer',
    component: asyncLoader(() => import('@views/demo/hooks/UseReducer')),
  },
  {
    path: '/demo/hooks/use_memo',
    component: asyncLoader(() => import('@views/demo/hooks/UseMemo')),
  },
  {
    path: '/demo/hooks/define_hook',
    component: asyncLoader(() => import('@views/demo/hooks/DefineHook')),
  },
  {
    path: '*',
    // component: () => <Redirect to="/404" />,
    render: () => (
      <div style={{ textAlign: 'center', marginTop: 100 }}>Not Found Page</div>
    ),
  },
]

export default demo
