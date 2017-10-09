
'use strict';

require('babel-polyfill');
let _ = require('lodash');
let createStore = require('redux').createStore;
let createInjectStore = require('./build/index.js').createInjectStore;

// console.log(999, Reflect);

// console.log('createInjectStore', createInjectStore);
console.log('_', _.VERSION);
// console.log('createStore', createStore);
