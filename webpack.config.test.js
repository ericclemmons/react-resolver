var path = require("path");

module.exports = {
  devtool: "#inline-source-map",
  entry: {
    all: ["./test/all.js"],
  },
  externals: /^[a-z\-0-9]+$/,  // Every non-relative module is external
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ },
    ],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  output: {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].min.js",
    libraryTarget: "umd",
    path: path.join(__dirname, "test"),
  },
  plugins: [],
  target: "async-node",
};
