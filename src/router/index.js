/*
 * @Author: zhuangwei
 * @Date: 2020-11-18 17:26:06
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-22 13:54:14
 * @Description: 
 */
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import cookie from 'js-cookie'
import DocumentTitle from 'react-document-title'
import store from '@redux/store'

import routes from './modules'

import { LayHeader, LayLeftBar } from '@components'

const Wrapper = styled.section`
  .person-area{
    display: flex;
    flex: 1;
    .person-left{
      flex: 0 0 15%;
      max-width: 15%;
      height: calc(100vh);
    }
    .person-right{
      flex: 0 0 85%;
      max-width: 85%;
      padding: 10px;
    }
  }
`

const isLogin = cookie.get('token') ? true : false // 如果登陆之后可以利用redux修改该值
const authPath = '/account/login'// 默认未登录的时候返回的页面，可以自行设置

/**
 * @description: 递归路由
 * @param {Array} routeList
 * @return {Array}
 * @author: zhuangwei
 */
const mapRoutes = (routeList) => {
  return routeList.map((r) => {
    if (r.routes && r.routes.length > 0) {
      return mapRoutes(r.routes);
    } else {
      return renderRoute(r);
    }
  });
};

const renderRoute = (r) => {
  console.log(r)
  return (
    <Route
      key={r.path}
      exact={r.exact}
      path={r.path}
      render={(props) => {
        console.log('此处可以做一些业务逻辑处理...')
        return (
          (!(r.meta && r.meta.requireAuth) || isLogin) ?
            <DocumentTitle title={r.meta ? r.meta.title : '庄庄的博客'}>
              <Fragment>
                {
                  r.meta && r.meta.layout === 0
                    ?
                    <>
                      <r.component {...props} r={r} />
                    </>
                    :
                    (r.meta && r.meta.layout === 1
                      ?
                      <>
                        <LayHeader />
                        <r.component {...props} r={r} />
                      </>
                      :
                      (r.meta && r.meta.layout === 2
                        ?
                        <Wrapper>
                          <LayHeader />
                          <div className="person-area">
                            <div className="person-left">
                              <LayLeftBar />
                            </div>
                            <div className="person-right">
                              <r.component {...props} r={r} />
                            </div>
                          </div>
                        </Wrapper>
                        :
                        <>
                          <r.component {...props} r={r} />
                        </>
                      )
                    )
                }
              </Fragment>
            </DocumentTitle>
            : (
              <Redirect key={r.path} to={authPath} />
            )
        )
      }}
    />
  )
}

const RouterGroup = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>{mapRoutes(routes)}</Switch>
    </BrowserRouter>
  </Provider>
)

export default RouterGroup
