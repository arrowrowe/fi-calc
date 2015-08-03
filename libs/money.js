/* ==============================================
 * decimal.js
 * ----------------------------------------------
 */


var Decimal = require('decimal.js');

// String
Decimal.prototype.toCentString = function () { return this.toCent().toFixed(2); };

// new Decimal
Decimal.prototype.toCent = function () {
  var hundreded = this.times(100);
  var proximate;
  switch (_option.proximate) {
    case Money.CONST.ROUND:
      proximate = hundreded.round();
      break;
    case Money.CONST.FLOOR:
      proximate = hundreded.floor();
      break;
    case Money.CONST.CEIL:
      proximate = hundreded.ceil();
      break;
  }
  return proximate.dividedBy(100);
};

module.exports = Decimal;


/* ==============================================
 * anima-caculate
 * ----------------------------------------------
 */

/*
var Acal = require('anima-caculate');

var Decimal = function (val) {
  this.val = val.val || val;
};

// Boolean
Decimal.prototype.equals       = function (b) { return new Acal(this.val).sub(b.val || b).val == 0; };

// String
Decimal.prototype.toCentString = function ()  { return new Acal(this.val).setDecimal(2).val; };

// new Decimal
Decimal.prototype.plus         = function (b) { return new Decimal(new Acal(this.val).add(b.val || b).val); };
Decimal.prototype.minus        = function (b) { return new Decimal(new Acal(this.val).sub(b.val || b).val); };
Decimal.prototype.times        = function (b) { return new Decimal(new Acal(this.val).mul(b.val || b).val); };
Decimal.prototype.dividedBy    = function (b) { return new Decimal(new Acal(this.val).div(b.val || b).val); };
Decimal.prototype.pow = function (n) {
  var a = new Acal(this.val);
  for (var i = 1; i < n; i++) {
    a.mul(this.val);
  }
  return new Decimal(a.val);
};
Decimal.prototype.toCent = function () {
  return new Decimal(this.toCentString());
};

module.exports = Decimal;
*/

/* ==============================================
 * 通用部分
 * ----------------------------------------------
 */

var Money = Decimal;

Money.CONST = {
  ROUND: 1,
  FLOOR: 2,
  CEIL: 4
};

var _option = {
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

Money.prototype.toString = function () {
  var middle = this.toCentString();
  if (_option.thousand) {
    middle = middle.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  return _option.prefix + middle + _option.suffix;
};

module.exports = Money;

