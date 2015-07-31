var util = require('../util');

var ru = {};

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

module.exports = ru;

