import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import asyncLoader from "../utils/loadable";
import store from "../redux/store";

// import Home from "../views/layout/home";
// import Demo1 from "../views/demo/demo1";
// import Demo2 from "../views/demo/demo2";
// import Demo3 from "../views/demo/demo3";

//异步加载组件
const Home = asyncLoader(() => import("../views/layout/Home"));
const Demo1 = asyncLoader(() => import("../views/demo/Demo1"));
const Demo2 = asyncLoader(() => import("../views/demo/Demo2"));
const Demo3 = asyncLoader(() => import("../views/demo/Demo3"));
const Counter = asyncLoader(() => import("../component/Counter"));

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" component={withRouter(Home)} />
        <Route exact path="/demo1" component={withRouter(Demo1)} />
        <Route exact path="/demo2" component={withRouter(Demo2)} />
        <Route exact path="/demo3" component={withRouter(Demo3)} />
        <Route exact path="/counter" component={withRouter(Counter)} />
        <Route render={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  </Provider>
);
