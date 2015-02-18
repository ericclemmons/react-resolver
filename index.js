var Resolver  = require('./lib/resolver');
var mixin     = require('./lib/mixin');

module.exports        = Resolver;
module.exports.create = function(context) { return new Resolver(context); }
module.exports.mixin  = mixin;
