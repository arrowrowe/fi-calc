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
      T({all: 10000, periodsCount: 12}, /Repay-rate/);
      T({all: 10000, ratePerPeriod: 0.00345}, /Repay-periods-count/);
      T({all: 10000, yearsCount: 1, periodsPerYear: 4, onDay: true}, /Repay-periods-per-year 12 required/);
      T({all: 10000, yearsCount: 1, onDay: true}, /Repay-rate/);
    });

    it('参数补全', function () {
      function T(optionOld, optionNew) {
        ru.formatParam(optionOld);
        for (var key in optionNew) {
          expect(optionOld[key]).to.eql(optionNew[key]);
        }
      }

      // 计算每期利率和总期数
      T({all: 10000, ratePerYear: 0.0525, yearsCount: 5}, {ratePerPeriod: new Money(0.004375), periodsCount: 60});
      T({all: 10000, ratePerYear: 0.04, yearsCount: 5, periodsPerYear: 4}, {ratePerPeriod: new Money(0.01), periodsCount: 20});
      T({all: 10000, ratePerDay: 0.00045, yearsCount: 1}, {ratePerPeriod: new Money(0.0135), periodsCount: 12});
      T({all: 10000, ratePerMonth: 0.0135, yearsCount: 1}, {ratePerPeriod: new Money(0.0135), periodsCount: 12});
      T({all: 10000, ratePerMonth: 0.0135, yearsCount: 1, periodsPerYear: 4}, {ratePerPeriod: new Money(0.0405), periodsCount: 4});
      // 按日计息时, 计算每日利率
      T({all: 10000, ratePerYear: 0.162, yearsCount: 1, onDay: true}, {ratePerDay: new Money(0.00045)});
      T({all: 10000, ratePerMonth: 0.0135, yearsCount: 1, onDay: true}, {ratePerDay: new Money(0.00045)});
      // 按日计息时, 默认从当时开始
      expect(ru.formatParam({all: 10000, ratePerDay: 0.00045, yearsCount: 1, onDay: true}).beginDate).to.be.a(Date);
    });

  });
});
