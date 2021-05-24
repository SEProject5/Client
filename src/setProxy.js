const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/', {
      target: 'http://ec2-18-116-105-214.us-east-2.compute.amazonaws.com:3000',
      changeOrigin: true,
    })
  );
};
