const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://www.coffeecola.cn:8080/",
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
      // 代理本地配置此配置，取消SSL校验 
      // secure: false,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
