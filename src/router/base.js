import asyncLoader from '@utils/loadable'
const LayHeader = asyncLoader(() => import('@components/LayHeader'))
const Qzhome = asyncLoader(() => import('@views/quanzi/Home'))
const Counter = asyncLoader(() => import('@components/Counter'))

const base = [
  {
    path: '/',
    exact: true,
    component: LayHeader,
  },
  {
    path: '/counter',
    component: Counter,
  },
  {
    path: '/qzhome',
    component: LayHeader,
    routes: [
      {
        path: '/qzhome/:rid',
        component: Qzhome,
      },
    ],
  },
]

export default base
