// 按月付息, 到期还款 (monthly Interest repayment)
module.exports = function (Money, ru) {
  // 由 repay-util 调用, 保证参数准确
  return function (option) {

    // 本金总额
    var all = option.all;
    // 期数
    var periodsCount = option.periodsCount;

    // 取整方式
    var proximateInterest = Money.option('proximateInterest');

    // 每期还款本金
    var repayPrincipal = new Money(0);
    // 每期还款利息
    var repayInterest;
    if (option.ratePerPeriod !== undefined) {
      repayInterest = all.times(option.ratePerPeriod).toCent(proximateInterest);
    }
    // 期
    var periods = [];

    // 最后一期单独计算
    for (var n = 1; n < periodsCount; n++) {
      if (option.onDay) {
        repayInterest = all.times(option.rates[n - 1]).toCent(proximateInterest);
      }
      periods.push(ru.getPeriod({
        repayPrincipal: repayPrincipal,
        repayInterest: repayInterest
      }, n, option));
    }

    if (option.onDay) {
      repayInterest = all.times(option.rates[n - 1]).toCent(proximateInterest);
    }
    periods.push(ru.getPeriod({
      repayPrincipal: all,
      repayInterest: repayInterest
    }, periodsCount, option));

    return periods;

  };
};
