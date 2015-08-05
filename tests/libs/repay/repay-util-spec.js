var expect = require('expect.js');
var tu = require('../../test-util');

tu.judge(function (prefix, fiCalc) {
  prefix += ': ';
  var Money = fiCalc.Money;
  var ru = fiCalc.ru;
  describe(prefix + '还款计划(辅助函数)', function () {

    it('参数校验', function () {
      function T(option, handle) {
        expect(function () {
          ru.formatParam(option);
        }).to.throwError(handle);
      }

      T({}, /Repay-all/);
      T({all: 10000}, /Repay-rate/);
      T({all: 10000, ratePerPeriod: 0.00345}, /Repay-periods-count/);
    });

    it('参数补全', function () {
      function T(optionOld, optionNew) {
        ru.formatParam(optionOld);
        for (var key in optionNew) {
          expect(optionOld[key]).to.eql(optionNew[key]);
        }
      }

      T({all: 10000, ratePerYear: 0.0525, yearsCount: 5}, {ratePerPeriod: new Money(0.004375), periodsCount: 60});
      T({all: 10000, ratePerYear: 0.04, yearsCount: 5, periodsPerYear: 4}, {ratePerPeriod: new Money(0.01), periodsCount: 20});
    });

  });
});
