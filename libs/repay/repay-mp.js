// 等额本金(Matching the Principal repayment)

var Money = require('../money');
var ru = require('./repay-util');

// 由 repay-util 调用, 保证参数准确
module.exports = function (option) {

  // 本金总额
  var all = option.all;
  // 每期利率
  var rate = option.ratePerPeriod;
  // 期数
  var periodsCount = option.periodsCount;

  // 剩余本金
  var principalLeft = all;
  // 每期还款本金
  var repayPrincipal = all.dividedBy(periodsCount).toCent();
  // 期
  var periods = [];

  // 最后一期单独计算
  for (var n = 1; n < periodsCount; n++) {
    var periodMoney = {
      repayPrincipal: repayPrincipal,
      repayInterest: principalLeft.times(rate).toCent()
    };
    var period = ru.getPeriod(periodMoney, n);
    principalLeft = principalLeft.minus(periodMoney.repayPrincipal)
    periods.push(period);
  }

  periods.push(ru.getPeriod({
    repayPrincipal: principalLeft,
    repayInterest: principalLeft.times(rate).toCent()
  }, periodsCount));

  return periods;

};

