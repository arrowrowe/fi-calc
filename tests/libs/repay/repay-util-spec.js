var expect = require('expect.js');
var tu = require('../../test-util');

tu.judge(function (prefix, fiCalc) {
  prefix += ': ';
  var Money = fiCalc.Money;
  var ru = fiCalc.ru;
  describe(prefix + '还款计划(辅助函数)', function () {

    function expectSubset(p, s) {
      for (var key in s) {
        expect(p[key]).to.eql(s[key]);
      }
    }

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
        expectSubset(ru.formatParam(optionOld), optionNew);
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
      // 还款日
      fiCalc.util.datePattern = 'YYYY/M/DD';
      T({all: 10000, ratePerDay: 0.00045, yearsCount: 1, beginDate: new Date('2015/01/31')}, {dates: [
        '2015/2/28',
        '2015/3/31',
        '2015/4/30',
        '2015/5/31',
        '2015/6/30',
        '2015/7/31',
        '2015/8/31',
        '2015/9/30',
        '2015/10/31',
        '2015/11/30',
        '2015/12/31',
        '2016/1/31'
      ]});
      fiCalc.util.datePattern = undefined;
    });

    it('计算期内利息折扣/本金/还款额', function () {

      function T(periodMoney, discount, periodMoneyDiscounted) {
        expectSubset(ru.getPeriod({
          repay: periodMoney.repay === undefined ? undefined : new Money(periodMoney.repay),
          repayInterest: periodMoney.repayInterest === undefined ? undefined : new Money(periodMoney.repayInterest),
          repayPrincipal: periodMoney.repayPrincipal === undefined ? undefined : new Money(periodMoney.repayPrincipal)
        }, 1, {discounts: [discount]}), {
          repay: new Money(periodMoneyDiscounted.repay),
          repayInterest: new Money(periodMoneyDiscounted.repayInterest),
          repayPrincipal: new Money(periodMoneyDiscounted.repayPrincipal)
        });
      }

      T({repayInterest: 10, repayPrincipal: 20}, 0.1, {repayInterest: 1, repayPrincipal: 20, repay: 21});
      T({repayInterest: 10, repay: 30}, 0.1, {repayInterest: 1, repayPrincipal: 20, repay: 21});
      T({repayInterest: 10, repayPrincipal: 20, repay: 30}, 0.1, {repayInterest: 1, repayPrincipal: 20, repay: 21});
      Money.optionTmp({doesDiscountAddPrincipal: true}, function () {
        T({repayInterest: 10, repayPrincipal: 20}, 0.1, {repayInterest: 1, repayPrincipal: 29, repay: 30});
        T({repayInterest: 10, repay: 30}, 0.1, {repayInterest: 1, repayPrincipal: 29, repay: 30});
        T({repayInterest: 10, repayPrincipal: 20, repay: 30}, 0.1, {repayInterest: 1, repayPrincipal: 29, repay: 30});
      });
      expect(function () {
        ru.getPeriod({repayInterest: new Money(10), repayPrincipal: new Money(20), repay: new Money(40)}, 1, {});
      }).to.throwError(/`Repay === principal \+ interest` does not hold./);

    });

  });
});
