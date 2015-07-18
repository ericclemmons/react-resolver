module.exports = {
  entry: {
    client: "./client.js",
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
