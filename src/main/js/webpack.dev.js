const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { mergeWithCustomize, customizeArray } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = mergeWithCustomize({
  customizeArray: customizeArray({
    // arrays append by default, so change to prepend where needed
    entry: 'prepend',
  })
})(common, {
  mode: 'development',
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8888',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates 
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new HtmlWebpackHarddiskPlugin()
  ],
  devtool: 'sourcemaps',
  devServer: {
    hot: true,
    contentBase: [path.resolve(__dirname, '.'), path.resolve(__dirname, '../resources/static/built/')],
    proxy: {
      '/': 'http://localhost:8080',
      ignorePath: true,
      changeOrigin: true,
      secure: false,
    },
    publicPath: '/built/',
    port: 8888,
  },
});
