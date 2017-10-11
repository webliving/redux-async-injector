'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createInjectStore = createInjectStore;
exports.injectReducer = injectReducer;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var name = 'hello';
var abc = _defineProperty({}, name, 'JavaScript');
console.log('abc', abc);

var store = {}; // 修复单元测试时的注入错误
// let store = window.store || {}; // 修复单元测试时的注入错误
var combine = _redux.combineReducers;

function combineReducersRecurse(reducers) {
  // 如果是已经组合的函数, 则直接返回
  if (typeof reducers === 'function') {
    return reducers;
  }
  // 如果reducers为对象, 则遍历联合
  if ((typeof reducers === 'undefined' ? 'undefined' : _typeof(reducers)) === 'object') {
    var combinedReducers = {};

    _lodash2.default.forEach(reducers, function (value, key) {
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

function createInjectStore(initialReducers) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // If last item is an object, it is overrides.
  /*if (typeof args[args.length - 1] === 'object') {
    const overrides = args.pop();
    // Allow overriding the combineReducers function such as with redux-immutable.
    if (overrides.hasOwnProperty('combineReducers') && typeof overrides.combineReducers === 'function') {
      combine = overrides.combineReducers;
    }
  }*/
  store = _redux.createStore.apply(undefined, [combineReducersRecurse(initialReducers)].concat(args));
  store.injectedReducers = initialReducers;
  return store;
}
function injectReducer(key, reducer) {
  var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // console.log('store.injectedReducers', store.injectedReducers);
  // console.log('key', key);
  if (_lodash2.default.has(store.injectedReducers, key) || force) return store;
  _lodash2.default.set(store.injectedReducers, key, reducer);
  store.replaceReducer(combineReducersRecurse(store.injectedReducers));

  return store;
}