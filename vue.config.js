const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  // transpileDependencies: true,
  //根目录
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    https:false,
    proxy: {
      // MOC接口
      '/dev-api': {
        target: 'http://45.86.76.222:8000',
        // target: 'http://192.168.31.133:80',
        changeOrigin: true, // 是否跨域
        ws: false,
        pathRewrite: {
          '^/dev-api': '' // 需要rewrite重写，访问那边直接用api当作域名
        }
      }
    }
  }
})
