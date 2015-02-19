var Resolver  = require('./lib/resolver');
var mixin     = require('./lib/mixin');
var utils     = require('./lib/utils');

module.exports        = Resolver;
module.exports.create = function(context) { return new Resolver(context); }
module.exports.mixin  = mixin;
module.exports.utils  = utils;
