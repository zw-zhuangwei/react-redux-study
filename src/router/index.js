import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from '../redux/store'

// import base from './base'
import account from './account'
// import article from './article'
// import demo from './demo'

// console.log(
//   base.routes.concat(account.routes).concat(article.routes).concat(demo.routes)

//const routes = [...require('./account')]

const Root = ({ route }) => (
  <div>
    <h1>Root</h1>
    {renderRoutes(route.routes)}
  </div>
)

const RouterGroup = () => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(account)}
      {/* <Switch>
        <Route exact path="/" render={() => <Redirect to="/Login" />} />
        <Route render={() => <div>Not Found</div>} />
      </Switch> */}
    </BrowserRouter>
  </Provider>
)

export default RouterGroup
