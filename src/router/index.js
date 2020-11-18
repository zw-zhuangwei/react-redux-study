import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from '../redux/store'

import base from './base'
import account from './account'
import article from './article'
import demo from './demo'

const Root = ({ route }) => <>{renderRoutes(route.routes)}</>

const initRoute = [
  {
    component: Root,
    routes: [...base, ...account, ...article, ...demo],
  },
]

const RouterGroup = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {renderRoutes(initRoute)}
        <Route render={() => <div>Not Found</div>} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default RouterGroup
