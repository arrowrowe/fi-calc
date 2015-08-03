var expect = require('expect.js');
var Money = require('../../index').Money;

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
      expect(a.plus(b).equals(c)).to.be(true);
      expect(b.plus(a).equals(c)).to.be(true);
    }

    T(1, 0, 1);
    T(1, -0, 1);
    T(1.11, 8.89, 10);

  });

  it('minus', function () {

    // a - b === c
    function T(rawA, rawB, rawC) {
      var a = new Money(rawA);
      var b = new Money(rawB);
      var c = new Money(rawC);
      expect(a.minus(b).equals(c)).to.be(true);
    }

    T(-2, -2, 0);

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

  it('dividedBy', function () {

    // a / b === c
    function T(rawA, rawB, rawC) {
      var a = new Money(rawA);
      var b = new Money(rawB);
      var c = new Money(rawC);
      expect(a.dividedBy(b).equals(c)).to.be(true);
    }

    T('123456789', 100, '1234567.89');

  });

});

describe('Money-related basic tests', function () {
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

describe('Money to string', function () {

  // 保存原来的设置状态
  var option = Money.option();

  // a.toString() === str
  function T(rawA, str) {
    var a = new Money(rawA);
    expect(a.toString()).to.be(str);
  }

  it('Split by thousand', function () {
    Money.option({thousand: true, prefix: '', suffix: ''});
    T(12345, '12,345.00');
    T(1234567.89, '1,234,567.89');
    T(123456789, '123,456,789.00');
  });

  it('Prefix dollar', function () {
    Money.option({thousand: true, prefix: '$ ', suffix: ''});
    T(123456, '$ 123,456.00');
  });

  it('Suffix Yuan', function () {
    Money.option({thousand: true, prefix: '', suffix: ' Yuan'});
    T(123456, '123,456.00 Yuan')
  })

  it('Back to origin', function () {
    Money.option(option);
    T(123456, '123456.00');
  });

});

