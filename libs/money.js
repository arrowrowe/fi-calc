// 输入值可能为 number 或 string, 返回值应适合计算.
// 如果需要更换依赖的数学库, 应只需修改本文件.

var Money = require('decimal.js');

Money.prototype.toCent = function () {
  return this.times(100).floor().dividedBy(100);
};

module.exports = Money;

