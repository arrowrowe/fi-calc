var expect = require('expect.js');
var tu = require('../../test-util');

tu.judge(function (prefix, fiCalc) {
  prefix += ': ';
  var Money = fiCalc.Money;
  describe(prefix + '还款计划', function() {

    function T(fn, option, report) {
      expect(fn(option)).to.eql(report);
    }

    it('等额本息', function() {
      var fn = fiCalc.repay.mpi;
      T(fn, {
        all: 10000,
        periodsCount: 12,
        ratePerPeriod: 0.00345
      }, {periods: [
        {number:1, repay:'852.13', repayInterest:'34.50', repayPrincipal:'817.63'},
        {number:2, repay:'852.13', repayInterest:'31.67', repayPrincipal:'820.46'},
        {number:3, repay:'852.13', repayInterest:'28.84', repayPrincipal:'823.29'},
        {number:4, repay:'852.13', repayInterest:'26.00', repayPrincipal:'826.13'},
        {number:5, repay:'852.13', repayInterest:'23.15', repayPrincipal:'828.98'},
        {number:6, repay:'852.13', repayInterest:'20.29', repayPrincipal:'831.84'},
        {number:7, repay:'852.13', repayInterest:'17.42', repayPrincipal:'834.71'},
        {number:8, repay:'852.13', repayInterest:'14.54', repayPrincipal:'837.59'},
        {number:9, repay:'852.13', repayInterest:'11.65', repayPrincipal:'840.48'},
        {number:10, repay:'852.13', repayInterest:'8.75', repayPrincipal:'843.38'},
        {number:11, repay:'852.13', repayInterest:'5.84', repayPrincipal:'846.29'},
        {number:12, repay:'852.14', repayInterest:'2.92', repayPrincipal:'849.22'}
      ], total: {repay: '10225.57', repayInterest: '225.57', repayPrincipal: '10000.00'}});

      // 商业贷款, 2015年基准利率, 5年期
      Money.optionTmp({proximate: Money.CONST.ROUND}, function () {
        T(fn, {
          all: 10000,
          yearsCount: 5,
          ratePerYear: 0.0525
        }, {periods: [
          {number:1, repay:'189.86', repayInterest:'43.75', repayPrincipal:'146.11'},
          {number:2, repay:'189.86', repayInterest:'43.11', repayPrincipal:'146.75'},
          {number:3, repay:'189.86', repayInterest:'42.47', repayPrincipal:'147.39'},
          {number:4, repay:'189.86', repayInterest:'41.82', repayPrincipal:'148.04'},
          {number:5, repay:'189.86', repayInterest:'41.18', repayPrincipal:'148.68'},
          {number:6, repay:'189.86', repayInterest:'40.53', repayPrincipal:'149.33'},
          {number:7, repay:'189.86', repayInterest:'39.87', repayPrincipal:'149.99'},
          {number:8, repay:'189.86', repayInterest:'39.22', repayPrincipal:'150.64'},
          {number:9, repay:'189.86', repayInterest:'38.56', repayPrincipal:'151.30'},
          {number:10, repay:'189.86', repayInterest:'37.90', repayPrincipal:'151.96'},
          {number:11, repay:'189.86', repayInterest:'37.23', repayPrincipal:'152.63'},
          {number:12, repay:'189.86', repayInterest:'36.56', repayPrincipal:'153.30'},
          {number:13, repay:'189.86', repayInterest:'35.89', repayPrincipal:'153.97'},
          {number:14, repay:'189.86', repayInterest:'35.22', repayPrincipal:'154.64'},
          {number:15, repay:'189.86', repayInterest:'34.54', repayPrincipal:'155.32'},
          {number:16, repay:'189.86', repayInterest:'33.86', repayPrincipal:'156.00'},
          {number:17, repay:'189.86', repayInterest:'33.18', repayPrincipal:'156.68'},
          {number:18, repay:'189.86', repayInterest:'32.49', repayPrincipal:'157.37'},
          {number:19, repay:'189.86', repayInterest:'31.81', repayPrincipal:'158.05'},
          {number:20, repay:'189.86', repayInterest:'31.11', repayPrincipal:'158.75'},
          {number:21, repay:'189.86', repayInterest:'30.42', repayPrincipal:'159.44'},
          {number:22, repay:'189.86', repayInterest:'29.72', repayPrincipal:'160.14'},
          {number:23, repay:'189.86', repayInterest:'29.02', repayPrincipal:'160.84'},
          {number:24, repay:'189.86', repayInterest:'28.32', repayPrincipal:'161.54'},
          {number:25, repay:'189.86', repayInterest:'27.61', repayPrincipal:'162.25'},
          {number:26, repay:'189.86', repayInterest:'26.90', repayPrincipal:'162.96'},
          {number:27, repay:'189.86', repayInterest:'26.19', repayPrincipal:'163.67'},
          {number:28, repay:'189.86', repayInterest:'25.47', repayPrincipal:'164.39'},
          {number:29, repay:'189.86', repayInterest:'24.75', repayPrincipal:'165.11'},
          {number:30, repay:'189.86', repayInterest:'24.03', repayPrincipal:'165.83'},
          {number:31, repay:'189.86', repayInterest:'23.31', repayPrincipal:'166.55'},
          {number:32, repay:'189.86', repayInterest:'22.58', repayPrincipal:'167.28'},
          {number:33, repay:'189.86', repayInterest:'21.84', repayPrincipal:'168.02'},
          {number:34, repay:'189.86', repayInterest:'21.11', repayPrincipal:'168.75'},
          {number:35, repay:'189.86', repayInterest:'20.37', repayPrincipal:'169.49'},
          {number:36, repay:'189.86', repayInterest:'19.63', repayPrincipal:'170.23'},
          {number:37, repay:'189.86', repayInterest:'18.89', repayPrincipal:'170.97'},
          {number:38, repay:'189.86', repayInterest:'18.14', repayPrincipal:'171.72'},
          {number:39, repay:'189.86', repayInterest:'17.39', repayPrincipal:'172.47'},
          {number:40, repay:'189.86', repayInterest:'16.63', repayPrincipal:'173.23'},
          {number:41, repay:'189.86', repayInterest:'15.87', repayPrincipal:'173.99'},
          {number:42, repay:'189.86', repayInterest:'15.11', repayPrincipal:'174.75'},
          {number:43, repay:'189.86', repayInterest:'14.35', repayPrincipal:'175.51'},
          {number:44, repay:'189.86', repayInterest:'13.58', repayPrincipal:'176.28'},
          {number:45, repay:'189.86', repayInterest:'12.81', repayPrincipal:'177.05'},
          {number:46, repay:'189.86', repayInterest:'12.03', repayPrincipal:'177.83'},
          {number:47, repay:'189.86', repayInterest:'11.26', repayPrincipal:'178.60'},
          {number:48, repay:'189.86', repayInterest:'10.47', repayPrincipal:'179.39'},
          {number:49, repay:'189.86', repayInterest:'9.69', repayPrincipal:'180.17'},
          {number:50, repay:'189.86', repayInterest:'8.90', repayPrincipal:'180.96'},
          {number:51, repay:'189.86', repayInterest:'8.11', repayPrincipal:'181.75'},
          {number:52, repay:'189.86', repayInterest:'7.31', repayPrincipal:'182.55'},
          {number:53, repay:'189.86', repayInterest:'6.52', repayPrincipal:'183.34'},
          {number:54, repay:'189.86', repayInterest:'5.71', repayPrincipal:'184.15'},
          {number:55, repay:'189.86', repayInterest:'4.91', repayPrincipal:'184.95'},
          {number:56, repay:'189.86', repayInterest:'4.10', repayPrincipal:'185.76'},
          {number:57, repay:'189.86', repayInterest:'3.29', repayPrincipal:'186.57'},
          {number:58, repay:'189.86', repayInterest:'2.47', repayPrincipal:'187.39'},
          {number:59, repay:'189.86', repayInterest:'1.65', repayPrincipal:'188.21'},
          {number:60, repay:'189.85', repayInterest:'0.83', repayPrincipal:'189.02'}
        ], total: {repay: '11391.59', repayInterest: '1391.59', repayPrincipal: '10000.00'}});
      });
    });

    it('等额本金', function () {
      var fn = fiCalc.repay.mp;
      T(fn, {
        all: 10000,
        periodsCount: 12,
        ratePerPeriod: 0.00345
      }, {periods: [
        {number: 1, repayPrincipal: '833.33', repayInterest: '34.50', repay: '867.83'},
        {number: 2, repayPrincipal: '833.33', repayInterest: '31.62', repay: '864.95'},
        {number: 3, repayPrincipal: '833.33', repayInterest: '28.75', repay: '862.08'},
        {number: 4, repayPrincipal: '833.33', repayInterest: '25.87', repay: '859.20'},
        {number: 5, repayPrincipal: '833.33', repayInterest: '23.00', repay: '856.33'},
        {number: 6, repayPrincipal: '833.33', repayInterest: '20.12', repay: '853.45'},
        {number: 7, repayPrincipal: '833.33', repayInterest: '17.25', repay: '850.58'},
        {number: 8, repayPrincipal: '833.33', repayInterest: '14.37', repay: '847.70'},
        {number: 9, repayPrincipal: '833.33', repayInterest: '11.50', repay: '844.83'},
        {number: 10, repayPrincipal: '833.33', repayInterest: '8.62', repay: '841.95'},
        {number: 11, repayPrincipal: '833.33', repayInterest: '5.75', repay: '839.08'},
        {number: 12, repayPrincipal: '833.37', repayInterest: '2.87', repay: '836.24'}
      ], total: {repayPrincipal: '10000.00', repayInterest: '224.22', repay: '10224.22'}});

      Money.optionTmp({proximatePrincipal: Money.CONST.FLOOR, proximateInterest: Money.CONST.ROUND}, function () {
        T(fn, {
          all: 1000,
          yearsCount: 1,
          ratePerDay: 0.00045,
          onDay: true,
          beginDate: new Date('2015/08/11')
        }, {periods: [
          {number: 1, repay: '96.83', repayPrincipal: '83.33', repayInterest: '13.50'},
          {number: 2, repay: '95.71', repayPrincipal: '83.33', repayInterest: '12.38'},
          {number: 3, repay: '94.96', repayPrincipal: '83.33', repayInterest: '11.63'},
          {number: 4, repay: '93.46', repayPrincipal: '83.33', repayInterest: '10.13'},
          {number: 5, repay: '92.63', repayPrincipal: '83.33', repayInterest: '9.30'},
          {number: 6, repay: '91.47', repayPrincipal: '83.33', repayInterest: '8.14'},
          {number: 7, repay: '89.86', repayPrincipal: '83.33', repayInterest: '6.53'},
          {number: 8, repay: '89.14', repayPrincipal: '83.33', repayInterest: '5.81'},
          {number: 9, repay: '87.83', repayPrincipal: '83.33', repayInterest: '4.50'},
          {number: 10, repay: '86.82', repayPrincipal: '83.33', repayInterest: '3.49'},
          {number: 11, repay: '85.58', repayPrincipal: '83.33', repayInterest: '2.25'},
          {number: 12, repay: '84.53', repayPrincipal: '83.37', repayInterest: '1.16'}
        ], total: {repay: '1088.82', repayInterest: '88.82', repayPrincipal: '1000.00'}});
        T(fn, {
          all: 1,
          yearsCount: 1,
          ratePerDay: 0.00045,
          onDay: true,
          beginDate: new Date('2015/08/11')
        }, {periods: [
          {number: 1, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 2, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 3, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 4, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 5, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 6, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 7, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 8, repay: '0.09', repayPrincipal: '0.08', repayInterest: '0.01'},
          {number: 9, repay: '0.08', repayPrincipal: '0.08', repayInterest: '0.00'},
          {number: 10, repay: '0.08', repayPrincipal: '0.08', repayInterest: '0.00'},
          {number: 11, repay: '0.08', repayPrincipal: '0.08', repayInterest: '0.00'},
          {number: 12, repay: '0.12', repayPrincipal: '0.12', repayInterest: '0.00'}
        ], total: {repay: '1.08', repayInterest: '0.08', repayPrincipal: '1.00'}});
        T(fn, {
          all: 2,
          yearsCount: 1,
          ratePerDay: 0.00045,
          onDay: true,
          beginDate: new Date('2015/08/11')
        }, {periods: [
          {number: 1, repay: '0.19', repayPrincipal: '0.16', repayInterest: '0.03'},
          {number: 2, repay: '0.18', repayPrincipal: '0.16', repayInterest: '0.02'},
          {number: 3, repay: '0.18', repayPrincipal: '0.16', repayInterest: '0.02'},
          {number: 4, repay: '0.18', repayPrincipal: '0.16', repayInterest: '0.02'},
          {number: 5, repay: '0.18', repayPrincipal: '0.16', repayInterest: '0.02'},
          {number: 6, repay: '0.18', repayPrincipal: '0.16', repayInterest: '0.02'},
          {number: 7, repay: '0.17', repayPrincipal: '0.16', repayInterest: '0.01'},
          {number: 8, repay: '0.17', repayPrincipal: '0.16', repayInterest: '0.01'},
          {number: 9, repay: '0.17', repayPrincipal: '0.16', repayInterest: '0.01'},
          {number: 10, repay: '0.17', repayPrincipal: '0.16', repayInterest: '0.01'},
          {number: 11, repay: '0.17', repayPrincipal: '0.16', repayInterest: '0.01'},
          {number: 12, repay: '0.24', repayPrincipal: '0.24', repayInterest: '0.00'}
        ], total: {repay: '2.18', repayInterest: '0.18', repayPrincipal: '2.00'}});

      });
    });

    it('按月付息到期还本', function () {
      var fn = fiCalc.repay.i;
      fiCalc.util.datePattern = 'YYYY/MM/DD';
      T(fn, {
        all: 10000,
        periodsCount: 12,
        ratePerPeriod: 0.00345,
        beginDate: new Date('2015/01/31')
      }, {periods: [
        {number: 1, date: '2015/02/28', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 2, date: '2015/03/31', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 3, date: '2015/04/30', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 4, date: '2015/05/31', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 5, date: '2015/06/30', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 6, date: '2015/07/31', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 7, date: '2015/08/31', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 8, date: '2015/09/30', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 9, date: '2015/10/31', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 10, date: '2015/11/30', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 11, date: '2015/12/31', repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
        {number: 12, date: '2016/01/31', repayPrincipal: '10000.00', repayInterest: '34.50', repay: '10034.50'}
      ], total: {repayPrincipal: '10000.00', repayInterest: '414.00', repay: '10414.00'}});
      fiCalc.util.datePattern = undefined;

      // 只是用来测试折扣
      T(fn, {
        all: 100,
        periodsCount: 5,
        ratePerPeriod: 0.1,
        discounts: [0.5, 0, 0.1]
      }, {periods: [
        {number: 1, repayPrincipal: '0.00', repayInterest: '5.00', repay: '5.00'},
        {number: 2, repayPrincipal: '0.00', repayInterest: '0.00', repay: '0.00'},
        {number: 3, repayPrincipal: '0.00', repayInterest: '1.00', repay: '1.00'},
        {number: 4, repayPrincipal: '0.00', repayInterest: '10.00', repay: '10.00'},
        {number: 5, repayPrincipal: '100.00', repayInterest: '10.00', repay: '110.00'}
      ], total: {repayPrincipal: '100.00', repayInterest: '26.00', repay: '126.00'}});

      Money.optionTmp({proximateInterest: Money.CONST.ROUND}, function () {
        T(fn, {
          all: 10000,
          yearsCount: 1,
          ratePerYear: 0.162,
          onDay: true,
          beginDate: new Date('2015/08/11')
        }, {periods: [
          {number: 1, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 2, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 3, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 4, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 5, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 6, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 7, repayPrincipal: '0.00', repayInterest: '130.50', repay: '130.50'},
          {number: 8, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 9, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 10, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 11, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 12, repayPrincipal: '10000.00', repayInterest: '139.50', repay: '10139.50'}
        ], total: {repayPrincipal: '10000.00', repayInterest: '1642.50', repay: '11642.50'}});

        T(fn, {
          all: 10000,
          yearsCount: 1,
          ratePerYear: 0.162,
          onDay: true,
          skipFirst: false,
          beginDate: new Date('2015/08/11')
        }, {periods: [
          {number: 1, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 2, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 3, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 4, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 5, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 6, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 7, repayPrincipal: '0.00', repayInterest: '130.50', repay: '130.50'},
          {number: 8, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 9, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 10, repayPrincipal: '0.00', repayInterest: '139.50', repay: '139.50'},
          {number: 11, repayPrincipal: '0.00', repayInterest: '135.00', repay: '135.00'},
          {number: 12, repayPrincipal: '10000.00', repayInterest: '139.50', repay: '10139.50'}
        ], total: {repayPrincipal: '10000.00', repayInterest: '1647.00', repay: '11647.00'}});

      });
    });

  });
});

