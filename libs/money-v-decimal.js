var Decimal = require('decimal.js');

// String
Decimal.prototype.toCentString = function () { return this.toCent().toFixed(2); };

// new Decimal
Decimal.prototype.toCent = function () {
  var hundreded = this.times(100);
  var proximate;
  switch (Decimal._option.proximate) {
    case Decimal.CONST.ROUND:
      proximate = hundreded.round();
      break;
    case Decimal.CONST.FLOOR:
      proximate = hundreded.floor();
      break;
    case Decimal.CONST.CEIL:
      proximate = hundreded.ceil();
      break;
  }
  return proximate.dividedBy(100);
};

module.exports = require('./money-v-core')(Decimal);

