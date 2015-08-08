require("babel/register");

var client = require("./webpack.config.client");
var piping = require("piping")({ hook: true });
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

if (piping) {
  require("./server");
} else {
  new WebpackDevServer(webpack(client), {
    contentBase: "/",
    publicPath: "http://localhost:8080/",
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
    inline: true,
    lazy: false,
    noInfo: false,
    proxy: { "*": "http://localhost:3000/" },
    quiet: true,
    stats: { colors: true },
  }).listen(8080, "localhost", function(error, result) {
    if (error) {
      console.error(error);
      throw error;
    }

    console.info("✅  WebpackDevServer started at http://localhost:8080/");
  });
}
