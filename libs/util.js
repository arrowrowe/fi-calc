var Money = require('./money');

var util = {
  str: function (raw) {
    if (raw instanceof Money) {
      return raw.toString();
    } else if (raw instanceof Array) {
      return this.strArray(raw);
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
  strArray: function (arr) {
    var self = this;
    return arr.map(function (e) {
      return self.str(e);
    });
  }
};

module.exports = util;

