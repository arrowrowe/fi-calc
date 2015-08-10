var Decimal = require('big.js');

// Boolean
Decimal.prototype.equals = Decimal.prototype.eq;

// String
Decimal.prototype.toCentString = function (proximate) { return this.toCent(proximate).toFixed(2); };

// new Decimal
Decimal.prototype.dividedBy = Decimal.prototype.div;
Decimal.prototype.toCent = function (proximate) {
  var hundreded = this.times(100);
  var proximated;
  switch (proximate !== undefined ? proximate : Decimal._option.proximate) {
    case Decimal.CONST.ROUND:
      proximated = hundreded.round(0, 1);
      break;
    case Decimal.CONST.FLOOR:
      proximated = hundreded.round(0, 0);
      break;
    case Decimal.CONST.CEIL:
      proximated = hundreded.round(0, 3);
      break;
  }
  return proximated.dividedBy(100);
};

module.exports = require('./money-v-core')(Decimal);

