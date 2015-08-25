var path = require("path");

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
          path.join(__dirname, "node_modules/react-resolver"),
        ],
        loaders: ["babel"],
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

  plugins: [],

  target: "web",
};
