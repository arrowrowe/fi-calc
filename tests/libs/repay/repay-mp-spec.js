var expect = require('expect.js');
var fiCalc = require('../../../index');

describe('Repay-plan: Matching the principal repayment', function() {
  it('$10000, 0.00345 * 12', function() {
    var option = {
      all: 10000,
      periodsCount: 12,
      rate: 0.00345
    };
    var report = fiCalc.repay.mp(option);
    expect(report).to.eql({periods: [
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
});

