// 输入值可能为 number 或 string, 返回值应适合计算.
// 如果需要更换依赖的数学库, 应只需修改本文件.

var Money = require('decimal.js');

Money.prototype.toCent = function () {
  return this.times(100).floor().dividedBy(100);
};

var _option = {
  thousand: false,
  prefix: '',
  suffix: ''
};

Money.option = function (option) {
  if (option === undefined) {
    return {
      thousand: _option.thousand,
      prefix: _option.prefix,
      suffix: _option.suffix
    };
  }
  for (var key in option) {
    _option[key] = option[key];
  }
};

Money.prototype.toString = function () {
  var middle = this.toCent().toFixed(2);
  if (_option.thousand) {
    middle = middle.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  return _option.prefix + middle + _option.suffix;
};

module.exports = Money;

