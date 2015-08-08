var path = require("path");
var webpack = require("webpack");

module.exports = {
  debug: true,

  devtool: "#eval-source-map",

  entry: {
    client: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      path.join(__dirname, "src/client.js"),
    ],
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
    ],
  },

  output: {
    chunkFilename: "[name].min.js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].min.js",
    hotUpdateChunkFilename: "update/[hash]/[id].update.js",
    hotUpdateMainFilename: "update/[hash]/update.json",
    path: path.join(__dirname, "public"),
    publicPath: "http://localhost:8080/",
  },

  plugins: [
    // Wrap builds with HMR
    new webpack.HotModuleReplacementPlugin(),

    // Prevent errors from causing a reload
    new webpack.NoErrorsPlugin(),
  ],

  target: "web",
};
