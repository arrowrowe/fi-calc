var Money = require('../money');
var util = require('../util');

var ru = {};

// 如果参数有错, 这里会抛出异常
ru.formatParam = function (option) {
  option.all = new Money(option.all);
  if (typeof option.rate !== 'number' || option.rate < 0) {
    throw 'Non-negative number option.rate required.';
  }
  if (typeof option.periodsCount !== 'number' || option.periodsCount <= 0  || !/^\d+$/.test(option.periodsCount.toString())) {
    throw 'Positive integer option.periodsCount required.';
  }
  return option;
};

// 保证还款本金(repayPrincipal), 还款利息(repayInterest), 还款(repay)中至多缺少一个.
// (不符合的话必报错)
ru.getPeriod = function (periodMoney, n) {
  if (periodMoney.repayPrincipal === undefined) {
    periodMoney.repayPrincipal = periodMoney.repay.minus(periodMoney.repayInterest);
  } else if (periodMoney.repayInterest === undefined) {
    periodMoney.repayInterest = periodMoney.repay.minus(periodMoney.repayPrincipal);
  } else if (periodMoney.repay === undefined) {
    periodMoney.repay = periodMoney.repayPrincipal.plus(periodMoney.repayInterest);
  }
  var period = util.str(periodMoney);
  period.number = n;
  return period;
};

ru.getReportFromPeriods = function (periods) {
  var totalMoney = {
    repayPrincipal: new Money(0),
    repayInterest: new Money(0),
    repay: new Money(0)
  };
  for (var i = 0; i < periods.length; i++) {
    var period = periods[i];
    totalMoney.repayPrincipal = totalMoney.repayPrincipal.plus(period.repayPrincipal);
    totalMoney.repayInterest = totalMoney.repayInterest.plus(period.repayInterest);
    totalMoney.repay = totalMoney.repay.plus(period.repay);
  }
  var total = util.str(totalMoney);
  return {
    total: total,
    periods: periods
  };
};

module.exports = ru;

