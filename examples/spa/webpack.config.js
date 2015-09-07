var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    client: [
      path.join(__dirname, "src/client.js"),
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "../../src"),
        ],
        loaders: [
          require.resolve("babel-loader"),
        ],
      },
    ],
  },

  output: {
    chunkFilename: "[name].min.js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].min.js",
    hotUpdateChunkFilename: "update/[hash]/[id].update.js",
    hotUpdateMainFilename: "update/[hash]/update.json",
    path: path.join(__dirname, "dist"),
    publicPath: "http://localhost:8080/",
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^react$/,
      require.resolve("react")
    ),
  ],

  resolve: {
    alias: {
      "react-resolver": path.resolve(__dirname, "../../src"),
    },
  },

  target: "web",
};
