import asyncLoader from '@utils/loadable'

const HomeLeftBar = asyncLoader(() => import('@views/layout/HomeLeftBar'))

const person = [
  {
    path: '/person',
    component: HomeLeftBar,
    routes: [
      {
        path: '/person/dictionary',
        component: asyncLoader(() => import('@views/person/Dictionary')),
      },
      {
        path: '/person/article_write',
        component: asyncLoader(() => import('@views/person/ArticleWrite')),
      },
      {
        path: '/person/article_list',
        component: asyncLoader(() => import('@views/person/ArticleList')),
      },
      {
        path: '/person/article_resource',
        component: asyncLoader(() =>
          import('@views/person/ArticleResource')
        ),
      },
    ],
  },
]

export default person
