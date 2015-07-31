var Money = require('./money');

var util = {
  str: function (raw) {
    if (raw instanceof Money) {
      return raw.toString();
    } else if (typeof raw === 'object') {
      return this.strObject(raw);
    } else {
      return raw;
    }
  },
  strObject: function (obj) {
    var ret = {};
    for (var key in obj) {
      ret[key] = this.str(obj[key]);
    }
    return ret;
  },
};

module.exports = util;

