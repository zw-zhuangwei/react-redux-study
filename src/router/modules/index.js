/*
 * @Author: zhuangwei
 * @Date: 2020-11-23 14:26:57
 * @LastEditors: zhuangwei
 * @LastEditTime: 2021-01-22 10:50:34
 * @Description: 
 */

// import { Redirect } from 'react-router-dom'

const files = require.context('.', true, /\.js$/)

let routers = []

files.keys().forEach((key) => {
  if (key !== './index.js') {
    // 读取出文件中的default模块})
    return (routers = routers.concat(files(key).default))
  }
})

routers.push({
  path: '*',
  component: () => <div style={{ textAlign: 'center', marginTop: 100 }}>Not Found Page</div>
  // render: () => (
  //   <div style={{ textAlign: 'center', marginTop: 100 }}>Not Found Page</div>
  // ),
})

export default routers
