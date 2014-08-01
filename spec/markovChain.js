/* global MMarkovChain, describe, it, expect, should */

describe('Basic Functions', function () {
  'use strict';
  var chain;

  beforeEach(function() {
    chain = new MarkovChain();
  });

  it('MarkovChain constructor exists', function () {
    expect(MarkovChain).to.be.a('function');
  });

  it('has an add function', function() {
    expect(chain.add).to.be.a('function');
  });

  it('has a get function', function() {
    expect(chain.get).to.be.a('function');
  });

});

describe('the constructor', function() {
  'use strict';
  var chain;

  it('should initialize an array to hold data called _data', function() {
    chain = new MarkovChain();
    expect(Array.isArray(chain._data)).to.equal(true);
  });

  it('should initialize an object to hold frequency data', function() {
    chain = new MarkovChain();
    expect(!!chain._table).to.equal(true);
  });

  it('should call add on its arguments', function() {
    chain = new MarkovChain([1, 1, 1, 'a']);
    expect(chain._data.length).to.equal(4);
  });

});

describe('add should add inputs to _data and _table', function() {
  'use strict';
  var chain;
  beforeEach(function() {
    chain = new MarkovChain();
  });

  it('should accept primative data', function() {
    chain.add(1);
    expect(chain._data[0]).to.equal(1);
    chain.add(1);
    expect(chain._data[1]).to.equal(1);
    expect(chain._table[1][1]).to.equal(1);
    chain.add('a');
    expect(chain._data[2]).to.equal('a');
    expect(chain._table[1]['a']).to.equal(1);
    chain.add('a');
    chain.add(1);
    chain.add(1);
    chain.add(1);
    expect(chain._data[3]).to.equal('a');
    expect(chain._data[4]).to.equal(1);
    expect(chain._data[5]).to.equal(1);
    expect(chain._data[6]).to.equal(1);
    expect(chain._table[1][1]).to.equal(3);
    expect(chain._table[1]['a']).to.equal(1);
    expect(chain._table['a']['a']).to.equal(1);
    expect(chain._table['a'][1]).to.equal(1);

  });

  it('should accept an array of data', function() {
    chain.add([1, 1, 'a', 'a', 1, 1, 1]);
    expect(chain._data[3]).to.equal('a');
    expect(chain._data[4]).to.equal(1);
    expect(chain._data[5]).to.equal(1);
    expect(chain._data[6]).to.equal(1);
    expect(chain._table[1][1]).to.equal(3);
    expect(chain._table[1]['a']).to.equal(1);
    expect(chain._table['a']['a']).to.equal(1);
    expect(chain._table['a'][1]).to.equal(1);
  });

});

describe('get should return processed data from _table', function() {
  'use strict';
  var data = ['a', 'a', 'a', 'b', 'b', 'b', 'b', 'a', 'a', 'a', 'a', 'a', 'a', 'b', 'b', 'a', 'b', 'b', 'b', 'b', 'b'];
  var chain = new MarkovChain(data);
  it('should return the correct probability when a current state and a next state are given as arguments', function() {
    expect(chain.get('a', 'b')).to.equal(0.3);
    expect(chain.get('a', 'a')).to.equal(0.7);
    expect(chain.get('b', 'a')).to.equal(0.2);
    expect(chain.get('b', 'b')).to.equal(0.8);
  });

  it('should return an object with probabilities for each possible outcome when given a current state', function() {
    expect(chain.get('a')['b']).to.equal(0.3);
    expect(chain.get('a')['a']).to.equal(0.7);
    expect(chain.get('b')['a']).to.equal(0.2);
    expect(chain.get('b')['b']).to.equal(0.8);
  });

  it('should return the entire probability table (as an object) if no arguments are given', function() {
    expect(chain.get().a.a).to.equal(0.7);
    expect(chain.get().b.a).to.equal(0.2);
    expect(chain.get().b.b).to.equal(0.8);
    expect(chain.get().a.b).to.equal(0.3);
  });
});