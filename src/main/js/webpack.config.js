const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8888',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates 
    'webpack/hot/only-dev-server',
    './index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, '../resources/static/built/'),
    // Spring Boot serves static files from resources/static folder
    // So script file paths generated in HtmlWebpackPlugin should be
    // relative to static folder
    publicPath: '/built/',
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './index.html',
      // make sure html gets saved into templates folder
      filename: path.resolve(__dirname, '../resources/templates/index.html')
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
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
};
