var expect = require('expect.js');
var fiCalc = require('../../../index');

describe('Monthly interest repayment', function() {
  it('$10000, 0.00345 * 12', function() {
    var option = {
      all: 10000,
      periodsCount: 12,
      rate: 0.00345
    };
    var report = fiCalc.repay.i(option);
    expect(report).to.eql({periods: [
      {number: 1, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 2, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 3, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 4, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 5, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 6, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 7, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 8, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 9, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 10, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 11, repayPrincipal: '0', repayInterest: '34.5', repay: '34.5'},
      {number: 12, repayPrincipal: '10000', repayInterest: '34.5', repay: '10034.5'}
    ], total: {repayPrincipal: '10000', repayInterest: '414', repay: '10414'}});
  });
});

