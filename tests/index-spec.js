var expect = require('expect.js');
var tu = require('./test-util');

tu.judge(function (prefix, fiCalc) {
  prefix += ': ';
  var Money = fiCalc.Money;
  describe(prefix + 'fiCalc', function() {
    it('引用和配置', function() {
      Money.option({
        thousand: false,
        prefix: '',
        suffix: '',
        proximate: Money.CONST.FLOOR,
        proximatePrincipal: undefined,
        proximateInterest: undefined
      });
      fiCalc.util.datePattern = undefined;
    });
  });
});

