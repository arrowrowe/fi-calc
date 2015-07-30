// Matching the Principal repayment

var Money = require('../money');
var util = require('../util');

// TODO: 检查并格式化 option
module.exports = function (option) {

  // 本金总额
  var all = new Money(option.all);
  // 每期利率
  var rate = option.rate;
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
    var period = getPeriod(periodMoney, n);
    principalLeft = principalLeft.minus(periodMoney.repayPrincipal)
    periods.push(period);
  }

  periods.push(getPeriod({
    repayPrincipal: principalLeft,
    repayInterest: principalLeft.times(rate).toCent()
  }, periodsCount));

  // TODO: 返回更多结果
  // TODO: 可以设置返回值的效果, 比如增加千分位格式化
  return periods;

  function getPeriod(periodMoney, n) {
    periodMoney.repay = periodMoney.repayPrincipal.plus(periodMoney.repayInterest);
    var period = util.str(periodMoney);
    period.number = n;
    return period;
  }

};

