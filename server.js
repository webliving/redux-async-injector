
'use strict';

// require('babel-polyfill');
let _ = require('lodash');
let React = require('react');
let createStore = require('redux').createStore;
let createInjectStore = require('./build/index.js').createInjectStore;

// console.log(999, React);
// console.log(999, Reflect);

// console.log('createInjectStore', createInjectStore);
console.log('_', _.VERSION);
// console.log('createStore', createStore);
