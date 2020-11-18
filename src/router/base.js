import asyncLoader from '../utils/loadable'

const Home = asyncLoader(() => import('../views/layout/Home'))
const Qzhome = asyncLoader(() => import('../views/quanzi/Home'))
//const Counter = () => import('../component/Counter')

const base = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/qzhome/:rid',
    component: Qzhome,
  },
  // {
  //   path: '/counter',
  //   component: Counter,
  // },
]

export default base
