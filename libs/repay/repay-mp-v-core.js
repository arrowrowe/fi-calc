// 等额本金(Matching the Principal repayment)
module.exports = function (Money, ru) {
  // 由 repay-util 调用, 保证参数准确
  return function (option) {

    // 本金总额
    var all = option.all;
    // 每期利率, 注意, 按日模式(option.onDay)下会变.
    var rate;
    // 期数
    var periodsCount = option.periodsCount;

    // 取整方式
    var proximatePrincipal = Money.option('proximatePrincipal');
    var proximateInterest = Money.option('proximateInterest');

    // 剩余本金
    var principalLeft = all;
    // 每期还款本金
    var repayPrincipal = all.dividedBy(periodsCount).toCent(proximatePrincipal);
    // 期
    var periods = [];

    // 最后一期单独计算
    for (var n = 1; n < periodsCount; n++) {
      rate = option.onDay ? option.rates[n - 1] : option.ratePerPeriod;
      var periodMoney = {
        repayPrincipal: repayPrincipal,
        repayInterest: principalLeft.times(rate).toCent(proximateInterest)
      };
      var period = ru.getPeriod(periodMoney, n);
      principalLeft = principalLeft.minus(periodMoney.repayPrincipal)
      periods.push(period);
    }

    rate = option.onDay ? option.rates[n - 1] : option.ratePerPeriod;
    periods.push(ru.getPeriod({
      repayPrincipal: principalLeft,
      repayInterest: principalLeft.times(rate).toCent(proximateInterest)
    }, periodsCount));

    return periods;

  };
};
