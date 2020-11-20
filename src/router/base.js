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
  },
  {
    path: '/counter',
    component: Counter,
  },
  {
    path: '/qzhome',
    component: LayHome,
    routes: [
      {
        path: '/qzhome/home',
        component: Qzhome,
      },
      {
        path: '/qzhome/:id',
        component: Qzhome,
      },
    ],
  },
]

export default base
