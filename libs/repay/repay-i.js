// 按月付息, 到期还款 (monthly Interest repayment)

var Money = require('../money');
var ru = require('./repay-util');

// 由 repay-util 调用, 保证参数准确
module.exports = function (option) {

  // 本金总额
  var all = option.all;
  // 每期利率
  var rate = option.rate;
  // 期数
  var periodsCount = option.periodsCount;

  // 每期还款本金
  var repayPrincipal = new Money(0);
  // 每期还款利息
  var repayInterest = all.times(rate).toCent();
  // 期
  var periods = [];

  // 最后一期单独计算
  for (var n = 1; n < periodsCount; n++) {
    periods.push(ru.getPeriod({
      repayPrincipal: repayPrincipal,
      repayInterest: repayInterest
    }, n));
  }

  periods.push(ru.getPeriod({
    repayPrincipal: all,
    repayInterest: repayInterest
  }, periodsCount));

  // TODO: 返回更多结果
  // TODO: 可以设置返回值的效果, 比如增加千分位格式化
  return periods;

};

