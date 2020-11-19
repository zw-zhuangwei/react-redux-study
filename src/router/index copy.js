import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom'
import asyncLoader from '@utils/loadable'
import store from '@redux/store'

//异步加载组件
const Home = asyncLoader(() => import('@views/layout/Home'))
const Qzhome = asyncLoader(() => import('@views/quanzi/Home'))
const Login = asyncLoader(() => import('@views/account/Login'))
const Register = asyncLoader(() => import('@views/account/Register'))
const ArticleWrite = asyncLoader(() => import('@views/article/Write'))
const ArticleDetails = asyncLoader(() => import('@views/article/Details'))
const ArticleMyList = asyncLoader(() => import('@views/article/MyList'))
const Demo1 = asyncLoader(() => import('@views/demo/Demo1'))
const Demo2 = asyncLoader(() => import('@views/demo/Demo2'))
const Demo3 = asyncLoader(() => import('@views/demo/Demo3'))
const DemoHooksUseState = asyncLoader(() =>
  import('@views/demo/hooks/UseState')
)
const DemoHooksUseEffect = asyncLoader(() =>
  import('@views/demo/hooks/UseEffect')
)
const DemoHooksUseHistory = asyncLoader(() =>
  import('@views/demo/hooks/UseHistory')
)
const DemoHooksUseRef = asyncLoader(() => import('@views/demo/hooks/UseRef'))
const DemoHooksUseContext = asyncLoader(() =>
  import('@views/demo/hooks/UseContext')
)
const DemoHooksUseReducer = asyncLoader(() =>
  import('@views/demo/hooks/UseReducer')
)
const DemoHooksUseMemo = asyncLoader(() => import('@views/demo/hooks/UseMemo'))
const DemoHooksDefineHook = asyncLoader(() =>
  import('@views/demo/hooks/DefineHook')
)
const Counter = asyncLoader(() => import('@components/Counter'))

const RouterGroup = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/account/login" />} />
        <Route exact path="/account/login" component={withRouter(Login)} />
        <Route
          exact
          path="/account/register"
          component={withRouter(Register)}
        />
        <Route
          exact
          path="/article/write"
          component={withRouter(ArticleWrite)}
        />
        <Route
          exact
          path="/article/details/:rid"
          component={withRouter(ArticleDetails)}
        />
        <Route
          exact
          path="/article/my_list"
          component={withRouter(ArticleMyList)}
        />
        <Route exact path="/home" component={withRouter(Home)} />
        <Route exact path="/qzhome/:rid" component={withRouter(Qzhome)} />
        <Route exact path="/demo1" component={withRouter(Demo1)} />
        <Route exact path="/demo2" component={withRouter(Demo2)} />
        <Route exact path="/demo3" component={withRouter(Demo3)} />
        <Route exact path="/counter" component={withRouter(Counter)} />
        <Route
          exact
          path="/demo/hooks/use_state"
          component={withRouter(DemoHooksUseState)}
        />
        <Route
          exact
          path="/demo/hooks/use_effect"
          component={withRouter(DemoHooksUseEffect)}
        />
        <Route
          exact
          path="/demo/hooks/use_history"
          component={withRouter(DemoHooksUseHistory)}
        />
        <Route
          exact
          path="/demo/hooks/use_ref"
          component={withRouter(DemoHooksUseRef)}
        />
        <Route
          exact
          path="/demo/hooks/use_context"
          component={withRouter(DemoHooksUseContext)}
        />
        <Route
          exact
          path="/demo/hooks/use_reducer"
          component={withRouter(DemoHooksUseReducer)}
        />
        <Route
          exact
          path="/demo/hooks/use_memo"
          component={withRouter(DemoHooksUseMemo)}
        />
        <Route
          exact
          path="/demo/hooks/define_hook"
          component={withRouter(DemoHooksDefineHook)}
        />
        <Route render={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  </Provider>
)

export default RouterGroup
