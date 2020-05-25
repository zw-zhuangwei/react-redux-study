const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://jbp-uat.jiuyescm.com/',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": ""
      }
  }))
}