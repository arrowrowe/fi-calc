// 等额本息(Matching the repayment of Principal and Interest)
module.exports = function (Money, ru) {
  // 由 repay-util 调用, 保证参数准确
  return function (option) {

    // 本金总额
    var all = option.all;
    // 每期利率
    var rate = option.ratePerPeriod;
    // 期数
    var periodsCount = option.periodsCount;

    // 剩余本金
    var principalLeft = all;
    // 每期还款
    var rateN = (new Money(rate)).plus(1).pow(periodsCount);
    var repay = all.times(rate).times(rateN).dividedBy(rateN.minus(1)).toCent();
    // 期
    var periods = [];

    // 最后一期单独计算
    for (var n = 1; n < periodsCount; n++) {
      var periodMoney = {
        repay: repay,
        repayInterest: principalLeft.times(rate)
      };
      var period = ru.getPeriod(periodMoney, n, option);
      principalLeft = principalLeft.minus(periodMoney.repayPrincipal)
      periods.push(period);
    }

    periods.push(ru.getPeriod({
      repayPrincipal: principalLeft,
      repayInterest: principalLeft.times(rate)
    }, periodsCount, option));

    return periods;

  };
};
