const files = require.context('.', true, /\.js$/)

let routers = []

files.keys().forEach((key) => {
  if (key !== './index.js') {
    // 读取出文件中的default模块})
    return (routers = routers.concat(files(key).default))
  }
})

export default routers
