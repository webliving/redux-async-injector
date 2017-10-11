'use strict';
// let fs = require('fs');

// global.window = {};

// require('babel-polyfill');


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


let expect = require('chai').expect;
import {combineReducers, createStore} from 'redux';


console.log(999, process.version);

// console.log(111, createInjectStore);

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  store: combineReducers({
    storeLogin: function (state = {}, action) {
      switch (action.type) {
        default:
          return state;
      }
    }
  })
}));


describe('加法函数的测试', function () {
  it('1 加 1 应该等于 2', function () {
    // console.log('window', window);
    console.log('document', document.location.href);
    // console.log(111, store);

    // console.log(777, Reflect.getOwnPropertyDescriptor);
    console.log(777, Math.clz32);
    expect(2 + 3).to.be.equal(5);
  });
});
// console.log(111, test);

