var expect = require('expect.js');
var fiCalc = require('../../../index');

describe('还款计划', function() {

  function T(fn, option, report) {
    expect(fn(option)).to.eql(report);
  };

  it('等额本息', function() {
    T(fiCalc.repay.mpi, {
      all: 10000,
      periodsCount: 12,
      rate: 0.00345
    }, {periods: [
      {number:1, repay:"852.13", repayInterest:"34.50", repayPrincipal:"817.63"},
      {number:2, repay:"852.13", repayInterest:"31.67", repayPrincipal:"820.46"},
      {number:3, repay:"852.13", repayInterest:"28.84", repayPrincipal:"823.29"},
      {number:4, repay:"852.13", repayInterest:"26.00", repayPrincipal:"826.13"},
      {number:5, repay:"852.13", repayInterest:"23.15", repayPrincipal:"828.98"},
      {number:6, repay:"852.13", repayInterest:"20.29", repayPrincipal:"831.84"},
      {number:7, repay:"852.13", repayInterest:"17.42", repayPrincipal:"834.71"},
      {number:8, repay:"852.13", repayInterest:"14.54", repayPrincipal:"837.59"},
      {number:9, repay:"852.13", repayInterest:"11.65", repayPrincipal:"840.48"},
      {number:10, repay:"852.13", repayInterest:"8.75", repayPrincipal:"843.38"},
      {number:11, repay:"852.13", repayInterest:"5.84", repayPrincipal:"846.29"},
      {number:12, repay:"852.13", repayInterest:"2.91", repayPrincipal:"849.22"}
    ], total: {repay: '10225.56', repayInterest: '225.56', repayPrincipal: '10000.00'}});
  });

  it('等额本金', function () {
    T(fiCalc.repay.mp, {
      all: 10000,
      periodsCount: 12,
      rate: 0.00345
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
  });

  it('按月付息到期还本', function () {
    T(fiCalc.repay.i, {
      all: 10000,
      periodsCount: 12,
      rate: 0.00345
    }, {periods: [
      {number: 1, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 2, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 3, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 4, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 5, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 6, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 7, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 8, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 9, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 10, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 11, repayPrincipal: '0.00', repayInterest: '34.50', repay: '34.50'},
      {number: 12, repayPrincipal: '10000.00', repayInterest: '34.50', repay: '10034.50'}
    ], total: {repayPrincipal: '10000.00', repayInterest: '414.00', repay: '10414.00'}});
  });

});

