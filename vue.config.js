module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  assetsDir: "assets",
  devServer: {
    proxy: {
      '/site': {
        target: 'http://stark.com/api',
        changeOrigin: true,  //是否跨域
        pathRewrite: {'^/site' : ''}, //重定向
        secure: false
      },
    }
  }
}