// import { Redirect } from 'react-router-dom'
import asyncLoader from '@utils/loadable'

const Demo1 = asyncLoader(() => import('@views/demo/Demo1'))
const Demo2 = asyncLoader(() => import('@views/demo/Demo2'))
const Demo3 = asyncLoader(() => import('@views/demo/Demo3'))
const DemoHooksUseState = asyncLoader(() =>
  import('@views/demo/hooks/UseState')
)
const DemoHooksUseEffect = asyncLoader(() =>
  import('@views/demo/hooks/UseEffect')
)
const DemoHooksUseHistory = asyncLoader(() =>
  import('@views/demo/hooks/UseHistory')
)
const DemoHooksUseRef = asyncLoader(() => import('../views/demo/hooks/UseRef'))
const DemoHooksUseContext = asyncLoader(() =>
  import('@views/demo/hooks/UseContext')
)
const DemoHooksUseReducer = asyncLoader(() =>
  import('@views/demo/hooks/UseReducer')
)
const DemoHooksUseMemo = asyncLoader(() => import('@views/demo/hooks/UseMemo'))
const DemoHooksDefineHook = asyncLoader(() =>
  import('@views/demo/hooks/DefineHook')
)

const demo = [
  {
    path: '/demo1',
    component: Demo1,
  },
  {
    path: '/demo2',
    component: Demo2,
  },
  {
    path: '/demo3',
    component: Demo3,
  },
  {
    path: '/demo/hooks/use_state',
    component: DemoHooksUseState,
  },
  {
    path: '/demo/hooks/use_effect',
    component: DemoHooksUseEffect,
  },
  {
    path: '/demo/hooks/use_history',
    component: DemoHooksUseHistory,
  },
  {
    path: '/demo/hooks/use_ref',
    component: DemoHooksUseRef,
  },
  {
    path: '/demo/hooks/use_context',
    component: DemoHooksUseContext,
  },
  {
    path: '/demo/hooks/use_reducer',
    component: DemoHooksUseReducer,
  },
  {
    path: '/demo/hooks/use_memo',
    component: DemoHooksUseMemo,
  },
  {
    path: '/demo/hooks/define_hook',
    component: DemoHooksDefineHook,
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
