"use strict";

module.exports.getElementId = function (element) {
  return element._rootNodeID.replace(/\.\w+/, element.constructor.displayName + ".promise");
};

module.exports.getElementPromise = function (element) {
  var id = module.exports.getElementId(element);

  return element.context.resolver.promises[id];
};

module.exports.getElementStatics = function (element) {
  return element.constructor.resolve;
};

module.exports.removeElementPromise = function (element) {
  var id = module.exports.getElementId(element);
  var promise = module.exports.getElementPromise(element);

  element.context.resolver.promises[id] = null;

  return promise;
};

module.exports.setElementPromise = function (element, promise) {
  var id = module.exports.getElementId(element);

  element.context.resolver.promises[id] = promise;

  return promise;
};