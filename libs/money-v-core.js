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
    // proximatePrincipal 为 undefined 时, 按 proximate.
    // proximateInterest 同.
    proximate: Money.CONST.FLOOR,
    proximatePrincipal: Money.CONST.FLOOR,
    proximateInterest: undefined,
    // 利息折扣方式, 比如利息打八折后, 是多还一些本金使还款总额不变, 还是还款总额就此减少
    doesDiscountAddPrincipal: false
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
    if (typeof option === 'string') {
      return _option[option];
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
