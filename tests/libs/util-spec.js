var expect = require('expect.js');
var tu = require('../test-util');

tu.judge(function (prefix, fiCalc) {
  prefix += ': ';
  var util = fiCalc.util;

  describe(prefix + '时间处理', function() {

    it('加月计算', function () {

      // s + n month = r
      function T(s, n, r) {
        expect(util.dateFormat(util.incMonth(new Date(s), n))).to.be(r);
      }

      util.datePattern = 'YYYY/MM/DD';
      T('2015/12/1', 2, '2016/02/01');
      T('2015/1/31', 1, '2015/02/28');
      T('2015/1/31', 2, '2015/03/31');
      T('2015/1/31', 3, '2015/04/30');
      util.datePattern = undefined;
    });

  });

});

