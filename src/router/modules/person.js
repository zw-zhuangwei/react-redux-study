/*
 * @Author: zhuangwei
 * @Date: 2021-01-06 13:21:29
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-22 14:05:17
 * @Description: 
 */
import asyncLoader from '@utils/loadable'

const person = [
  {
    path: '/person',
    exact: true,
    routes: [
      {
        path: '/person/dictionary',
        exact: true,
        component: asyncLoader(() => import('@views/person/Dictionary')),
        meta: {
          requireAuth: true,
          layout: 2,
          title: '数据字典'
        }
      },
      {
        path: '/person/article_write',
        exact: true,
        component: asyncLoader(() => import('@views/person/ArticleWrite')),
        meta: {
          requireAuth: true,
          layout: 2,
          title: '写文章'
        }
      },
      {
        path: '/person/article_list',
        exact: true,
        component: asyncLoader(() => import('@views/person/ArticleList')),
        meta: {
          requireAuth: true,
          layout: 2,
          title: '文章列表'
        }
      },
      {
        path: '/person/article_resource',
        exact: true,
        component: asyncLoader(() =>
          import('@views/person/ArticleResource')
        ),
        meta: {
          requireAuth: true,
          layout: 2,
          title: '文章资源'
        }
      },
    ],
  },
]

export default person
