const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'accords_node_container:3001',
      changeOrigin: true,
    })
  );
};