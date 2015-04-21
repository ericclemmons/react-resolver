module.exports = {
  entry: {
    main: "./main.js",
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|dist/, loader: "babel-loader?stage=0" },
    ],
  },

  output: {
    path: "./public",
    filename: "[name].min.js",
  },
};
