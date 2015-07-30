var expect = require('expect.js');
var Money = require('../libs/money');

describe('Money', function() {

  var n = 'null';
  var N = 'NaN';
  var I = 'Infinity';

  it('plus', function() {

    // a + b === c
    function T(rawA, rawB, rawC) {
      var a = new Money(rawA);
      var b = new Money(rawB);
      var c = new Money(rawC);
      expect(a.plus(b)).to.eql(c);
      expect(b.plus(a)).to.eql(c);
    }

    T(1, 0, 1);
    T(1, -0, 1);

  });

  it('times', function() {

    // a * b === c
    function T(rawA, rawB, rawC) {
      var a = new Money(rawA);
      var b = new Money(rawB);
      var c = new Money(rawC);
      expect(a.times(b)).to.eql(c);
      expect(b.times(a)).to.eql(c);
    }

    T(1, '1', '1');
    T(1, '-45', '-45');

  });

});
