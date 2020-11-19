import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from '@redux/store'

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

console.log(212121, initRoute)

const Root1 = ({ route }) => (
  <div>
    <h1>Root</h1>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
)

const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
)

const Child = ({ route }) => (
  <div>
    <h2>Child</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
)

const GrandChild = ({ someProp }) => (
  <div>
    <h3>Grand Child</h3>
    <div>{someProp}</div>
  </div>
)

const routes = [
  {
    component: Root1,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/child/:id',
        component: Child,
        routes: [
          {
            path: '/child/:id/grand-child',
            component: GrandChild,
          },
        ],
      },
    ],
  },
]

const RouterGroup = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {renderRoutes(initRoute)}
        <Route path="*" render={() => <div>Not Found</div>} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default RouterGroup
