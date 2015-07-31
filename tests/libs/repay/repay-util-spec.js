var expect = require('expect.js');
var ru = require('../../../libs/repay/repay-util');

describe('Repay util', function () {

  it('Format parameters', function () {

    function T(option, handle) {
      expect(function () {
        ru.formatParam(option);
      }).to.throwError(handle);
    }

    T({}, /new Decimal\(\) not a number/);
    T({all: 10000, periodsCount: 12}, /rate/);
    T({all: 10000, rate: 0.00345}, /periodsCount/);

  });

});

