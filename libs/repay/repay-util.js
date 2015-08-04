var Money = require('../money');
var util = require('../util');

var ru = {};

// 如果参数有错, 这里会抛出异常
ru.formatParam = function (option) {
  if (option.all === undefined) {
    throw 'Repay-all required';
  }
  option.all = new Money(option.all);
  if (option.ratePerYear !== undefined) {
    option.periodsPerYear = option.periodsPerYear || 12;
    option.ratePerPeriod = new Money(option.ratePerYear).dividedBy(option.periodsPerYear);
    option.periodsCount = option.yearsCount * option.periodsPerYear;
  }
  if (option.ratePerPeriod === undefined) {
    throw 'Repay-rate required.';
  }
  if (option.periodsCount === undefined) {
    throw 'Repay-periods-count required.';
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
  periodMoney.number = n;
  return periodMoney;
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
  return {
    total: totalMoney,
    periods: periods
  };
};

module.exports = ru;

