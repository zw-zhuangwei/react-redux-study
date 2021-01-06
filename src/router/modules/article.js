import asyncLoader from '@utils/loadable'

const LayHome = asyncLoader(() => import('@views/layout/Home'))

const article = [
  {
    path: '/article',
    component: LayHome,
    routes: [
      {
        path: '/article/details/:id',
        component: asyncLoader(() => import('@views/article/Details')),
      }
    ],
  },
]

export default article
