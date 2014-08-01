/*! markovChain v0.0.0 - MIT license */
'use strict';

var MarkovChain = function (data) {
  this._data = [];
  this._table = {};
  if (data !== undefined) {
    this.add(data);
  }
};

// Adds given data
// Accepts arrays and individual data points seperated by a comma
// Arrays are flattened and only primitive values will be added to
// the chain.
MarkovChain.prototype.add = function(data) {
  if (data === undefined) {
    return;
  }
  if (Array.isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      this._addOne(data[i]);
    }
  } else {
    this._addOne(data);
  }
};

// If only current state is passed, returns an object of possible next
// states and probability of each.
// If next state is also defined, returns a probability of that state
// given the current state.
// If no parameters are given, return conditional probability table
// represented as a javascript object.
MarkovChain.prototype.get = function(currentState, nextState) {
  var result = {};
  var count = 0;
  if (currentState === undefined) {
    for (var key in this._table) {
      result[key] = this.get(key);
    }
    return result;
  } else if (nextState === undefined) {
    for (var key in this._table[currentState]) {
      count += this._table[currentState][key];
    }
    for (var key in this._table[currentState]) {
      result[key] = this._table[currentState][key] / count;
    }
    return result;
  } else {
    for (var key in this._table[currentState]) {
      count += this._table[currentState][key];
    }
    return this._table[currentState][nextState] / count;
  }
};

MarkovChain.prototype._addOne = function(data) {
  var i = this._data.push(data) - 2;
  var prev = this._data[i];
  if (this._table.hasOwnProperty(prev)) {
    if (this._table[prev].hasOwnProperty(data)) {
      this._table[prev][data] += 1;
    } else {
      this._table[prev][data] = 1;
    }
  } else if (i >= 0) {
    this._table[prev] = {};
    this._table[prev][data] = 1;
  }
}