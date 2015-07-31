var Money = require('./money');

var util = {
  str: function (raw) {
    return (raw instanceof Money || typeof raw !== 'object') ? raw.toString() : this.strObject(raw);
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

