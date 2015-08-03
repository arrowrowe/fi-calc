// 如果需要更换依赖的数学库, 应只需修改本文件.

/*
 * 可以使用的依赖:
 *     decimal.js
 *     anima-caculate
 * 更换时, 直接在本文件调整注释.
 */

/* ==============================================
 * decimal.js
 * ----------------------------------------------
 */


var Decimal = require('decimal.js');

// String
Decimal.prototype.toCentString = function () { return this.toCent().toFixed(2); };

// new Decimal
Decimal.prototype.toCent = function () {
  return this.times(100).floor().dividedBy(100);
};

module.exports = Decimal;


/* ==============================================
 * anima-caculate
 * ----------------------------------------------
 */

/*
var Acal = require('anima-caculate');

var Decimal = function (val) {
  this.val = val;
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

