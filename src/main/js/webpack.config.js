const path = require("path");

module.exports = {
  entry: "./index.tsx",
  devtool: "sourcemaps",
  //cache: true,
  //mode: 'development',
  output: {
    path: path.resolve(__dirname, "../resources/static/built/"),
    //make sure index.html template imports /built/bundle.js
    filename: "bundle.js",
  },
  module: {
    rules: [
      // **** ts-loader will compile jsx code into js code as well ****
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
