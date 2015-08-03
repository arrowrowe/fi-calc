var expect = require('expect.js');
var fiCalc = require('../../../index');

describe('Repay-plan: Matching the repayment of principal and interest', function() {
  it('$10000, 0.00345 * 12', function() {
    var option = {
      all: 10000,
      periodsCount: 12,
      rate: 0.00345
    };
    var report = fiCalc.repay.mpi(option);
    expect(report).to.eql({periods: [
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
});

