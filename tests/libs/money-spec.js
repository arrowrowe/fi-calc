var expect = require('expect.js');
var Money = require('../../libs/money');

describe('Pure mathematics tests', function() {

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
      expect(a.times(b).equals(c)).to.be(true);
      expect(b.times(a).equals(c)).to.be(true);
    }

    T(1, '1', '1');
    T(1, '-45', '-45');

  });

});

describe('Money-related tests', function () {
  it('to cent', function () {

    // a.toCent() === b
    function T(rawA, rawB) {
      var a = new Money(rawA);
      var b = new Money(rawB);
      expect(a.toCent().equals(b)).to.be(true);
    }

    T(1.234, 1.23);
    T(3.555, 3.55);
    T((new Money(10)).dividedBy(3), 3.33);
    T(9.03, 9.03);

  });
});

