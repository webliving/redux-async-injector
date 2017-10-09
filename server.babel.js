//  enable runtime transpilation to use ES6/7 in node
'use strict';
var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

// require('babel-register')(config);

require('babel-polyfill');

let a = [200];
console.log(999, process.version);
console.log(999, Reflect);
console.log(999, a.fill);