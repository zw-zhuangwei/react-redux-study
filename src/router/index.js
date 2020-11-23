import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from '@redux/store'

import routes from './modules'

const initRoute = [
  {
    component: ({ route }) => <>{renderRoutes(route.routes)}</>,
    routes,
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
