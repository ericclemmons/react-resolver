// Find all .test.js files in the parent directory
var requireTest = require.context(".", true, /\.test\.js$/);

// Load tests
requireTest.keys().map(requireTest);
