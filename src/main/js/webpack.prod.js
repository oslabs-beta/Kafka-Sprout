const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
});