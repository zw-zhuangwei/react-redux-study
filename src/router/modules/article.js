import asyncLoader from '@utils/loadable'

const LayHome = asyncLoader(() => import('@views/layout/Home'))

const article = [
  {
    path: '/article',
    component: LayHome,
    routes: [
      {
        path: '/article/write',
        exact: false,
        component: asyncLoader(() => import('@views/article/Write')),
      },
      {
        path: '/article/details/:id',
        component: asyncLoader(() => import('@views/article/Details')),
      },
      {
        path: '/article/my_list',
        component: asyncLoader(() => import('@views/article/MyList')),
      },
    ],
  },
]

export default article
