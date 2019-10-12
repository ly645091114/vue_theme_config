const { resolve } = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: resolve(__dirname, './src'),
        styles: resolve(__dirname, './src/styles')
      }
    }
  },
  devServer: {
    port: 8089,
    open: true
  }
}
