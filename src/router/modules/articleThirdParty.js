import asyncLoader from '@utils/loadable'

const LayHome = asyncLoader(() => import('@views/layout/Home'))

const articleThirdParty = [
  {
    path: '/article_third_party',
    component: LayHome,
    routes: [
      {
        path: '/article_third_party/artList',
        component: asyncLoader(() =>
          import('@views/articleThirdParty/ArtList')
        ),
      },
    ],
  },
]

export default articleThirdParty
