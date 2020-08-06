const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
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
      favicon: './favicon.ico',
      // make sure html gets saved into templates folder
      filename: path.resolve(__dirname, '../resources/templates/index.html')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  }
};
