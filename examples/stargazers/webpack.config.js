module.exports = {
  devtool: "inline-source-map",

  entry: {
    main: "./main.js",
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|dist/, loader: "babel-loader" },
    ],
  },

  output: {
    path: "./public",
    filename: "[name].min.js",
  },
};
