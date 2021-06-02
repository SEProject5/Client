const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/', {
      target:
        'http://ec2-13-125-128-80.ap-northeast-2.compute.amazonaws.com:3001',
      changeOrigin: true,
    })
  );
};
