let fs = require('fs');

global.window = {};


// require('babel-polyfill');



let babelrc = fs.readFileSync('./.babelrc');
let config;

try {
  config = JSON.parse(babelrc);
  console.log('config', config);

} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

// require('babel-register')(config);


let test = require('../src/index.js');
console.log(111, test);

// import {createStore, applyMiddleware, combineReducers} from 'redux';

