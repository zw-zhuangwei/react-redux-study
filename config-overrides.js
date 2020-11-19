const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
/* 路径别名配置 */
module.exports = override(
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
    libraryName: 'antd-mobile',
    style: 'css',
  })
)
