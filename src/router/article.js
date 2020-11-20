import asyncLoader from '@utils/loadable'

const LayHome = asyncLoader(() => import('@views/layout/Home'))
const ArticleWrite = asyncLoader(() => import('@views/article/Write'))
const ArticleDetails = asyncLoader(() => import('@views/article/Details'))
const ArticleMyList = asyncLoader(() => import('@views/article/MyList'))

const article = [
  {
    path: '/article',
    component: LayHome,
    routes: [
      {
        path: '/article/write',
        component: ArticleWrite,
      },
      {
        path: '/article/details/:id',
        component: ArticleDetails,
      },
      {
        path: '/article/my_list',
        component: ArticleMyList,
      },
    ],
  },
]

export default article
