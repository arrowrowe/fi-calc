var expect = require('expect.js');
var tu = require('../test-util');

tu.judge(function (prefix, fiCalc) {
  prefix += ': ';
  var util = fiCalc.util;

  describe(prefix + '时间处理', function() {

    it('日期格式化', function () {

      // s -p-> r
      function T(s, p, r) {
        expect(util.dateFormat(new Date(s), p)).to.be(r);
      }

      T('2015/05/01', 'YY/M/D', '15/5/1');
      T('2015/05/01', 'YYYY/M/D', '2015/5/1');
      T('2015/05/01', 'YY/MM/D', '15/05/1');
      T('2015/05/01', 'YY/M/DD', '15/5/01');
      T('2015/05/01', 'YY/MM/DD', '15/05/01');
      T('2015/05/01', 'YYYY/M/DD', '2015/5/01');
      T('2015/05/01', 'YYYY/MM/D', '2015/05/1');
      T('2015/05/01', 'YYYY/MM/DD', '2015/05/01');
      T('2015/10/12', 'YY/M/D', '15/10/12');
      T('2015/10/12', 'YYYY/M/D', '2015/10/12');
      T('2015/10/12', 'YY/MM/D', '15/10/12');
      T('2015/10/12', 'YY/M/DD', '15/10/12');
      T('2015/10/12', 'YY/MM/DD', '15/10/12');
      T('2015/10/12', 'YYYY/M/DD', '2015/10/12');
      T('2015/10/12', 'YYYY/MM/D', '2015/10/12');
      T('2015/10/12', 'YYYY/MM/DD', '2015/10/12');

    });

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

