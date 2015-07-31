// Matching the repayment of Principal and Interest

var Money = require('../money');
var ru = require('./repay-util');

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
  // 每期还款
  var rateN = (new Money(rate)).plus(1).pow(periodsCount);
  var repay = all.times(rate).times(rateN).dividedBy(rateN.minus(1)).toCent();
  // 期
  var periods = [];

  // 最后一期单独计算
  for (var n = 1; n < periodsCount; n++) {
    var periodMoney = {
      repay: repay,
      repayInterest: principalLeft.times(rate).toCent()
    };
    var period = ru.getPeriod(periodMoney, n);
    principalLeft = principalLeft.minus(periodMoney.repayPrincipal)
    periods.push(period);
  }

  // TODO: 确认这里逻辑没问题. 这里利息是用总额减本金而不是本金乘利率得到的.
  periods.push(ru.getPeriod({
    repay: repay,
    repayPrincipal: principalLeft
  }, periodsCount));

  // TODO: 返回更多结果
  // TODO: 可以设置返回值的效果, 比如增加千分位格式化
  return periods;

};

