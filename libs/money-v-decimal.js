var Decimal = require('decimal.js');

// String
Decimal.prototype.toCentString = function (proximate) { return this.toCent(proximate).toFixed(2); };

// new Decimal
Decimal.prototype.toCent = function (proximate) {
  var hundreded = this.times(100);
  var proximated;
  switch (proximate !== undefined ? proximate : Decimal._option.proximate) {
    case Decimal.CONST.ROUND:
      proximated = hundreded.round();
      break;
    case Decimal.CONST.FLOOR:
      proximated = hundreded.floor();
      break;
    case Decimal.CONST.CEIL:
      proximated = hundreded.ceil();
      break;
  }
  return proximated.dividedBy(100);
};

module.exports = require('./money-v-core')(Decimal);

