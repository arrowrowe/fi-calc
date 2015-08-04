var expect = require('expect.js');
var fiCalc = require('../index');
var Money = fiCalc.Money;

describe('fiCalc', function() {

  it('引用和配置', function() {
    Money.option({
      thousand: false,
      prefix: '',
      suffix: '',
      proximate: Money.CONST.FLOOR
    });
  });

});
