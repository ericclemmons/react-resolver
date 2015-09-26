require("babel-core/register")({ only: /src|react-resolver/ });

var app = require("./app");

app.listen(3000, function() {
  console.info("✅  Node server started at http://localhost:3000/");
});
