

import _ from 'lodash';
import { createStore, combineReducers } from 'redux';


let store = window.store || {}; // 修复单元测试时的注入错误
let combine = combineReducers;

function combineReducersRecurse(reducers) {
  // 如果是已经组合的函数, 则直接返回
  if (typeof reducers === 'function') {
    return reducers;
  }
  // 如果reducers为对象, 则遍历联合
  if (typeof reducers === 'object') {
    let combinedReducers = {};

    _.forEach(reducers, function (value, key) {
      combinedReducers[key] = combineReducersRecurse(reducers[key]);
    });

    return combine(combinedReducers);
  }
  // If we get here we have an invalid item in the reducer path.
  throw new Error({
    message: 'Invalid item in reducer tree',
    item: reducers
  });
}

export function createInjectStore(initialReducers, ...args) {
  // If last item is an object, it is overrides.
  /*if (typeof args[args.length - 1] === 'object') {
    const overrides = args.pop();
    // Allow overriding the combineReducers function such as with redux-immutable.
    if (overrides.hasOwnProperty('combineReducers') && typeof overrides.combineReducers === 'function') {
      combine = overrides.combineReducers;
    }
  }*/
  store = createStore(
    combineReducersRecurse(initialReducers),
    ...args
);
  store.injectedReducers = initialReducers;
  return store;
}
export function injectReducer(key, reducer, force = false) {
  // console.log('store.injectedReducers', store.injectedReducers);
  // console.log('key', key);
  if (_.has(store.injectedReducers, key) || force) return store;
  _.set(store.injectedReducers, key, reducer);
  store.replaceReducer(combineReducersRecurse(store.injectedReducers));

  return store;
}
