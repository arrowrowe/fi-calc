module.exports = function (Money) {
  return {
    str: function (raw) {
      if (raw instanceof Money) {
        return raw.toFinance();
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
    },
    datePattern: 'YYYY/MM/DD',
    dateFormat: function (date, p) {
      // 实现 moment.js 的一部分...
      var Y = date.getFullYear().toString();
      var M = (date.getMonth() + 1).toString();
      var D = date.getDate().toString();
      var lf = function (s) { return (s.length < 2 ? '0' : '') + s; };
      return ((p || this.datePattern)
        .replace(/YYYY/g, Y)
        .replace(/YY/g, Y.substr(2))
        .replace(/MM/g, lf(M))
        .replace(/M/g, M)
        .replace(/DD/g, lf(D))
        .replace(/D/g, D)
      );
    },
    incMonth: function (date, delta) {
      var y = date.getFullYear();
      var m = date.getMonth() + delta;
      var d = date.getDate();
      var ret = new Date(y, m, d);
      if (ret.getMonth() !== m) {
        // 举例: 3月31日 -> 2,31 -> 3,31 -> 5月1日 -> 4,0 -> 4月30日
        ret = new Date(y, m + 1, 0);
      }
      return ret;
    }
  };
};
