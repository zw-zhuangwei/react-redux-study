const {
  override,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
} = require('customize-cra')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

process.env.GENERATE_SOURCEMAP = 'false' //关闭css和js的map文件
/* 路径别名配置 */
module.exports = override(
  addLessLoader(),
  addWebpackAlias({
    '@': resolve('src'),
    '@api': resolve('./src/api'),
    '@components': resolve('./src/component'),
    '@assets': resolve('./src/assets'),
    '@views': resolve('./src/views'),
    '@utils': resolve('./src/utils'),
    '@redux': resolve('./src/redux'),
  }),
  /* antd组件按需加载 */
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
)
