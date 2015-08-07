var Decimal = require('big.js');

// Boolean
Decimal.prototype.equals = Decimal.prototype.eq;

// String
Decimal.prototype.toCentString = function () { return this.toCent().toFixed(2); };

// new Decimal
Decimal.prototype.dividedBy = Decimal.prototype.div;
Decimal.prototype.toCent = function () {
  var hundreded = this.times(100);
  var proximate;
  switch (Decimal._option.proximate) {
    case Decimal.CONST.ROUND:
      proximate = hundreded.round(0, 1);
      break;
    case Decimal.CONST.FLOOR:
      proximate = hundreded.round(0, 0);
      break;
    case Decimal.CONST.CEIL:
      proximate = hundreded.round(0, 3);
      break;
  }
  return proximate.dividedBy(100);
};

module.exports = require('./money-v-core')(Decimal);

