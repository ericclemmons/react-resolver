require("babel/register");

var config = require("./webpack.config");
var piping = require("piping")({ hook: true });
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

if (piping) {
  require("./src/server");
} else {
  new WebpackDevServer(webpack(config), {
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
