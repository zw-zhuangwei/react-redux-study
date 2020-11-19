import asyncLoader from '@utils/loadable'

const LayHeader = asyncLoader(() => import('@components/LayHeader'))
const ArticleWrite = asyncLoader(() => import('@views/article/Write'))
const ArticleDetails = asyncLoader(() => import('@views/article/Details'))
const ArticleMyList = asyncLoader(() => import('@views/article/MyList'))

const article = [
  {
    path: '/article',
    component: LayHeader,
    routes: [
      {
        path: '/article/write',
        component: ArticleWrite,
      },
      {
        path: '/article/details/:rid',
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
