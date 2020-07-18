module.exports = {
  entry: "./src/App.tsx",
  //devtool: 'sourcemaps',
  //cache: true,
  //mode: 'development',
  output: {
    path: __dirname,
    //make sure index.html template imports /built/bundle.js
    filename: "../resources/static/built/bundle.js",
  },
  module: {
    rules: [
      // **** ts-loader will compile tsx code into js code ****
      // {
      //   test: /jsx?$/i,
      //   exclude: /(node_modules)/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env", "@babel/preset-react"],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
