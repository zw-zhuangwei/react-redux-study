import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from '@redux/store'

import base from './base'
import account from './account'
import article from './article'
import demo from './demo'

const initRoute = [
  {
    component: ({ route }) => <>{renderRoutes(route.routes)}</>,
    routes: [...base, ...account, ...article, ...demo],
  },
]

const RouterGroup = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>{renderRoutes(initRoute)}</Switch>
    </BrowserRouter>
  </Provider>
)

export default RouterGroup
