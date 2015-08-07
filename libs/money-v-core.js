module.exports = function (Decimal) {
  var Money = Decimal;

  Money.CONST = {
    ROUND: 1,
    FLOOR: 2,
    CEIL: 4
  };

  var _option = Money._option = {
    // 金融字符串格式化
    thousand: false,
    prefix: '',
    suffix: '',
    // 取整方式
    proximate: Money.CONST.FLOOR
  };

  Money.option = function (option) {
    if (option === undefined) {
      return {
        thousand: _option.thousand,
        prefix: _option.prefix,
        suffix: _option.suffix,
        proximate: _option.proximate
      };
    }
    for (var key in option) {
      _option[key] = option[key];
    }
  };

  Money.prototype.toFinance = function () {
    var middle = this.toCentString();
    if (_option.thousand) {
      middle = middle.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    return _option.prefix + middle + _option.suffix;
  };

  return Money;
};
