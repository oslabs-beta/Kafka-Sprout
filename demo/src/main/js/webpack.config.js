module.exports = {
  entry: './src/App.js',
  //devtool: 'sourcemaps',
  //cache: true,
  //mode: 'development',
  output: {
    path: __dirname,
    //make sure index.html template imports /built/bundle.js
    filename: '../resources/static/built/bundle.js'
  },
  module: {
    rules: [
      {
        test: /jsx?$/i,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }]
      }
    ]
  },
};