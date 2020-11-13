import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './utils/axiosTool'

//import action from "./redux/action";

//React.Component.prototype.$action = action;

import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    {/* <React.StrictMode> */}
    <App />,{/* </React.StrictMode> */}
  </ConfigProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
