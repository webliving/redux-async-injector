
// let fs = require('fs');

global.window = {};

require('babel-polyfill');



/*let babelrc = fs.readFileSync('./.babelrc');
let config;

try {
  config = JSON.parse(babelrc);
  console.log('config', config);

} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}*/

// require('babel-register')(config);


let test = require('../src/index.js');

var expect = require('chai').expect;

console.log(999, process.version);
console.log(999, Reflect.getOwnPropertyDescriptor);

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(2 + 3).to.be.equal(5);
  });
});
// console.log(111, test);

