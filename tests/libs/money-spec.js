var expect = require('expect.js');
var tu = require('../test-util');
var Money = require('../../index').Money;

describe('底层数学', function() {

  var n = 'null';
  var N = 'NaN';
  var I = 'Infinity';

  it('加', function() {

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

  it('减', function () {

    // a - b === c
    function T(rawA, rawB, rawC) {
      var a = new Money(rawA);
      var b = new Money(rawB);
      var c = new Money(rawC);
      expect(a.minus(b).equals(c)).to.be(true);
    }

    T(-2, -2, 0);

  });

  it('乘', function() {

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

  it('除', function () {

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

describe('金融相关基础函数', function () {
  it('货币取整', function () {

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

    tu.option({proximate: Money.CONST.ROUND}, function () {
      T(45.344, 45.34);
      T(1.235, 1.24);
      T(23456.799, 23456.80);
    });

    tu.option({proximate: Money.CONST.CEIL}, function () {
      T(42.232, 42.24);
      T(999.991, 1000.00);
    });

  });
});

describe('金融字符串格式化', function () {

  // 保存原来的设置状态
  var option = Money.option();

  // a.toString() === str
  function T(rawA, str) {
    var a = new Money(rawA);
    expect(a.toString()).to.be(str);
  }

  it('千分', function () {
    Money.option({thousand: true, prefix: '', suffix: ''});
    T(12345, '12,345.00');
    T(1234567.89, '1,234,567.89');
    T(123456789, '123,456,789.00');
  });

  it('美元前缀', function () {
    Money.option({thousand: true, prefix: '$ ', suffix: ''});
    T(123456, '$ 123,456.00');
    tu.option({proximate: Money.CONST.ROUND}, function () {
      T(123456.789, '$ 123,456.79');
    });
  });

  it('元后缀', function () {
    Money.option({thousand: true, prefix: '', suffix: ' Yuan'});
    T(123456, '123,456.00 Yuan')
  })

  it('返回初始设定', function () {
    Money.option(option);
    T(123456, '123456.00');
  });

});

