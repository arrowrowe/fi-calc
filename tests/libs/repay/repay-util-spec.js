var expect = require('expect.js');
var ru = require('../../../libs/repay/repay-util');

describe('还款计划(辅助函数)', function () {

  it('校验参数', function () {

    function T(option, handle) {
      expect(function () {
        ru.formatParam(option);
      }).to.throwError(handle);
    }

    T({all: 10000, periodsCount: 12}, /rate/);
    T({all: 10000, rate: 0.00345}, /periodsCount/);

  });

});

