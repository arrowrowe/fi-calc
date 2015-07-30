var util = {
  str: function (obj) {
    var ret = {};
    for (var key in obj) {
      ret[key] = obj[key].toString();
    }
    return ret;
  }
};

module.exports = util;

