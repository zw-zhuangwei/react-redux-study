
const files = require.context('./modules', true, /\.js$/)
let apis = {}
files.keys().forEach((item) => {
  if (item !== './index.js') {
    // 取文件名为接口名称
    const keys = item
    .replace(/\.js$/, '')
    .split('/')
    .slice(1)

    const apiModule = { [keys]: files(item) }
    apis = { ...apis, ...(apiModule.default || apiModule) }
  }
})
 
export default apis



