var Acal = require('anima-caculate');

var Decimal = function (val) {
  this.val = val.val || val;
};

// Boolean
Decimal.prototype.equals       = function (b) { return new Acal(this.val).sub(b.val === undefined ? b : b.val).val == 0; };

// String
Decimal.prototype.toCentString = function (proximate)  {
  var prx = new Acal(this.val);
  proximate = proximate !== undefined ? proximate : Decimal._option.proximate;
  switch (proximate) {
    case Decimal.CONST.FLOOR:
      prx.setDecimal(2);
      break;
    case Decimal.CONST.ROUND:
    case Decimal.CONST.CEIL:
      prx.setDecimal(3);
      var s = Number(prx.val.substr(-1));
      prx.setDecimal(2);
      if ((proximate === Decimal.CONST.ROUND && s >= 5) || (proximate === Decimal.CONST.CEIL && s > 0)) {
        prx.add(0.01);
      }
      break;
  }
  return prx.val;
};

// new Decimal
Decimal.prototype.plus         = function (b) { return new Decimal(new Acal(this.val).add(b.val === undefined ? b : b.val).val); };
Decimal.prototype.minus        = function (b) { return new Decimal(new Acal(this.val).sub(b.val === undefined ? b : b.val).val); };
Decimal.prototype.times        = function (b) { return new Decimal(new Acal(this.val).mul(b.val === undefined ? b : b.val).val); };
Decimal.prototype.dividedBy    = function (b) { return new Decimal(new Acal(this.val).div(b.val === undefined ? b : b.val).val); };
Decimal.prototype.pow = function (n) {
  var a = new Acal(this.val);
  for (var i = 1; i < n; i++) {
    a.mul(this.val).setDecimal(20);
  }
  return new Decimal(a.val);
};
Decimal.prototype.toCent = function (proximate) {
  return new Decimal(this.toCentString(proximate));
};

module.exports = require('./money-v-core')(Decimal);

