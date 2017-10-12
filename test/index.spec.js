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

import React from 'react';
import ReactDom from 'react-dom';
import {combineReducers, createStore} from 'redux';

import {createInjectStore, injectReducer} from '../src/index.js';
import Main from '../src/Main.jsx';
import {createInjectStore2} from '../src/test.js';

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

const storeB = createInjectStore({
  store: {
    storeLogin: function (state = {}, action) {
      switch (action.type) {
        default:
          return state;
      }
    }
  }
}, {
  store: {
    storeLogin: [1998],
    storeCooperationMallDetail: ['hello']
  }
});

injectReducer('store.storeCooperationMallDetail', function (state = {name: 200}, action) {
  switch (action.type) {
    default:

      return {...state, ...action.data};
  }
});

storeB.dispatch({
  type: "TEST",
  data: {
    sex: 1,
    age: 18
  }
});

describe('异步注入reducer测试', function () {
  it('store 中包含注入的数据', function () {
    ReactDom.render((
      <Main test={{bar: 200}} />
    ), document.body);

    // console.log('storeB', storeB);
    // console.log(777, Math.clz32);
    // console.log('document', document.location.href);
    // console.log(111, store);

    // console.log(777, Reflect.getOwnPropertyDescriptor);
    expect(storeB.getState().store).to.include.keys('storeCooperationMallDetail');
    expect(storeB.getState().store.storeCooperationMallDetail).to.include.keys('age');

  });

  it('重复注入: 不覆盖旧的reducer', function () {
    let sTest= createInjectStore2({
      store: {
        storeLogin: function (state = {}, action) {
          switch (action.type) {
            default:
              return state;
          }
        }
      }
    });
    let store = injectReducer('store.storeCooperationMallDetail', function (state = {name: 200}, action) {
      switch (action.type) {
        default:
          return {...state, ...action.data};
      }
    });

    expect(storeB.getState().store.storeCooperationMallDetail).to.include.keys('age');

  }, true);

  it('不合法的reducer参数:抛出错误', function () {
    let store;
    try {
      store = createInjectStore('invalidReducer');
    } catch (e) {
      expect(e).to.be.ok;
      // console.log('eeee',e);
      // console.log('eeee',e.name);
      // console.log('eeee',e.message);

    }
  });

});
// console.log(111, test);

