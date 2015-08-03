// 底层数学库的依赖写在 decimal 中, 这里再封装一层金融字符串格式化.
// 如果需要更换依赖的数学库, 应不需修改本文件.

var Money = require('./decimal');

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
  var middle = this.toCentString();
  if (_option.thousand) {
    middle = middle.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  return _option.prefix + middle + _option.suffix;
};

module.exports = Money;

