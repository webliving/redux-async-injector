'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createInjectStore = createInjectStore;
exports.injectReducer = injectReducer;

var _redux = require('redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = window.store || {}; // 修复单元测试时的注入错误
var combine = _redux.combineReducers;

function combineReducersRecurse(reducers) {
  // 如果是已经组合的函数, 则直接返回
  if (typeof reducers === 'function') {
    return reducers;
  }
  // If this is an object of functions, combine reducers.
  if ((typeof reducers === 'undefined' ? 'undefined' : _typeof(reducers)) === 'object') {
    var combinedReducers = {};
    // forEach
    /*_.forEach(reducers, function (value, key) {
      combinedReducers[key] = combineReducersRecurse(reducers[key]);
    });*/

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(reducers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        combinedReducers[key] = combineReducersRecurse(reducers[key]);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

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

  // If already set, do nothing.
  // console.log('store.injectedReducers', store.injectedReducers);
  // console.log('key', key);
  if (_lodash2.default.has(store.injectedReducers, key) || force) return store;
  _lodash2.default.set(store.injectedReducers, key, reducer);
  store.replaceReducer(combineReducersRecurse(store.injectedReducers));

  return store;
}